#! -*- coding: utf-8 -*-

import asyncio
import websockets
import json
import threading
import time
import datetime
import random


globalv1 = 0
globalv2 = 0

# generate Json data set
def dataset():

    data = {}

    currenttime = {
        "currentTime":time.time(),
        "currentDate":time.ctime(),
        }
    
    data['time'] = currenttime

    valves = {
        "V1":globalv1,
        "V2":0,
        "V3":0,
        "V4":0,
        "V5":0,
        "V6":0,
    }
    data["valves"] = valves

    power_relays = {
        "W1": False,
        "W2": False,
        "Comp": False,
    } 
    data["power_relays"] = power_relays

    sensors = {
        "pressure": {},
        "temperature": {},
        "misc": {},
    }
    data["sensors"] = sensors

    pressure = {
        "PS1" : { },
        "PS2" : { },
        "PS3" : { },
    }
    data["sensors"]["pressure"] = pressure

    PS1 = {
        "value": random.randrange(1,10),
        "dxdt":0,
        "avg":0,
        "lms":0,
        "min":0,
        "max":0
    }
    data["sensors"]["pressure"]["PS1"] = PS1

    PS2 = {
        "value": random.randrange(1,10),
        "dxdt":0,
        "avg":0,
        "lms":0,
        "min":0,
        "max":0
    }
    data["sensors"]["pressure"]["PS2"] = PS2

    PS3 = {
        "value": random.randrange(1,10),
        "dxdt":0,
        "avg":0,
        "lms":0,
        "min":0,
        "max":0
    }
    data["sensors"]["pressure"]["PS3"] = PS3

    temperature = {
        "TS1" : { },
        "TS2" : { },
        "TS3" : { },
        "TS4" : { },
        "TS5" : { },
    }
    data["sensors"]["temperature"] = temperature

    TS1 = {
        "value":random.randrange(1,30),
        "dxdt":0,
        "avg":0,
        "lms":0,
        "min":0,
        "max":0
    }
    data["sensors"]["temperature"]["TS1"] = TS1

    TS2 = {
        "value":random.randrange(1,100),
        "dxdt":0,
        "avg":0,
        "lms":0,
        "min":0,
        "max":0
    }
    data["sensors"]["temperature"]["TS2"] = TS2

    TS3 = {
        "value":random.randrange(1,100),
        "dxdt":0,
        "avg":0,
        "lms":0,
        "min":0,
        "max":0
    }
    data["sensors"]["temperature"]["TS3"] = TS3

    TS4 = {
        "value":random.randrange(1,20),
        "dxdt":0,
        "avg":0,
        "lms":0,
        "min":0,
        "max":0
    }
    data["sensors"]["temperature"]["TS4"] = TS4

    TS5 = {
        "value":random.randrange(1,30),
        "dxdt":0,
        "avg":0,
        "lms":0,
        "min":0,
        "max":0
    }
    data["sensors"]["temperature"]["TS5"] = TS5

    misc = {
        "flow": { },
        "power" : { },
        "APS" : { },
        "ATS" : { }, 
    }
    data["sensors"]["misc"] = misc

    flow = {
        "value":random.randrange(1,9),
        "dxdt":0,
        "avg":0,
        "lms":0,
        "min":0,
        "max":0
    }
    data["sensors"]["misc"]["flow"] = flow

    power = {
        "value":random.randrange(150,220),
        "dxdt":0,
        "avg":0,
        "lms":0,
        "min":0,
        "max":0
    }
    data["sensors"]["misc"]["power"] = power

    APS = {
        "value":1,
        "dxdt":0,
        "avg":0,
        "lms":0,
        "min":0,
        "max":0
    }
    data["sensors"]["misc"]["APS"] = APS

    ATS = {
        "value":1,
        "dxdt":0,
        "avg":0,
        "lms":0,
        "min":0,
        "max":0
    }
    data["sensors"]["misc"]["ATS"] = ATS

    status = {
      "ok": True,
      "state": " ",
      "code":0,
      "message":" "
    }
    data["status"] = status

    return data

print(dataset())

# regularly send message to client(2s), the loop will break until check client failed
async def send_data(websocket):
    while True:
        try:
            print("send data...")
            dataset_rev = dataset()
            dataPh = json.dumps(dataset_rev, ensure_ascii=False)
            await websocket.send(dataPh)
            await asyncio.sleep(2)
        except:
            print("check client failed")
            break



async def set_data_value(websocket):
    while True:
        recv_str = await websocket.recv()
        set_cmd = json.loads(recv_str)

        print(recv_str)
        global globalv1

        if set_cmd["cmd"] == "setV1off" and set_cmd["param"] == "0":
            globalv1 = 0
            dataset_rev = dataset()
            data = json.dumps(dataset_rev, ensure_ascii=False)
            await websocket.send(data)
            print("setV1off data send..")

        elif set_cmd["cmd"] == "setV1on" and set_cmd["param"] == "1":
            globalv1 = 1
            dataset_rev = dataset()
            data = json.dumps(dataset_rev, ensure_ascii=False)
            await websocket.send(data)
            print("setV1on data send..")

        else:
            response_str = "the command is not correct"
            print("the command is not correct")
            await websocket.send(response_str)


websocket_users = set()


# check client Authority, not appliable in this case. every student will have a random UUID(which generate accoding to the device, means one device has one UUID), then every UUID will get a different URL to connect the experiment, so no account in this case
# async def check_user_permit(websocket):
    # print("new websocket_users:", websocket)
    # websocket_users.add(websocket)
    # print("websocket_users list:", websocket_users)
    # while True:
    #     recv_str = await websocket.recv()
    #     cred_dict = recv_str.split(":")
    #     set_cmd = recv_str
    #     print(set_cmd)
    #     if cred_dict[0] == "admin" and cred_dict[1] == "123456":
    #         msg = {'msg': "Congratulation, you have connect with server..."}
    #         response_str = json.dumps(msg)
    #         await websocket.send(response_str)
    #         print("Password is ok...")
    #         # permit_user = True
    #         # print(permit_user)
    #         return True
    #     else:
    #         response_str = "Sorry, please input the username or password..."
    #         print("Password is wrong...")
    #         await websocket.send(response_str)


# receive msg from client and send the string back
# async def recv_user_msg(websocket):
#     while True:
#         recv_text = await websocket.recv()
#         print("recv_text:", websocket.pong, recv_text)
#         response_text = f"Server return: {recv_text}"
#         print("response_text:", response_text)
#         await websocket.send(response_text)


# server main
async def run(websocket, path):
    while True:
        try:
            # await check_user_permit(websocket)
            # asyncio.gather(func1(),func2()) can gather different function and run together # seems just can be run once
            asyncio.gather(send_data(websocket))
            await set_data_value(websocket)
             # await send_data(websocket)
            
            
            # await recv_user_msg(websocket)
        except websockets.ConnectionClosed:
            print("ConnectionClosed...", path)    # ConnectionClosed
            print("websocket_users old:", websocket_users)
            websocket_users.remove(websocket)
            print("websocket_users new:", websocket_users)
            break
        except websockets.InvalidState:
            print("InvalidState...")    # InvalidState
            break
        except Exception as e:
            print("Exception:", e)


if __name__ == '__main__':
    print("127.0.0.1:8181 websocket...")
    asyncio.get_event_loop().run_until_complete(
        websockets.serve(run, "127.0.0.1", 8181))
    asyncio.get_event_loop().run_forever()
