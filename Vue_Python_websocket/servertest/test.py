import asyncio
import websockets
import time
 
# 检测客户端权限，用户名密码通过才能退出循环
async def check_permit(websocket):
    while True:
        recv_str = await websocket.recv()
        cred_dict = recv_str.split(":")
        if cred_dict[0] == "admin" and cred_dict[1] == "123456":
            response_str = "congratulation, you have connect with server\r\nnow, you can do something else"
            await websocket.send(response_str)
            return True
        else:
            response_str = "sorry, the username or password is wrong, please submit again"
            await websocket.send(response_str)
 
# 接收客户端消息并处理，这里只是简单把客户端发来的返回回去
async def recv_msg(websocket):
    while True:
        recv_text = await websocket.recv()
        response_text = f"your submit context: {recv_text}"
        await websocket.send(response_text)
 
#定时任务，每十秒发送check到给客户端
async def check_client(ws):
    while True:
        try:
            print("send check...")
            await ws.send("cmd:check@@@@@@@@")
            await asyncio.sleep(10)
        except:
            print("check_client failed ...")
            break
 
# 服务器端主逻辑
# websocket和path是该函数被回调时自动传过来的，不需要自己传
async def main_logic(websocket, path):
    await check_permit(websocket)#可去掉
    asyncio.create_task(check_client(websocket))
    await recv_msg(websocket)
 
# 把ip换成自己本地的ip
start_server = websockets.serve(main_logic, '127.0.0.1', 5678)
# 如果要给被回调的main_logic传递自定义参数，可使用以下形式
# 一、修改回调形式
# import functools
# start_server = websockets.serve(functools.partial(main_logic, other_param="test_value"), '10.10.6.91', 5678)
# 修改被回调函数定义，增加相应参数
# async def main_logic(websocket, path, other_param)
 
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()