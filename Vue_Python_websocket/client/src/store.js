
import { createStore } from 'vuex'


// Create a new store instance.
const store = createStore({
  state() {
    return {
      count: 0,
      currenttime: null,
      ca: 0.02,
      cb: 0.01,
      va: 0.01,
      vb: 0.01,
      k1: 0,
      k2: 0,
      k3: 0,
      ph: 0,
      url: 'ws://127.0.0.1:8181/test',
      websocket: null,
      receivedData: null

    }
  },
  getters: {
    GETwebsocket(state) {
      return state.websocket
    },
    GETreceivedData(state) {
      return state.receivedData
    },
    GETCA(state) {
      return state.ca

    },
    GETTIME(state) {
      return state.currenttime
    }
  },
  mutations: {

    // WEBSOCKET_INIT(state,url){
    //     state.websocket = new WebSocket(url)
    // },
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

    JsonPARSE(state) {
      try {
        JSON.parse(state.receivedData);
      }
      catch (error) {
        console.log('Error parsing JSON:', error, state.receivedData);
      }
    },

    SETCA(state) {
      state.ca = JSON.parse(this.state.receivedData).concentration.ca.value;
      // console.log(JSON.parse(this.state.receivedData).concentration.ca.value);
    },

    SETTIME(state) {
      state.currenttime = JSON.parse(this.state.receivedData).time.currentTime;
      // console.log(JSON.parse(this.state.receivedData).time.currentTime)
    },




    increment(state) {
      state.count++
    }

  },
  actions: {
    WEBSOCKET_INIT_ACTION({ commit }, url) {
      commit('WEBSOCKET_INIT', url);
      this.state.websocket.onopen = function () {
        console.log("connection success");
        alert("connection success!please input account number and password.");
      };
      this.state.websocket.onerror = function () {
        console.log("ws error");

      };
      this.state.websocket.onmessage = function (callBack) {
        commit("WEBSOCKET_REIVE", callBack.data);
        commit('JsonPARSE')
        if(callBack.data != null){
        commit("SETCA");
        commit("SETTIME");
        }
        else{
          console.log('callBack data is null')
        }

      };
      this.state.websocket.onclose = function () {
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
      context.commit("SETCA");
      context.commit("SETTIME");
    }


  }
})

export default store


