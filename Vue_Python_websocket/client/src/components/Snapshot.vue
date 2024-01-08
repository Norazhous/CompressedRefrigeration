<template>
    <div class="container-fluid m-2 background-white border rounded" id='snapshot-div'>

        <div class="row table" id='table'>

            <table>
                <thead class='table-head background-primary'>
                    <tr class='background-primary text-white'>
                        <th v-for='heading in headings' :key="heading" scope="col">{{ heading }}</th>
                    </tr>
                </thead>

                <tr v-for="row in snaps" :id="row.i" :key="row.i">
                    <td v-for='key in Object.keys(row)' :key="key">{{ row[key]}}</td>
                </tr>

                <tr class='current' id='current-row'>
                    <td>{{ GETCurrentDate }}</td>
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

                </tr>

                <div id='table-bottom'>
                    <div class='white-divider'>
                    </div>
                </div>
            </table>



        </div>

        <div class='d-grid gap-2 d-sm-block'>
            <button id="snapshot" type='button' class="button-sm button-primary"
                @click="snapshot(); scrollTo('table-bottom')">Record Snapshot</button>
            <button id="reset_snaps" type='button' class="button-sm button-danger" @click="toggleResetModal">Reset</button>
            <button id="download_snaps" type='button' class="button-sm button-secondary" @click="outputToCSV">Download
                Snapshots</button>
        </div>

        <toolbar parentCanvasID="" parentComponentName="snapshot" parentDivID="snapshot-div" :showDownload='false'
            :showPopupHelp="true" :showOptions="false">
            <template v-slot:popup id='snapshot-popup'>
                <div class='row mb-2'>
                    <div class='col'>
                        <h3> Snapshot tool </h3>
                        <p> Click 'Record Snapshot' to save the current state to the snapshot table. Every time you click a
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
                        <button type="button" class="button-sm button-primary" data-dismiss="modal" data-bs-dismiss="modal"
                            @click="toggleResetModal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Toolbar from './elements/Toolbar.vue';

export default {

    name: 'Snapshot',
    props: ['headings'],
    data() {
        return {
            snaps: [],
            showResetConfirmModal: false

        }
    },
    components: {
        Toolbar
    },
    computed: {
        ...mapGetters([
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
            'GETCurrentDate',
        ])
    },
    methods: {
        ...mapActions([
            'addSnapData',
        ]),
        snapshot() {

            let snap_object = { t: this.GETCurrentDate, T1: this.GetCurrentTS1, T2: this.GetCurrentTS2, T3: 
                this.GetCurrentTS3, T4: this.GetCurrentTS4, T5: this.GetCurrentTS5, P1: this.GetCurrentPS1, P2: this.GetCurrentPS2, P3: this.GetCurrentPS3, Flow: this.GetCurrentFlow, Power: this.GetCurrentPower}; 
            //gets added to the data for plotting
            this.addSnapData(snap_object);
            //gets added to the snaps list
            this.snaps.push(snap_object);

        },
        resetSnaps() {
            this.snaps = [];
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
            let data =  this.snaps;
            filename = 'SNAPSHOTs_' + date.getDate().toString() + (date.getMonth() + 1).toString() + date.getFullYear().toString();

            csv ='Time,T1/C,T2/C,T3/C,T4/C,T5/C,P1/bar,P2/bar,P2/bar,Flowrate/(L/h),Power/W\n';

            data.forEach(function (d) {
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

            filename += '.csv';

            let hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = filename;
            hiddenElement.click();
        },
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