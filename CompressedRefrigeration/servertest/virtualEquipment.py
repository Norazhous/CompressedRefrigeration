import asyncio
import websockets
import math
import json

async def send_numbers(websocket, equation):
    # Generate a list of numbers based on the equation
    numbers = [{"value": eval(equation, {"x": x})} for x in range(10)]  # Generate 10 numbers (change the range as needed)

    for number in numbers:
        # Convert the number to a JSON string and send it through the WebSocket connection
        await websocket.send(json.dumps(number))
        await asyncio.sleep(1)

async def main():
    async with websockets.connect('ws://localhost:8765') as websocket:  # Replace 'localhost:8765' with your WebSocket server details
        equation = "math.sin(x)"  # Replace this with your equation, e.g., "x**2 + 3*x - 5"
        await send_numbers(websocket, equation)

# Run the main function to start the WebSocket connection
asyncio.run(main())
