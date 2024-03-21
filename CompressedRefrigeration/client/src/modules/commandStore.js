
////Store for sending commands through the dataSocket

const commandStore = {
    state: () => ({
        
        dataSocket: null,
        currentMode: '',
        // drive: 50,
        // brake: 50,
        // start: 50,
        // interval: 50,
        V1: 0,//0 is closed, 1 is opened
        V2: 0,
        V3: 0,
        V4: 0,
        V5: 0,
        V6: 0,
        V7: 0,
        W1: false,
        W2: false,
        Comp: false,

       }),
       mutations:{
        SET_DATA_SOCKET(state, socket){
            state.dataSocket = socket;
        },
        SETV1(state,value) {
            state.V1 = value;
        },

        SETV2(state,value) {
            state.V2 = value;
        },

        SETV3(state,value) {
            state.V3 = value;
        },

        SETV4(state,value) {
            state.V4 = value;
        },

        SETV5(state,value) {
            state.V5 = value;
        },

        SETV6(state,value) {
            state.V6 = value;
        },

        SETV7(state,value) {
            state.V7 = value;
        },

        SETW1(state,value) {
            state.W1 = value;
        },

        SETW2(state,value) {
            state.W2 = value;
        },

        SETComp(state,value) {
            state.Comp = value;
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
        },

        SETV4OFF(state) {
            state.V4 = 0;
        },
        SETV4ON(state) {
            state.V4 = 1;
        },

        SETV5OFF(state) {
            state.V5 = 0;
        },
        SETV5ON(state) {
            state.V5 = 1;
        },

        SETV6OFF(state) {
            state.V6 = 0;
        },
        SETV6ON(state) {
            state.V6 = 1;
        },

        SETV7OFF(state) {
            state.V7 = 0;
        },
        SETV7ON(state) {
            state.V7 = 1;
        },


        // START(state){
        //     state.dataSocket.send(JSON.stringify({
		// 		cmd: "start",
		// 		param: state.start
		// 	}));
        // },
        // BRAKE(state){
        //     state.dataSocket.send(JSON.stringify({
		// 		cmd: "stop",
		// 		param: "brake"
		// 	}));
        // },
        // FREE(state){
        //     state.dataSocket.send(JSON.stringify({
		// 		cmd: "stop",
		// 		param: "unloaded"
		// 	}));
        // },
        // LOAD(state){
        //     state.dataSocket.send(JSON.stringify({
		// 		cmd: "stop",
		// 		param: "loaded"
		// 	}));
        // },
        // CALIBRATE(state){
        //     state.dataSocket.send(JSON.stringify({
		// 		cmd: "calibrate"
		// 	}));
        // },
        // UPDATE_START(state, value){
        //     state.start = value;
        // },
        // UPDATE_DRIVE(state, value){
        //     state.drive = value;
        // },
        // SEND_DRIVE(state){
        //     state.dataSocket.send(JSON.stringify({
		// 		cmd: "drive",
		// 		param: state.drive
		// 	}));
        // },
        // UPDATE_BRAKE(state, value){
        //     state.brake = value;
        // },
        // SEND_BRAKE(state){
        //     state.dataSocket.send(JSON.stringify({
		// 		cmd: "brake",
		// 		param: state.brake
		// 	}));
        // },
        // UPDATE_INTERVAL(state, value){
        //     state.interval = value;
        // },
        // SEND_INTERVAL(state){
        //     state.dataSocket.send(JSON.stringify({
		// 		cmd: "interval",
		// 		param: state.interval
		// 	}));
        // },
        // SET_CURRENT_MODE(state, mode){
        //     state.currentMode = mode;
        //  },
            

       },
       actions:{
        setDataSocket(context, socket){
            context.commit("SET_DATA_SOCKET", socket);
        },

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

        
        SENDV4CONTROL({ state, commit }, value) { 
            if (value == 0) {
                //connect to the server
                // let msg = JSON.stringify({ cmd: "setV1off", param: "0" })
                // state.websocket.send(msg);
                // commit("SETV1");

                //test on the  UI
                commit("SETV4OFF");
            
            } else if (value == 1) {
                // let msg = JSON.stringify({ cmd: "setV1on", param: "1" })
                // state.websocket.send(msg);
                // commit("SETV1");
                commit("SETV4ON");
            }
        },

        
        SENDV5CONTROL({ state, commit }, value) { 
            if (value == 0) {
                //connect to the server
                // let msg = JSON.stringify({ cmd: "setV1off", param: "0" })
                // state.websocket.send(msg);
                // commit("SETV1");

                //test on the  UI
                commit("SETV5OFF");
            
            } else if (value == 1) {
                // let msg = JSON.stringify({ cmd: "setV1on", param: "1" })
                // state.websocket.send(msg);
                // commit("SETV1");
                commit("SETV5ON");
            }
        },

        
        SENDV6CONTROL({ state, commit }, value) { 
            if (value == 0) {
                //connect to the server
                // let msg = JSON.stringify({ cmd: "setV1off", param: "0" })
                // state.websocket.send(msg);
                // commit("SETV1");

                //test on the  UI
                commit("SETV6OFF");
            
            } else if (value == 1) {
                // let msg = JSON.stringify({ cmd: "setV1on", param: "1" })
                // state.websocket.send(msg);
                // commit("SETV1");
                commit("SETV6ON");
            }
        },

        
        SENDV7CONTROL({ state, commit }, value) { 
            if (value == 0) {
                //connect to the server
                // let msg = JSON.stringify({ cmd: "setV1off", param: "0" })
                // state.websocket.send(msg);
                // commit("SETV1");

                //test on the  UI
                commit("SETV7OFF");
            
            } else if (value == 1) {
                // let msg = JSON.stringify({ cmd: "setV1on", param: "1" })
                // state.websocket.send(msg);
                // commit("SETV1");
                commit("SETV7ON");
            }
        },

        // in the logging store, it is use for data analystic
        // start(context, value){
        //     context.commit('START', value)
        //     //context.dispatch('logParameters', {log:'speed', data: {set: value, kp: context.rootState.data.p, ki: context.rootState.data.i, kd: context.rootState.data.d}});
        //     context.dispatch('logAnalytics', {log: "start", data: {set: value}})
        // },
        // brake(context){
        //     context.commit('BRAKE');
        //     context.dispatch('logAnalytics', {log: "brake"})
        // },
        // free(context){
        //     context.commit('FREE');
        //     context.dispatch('logAnalytics', {log: "free"})
        // },
        // load(context){
        //     context.commit('LOAD');
        //     context.dispatch('logAnalytics', {log: "load"})
        // },
        // calibrate(context){
        //     context.commit('CALIBRATE');
        // },
        // updateStart(context, value){
        //     context.commit('UPDATE_START', value);
        // },
        // updateDrive(context, value){
        //     context.commit('UPDATE_DRIVE', value);
        // },
        // sendDrive(context, toLog = true){
        //     context.commit('SEND_DRIVE');
        //     if(toLog){
        //         context.dispatch('logAnalytics', {log: "drive_perc", data: {set: context.state.drive}})
        //     }
            
        // },
        // updateBrake(context, value){
        //     context.commit('UPDATE_BRAKE', value);
        // },
        // sendBrake(context, toLog = true){
        //     context.commit('SEND_BRAKE');
        //     if(toLog){
        //         context.dispatch('logAnalytics', {log: "brake_perc", data: {set: context.state.brake}})
        //     }
            
        // },
        // updateInterval(context, value){
        //     context.commit('UPDATE_INTERVAL', value)
        // },
        // sendInterval(context, toLog = true){
        //     context.commit('SEND_INTERVAL');
        //     if(toLog){
        //         context.dispatch('logAnalytics', {log: "sampling", data: {set: context.state.interval}})
        //     }
            
        // },
        // setCurrentMode(context, mode){
        //     context.commit("SET_CURRENT_MODE", mode);
        // },


       },
       getters:{
        getDataSocket(state){
            return state.dataSocket;
        },
        // getCurrentMode(state){
        //     return state.currentMode;
        // },
        // getDrive(state){
        //     return state.drive;
        // },
        // getBrake(state){
        //     return state.brake;
        // },
        // getStart(state){
        //     return state.start;
        // },
        // getInterval(state){
        //     return state.interval;
        // },
          
       },  
  
  }

  export default commandStore;