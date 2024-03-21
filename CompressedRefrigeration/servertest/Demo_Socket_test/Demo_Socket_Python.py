#! -*- coding: utf-8 -*-

import asyncio
import websockets
import json
import threading
import time
import datetime


from Simulation_Test import x, Va, Ca, Vb, Cb, ka1, ka2, ka3, Kw, CALCU, counter, number
# import Simulation_Test

# counter()
# permit_user = False

# async def display_date():
#     loop = asyncio.get_running_loop()
#     end_time = loop.time() + 5.0
#     while True:
#         print(datetime.datetime.now())
#         if (loop.time() + 1.0) >= end_time:
#             break
#         await asyncio.sleep(1)

# asyncio.run(display_date())

# class datatest:


def dataset():

    data = {}

    currenttime = {"currentTime": time.ctime()}
    data['time'] = currenttime

    volume = {"va": Va, "vb": Vb}
    data['volume'] = volume
    va = {"name": "va", "value": Va}
    data['volume']['va'] = va
    vb = {"name": "vb", "value": Vb}
    data['volume']['vb'] = vb

    concentration = {"ca": Ca, "cb": Cb}
    data['concentration'] = concentration
    ca = {"name": "ca", "value": Ca}
    data['concentration']['ca'] = ca
    cb = {"name": "cb", "value": Cb}
    data['concentration']['cb'] = cb

    calculation = {"ka1": ka1, "ka2": ka2, "ka3": ka3,
                   "test": counter(0), "test1": number(2, 3, 4, 5)}
    data['calculation'] = calculation
    return data


# def data_set(cmd,param):
#     if cmd == "setCa":
#        Ca


# dataset = {
#     "time": {"currentTime": time.ctime()},
#     "volume": {
#         "va": {"name": "va", "value": Va},
#         "vb": {"name": "vb", "value": Vb}},
#     "concentration": {
#         "ca": {"name": "ca", "value": Ca},
#         "cb": {"name": "cb", "value": Cb}},
#     "calculation": {
#         "ka1": ka1,
#         "ka2": ka2,
#         "ka3": ka3,
#         "test": counter(0),
#         "test1": number}
#     }

# dataset = {
#     "time": {"currentTime": 1},
#     "volume": {
#         "va": {"name": "va", "value": 1},
#         "vb": {"name": "vb", "value": 1}},
#     "concentration": {
#         "ca": {"name": "ca", "value": 1},
#         "cb": {"name": "cb", "value": 1}},
#     "calculation": {
#         "ka1": 1,
#         "ka2": 1,
#         "ka3": 1,
#         "test": 1,
#         "test1": 1}
#     }

# regularly send message to client(2s), the loop will break until check client failed
async def send_data(websocket):
    while True:
        try:
            # recv_str = await websocket.recv()
            # set_cmd = json.loads(json.dumps(recv_str))
            # print(set_cmd)
            print("send data...")
            dataset_rev = dataset()
            dataPh = json.dumps(dataset_rev, ensure_ascii=False)
            # dataPh = json.loads(json.dumps(dataset))
            await websocket.send(dataPh)
            await asyncio.sleep(2)

            # elif permit_check ==False:
            #     print("permit not yet approved",permit_user)
            #     await asyncio.sleep(5)
            # else:
            #     print('check client failed')
        except:
            print("check client failed")
            break

    # await websocket.send(json.dumps(dataPh))


async def set_data_value(websocket):
    while True:
        recv_str = await websocket.recv()
        set_cmd = json.loads(recv_str)

        print(recv_str)
        if set_cmd["cmd"] == "setCa" and set_cmd["param"] == "3":
            global Ca
            Ca = 3
            dataset_rev = dataset()
            dataPh = json.dumps(dataset_rev, ensure_ascii=False)
            await websocket.send(dataPh)
            print("new data send..")
            # permit_user = True
            # print(permit_user)
        else:
            response_str = "the command is not correct"
            print("the command is not correct")
            await websocket.send(response_str)


websocket_users = set()


# check client Authority
async def check_user_permit(websocket):
    print("new websocket_users:", websocket)
    websocket_users.add(websocket)
    print("websocket_users list:", websocket_users)
    while True:
        recv_str = await websocket.recv()
        cred_dict = recv_str.split(":")
        set_cmd = recv_str
        print(set_cmd)
        if cred_dict[0] == "admin" and cred_dict[1] == "123456":
            msg = {'msg': "Congratulation, you have connect with server..."}
            response_str = json.dumps(msg)
            await websocket.send(response_str)
            print("Password is ok...")
            # permit_user = True
            # print(permit_user)
            return True
        else:
            response_str = "Sorry, please input the username or password..."
            print("Password is wrong...")
            await websocket.send(response_str)


# receive msg from client and send the string back
async def recv_user_msg(websocket):
    while True:
        recv_text = await websocket.recv()
        print("recv_text:", websocket.pong, recv_text)
        response_text = f"Server return: {recv_text}"
        print("response_text:", response_text)
        await websocket.send(response_text)


# server main
async def run(websocket, path):
    while True:
        try:
            await check_user_permit(websocket)
            # asyncio.gather(func1(),func2()) can gather different function and run together # seems just can be run once
            asyncio.gather(send_data(websocket))
            await set_data_value(websocket)
            await recv_user_msg(websocket)
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
