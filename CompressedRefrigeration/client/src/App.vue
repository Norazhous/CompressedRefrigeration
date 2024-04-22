<template>

  <div id="app" class='container-fluid-sm m-0 background-grey'>

    <!-- <div class="row">
          <div class="col-lg-6" style="background-color: aqua; height: 10px; width: auto;"></div>
          <div class="col-lg-6" style="background-color: aqua; height: 10px; width: auto;"></div>
        </div> -->
    <navigation-bar @toggleconsent="showConsentModal = true" @togglesnapshot="toggleSnapshot" @togglegraph="toggleGraph"
      @togglestopwatch="toggleStopwatch" @toggletable="toggleTable" />

    <!-- <consent v-if='showConsentModal && getIsLoggingOn' @consentset="closeConsentModal"/> -->


    <streams id='streams' />


    <div class='row' id='component-grid'>

      <div class='col-lg-6' id='left-screen'>
        <div class='col drop-area' id='drop_0_0' :draggable='getDraggable' @dragstart="dragComponent"
          @drop='dropComponent' @dragover.prevent @dragenter.prevent>
          <RigElement id='RigElement' />
        </div>
        <div class='col drop-area' id='drop_1_0' :draggable='getDraggable' @dragstart="dragComponent"
          @drop='dropComponent' @dragover.prevent @dragenter.prevent>
          <WebcamStream id='webcam-stream' />
        </div>
        <div class='col drop-area' id='drop_2_0' :draggable='getDraggable' @dragstart="dragComponent"
          @drop='dropComponent' @dragover.prevent @dragenter.prevent>
          <RealtimeChart id='RealtimeChart' />
        </div>
        <div class='col drop-area' id='drop_3_0' :draggable='getDraggable' @dragstart="dragComponent"
          @drop='dropComponent' @dragover.prevent @dragenter.prevent><data-recorder id='data-recorder' /></div>
        <!-- <div class='col drop-area' id='drop_2_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><table-output v-if='isTableOn' id='table' :selected_point="selected_graph_point"/></div> -->
        <div class='col drop-area' id='drop_4_0' :draggable='getDraggable' @dragstart="dragComponent"
          @drop='dropComponent' @dragover.prevent @dragenter.prevent><table-output id='table'
            :selected_point="selected_graph_point" /></div>
        <div class='col drop-area' id='drop_5_0' :draggable='getDraggable' @dragstart="dragComponent"
          @drop='dropComponent' @dragover.prevent @dragenter.prevent>
          <R134aChart id="R134aChart" />
        </div>
      </div>

      <div class='col-lg-6' id='right-screen'>
        <div class='col drop-area' id='drop_0_1' :draggable='getDraggable' @dragstart="dragComponent"
          @drop='dropComponent' @dragover.prevent @dragenter.prevent><data-stream id='data-stream' /></div>
        <div class='col drop-area' id='drop_1_1' :draggable='getDraggable' @dragstart="dragComponent"
          @drop='dropComponent' @dragover.prevent @dragenter.prevent>
          <InteractiveChart id="InteractiveChart" />
        </div>
        <div class='col drop-area' id='drop_2_1' :draggable='getDraggable' @dragstart="dragComponent"
          @drop='dropComponent' @dragover.prevent @dragenter.prevent>
          <snapshot v-if='isSnapshotOn' id='snapshot' />
        </div>
        <!-- <div class='col drop-area' id='drop_2_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><snapshot v-if='isSnapshotOn' id='snapshot' :headings="['Time/s', 'Angle/rad', 'Ang. Vel./rad/s']"/></div> -->
        <!-- <div class='col drop-area' id='drop_3_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><graph-output v-if='isGraphOn' id='graph' type="graph" @newselectedobject="selectedGraphPoint"/></div> -->
        <!-- <div class='col drop-area' id='drop_3_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter.prevent><auto-command v-if='isAutoCommandOn' id='auto-command' /></div> -->
        <div class='col drop-area' id='drop_3_1' :draggable='getDraggable' @dragstart="dragComponent"
          @drop='dropComponent' @dragover.prevent @dragenter.prevent>
          <stopwatch v-if='isStopwatchOn' id='stopwatch' />
        </div>
      </div>
    </div>

  </div>

</template>

<script>


import TableOutput from "./components/TableOutput.vue";
import Stopwatch from "./components/Stopwatch.vue";
import WebcamStream from "./components/WebcamStream.vue";
import DataStream from "./components/DataStream.vue";
import DataRecorder from "./components/DataRecorder.vue";
import NavigationBar from "./components/NavigationBar.vue";
import Streams from "./components/Streams.vue";
import Snapshot from "./components/Snapshot.vue"
import Consent from "./components/Consent.vue"
import RealtimeChart from "./components/RealtimeChart.vue";
import R134aChart from "./components/R134aChart.vue";
import InteractiveChart from "./components/interactiveChart.vue";
import RigElement from "./components/RigElement.vue";



