<template>
    <div style="width: 200; height: 200;">
        <canvas class="background-white" id="realTimeChart" width="600" height="400"></canvas>
        <!-- <button @click="updateChartData()">update the chart</button>
        <button @click="removeChartData()">remove</button>
        <button @click="clearChartData()">clear</button> -->
        <!-- <button @click="test">test</button> -->
    </div>

</template>

<script>

import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import 'chartjs-plugin-streaming';
import 'luxon';
// import { shallowRef } from 'vue';

import { mapGetters, mapActions } from 'vuex'


export default {
    name: "InteractiveChart",
    emits: ['updateChartData'],
    components: {

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
            'GETCurrentTime',
            // 'getChart',
            'getValuePost',

        ]),
        ...mapActions([
            // 'setChart',
        ])

    },
    data() {
        // the chart need to be out side of return{ }, otherwise has the bug "Uncaught RangeError: Maximum call stack size exceeded"
        this.realTimeChart = null
        return {
            startTime: 0,
            datasetTS1: [],
            datasetTS2: [],
            datasetTS3: [],
            datasetTS4: [],
            datasetTS5: [],
            datasetPS1: [],
            datasetPS2: [],
            datasetPS3: [],
            datasetFlow: [],
            datasetPower: [],
            // valuePost: 0,
        }
    },
    mounted() {
        this.createChart();
       
        //add data according to the valuePost from Snapshot
        this.$watch('getValuePost', function (val) {
            this.updateChartData();
            val = this.getValuePost;
            // console.log(val);
            if(val == -1){
                this.clearChartData();
            }
            // console.log(this.valuePost);
        })

        // this.updateChart();
        // this.updateChartBySnapshot();
    },
   
    methods: {
        createChart() {
            //test 
            this.startTime = Date.now();
            // console.log(this.startTime);

            // Initialize Chart.js
            var ctx = document.getElementById('realTimeChart').getContext('2d');
            this.realTimeChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [], // Fixed x-axis labels
                    datasets: [{
                        label: 'T1 Data',
                        backgroundColor: 'rgb(0, 255, 0)',
                        borderColor: 'rgb(0, 255, 0)',
                        borderWidth: 1,
                        data: []  // Initialize with empty data
                    },
                    {
                        label: 'T2 Data',
                        backgroundColor: 'rgb(255, 0, 255)',
                        borderColor: 'rgb(255, 0, 255)',
                        borderWidth: 1,
                        data: []  // Initialize with empty data
                    },
                    {
                        label: 'T3 Data',
                        backgroundColor: 'rgb(255, 0, 0)',
                        borderColor: 'rgb(255, 0, 0)',
                        borderWidth: 1,
                        data: []  // Initialize with empty data
                    },
                    {
                        label: 'T4 Data',
                        backgroundColor: 'rgb(0, 0, 255)',
                        borderColor: 'rgb(0, 0, 255)',
                        borderWidth: 1,
                        data: []  // Initialize with empty data
                    },
                    {
                        label: 'T5 Data',
                        backgroundColor: 'rgb(210, 210, 0)',
                        borderColor: 'rgb(210, 210, 0)',
                        borderWidth: 1,
                        data: []  // Initialize with empty data
                    },
                    {
                        label: 'P1 Data',
                        backgroundColor: 'rgb(0, 255, 255)',
                        borderColor: 'rgb(0, 255, 255)',
                        borderWidth: 1,
                        data: []  // Initialize with empty data
                    },
                    {
                        label: 'P2 Data',
                        backgroundColor: 'rgb(141, 14, 14)',
                        borderColor: 'rgb(141, 14, 14)',
                        borderWidth: 1,
                        data: []  // Initialize with empty data
                    },
                    {
                        label: 'P3 Data',
                        backgroundColor: 'rgb(14, 14, 141)',
                        borderColor: 'rgb(14, 14, 141)',
                        borderWidth: 1,
                        data: []  // Initialize with empty data
                    },
                    {
                        label: 'Flow Data',
                        backgroundColor: 'rgb(0, 178, 148)',
                        borderColor: 'rgb(0, 178, 148)',
                        borderWidth: 1,
                        data: []  // Initialize with empty data
                    },
                    {
                        label: 'Power Data',
                        backgroundColor: 'rgb(255, 140, 0)',
                        borderColor: 'rgb(255, 140, 0)',
                        borderWidth: 1,
                        data: []  // Initialize with empty data
                    },
                    ]
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear', // Fixed x-axis scale
                            position: 'bottom', // Position x-axis at the bottom
                            ticks: {
                                stepSize: 10, // Step size for x-axis
                                min: 0,      // Minimum value for x-axis
                                max: 500,      // Maximum value for x-axis
                            },
                        },
                        // x: {
                        //     type: 'linear',
                        //     realtime: {
                        //         duration: 20000, // Data will be removed after 20 seconds
                        //         refresh: 1000, // Refresh data every 1 second
                        //         delay: 1000, // Delay of 1 second
                        //         pause: false, // No pause
                        //         ttl: undefined, // Time-to-live (in ms) for data point, undefined means data points do not expire
                        //     }
                        // },
                        y: {
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                        }
                    }
                }
            });
        },

        //update dataset for chart input
        updatDataset() {
            //use the currenttime -starttime as the x axis
            var currentTime = (Date.now() - this.startTime) / 1000;

            // push the data into the dataset for chart plotting 
            this.datasetTS1.push({
                x: currentTime,
                y: this.GetCurrentTS1,
            });
            // console.log(this.dataset);
            this.datasetTS2.push({
                x: currentTime,
                y: this.GetCurrentTS2,
            });
            this.datasetTS3.push({
                x: currentTime,
                y: this.GetCurrentTS3,
            });
            this.datasetTS4.push({
                x: currentTime,
                y: this.GetCurrentTS4,
            });
            this.datasetTS5.push({
                x: currentTime,
                y: this.GetCurrentTS5,
            });
            this.datasetPS1.push({
                x: currentTime,
                y: this.GetCurrentPS1,
            });
            this.datasetPS2.push({
                x: currentTime,
                y: this.GetCurrentPS2,
            });
            this.datasetPS3.push({
                x: currentTime,
                y: this.GetCurrentPS3,
            });
            this.datasetFlow.push({
                x: currentTime,
                y: this.GetCurrentFlow,
            });
            this.datasetPower.push({
                x: currentTime,
                y: this.GetCurrentPower,
            });
        },

        //feed the dataset into chart 
        updateChartData() {

            this.updatDataset();
            // this.realTimeChart.data.datasets.data.push(this.dataset[this.dataset.length - 1]);
            // update chart :https://www.chartjs.org/docs/latest/developers/updates.html
            // console.log(this.realTimeChart.data.datasets);
            // this.realTimeChart.data.datasets.forEach((dataset) => {
            //     dataset.data.push(this.dataset[this.dataset.length - 1]);
            //    console.log(this.realTimeChart.data.datasets);
            //    console.log(this.realTimeChart.data.datasets.data);
            // });
            // console.log(this.realTimeChart);

            this.realTimeChart.data.datasets[0].data.push(this.datasetTS1[this.datasetTS1.length - 1])
            this.realTimeChart.data.datasets[1].data.push(this.datasetTS2[this.datasetTS2.length - 1]);
            this.realTimeChart.data.datasets[2].data.push(this.datasetTS3[this.datasetTS3.length - 1]);
            this.realTimeChart.data.datasets[3].data.push(this.datasetTS4[this.datasetTS4.length - 1]);
            this.realTimeChart.data.datasets[4].data.push(this.datasetTS5[this.datasetTS5.length - 1]);
            this.realTimeChart.data.datasets[5].data.push(this.datasetPS1[this.datasetPS1.length - 1]);
            this.realTimeChart.data.datasets[6].data.push(this.datasetPS2[this.datasetPS2.length - 1]);
            this.realTimeChart.data.datasets[7].data.push(this.datasetPS3[this.datasetPS3.length - 1]);
            this.realTimeChart.data.datasets[8].data.push(this.datasetFlow[this.datasetFlow.length - 1]);
            this.realTimeChart.data.datasets[9].data.push(this.datasetPower[this.datasetPower.length - 1]);

            // console.log(this.realTimeChart.data.datasets);
            // console.log(this.dataset.length);

            // Update the chart
            this.realTimeChart.update();
        },

        //updata chart data per second
        updateChart() {
            setInterval(this.updateChartData, 1000);
        },


        // test(){
        //     this.valuePost++;
        // },

        //remove one data in the chart
        removeChartData() {
            this.realTimeChart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
            })

            this.realTimeChart.update();
        },

        //remove All data in the chart
        clearChartData() {
            //clear the dataset in the chart
            this.realTimeChart.data.datasets.forEach((dataset) => {
                dataset.data = [];
            })
            //clear the dataset as well
            this.dataset = [];
            this.realTimeChart.update();
        },




    }
}




</script>
