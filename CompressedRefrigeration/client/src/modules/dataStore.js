//import Vue from 'vue';

const dataStore = {
   state: () => ({
     current_angle: 0,  //rad
     current_time: 0,   //ms
     current_ang_vel: 0,    //rad/s
     start_time: 0,
     isCaliperSet: false,
     data: [],
     snapdata:[],
     isRecording: false,
   }),
   mutations:{
      // SET_CURRENT_ANGLE(state, value){
      //    state.current_angle = value;
      // },
      SET_CURRENT_TIME(state, value){
         state.current_time = value;
      },
   //    SET_CURRENT_ANG_VEL(state, value){
   //      state.current_ang_vel = value;
   //   },
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
   actions:{
      // setCurrentAngle(context, value){
      //    context.commit('SET_CURRENT_ANGLE', value);
      // },
      setCurrentTime(context, value){
         context.commit('SET_CURRENT_TIME', value);
      },
   //    setCurrentAngVel(context, values){
   //      let theta_delta = values.theta_1 - values.theta_0;
   //      let time_delta = (values.t_1 - values.t_0)/1000.0;  //convert to seconds
   //      let ang_vel = theta_delta / time_delta;
   //      if(!isNaN(ang_vel)){
   //          context.commit('SET_CURRENT_ANG_VEL', ang_vel); //set angular vel in rad/s
   //      }
        
   //   },
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
   },
   getters:{
      getData(state){
         return state.data;
      },
      // getCurrentAngle(state){
      //    return state.current_angle;
      // },
      getCurrentTime(state){
        return state.current_time;
      },
      // getCurrentAngularVelocity(state){
      //   return state.current_ang_vel;
      // },
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
    //  getAngularVelocity(state){
    //      let current_index = state.data.length - 1;
    //      let current_data = state.data[current_index];
    //      let previous_data = state.data[current_index - 1];
    //      if(current_data && previous_data){
    //         let theta_delta = current_data.theta - previous_data.theta;
    //         let time_delta = current_data.t - previous_data.t;
    //         let ang_vel = theta_delta / time_delta;
    //         return ang_vel;
    //      } 
    //      else{
            
    //         return NaN;
    //      }
    //   },
   },
      
}

export default dataStore
    
//data object structure
// {
//     id: 1,
//      t: 0,
//       theta: 0,
//       omega: 0,
//   },