import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'App',
  components: {
    R134aChart,
    RealtimeChart,
    Streams,
    WebcamStream,
    DataStream,
    TableOutput,
    Stopwatch,
    DataRecorder,
    NavigationBar,
    Snapshot,
    Consent,
    InteractiveChart,
    RigElement,

  },
  data() {
    return {
      isTableOn: false,
      isGraphOn: false,
      isStopwatchOn: false,
      isSnapshotOn: true,
      selected_graph_point: null,
      protractorAdded: false,
      rulerAdded: false,

      showConsentModal: true
    }
  },
  created() {
    this.$store.dispatch('setUsesLocalStorage', this.hasStorage());
    //check if user has a UUID generated already and whether they have consented to take part in the study
    console.log('created');
  },
  computed: {
    ...mapGetters([
      'getDraggable',
      'getUsesLocalStorage',
      'getCourse',
      'getExperiment',
      'getIsLoggingOn'
    ])
  },
  watch: {
    getCourse() {
      this.updateUUID();
      this.checkConsent();
    }
  },
  methods: {

    dragComponent(event) {
      event.dataTransfer.effectAllowed = 'move';
      console.log("Dragged id: " + event.target.id);
      let element = event.target;
      if (element.classList.contains('drop-area')) {
        console.log(element.id);
        event.dataTransfer.setData("text/html", element.id + "|" + element.childNodes[0].id);
        console.log(element.childNodes[0]);
      } else {
        while (element.parentNode) {
          element = element.parentNode;
          console.log(element.id);
          if (element.classList.contains('drop-area')) {
            event.dataTransfer.setData("text/html", element.id + "|" + element.childNodes[0].id);
            console.log(element.childNodes[0]);
            break;
          }
        }
      }
    },
    dropComponent(event) {
      event.preventDefault();
      event.stopPropagation();
      let dropData = event.dataTransfer.getData('text/html');
      let dropItems = dropData.split("|");
      let draggedZone = document.getElementById(dropItems[0]);
      let droppedElement = document.getElementById(event.target.id);
      let draggedID = dropItems[1];

      if (droppedElement != null && droppedElement.classList.contains('drop-area')) {
        if (event.target.childNodes.length > 0) {
          draggedZone.appendChild(event.target.childNodes[0]);
        }
        console.log(draggedID);
        droppedElement.appendChild(document.getElementById(draggedID));
      }
      else if (droppedElement) {
        let element = droppedElement;
        while (element.parentNode) {
          element = element.parentNode;
          if (element.classList.contains('drop-area')) {
            console.log(element.childNodes[0]);
            draggedZone.appendChild(element.childNodes[0]);
            element.appendChild(document.getElementById(draggedID));

            break;
          }
        }
      }
      return false;
    },
    selectedGraphPoint(point) {
      this.selected_graph_point = point;
    },
    toggleGraph() {
      this.isGraphOn = !this.isGraphOn;
    },
    toggleTable() {
      this.isTableOn = !this.isTableOn;
      this.$store.dispatch('logComponent', { log: 'component', name: 'table', open: this.isTableOn });
    },
    toggleStopwatch() {
      this.isStopwatchOn = !this.isStopwatchOn;
      this.$store.dispatch('logComponent', { log: 'component', name: 'stopwatch', open: this.isStopwatchOn });
    },
    // toggleAutoCommands(){
    //   this.isAutoCommandOn = !this.isAutoCommandOn;
    //   this.$store.dispatch('logComponent', {log:'component', name: 'autocommands', open: this.isAutoCommandOn});
    // },
    toggleSnapshot() {
      this.isSnapshotOn = !this.isSnapshotOn;
      this.$store.dispatch('logComponent', { log: 'component', name: 'snapshot', open: this.isSnapshotOn });
    },
    // loading and saving data for logging consent and uuid etc.
    hasStorage() {
      try {
        window.localStorage.setItem('test', 'storage');
        window.localStorage.removeItem('test');
        return true;
      } catch (exception) {
        return false;
      }
    },
    updateUUID() {
      let stored_uuid;
      let course = this.getCourse;
      let exp = this.getExperiment;
      const item = `uuid-${exp}-${course}`

      if (this.getUsesLocalStorage) {
        stored_uuid = window.localStorage.getItem(item);
      } else {
        stored_uuid = null;
      }

      if (stored_uuid) {
        this.$store.dispatch('setUUID', stored_uuid);
      } else {
        let uuid = uuidv4();
        this.$store.dispatch('setUUID', uuid);
        if (this.getUsesLocalStorage) {
          window.localStorage.setItem(item, uuid);
        }

      }
    },
    checkConsent() {
      let logging_consent;
      if (this.getIsLoggingOn) {
        if (this.getUsesLocalStorage) {
          let course = this.getCourse;
          let exp = this.getExperiment;
          const item = `consent-${exp}-${course}`
          logging_consent = window.localStorage.getItem(item);
        } else {
          logging_consent = null;
        }

        if (logging_consent == null) {
          this.showConsentModal = true;

        } else {
          this.showConsentModal = false;
          this.$store.dispatch('setLoggingConsent', (logging_consent === 'true'));
        }
      } else {
        // set consent internally
        this.$store.dispatch('setLoggingConsent', false);
        // and set in local storage
        if (this.getUsesLocalStorage) {
          let course = this.getCourse
          let exp = this.getExperiment
          const item = `consent-${exp}-${course}`
          window.localStorage.setItem(item, false);
        }
      }


    },
    closeConsentModal() {
      this.showConsentModal = false;
    },
  }
}



</script>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  /* #app {
    display: grid;
    grid-template-columns: auto;
    padding: 0 2rem;
  } */


  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}
</style>
