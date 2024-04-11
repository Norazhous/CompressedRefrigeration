<template>
    <div class="container-fluid m-2 background-white border rounded table" id='snapshot-div'>
        <!-- <div>
            <InteractiveChart/>
        </div> -->
        <div class="row " id='table'>

            <table>
                <thead class='table-head'>
                    <tr class='background-primary text-white'>
                        <!-- <th v-for='heading in headings' :key="heading" scope="col">{{ heading }}</th> -->
                        <!-- <th scope="col">ID</th> -->
                        <th scope="col">Time(s)</th>
                        <th scope="col">T1(°C)</th>
                        <th scope="col">T2(°C)</th>
                        <th scope="col">T3(°C)</th>
                        <th scope="col">T4(°C)</th>
                        <th scope="col">T5(°C)</th>
                        <th scope="col">P1(bar)</th>
                        <th scope="col">P2(bar)</th>
                        <th scope="col">P3(bar)</th>
                        <th scope="col">F(L/h)</th>
                        <th scope="col">E(W)</th>
                        <th scope="col">TSA(°C)</th>
                        <th scope="col">PSA(hPa)</th>
                        <th scope="col">HSA(%rh)</th>
                    </tr>
                </thead>

                <tr v-for="row in getSnapData" :id="row.i" :key="row.i">
                    <!-- <td v-for='key in Object.keys(row)' :key="key">{{ row[key] }}</td> -->
                    <td>{{ row.t }}</td>
                    <td>{{ row.T1 }}</td>
                    <td>{{ row.T2 }}</td>
                    <td>{{ row.T3 }}</td>
                    <td>{{ row.T4 }}</td>
                    <td>{{ row.T5 }}</td>
                    <td>{{ row.P1 }}</td>
                    <td>{{ row.P2 }}</td>
                    <td>{{ row.P3 }}</td>
                    <td>{{ row.Flow }}</td>
                    <td>{{ row.Power }}</td>
                    <td>{{ row.TSA }}</td>
                    <td>{{ row.PSA }}</td>
                    <td>{{ row.HSA }}</td>
                </tr>

                <tr class='current' id='current-row'>
                    <td>{{ currentTime }}</td>
                    <td>{{ GetCurrentTS1 }}</td>
                    <td>{{ GetCurrentTS2 }}</td>
                    <td>{{ GetCurrentTS3 }}</td>
                    <td>{{ GetCurrentTS4 }}</td>
                    <td>{{ GetCurrentTS5 }}</td>
                    <td>{{ GetCurrentPS1 }}</td>
                    <td>{{ GetCurrentPS2 }}</td>
                    <td>{{ GetCurrentPS3 }}</td>
                    <td>{{ GetCurrentFlow }}</td>
                    <td>{{ GetCurrentPower }}</td>
                    <td>{{ GetCurrentTSA }}</td>
                    <td>{{ GetCurrentPSA }}</td>
                    <td>{{ GetCurrentHSA }}</td>

                </tr>

                <div id='table-bottom'>
                    <div class='white-divider'>
                    </div>
                </div>
            </table>
        </div>

        <div class='d-grid gap-2 d-sm-block'>
            <button id="snapshot" type='button' class="button-sm button-primary"
                @click="snapshot(); scrollTo('table-bottom');">Record Snapshot</button>
            <button id="reset_snaps" type='button' class="button-sm button-danger"
                @click="toggleResetModal">Reset</button>
            <button id="download_snaps" type='button' class="button-sm button-secondary" @click="outputToCSV">Download
                Snapshots</button>
            <!-- <button @click="setLocalStorage">localstoragetest</button> -->
            <!-- <button @click="getLocalStorage">getLocalStorage</button> -->
            <!-- <button @click="test()">test</button> -->
        </div>

        <toolbar parentCanvasID="snapshot-div" parentComponentName="snapshot" parentDivID="snapshot-div"
            :showDownload='false' :showPopupHelp="true" :showOptions="false">
            <template v-slot:popup id='snapshot-popup'>
                <div class='row mb-2'>
                    <div class='col'>
                        <h3> Snapshot tool </h3>
                        <p> Click 'Record Snapshot' to save the current state to the snapshot table. Every time you
                            click a
                            new data set will be added. Click 'Download Snapshots'
                            to download all the snapshots as a .csv file.
                        </p>
                    </div>
                </div>


            </template>
        </toolbar>

        <div v-if='showResetConfirmModal' class="modal modal-show" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Reset Data</h5>
                        <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click='toggleResetModal'>

                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to Reset? This will clear all stored data.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="button-sm button-danger"
                            @click="resetSnaps(); toggleResetModal();">Reset</button>
                        <button type="button" class="button-sm button-primary" data-dismiss="modal"
                            data-bs-dismiss="modal" @click="toggleResetModal">Cancel</button>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>

import { mapGetters, mapActions, Store } from 'vuex'
import Toolbar from './elements/Toolbar.vue';
// import InteractiveChart from "./interactiveChart.vue"

