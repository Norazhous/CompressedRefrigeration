<template>
    <div class='container-fluid m-2 background-white border rounded'>
       <div class="col pb-2 d-grid gap-2 d-sm-block">
        <button class="button-sm button-primary m-1" v-if="!getIsRecording" id="recordButton" @click="record()">Record</button>
        <button class="button-sm button-danger m-1" v-if="getIsRecording" id="stopButton" @click="stopRecording()">Stop</button>
        <button class="button-sm button-warning m-1" id="clearButton" @click="clearGraph()">Reset</button>
        <button class="button-sm button-secondary m-1" v-if="hasData" id="outputButton" @click="outputToCSV()">Download CSV</button>
    </div>
    <div class='row m-2 justify-content-center'>
      <div v-if='getIsRecording' class='col-2'>
        <img id='red-light' src='/images/red-light.png' width='20' height='20' :hidden='!showRedLight'>
      </div>
      <div class='col-10'>  
        <p class='m-1'>Recorded: {{getNumData}}/{{max_data_points}} data points</p>
      </div>
    </div>
  
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {

  name: 'DataRecorder',
  data () {
    return {
        data_points_count: 0,
        hasPlotted: false,
        max_data_points: 5000,
        max_reached: false,
    }
  },
  components: {
    
  },
  mounted(){
    // this.set_start_time();
  },
  created(){
		
	},
  computed:{
    ...mapGetters([
      'getIsRecording',
      'getNumData',
      'getTime',
      'getCurrentTime',
      'GetCurrentTS1',
      'GetCurrentTS2',
      'GetCurrentTS3',
      'GetCurrentTS4',
      'GetCurrentTS5',
      'GetCurrentPS1',
      'GetCurrentPS2',
      'GetCurrentPS3',
      'GetCurrentFlow',
      'GetCurrentPower',
      "GETCurrentTime",
      'GETCurrentDate',
      
    ]),
      hasData(){
        return this.getNumData !== 0;
      },
      newTime(){
        return this.$store.getters.GETCurrentTime;
      },
      showRedLight(){
        return this.getNumData % 20 > 10 ? true : false;
      },
  },
  watch:{
      newTime(){
        if(this.getIsRecording && this.getNumData < this.max_data_points){
            this.plot();
        } else if(this.getNumData == this.max_data_points && !this.max_reached){
            this.stopRecording();
            this.max_reached = true;
        }
    },
    
  },
  methods: {
    ...mapActions([
      'setIsRecording',
      'addData',
      'clearAllData',
      'updateColourIndex',
      'logAnalytics'
    ]),
      record(){
          // this.$store.dispatch('setCurrentTime', new Date().getTime());
          this.$store.dispatch('setStartTime', this.GETCurrentTime);
          console.log(this.$store.state.data.current_time);
          
          this.data_points_count = 0;
          this.setIsRecording(true);

          //update the colour index for plotting in a new colour on graph
            this.updateColourIndex();

            this.logAnalytics({log:'record'});
            // this.plot();

          
      },
      stopRecording(){
          this.setIsRecording(false);
      },
      plot(){
          this.updategetCurrentTime();
          this.data_points_count++;
          let time = this.GETCurrentDate;
          let T1 = this.GetCurrentTS1;
          let T2 = this.GetCurrentTS2;
          let T3 = this.GetCurrentTS3;
          let T4 = this.GetCurrentTS4;
          let T5 = this.GetCurrentTS5;
          let P1 = this.GetCurrentPS1;
          let P2 = this.GetCurrentPS2;
          let P3 = this.GetCurrentPS3;
          let Flow = this.GetCurrentFlow;
          let Power = this.GetCurrentPower;
          
          let data_object = {id: this.getNumData, t: time, T1: T1 , T2: T2, T3: T3, T4: T4, T5: T5, P1: P1, P2:P2, P3:P3, Flow:Flow, Power:Power};
          this.addData(data_object);
          this.hasPlotted = true;
          console.log(data_object);
          
      },
      clearGraph(){
          this.clearAllData();
          this.max_reached = false;
          this.hasPlotted = false;
      },
      outputToCSV(){
          let csv = 'Time,T1/C,T2/C,T3/C,T4/C,T5/C,P1/bar,P2/bar,P2/bar,Flowrate/(L/h),Power/W\n';
          let data = this.$store.getters.getData;
          data.forEach(function(d){
            csv += d.t.toString();
                csv += ",";
                csv += d.T1.toString();
                csv += ',';
                csv += d.T2.toString();
                csv += ",";
                csv += d.T3.toString();
                csv += ",";
                csv += d.T4.toString();
                csv += ",";
                csv += d.T5.toString();
                csv += ",";
                csv += d.P1.toString();
                csv += ',';
                csv += d.P2.toString();
                csv += ",";
                csv += d.P3.toString();
                csv += ",";
                csv += d.Flow.toString();
                csv += ",";
                csv += d.Power.toString();
                csv += "\n";
          });
          console.log(csv);
          let hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
          hiddenElement.target = '_blank';
          hiddenElement.download = 'pendulum.csv';
          hiddenElement.click();
      },

      updategetCurrentTime(){
        this.$store.dispatch('setCurrentTime', this.GETCurrentTime);
        // console.log(this.getCurrentTime);
      },
  }
}
</script>

<style scoped>


</style>