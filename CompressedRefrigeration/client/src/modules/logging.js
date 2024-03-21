

const loggingStore = {
    state: () => ({
        logSocket: null,
        uuid: '',                      //set from App.vue
        isLoggingOn: false,                  //manually set for different UI versions
        logging_consent_given: false,        //SET to false in production
        hardware: '',                       //will be set from the LoggingStream.vue component
        exp: 'refrigeration',                     //Hardcoded for this UI
        course: '',                    //set in Streams.vue from query param
        saved: [],

       }),
       mutations:{
            SET_LOG_SOCKET(state, socket){
                state.logSocket = socket;
            },
            SET_LOGGING_CONSENT(state, consent){
                state.logging_consent_given = consent;
            },
            SET_UUID(state, uuid){
                state.uuid = uuid;
            },
            SET_EXPERIMENT(state, exp){
                state.exp = exp;
            },
            SET_HARDWARE(state, hardware){
                state.hardware = hardware;
            },
            SET_COURSE(state, course){
                state.course = course;
            },
            SET_SAVED(state, data){
                state.saved = data;
            },
            LOG(state, payload){
                //only log to server if user has given consent.
                //Still may require logging internally for achievements etc.
                if(state.logging_consent_given && state.logSocket != null){
                    state.logSocket.send(JSON.stringify({
                        user: state.uuid,
                        t: Date.now(),          
                        exp: state.exp,
                        hardware: state.hardware, 
                        course: state.course,
                        type: "log",       
                        payload: payload
                    }));
                }
            },  
            LOG_ANALYTICS(state, payload){
                //only log to server if user has given consent.
                //Still may require logging internally for achievements etc.
                if(state.logging_consent_given && state.logSocket != null){
                    state.logSocket.send(JSON.stringify({
                        user: state.uuid,
                        t: Date.now(),          
                        exp: state.exp,
                        hardware: state.hardware, 
                        course: state.course,
                        type: "analytics",       
                        payload: payload
                    }));
                }
            },  

       },
       actions:{
            setLogSocket(context, socket){
                context.commit('SET_LOG_SOCKET', socket);
            },
            setLoggingConsent(context, consent){
                context.commit('SET_LOGGING_CONSENT', consent);
            },
            setUUID(context, uuid){
                context.commit('SET_UUID', uuid);
            },
            setExperiment(context, exp){
                context.commit('SET_EXPERIMENT', exp);
            },
            setHardware(context, hardware){
                context.commit('SET_HARDWARE', hardware);
            },
            setCourse(context, course){
                context.commit('SET_COURSE', course);
            },
            setSaved(context, data){
                context.commit('SET_SAVED', data);
            },
            logClick(context, payload){
                context.commit('LOG', payload);
            },
            logStart(context, payload){
                context.commit('LOG', payload);
            },
            logEnd(context, payload){
                context.commit('LOG', payload);
            },
            async logComponent(context, payload){
                await helpers.delay(100);
                context.commit('LOG', payload);
            },
            async logAnalytics(context, payload){
                await helpers.delay(100);
                context.commit('LOG_ANALYTICS', payload);
            },

       },
       getters:{
           getLogSocket(state){
                return state.logSocket;
           },
           getLogConsent(state){
            return state.logging_consent_given;
            },
            getLogUUID(state){
                return state.uuid;
            },
            getExperiment(state){
                return state.exp
            },
            getHardware(state){
                return state.hardware
            },
            getCourse(state){
                return state.course
            },
            getSaved(state){
                return state.saved;
            },
            getIsLoggingOn(state){
                return state.isLoggingOn;
            }
          
       },  
  
  }

  let helpers = {
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
  }

  export default loggingStore;
