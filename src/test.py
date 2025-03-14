#!/usr/bin/env python3
import os

# Define the manuals content as a dictionary where the key is the filename and the value is the file content.
manuals = {
    "manual_blast_furnace.txt": """Blast Furnace – Emergency Procedure

Warning: Blast Furnace temperature has exceeded safe thresholds!

1. Immediately reduce fuel input and check the top-gas pressure.
2. Verify that all cooling systems are operational.
3. Alert the maintenance team and shut down additional feed if necessary.
4. Monitor temperature closely and prepare to initiate emergency venting if required.
5. Record the current readings and notify your supervisor.

Follow safety protocols at all times.
""",
    "manual_coke_ovens.txt": """Coke Ovens – Emergency Procedure

Warning: Coke Ovens temperature is above the safe limit!

1. Check the temperature sensors for faults or calibration issues.
2. Reduce the load on the ovens if possible.
3. Ensure proper ventilation and adjust fuel supply accordingly.
4. Notify the control room and prepare to adjust process parameters.
5. Document the incident for further analysis.

Safety first: follow all guidelines and inform your supervisor.
""",
    "manual_stoves.txt": """Stoves – Emergency Procedure

Warning: Stove temperature is exceeding safe operating levels!

1. Immediately decrease the fuel gas flow.
2. Verify that the heat exchangers and cooling circuits are functioning.
3. Check for any blockages or malfunctioning valves.
4. Inform the operations supervisor and prepare to initiate a controlled shutdown if needed.
5. Log the readings and actions taken.

Ensure all safety measures are followed.
""",
    "manual_bos.txt": """Basic Oxygen Furnace (BOS) – Emergency Procedure

Warning: Steel output or oxygen flow is outside normal range!

1. Check oxygen flow rates and verify sensor readings.
2. Inspect the oxygen supply system for blockages or leaks.
3. Reduce the oxygen feed if necessary to stabilize the process.
4. Alert the process engineer and follow standard operating procedures.
5. Record measurements and any corrective actions.

Adhere to all safety protocols during this process.
""",
    "manual_stover.txt": """Stover – Emergency Procedure

Warning: Stover temperature is above safe levels!

1. Confirm the temperature reading with a secondary sensor.
2. Reduce the heat input to the stover system.
3. Check for equipment malfunction or abnormal airflow.
4. Inform the maintenance department immediately.
5. Document the incident and monitor the temperature closely.

Follow all safety procedures.
""",
    "manual_power_plant.txt": """Power Plant – Emergency Procedure

Warning: Power Plant temperature is exceeding safe thresholds!

1. Immediately reduce the load and fuel consumption.
2. Verify the functioning of all cooling and ventilation systems.
3. Check for any electrical or mechanical faults.
4. Notify the control room and prepare for a partial or full shutdown if necessary.
5. Document the temperature readings and actions taken.

Ensure the safety of all personnel.
""",
    "manual_sinter_plant.txt": """Sinter Plant – Emergency Procedure

Warning: Sinter Plant temperature is too high!

1. Reduce the material feed rate to the sinter machine.
2. Check the integrity of the sintering bed and cooling fans.
3. Inspect sensors for any error or miscalibration.
4. Alert the process control team to adjust operational parameters.
5. Log all measurements and follow up with maintenance.

Proceed with caution and follow all emergency procedures.
""",
    "manual_lime_plant.txt": """Lime Plant – Emergency Procedure

Warning: Lime Plant temperature exceeds safe limits!

1. Reduce the kiln temperature gradually.
2. Check the fuel supply and air flow to the kiln.
3. Ensure that all cooling systems are working properly.
4. Alert the operations supervisor and monitor for further deviations.
5. Record current readings and corrective actions taken.

Maintain safety protocols at all times.
""",
    "manual_oxygen_plant.txt": """Oxygen Plant – Emergency Procedure

Warning: Oxygen Plant temperature is out of normal range!

1. Check sensor calibration and confirm temperature readings.
2. Immediately reduce the oxygen production rate.
3. Verify that cooling systems and pressure controls are functioning.
4. Notify the plant supervisor and follow emergency shutdown procedures if necessary.
5. Document the incident and report to maintenance.

Always follow the safety guidelines.
""",
    "manual_blowers.txt": """Blowers – Emergency Procedure

Warning: Blowers temperature is above the safe threshold!

1. Inspect the blower motor and belt systems for overheating.
2. Check for blocked air passages or accumulation of dust.
3. Reduce the blower speed to prevent damage.
4. Inform the maintenance team and monitor system performance.
5. Record temperature data and any adjustments made.

Adhere strictly to safety protocols.
"""
}

def create_manuals(output_dir: str = "."):
    """
    Create manual text files in the specified output directory.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    for filename, content in manuals.items():
        file_path = os.path.join(output_dir, filename)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Created {file_path}")

if __name__ == "__main__":
    # You can set the output directory here if you want, or leave it as current directory.
    create_manuals("manuals")
