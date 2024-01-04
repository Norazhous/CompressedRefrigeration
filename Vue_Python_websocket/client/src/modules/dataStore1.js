
const websocketstore = {
    state:() => ({
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
        
    }),
    getters: {

    },
    mutations: {


        JsonPARSE(state) {
            // try {
            state.jsonValue = JSON.parse(state.receivedData);
            // }
            // catch (error) {
            //     console.log('Error parsing JSON:', error, state.receivedData);
            // }
        },

        SETPS1_Array(state) {
            state.PS1_Array.push(state.PS1_value);
        },

        SETPS2_value(state) {
            state.PS2_value = JSON.parse(state.receivedData).sensors.pressure.PS2.value;
        },

        SETPS3_value(state) {
            state.PS3_value = JSON.parse(state.receivedData).sensors.pressure.PS3.value;
        },

        SETTS1_value(state) {
            state.TS1_value= JSON.parse(state.receivedData).sensors.temperature.TS1.value;
        },

        SETTS2_value(state) {
            state.TS2_value= JSON.parse(state.receivedData).sensors.temperature.TS2.value;
        },

        SETTS3_value(state) {
            state.TS3_value= JSON.parse(state.receivedData).sensors.temperature.TS3.value;
        },

        SETTS4_value(state) {
            state.TS4_value= JSON.parse(state.receivedData).sensors.temperature.TS4.value;
        },

        SETTS5_value(state) {
            state.TS5_value= JSON.parse(state.receivedData).sensors.temperature.TS5.value;
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

    },
    actions: {
        WEBSOCKET_INIT_ACTION({state,commit}, url) {
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
                
                // commit("JsonPARSE");
                // console.log(JSON.parse(state.receivedData).valves.V1)
                // valves_value = JSON.parse(state.receivedData).valves
                // console.log(state.receivedData);
                // console.log(state.receivedData.valves);
                // commit("SETV1");
                // commit('JsonPARSE');
                // if (callBack.data != null) {
                //     commit("SETV1");
                //     // commit("SETTIME");
                // }
                // else {
                //     console.log('callBack data is null')
                // }

            };
            state.websocket.onclose = function () {
                commit("WEBSOCKET_CLOSE")
            }
        },

        WEBSOCKET_CLOSE(context) {
            context.commit('WEBSOCKET_CLOSE');
        },

        WEBSOCKET_REIVE_ACTION({ commit }, sendData) {
            // let msg =JSON.stringify(sendData);
            let msg = sendData;
            this.state.websocket.send(msg);
        },

        GETDATA(context) {
            context.commit("SETV1");
            // context.commit("SETTIME");
        }


    }
}

export default dataStore1