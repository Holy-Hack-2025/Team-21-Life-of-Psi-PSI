from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from .models import portfolio_db
from pydantic import BaseModel
from tools import logger, call_openai_api
from backend.handle_file import extract_text_from_file, add_to_qdrant, query
import asyncio

app = FastAPI()

class Conversation(BaseModel):
    conversation_id: str
    message: str

class FileItem(BaseModel):
    file_name: str
    file_data: bytes

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Dummy generator simulating a constantly streaming API.
async def dummy_api_stream():
    while True:
        # For testing, change 'good' to 'bad' to trigger the alert.
        data = {"value": "good"}  
        yield data
        await asyncio.sleep(1)  # simulate delay between data messages

async def monitor_and_push():
    async for data in dummy_api_stream():
        # Define your "bad" condition here.
        if data["value"] == "bad":
            alert_message = f"Bad data detected: {data}"
            # Send the alert to all connected clients.
            for connection in active_connections:
                await connection.send_text(alert_message)

@app.on_event("startup")
async def startup_event():
    # Schedule the monitor task to run concurrently
    asyncio.create_task(monitor_and_push())


@app.post("/get_openai_answer")
async def get_openai_answer(item: Conversation):
    conversation_id = item.conversation_id
    message = item.message

    if conversation_id:
        db_conversation = portfolio_db.get(conversation_id)
        if db_conversation:
            db_conversation.append({"role": "user", "content": item.message})
            conversation = db_conversation
        else:
            conversation = [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message}
            ]
        context = query(message, 'text_collection')
        conversation.append({"role": "system", "content": f'Use the following context: {context}'})

        openai_response = await call_openai_api(conversation)
        conversation.append({"role": "assistant", "content": openai_response})
        return conversation

    else:
        logger.info("The conversation_id is not provided")

    portfolio_db.insert(conversation)
    return {"message": "Portfolio item added successfully"}

@app.post("/add_data")
async def add_data(item: FileItem):
    file_data = item.file_data
    file_name = item.file_name
    file_text = extract_text_from_file(file_data)
    result = add_to_qdrant(text=file_text, source=file_name, collection_name="text_collection")
    return {"message": "Data added successfully"}

# Store active WebSocket connections
active_connections = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            # You can wait for messages from the client if needed.
            await websocket.receive_text()  # This keeps the connection alive.
    except WebSocketDisconnect:
        active_connections.remove(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)