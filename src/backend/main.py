from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from models import conversation_db
from pydantic import BaseModel
from tools import logger, call_openai_api
from handle_file import extract_text_from_file, add_to_qdrant, query, delete_document_from_collection
import asyncio
import random
from typing import Optional
import time


from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from models import conversation_db
from tools import logger, call_openai_api
from handle_file import extract_text_from_file, add_to_qdrant, query, delete_document_from_collection
import asyncio
import random
from typing import Optional
import uuid
import time
app = FastAPI()

class Conversation(BaseModel):
    conversation_id: Optional[str] = None
    message: str

class FileItem(BaseModel):
    file_name: str
    file_data: bytes

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],  
    allow_credentials=True,
    allow_headers=["*"],  
)

@app.post("/get_openai_answer")
async def get_openai_answer(item: Conversation):
    conversation_id = item.conversation_id
    message = item.message

    if conversation_id:
        db_row = conversation_db.get_conversation(conversation_id)
        if db_row is None:
            # If no conversation is found with the provided ID, create a new conversation.
            conversation = [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message}
            ]
        else:
            # Extract the conversation list from the returned dictionary.
            conversation = db_row.get("conversation", [])
            conversation.append({"role": "user", "content": message})
    else:
        # No conversation_id provided; create a new conversation.
        conversation = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message}
        ]
        conversation_id = None

    # Add context and call OpenAI API.
    context = await query(message, 'text_collection')
    conversation.append({"role": "system", "content": f'Use the following context: {context}'})

    openai_response = await call_openai_api(conversation)
    conversation.append({"role": "assistant", "content": openai_response})
    
    # Update or insert the conversation into the DB.
    if conversation_id:
        conversation_db.update(conversation_id, conversation)
    else:
        conversation_id = conversation_db.insert(conversation)

    return {
        "message": "Response generated successfully",
        "answer": openai_response,
        "conversation_id": conversation_id
    }


# Adjust the endpoint to accept a file upload.
@app.post("/add_data")
async def add_data(
    file: UploadFile = File(...),
    file_name: str = Form(...)
):
    try:
        file_data = await file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error reading file")
    
    # Optionally, if your file might not be UTF-8 encoded, you can modify extract_text_from_file
    # to decode with errors='ignore' or use another encoding.
    try:
        file_text = extract_text_from_file(file_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error extracting text from file")
    
    result = add_to_qdrant(text=file_text, source=file_name, collection_name="text_collection")
    return {"message": "Data added successfully"}

@app.post("/delete_data")
async def delete_data(item: FileItem):
    file_name = item.file_name
    result = delete_document_from_collection("text_collection", file_name)
    return {"message": "Data deleted successfully"}

active_connections = []

# 1. Function to generate random data for each component
def generate_component_data():
    """
    Returns a dictionary of simulated metrics for each major component
    in an integrated steelmaking process.
    """
    return {
        "coke_ovens": {
            "temperature": round(random.uniform(900, 1200), 1),   # °C
            "coke_output_tph": round(random.uniform(20, 50), 1),  # tons/hour
            "cog_flow": round(random.uniform(5000, 8000), 1),     # Nm³/hr
        },
        "blast_furnace": {
            "hot_metal_tph": round(random.uniform(100, 300), 1),  # tons/hour
            "top_gas_pressure": round(random.uniform(2, 5), 2),   # bar
            "bf_temperature": round(random.uniform(1400, 1600), 1), # °C
        },
        "stoves": {
            "stove_temp": round(random.uniform(800, 1200), 1),    # °C
            "fuel_gas_flow": round(random.uniform(2000, 5000), 1),# Nm³/hr
        },
        "sinter_plant": {
            "sinter_output_tph": round(random.uniform(50, 150), 1), # tons/hour
            "bed_temp": round(random.uniform(1000, 1300), 1),     # °C
        },
        "lime_plant": {  # renamed from "lime_kiln"
            "lime_plant_temperature": round(random.uniform(900, 1100), 1),
            "kiln_temp": round(random.uniform(900, 1100), 1),     # °C
        },
        "bos": {
            "steel_output_tph": round(random.uniform(120, 300), 1), # tons/hour
            "oxygen_flow": round(random.uniform(5000, 10000), 1),   # Nm³/hr
        },
        "power_plant": {
            "electricity_mw": round(random.uniform(50, 150), 1),   # MW
            "fuel_gas_cons": round(random.uniform(1000, 3000), 1), # Nm³/hr
        },
        "oxygen_plant": {
            "oxygen_plant_temperature": round(random.uniform(100, 300), 1)
        },
        "blowers": {
            "blowers_temperature": round(random.uniform(100, 300), 1)
        },
        "stover": {
            "stover_temperature": round(random.uniform(100, 300), 1)
        }
    }

# 2. HTTP endpoint: returns one "snapshot" of the data
@app.get("/process_data")
def get_process_data():
    """
    Returns a JSON object with the latest data for each component.
    """
    return generate_component_data()

# 3. Optional: WebSocket for continuous updates
active_connections = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            # Generate data
            data = generate_component_data()

            # Example: "Bad" condition check (e.g., BF temperature too high)
            # If we detect a "bad" condition, we can add an alert message.
            alert = None
            if data["blast_furnace"]["bf_temperature"] > 1550:
                alert = "Blast Furnace temperature exceeding safe threshold!"

            # Send data to client
            await websocket.send_json({
                "timestamp": time.time(),
                "data": data,
                "alert": alert,
            })

            # Wait before sending the next update
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        active_connections.remove(websocket)
    except Exception as e:
        # Handle unexpected exceptions
        active_connections.remove(websocket)
        print(f"WebSocket error: {e}")

if __name__ == "__main__":  
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)