export default {

    name: 'Snapshot',
    props: ['headings'],
    data() {
        return {
            // snaps: [],
            showResetConfirmModal: false,
            buttonValue: 0,
            currentTime: 0,


        }
    },
    components: {
        Toolbar,
        // InteractiveChart,
    },
    // created() {
    //     //beforeunload event and save data to local storage
    //     window.addEventListener("beforeunload", this.confirm_leaving);
    // },
    mounted() {
        this.currentTimeTable();
    },
    computed: {
        ...mapGetters([
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
            'GetCurrentTSA',
            'GetCurrentPSA',
            'GetCurrentHSA',
            'GETCurrentDate',
            'getValuePost',
            'getSnapData',
            'getStartTime',
            'GETCurrentTime'
        ]),

    },
    methods: {
        ...mapActions([
            'addSnapData',
            'setValuePost',
            'deleteSnapData',
            'setCurrentTime',
        ]),
        snapshot() {
             this.setCurrentTime((Date.now() - this.getStartTime) / 1000);
            // this.snaps = this.getSnapData;
            this.buttonValue++;
            let snap_object = {
                date: this.GETCurrentDate, t: this.GETCurrentTime, T1: this.GetCurrentTS1, T2: this.GetCurrentTS2,
                T3: this.GetCurrentTS3, T4: this.GetCurrentTS4, T5: this.GetCurrentTS5,
                P1: this.GetCurrentPS1, P2: this.GetCurrentPS2, P3: this.GetCurrentPS3,
                Flow: this.GetCurrentFlow, Power: this.GetCurrentPower, TSA: this.GetCurrentTSA,
                PSA: this.GetCurrentPSA, HSA: this.GetCurrentHSA
            };
            console.log(snap_object);
            //gets added to the data for plotting
            this.addSnapData(snap_object);
            console.log(this.getSnapData);
            //gets added to the snaps list
            // this.snaps.push(snap_object);

            //button click value post
            this.setValuePost(this.buttonValue);
            console.log(this.getValuePost);
            console.log(this.buttonValue);

        },

        // test(){
        //     // this.deleteSnapData();
        //     // console.log(this.getSnapData);
        //     // console.log({"t":0,"T1":0.2,"T2":0.3,"T3":0.4,"T4":0.5,"T5":0.6,"P1":0,"P2":1,"P3":1.1,"Flow":0.7,"Power":0.8,"TSA":0,"PSA":0,"HSA":0});
        //     // this.addSnapData({"t":0,"T1":0.2,"T2":0.3,"T3":0.4,"T4":0.5,"T5":0.6,"P1":0,"P2":1,"P3":1.1,"Flow":0.7,"Power":0.8,"TSA":0,"PSA":0,"HSA":0})
        //     // console.log(this.getStartTime);
        // },

        // plotDataInChart() {
        //     console.log(InteractiveChart.startTime)
        //     // InteractiveChart.methods.updatDataset();
        //     InteractiveChart.methods.updateChartData();
        //     // this.$root.$emit('chartPlotEvent');
        // },

        resetSnaps() {
            this.deleteSnapData();
            this.buttonValue = -1;
            this.setValuePost(this.buttonValue);
            console.log(this.getValuePost);
            console.log(this.getSnapData);
        },
        toggleResetModal() {
            this.showResetConfirmModal = !this.showResetConfirmModal;
        },
        scrollTo(id) {
            var element = document.getElementById(id);
            //let topPos = element.offsetTop;
            element.scrollIntoView(true);
            //document.getElementById('table').scrollTop = topPos;

        },
        outputToCSV() {
            let csv = '';
            let filename = '';
            let date = new Date();
            let data = this.getSnapData;
            filename = 'SNAPSHOTs_' + date.getDate().toString() + (date.getMonth() + 1).toString() + date.getFullYear().toString();

            csv = 'Date,Time,Snapshot Time/s,T1/C,T2/C,T3/C,T4/C,T5/C,P1/bar,P2/bar,P3/bar,Flowrate/(L/h),Power/W,TSA/C,PSA/hPa,HSA/%rh\n';

            data.forEach(function (d) {
                csv += d.date.toString();
                csv += ",";
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
                csv += ",";
                csv += d.TSA.toString();
                csv += ",";
                csv += d.PSA.toString();
                csv += ",";
                csv += d.HSA.toString();
                csv += "\n";
            });

            filename += '.csv';

            let hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = filename;
            hiddenElement.click();
        },

        currentTimeTable() {

            setInterval(() => {
                this.currentTime = (Date.now() - this.getStartTime) / 1000;
            }, 1000);
           
        }

        // getLocalStorage(val){
        //     this.snaps= val;
        //     console.log(this.snaps);
        // },

        // setLocalStorage(){
        //     localStorage.setItem('snaps',JSON.stringify(this.$store.state.rawData.snapdata));
        //     console.log(this.getSnapDate);
        // },
        // getLocalStorage(){
        //     this.snaps= JSON.parse(localStorage.getItem('snaps'));
        //     console.log(this.snaps);
        // },

        // confirm_leaving(evt) {
        //     if (this.snaps != []) {
        //         const unsaved_changes_warning = "You have unsaved changes. Are you sure you wish to leave?";
        //         evt.returnValue = unsaved_changes_warning; 
        //         this.setLocalStorage();
        //         InteractiveChart.methods.setLocalStorage();
        //         return unsaved_changes_warning;
        //     };
        // },

    }
}
</script>

<style scoped>
.current {
    border: thin;
    box-shadow: 0px 0px;
    color: green
}

.h-divider {
    margin-top: 5px;
    margin-bottom: 5px;
    height: 1px;
    width: 100%;
    border-top: 1px solid gray;
}

.v-divider {
    margin-left: 5px;
    margin-right: 5px;
    padding: 0px;
    width: 1px;
    height: 100%;
    border-right: 1px solid gray;
}

.modal-show {
    display: block;
}
</style>