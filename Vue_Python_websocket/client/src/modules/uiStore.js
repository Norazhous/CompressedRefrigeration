//Store for variables that are common amongst multiple UI components. 


const uiStore = {
   state: () => ({
      isDataRecorderOn: false,    //is the Data Recorder element active
      isDraggable: true,
      usesLocalStorage: false,        //can only use localStorage if the browser allows it.
      colour_index: 0,
      v1color: '#808080',  //valves color change
      v2color: '#808080',
      v3color: '#808080',
      // highlightedPositions: {},
      // isHighlightVisiable: false,

   }),
   mutations: {
      SET_DATA_RECORDER(state, set) {
         state.isDataRecorderOn = set;
      },
      SET_DRAGGABLE(state, draggable) {
         state.isDraggable = draggable;
      },
      SET_COLOUR_INDEX(state, index) {
         state.colour_index = index
      },
      SET_USES_LOCAL_STORAGE(state, set) {
         state.usesLocalStorage = set;
      },

      // ADD_HIGHLIGHT_POSITION(state, position) {
      //    state.highlightedPositions = position;
      // },
      // CLEAR_HIGHLIGHT_POSITION(state) {
      //    state.highlightedPositions = {};
      // },

      // SHOW_HIGHLIGHT(state) {
      //    state.isHighlightVisiable = true;
      // },

      // HIDE_HIGHLIGHT(state) {
      //    state.isHighlightVisiable = false;
      // },

      SETV1openedcolor(state) {
         state.v1color = "#008000";
      },
      SETV1closecolor(state) {
         state.v1color = "#808080";
      },
      SETV1waitcolor(state) {
         state.v1color = "#ff0000";
      },

      SETV2openedcolor(state) {
         state.v2color = "#008000";
      },
      SETV2closecolor(state) {
         state.v2color = "#808080";
      },
      SETV2waitcolor(state) {
         state.v2color = "#ff0000";
      },

      SETV3openedcolor(state) {
         state.v3color = "#008000";
      },
      SETV3closecolor(state) {
         state.v3color = "#808080";
      },
      SETV3waitcolor(state) {
         state.v3color = "#ff0000";
      },

   },
   actions: {

      // updateHighlight({ state,commit },  { xPercentage, yPercentage }) {
      //    commit("ADD_HIGHLIGHT_POSITION",{xPercentage, yPercentage})
      //    commit("SHOW_HIGHLIGHT");
      //    console.log(state.highlightedPositions);
      // },

      // removeHighlight({ commit }) {
      //    commit("CLEAR_HIGHLIGHT_POSITION")
      //    commit("HIDE_HIGHLIGHT");
      //    console.log("bbbb");
      // },


      setV1color(context, value) {
         if (value == 1) {
            context.commit("SETV1openedcolor");
         } else if (value == 0) {
            context.commit("SETV1closecolor");
         } else if (value == 2) {
            context.commit("SETV1waitcolor");
         } else {
            console.log("V1 controllor error");
         }
      },
      setV2color(context, value) {
         if (value == 1) {
            context.commit("SETV2openedcolor");
         } else if (value == 0) {
            context.commit("SETV2closecolor");
         } else if (value == 2) {
            context.commit("SETV2waitcolor");
         } else {
            console.log("V2 controllor error");
         }
      },
      setV3color(context, value) {
         if (value == 1) {
            context.commit("SETV3openedcolor");
         } else if (value == 0) {
            context.commit("SETV3closecolor");
         } else if (value == 2) {
            context.commit("SETV3waitcolor");
         } else {
            console.log("V3 controllor error");
         }
      },

      setDataRecorder(context, set) {
         context.commit("SET_DATA_RECORDER", set);
      },
      setDraggable(context, draggable) {
         context.commit('SET_DRAGGABLE', draggable);
      },
      updateColourIndex(context) {
         let index = (context.state.colour_index + 1) % 6
         context.commit('SET_COLOUR_INDEX', index);
      },
      setUsesLocalStorage(context, set) {
         context.commit('SET_USES_LOCAL_STORAGE', set);
      },


   },
   getters: {
      getIsDataRecorderOn(state) {
         return state.isDataRecorderOn;
      },
      getDraggable(state) {
         return state.isDraggable;
      },
      getColourIndex(state) {
         return state.colour_index;
      },
      getUsesLocalStorage(state) {
         return state.usesLocalStorage;
      },


   },

}

export default uiStore;
