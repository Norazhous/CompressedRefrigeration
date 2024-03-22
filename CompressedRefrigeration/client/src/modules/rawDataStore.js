
const rawDataStore = {
    state: () => ({
        //define js variables  
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
        TSA_value: 0,
        PSA_value: 0,
        HSA_value:0,

        //time 
        Start_time: 0,
        Current_time: 0,
        Current_date: 0,
        current_time: 0,   //ms
        start_time: 0,
        data: [],
        snapdata:[],
        isRecording: false,
        // PS1_Array: [],
        // PS2_Array: [],
        // PS3_Array: [],
        // TS1_Array: [],
        // TS2_Array: [],
        // TS3_Array: [],
        // TS4_Array: [],
        // TS5_Array: [],
        // Flow_Array: [],
        // Power_Array: [],
        // TSA_Array: [],
        // PSA_Array: [],

        // url: '', //'ws://127.0.0.1:8181/test'
        // websocket: null,
        // receivedData: null,
        // jsonValue: null,


    }),
    getters: {
        // GETwebsocket(state) {
        //     return state.websocket
        // },
        // GETreceivedData(state) {
        //     return state.receivedData
        // },
        

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

        GetCurrentTSA(state){
            return state.TSA_value
        },

        GetCurrentPSA(state){
            return state.PSA_value
        },

        GetCurrentHSA(state){
            return state.HSA_value
        },

        GETCurrentTime(state) {
            return state.Current_time
        },

        GETCurrentDate(state) {
            return state.Current_date
        },

        getData(state){
            return state.data;
         },

         getCurrentTime(state){
           return state.current_time;
         },

         getTime(state){
            return state.current_time - state.start_time;    //in seconds  
         },
         getMaxTime(state){
            let time_max = -Infinity;
            state.data.forEach(d => {
               if(d.t > time_max){
                  time_max = d.t;
               }
            });
   
            return time_max;
         },
         getMinTime(state){
            let time_min = Infinity;
            state.data.forEach(d => {
               if(d.t < time_min){
                  time_min = d.t;
               }
            });
   
            return time_min;
         },
         getIsRecording(state){
            return state.isRecording;
         },
         getNumData(state){
            return state.data.length;
        },


    },
    mutations: {
        //set websocket
        // WEBSOCKET_INIT(state) {
        //     state.websocket = new WebSocket(state.url)
        // },


        // WEBSOCKET_REIVE(state, data) {
        //     state.receivedData = data;
        // },

        // WEBSOCKET_CLOSE(state) {
        //     // state.receivedData = null; // clear the data send
        //     state.websocket.close();
        // },

        // JsonPARSE(state) {
        // try {
        // state.jsonValue = JSON.parse(state.receivedData);
        // }
        // catch (error) {
        //     console.log('Error parsing JSON:', error, state.receivedData);
        // }
        // },

        // set js variables value according to the value from server, current values
  

        
        SETPS1_value(state,value) {
            state.PS1_value = value;
        },

        SETPS2_value(state,value) {
            state.PS2_value = value;
        },

        SETPS3_value(state,value) {
            state.PS3_value = value;
        },

        SETTS1_value(state,value) {
            state.TS1_value = value;
        },

        SETTS2_value(state,value) {
            state.TS2_value = value;
        },

        SETTS3_value(state,value) {
            state.TS3_value = value;
        },

        SETTS4_value(state,value) {
            state.TS4_value = value;
        },

        SETTS5_value(state,value) {
            state.TS5_value = value;
        },

        SETFlow_value(state,value) {
            state.Flow_value = value;
        },

        SETPower_value(state,value) {
            state.Power_value = value;
        },

        SETTSA_value(state,value) {
            state.TSA_value = value;
        },

        SETPSA_value(state,value) {
            state.PSA_value = value;
        },

        SETHSA_value(state,value) {
            state.HSA_value = value;
        },

        //record all value from server in a array, and this will use for the realtime chart display
        // SETPS1_Array(state) {
        //     state.PS1_Array.push(state.PS1_value);
        // },

        // SETPS2_Array(state) {
        //     state.PS2_Array.push(state.PS2_value);
        // },

        // SETPS3_Array(state) {
        //     state.PS3_Array.push(state.PS3_value);
        // },

        // SETTS1_Array(state) {
        //     state.TS1_Array.push(state.TS1_value);
        // },

        // SETTS2_Array(state) {
        //     state.TS2_Array.push(state.TS2_value);
        // },

        // SETTS3_Array(state) {
        //     state.TS3_Array.push(state.TS3_value);
        // },

        // SETTS4_Array(state) {
        //     state.TS4_Array.push(state.TS4_value);
        // },

        // SETTS5_Array(state) {
        //     state.TS5_Array.push(state.TS5_value);
        // },

        // SETFlow_Array(state) {
        //     state.Flow_Array.push(state.Flow_value);
        // },

        // SETPower_Array(state) {
        //     state.Power_Array.push(state.Power_value);
        // },

        // SETATS_Array(state) {
        //     state.ATS_Array.push(state.ATS_value);
        // },

        // SETAPS_Array(state) {
        //     state.APS_Array.push(state.APS_value);
        // },

        // SETV1OFF(state) {
        //     state.V1 = 0;
        // },
        // SETV1ON(state) {
        //     state.V1 = 1;
        // },
        // SETV2OFF(state) {
        //     state.V2 = 0;
        // },
        // SETV2ON(state) {
        //     state.V2 = 1;
        // },
        // SETV3OFF(state) {
        //     state.V3 = 0;
        // },
        // SETV3ON(state) {
        //     state.V3 = 1;
        // }
        SET_CURRENT_TIME(state, value){
            state.current_time = value;
         },
         
        SET_START_TIME(state, value){
            state.start_time = value;
         },
         SET_IS_RECORDING(state, set){
            state.isRecording = set;
         },
         CLEAR_ALL_DATA(state){
            state.data = [];
         },
         ADD_DATA(state, object){
            state.data.push(object);
         },
         ADD_SNAP_DATA(state, object){
            state.snapdata.push(object);
         },
         DELETE_DATA(state, id){
            state.data.splice(id, 1);
         },
         DELETE_SNAP_DATA(state, id){
            state.snapdata.splice(id, 1);
         }

    },
    actions: {

        setCurrentTime(context, value){
            context.commit('SET_CURRENT_TIME', value);
         },
         setStartTime(context, value){
            context.commit('SET_START_TIME', value);
         },
         setIsRecording(context, value){
            context.commit('SET_IS_RECORDING', value);
         },
         clearAllData(context){
            context.commit('CLEAR_ALL_DATA');
         },
         addData(context,object){
            context.commit('ADD_DATA', object);
         },
         addSnapData(context,object){
            context.commit('ADD_SNAP_DATA', object);
         },
         deleteData (context, dataId) {
            context.commit('DELETE_DATA', dataId);
         },
         deleteSnapData(context,object){
            context.commit('DELETE_SNAP_DATA', object);
         },

    }
}

export default rawDataStore