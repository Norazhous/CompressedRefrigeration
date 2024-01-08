
const websocketstore = {
    state: () => ({
        //define js variables  
        V1: 0,
        V2: 0,
        V3: 0,
        V4: 0,
        V5: 0,
        V6: 0,
        W1: false,
        W2: false,
        Comp: false,
        PS1_value: 0,
        PS2_value: 1,
        PS3_value: 1.1,
        TS1_value: 0.2,
        TS2_value: 0.3,
        TS3_value: 0.4,
        TS4_value: 0.5,
        TS5_value: 0.6,
        Flow_value: 0.7,
        Power_value: 0.8,
        ATS_value: 0,
        APS_value: 0,
        Start_time: 0,
        Current_time: 0,
        Current_date: 0,


        PS1_Array: [],
        PS2_Array: [],
        PS3_Array: [],
        TS1_Array: [],
        TS2_Array: [],
        TS3_Array: [],
        TS4_Array: [],
        TS5_Array: [],
        Flow_Array: [],
        Power_Array: [],
        ATS_Array: [],
        APS_Array: [],

        url: 'ws://127.0.0.1:8181/test',
        websocket: null,
        receivedData: null,
        jsonValue: null,


    }),
    getters: {
        GETwebsocket(state) {
            return state.websocket
        },
        GETreceivedData(state) {
            return state.receivedData
        },

        GetCurrentTS1(state) {
            return state.TS1_value
        },

        GetCurrentTS2(state) {
            return state.TS2_value
        },

        GetCurrentTS3(state) {
            return state.TS3_value
        },

        GetCurrentTS4(state) {
            return state.TS4_value
        },

        GetCurrentTS5(state) {
            return state.TS5_value
        },

        GetCurrentPS1(state) {
            return state.PS1_value
        },

        GetCurrentPS2(state) {
            return state.PS2_value
        },

        GetCurrentPS3(state) {
            return state.PS3_value
        },

        GetCurrentFlow(state) {
            return state.Flow_value
        },

        GetCurrentPower(state) {
            return state.Power_value
        },

        GETCurrentTime(state) {
            return state.Current_time
        },

        GETCurrentDate(state) {
            return state.Current_date
        },


    },
    mutations: {
        //set websocket
        WEBSOCKET_INIT(state) {
            state.websocket = new WebSocket(state.url)
        },


        WEBSOCKET_REIVE(state, data) {
            state.receivedData = data;
        },

        WEBSOCKET_CLOSE(state) {
            // state.receivedData = null; // clear the data send
            state.websocket.close();
        },

        // JsonPARSE(state) {
        // try {
        // state.jsonValue = JSON.parse(state.receivedData);
        // }
        // catch (error) {
        //     console.log('Error parsing JSON:', error, state.receivedData);
        // }
        // },

        // set js variables value according to the value from server, current values
        SETCURTIME(state) {
            state.Current_time = JSON.parse(state.receivedData).time.currentTime;
        },

        SETCURDATE(state) {
            state.Current_date = JSON.parse(state.receivedData).time.currentDate;
        },

        SETV1(state) {
            state.V1 = JSON.parse(state.receivedData).valves.V1;
        },

        SETV2(state) {
            state.V2 = JSON.parse(state.receivedData).valves.V2;
        },

        SETV3(state) {
            state.V3 = JSON.parse(state.receivedData).valves.V3;
        },

        SETV4(state) {
            state.V4 = JSON.parse(state.receivedData).valves.V4;
        },

        SETV5(state) {
            state.V5 = JSON.parse(state.receivedData).valves.V5;
        },

        SETV6(state) {
            state.V6 = JSON.parse(state.receivedData).valves.V6;
        },

        SETW1(state) {
            state.W1 = JSON.parse(state.receivedData).power_relays.W1;
        },

        SETW2(state) {
            state.W2 = JSON.parse(state.receivedData).power_relays.W2;
        },

        SETComp(state) {
            state.Comp = JSON.parse(state.receivedData).power_relays.Comp;
        },

        SETPS1_value(state) {
            state.PS1_value = JSON.parse(state.receivedData).sensors.pressure.PS1.value;
        },

        SETPS2_value(state) {
            state.PS2_value = JSON.parse(state.receivedData).sensors.pressure.PS2.value;
        },

        SETPS3_value(state) {
            state.PS3_value = JSON.parse(state.receivedData).sensors.pressure.PS3.value;
        },

        SETTS1_value(state) {
            state.TS1_value = JSON.parse(state.receivedData).sensors.temperature.TS1.value;
        },

        SETTS2_value(state) {
            state.TS2_value = JSON.parse(state.receivedData).sensors.temperature.TS2.value;
        },

        SETTS3_value(state) {
            state.TS3_value = JSON.parse(state.receivedData).sensors.temperature.TS3.value;
        },

        SETTS4_value(state) {
            state.TS4_value = JSON.parse(state.receivedData).sensors.temperature.TS4.value;
        },

        SETTS5_value(state) {
            state.TS5_value = JSON.parse(state.receivedData).sensors.temperature.TS5.value;
        },

        SETFlow_value(state) {
            state.Flow_value = JSON.parse(state.receivedData).sensors.misc.flow.value;
        },

        SETPower_value(state) {
            state.Power_value = JSON.parse(state.receivedData).sensors.misc.power.value;
        },

        SETATS_value(state) {
            state.ATS_value = JSON.parse(state.receivedData).sensors.misc.ATS.value;
        },

        SETATS_value(state) {
            state.APS_value = JSON.parse(state.receivedData).sensors.misc.APS.value;
        },

        //record all value from server in a array, and this will use for the realtime chart display
        SETPS1_Array(state) {
            state.PS1_Array.push(state.PS1_value);
        },

        SETPS2_Array(state) {
            state.PS2_Array.push(state.PS2_value);
        },

        SETPS3_Array(state) {
            state.PS3_Array.push(state.PS3_value);
        },

        SETTS1_Array(state) {
            state.TS1_Array.push(state.TS1_value);
        },

        SETTS2_Array(state) {
            state.TS2_Array.push(state.TS2_value);
        },

        SETTS3_Array(state) {
            state.TS3_Array.push(state.TS3_value);
        },

        SETTS4_Array(state) {
            state.TS4_Array.push(state.TS4_value);
        },

        SETTS5_Array(state) {
            state.TS5_Array.push(state.TS5_value);
        },

        SETFlow_Array(state) {
            state.Flow_Array.push(state.Flow_value);
        },

        SETPower_Array(state) {
            state.Power_Array.push(state.Power_value);
        },

        SETATS_Array(state) {
            state.ATS_Array.push(state.ATS_value);
        },

        SETAPS_Array(state) {
            state.APS_Array.push(state.APS_value);
        },

        SETV1OFF(state) {
            state.V1 = 0;
        },
        SETV1ON(state) {
            state.V1 = 1;
        },
        SETV2OFF(state) {
            state.V2 = 0;
        },
        SETV2ON(state) {
            state.V2 = 1;
        },
        SETV3OFF(state) {
            state.V3 = 0;
        },
        SETV3ON(state) {
            state.V3 = 1;
        }

    },
    actions: {
        WEBSOCKET_INIT_ACTION({ state, commit }, url) {
            commit('WEBSOCKET_INIT', url);
            state.websocket.onopen = function () {
                console.log("connection success");
                alert("connection success!");
            };
            state.websocket.onerror = function () {
                console.log("ws error");

            };
            state.websocket.onmessage = function (callBack) {
                commit("WEBSOCKET_REIVE", callBack.data);
                commit("SETPS1_value");
                commit("SETPS2_value");
                commit("SETPS3_value");
                commit("SETTS1_value");
                commit("SETTS2_value");
                commit("SETTS3_value");
                commit("SETTS4_value");
                commit("SETTS5_value");
                commit("SETFlow_value");
                commit("SETPower_value");

                commit("SETCURTIME");
                commit("SETCURDATE");

                commit("SETV1");
                commit("SETV2");
                commit("SETV3");
                commit("SETV4");                
                commit("SETV5");
                commit("SETV6");

                // commit("SETPS1_Array");
                // commit("SETPS2_Array");
                // commit("SETPS3_Array");
                // commit("SETTS1_Array");
                // commit("SETTS2_Array");
                // commit("SETTS3_Array");
                // commit("SETTS4_Array");
                // commit("SETTS5_Array");
                // commit("SETFlow_Array");
                // commit("SETPower_Array");

            };
            state.websocket.onclose = function () {
                commit("WEBSOCKET_CLOSE")
            }
        },

        WEBSOCKET_CLOSE(context) {
            context.commit('WEBSOCKET_CLOSE');
        },

        WEBSOCKET_REIVE_ACTION({ state, commit }, sendData) {
            // let msg =JSON.stringify(sendData);
            let msg = sendData;
            state.websocket.send(msg);
        },

        // GETDATA(context) {
        //     context.commit("SETV1");
        // },

        //send msg to server, in Vue file, use dispatch to use this function, in server side, check the JSON content and then change the parameter's value
        // 0- turn off, 1- turn on
        SENDV1CONTROL({ state, commit }, value) { 
            if (value == 0) {
                //connect to the server
                // let msg = JSON.stringify({ cmd: "setV1off", param: "0" })
                // state.websocket.send(msg);
                // commit("SETV1");

                //test on the  UI
                commit("SETV1OFF");
            
            } else if (value == 1) {
                // let msg = JSON.stringify({ cmd: "setV1on", param: "1" })
                // state.websocket.send(msg);
                // commit("SETV1");
                commit("SETV1ON");
            }
        },
        SENDV2CONTROL({ state, commit }, value) { 
            if (value == 0) {
                //connect to the server
                // let msg = JSON.stringify({ cmd: "setV1off", param: "0" })
                // state.websocket.send(msg);
                // commit("SETV1");

                //test on the  UI
                commit("SETV2OFF");
            
            } else if (value == 1) {
                // let msg = JSON.stringify({ cmd: "setV1on", param: "1" })
                // state.websocket.send(msg);
                // commit("SETV1");
                commit("SETV2ON");
            }
        },

        SENDV3CONTROL({ state, commit }, value) { 
            if (value == 0) {
                //connect to the server
                // let msg = JSON.stringify({ cmd: "setV1off", param: "0" })
                // state.websocket.send(msg);
                // commit("SETV1");

                //test on the  UI
                commit("SETV3OFF");
            
            } else if (value == 1) {
                // let msg = JSON.stringify({ cmd: "setV1on", param: "1" })
                // state.websocket.send(msg);
                // commit("SETV1");
                commit("SETV3ON");
            }
        },




    }
}

export default websocketstore