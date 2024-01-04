<template>
	<div class='container-fluid m-2 background-white border rounded'>

		<div>
			<PID />
		</div>
		<div id="buttons" class="row">
			<div class="col-3 offset-2">
				<!-- <button id="V1" class="button-lg button-primary"> V1 </button> -->
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" @click="V1switch()" >
					<label class="form-check-label" for="flexSwitchCheckDefault">V1 {{ V1state }}</label>
					
				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckDisabled" disabled>
					<label class="form-check-label" for="flexSwitchCheckDisabled">Disabled V7</label>
				</div>

			</div>
			<div class="col-3">
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" @click="V2switch()">
					<label class="form-check-label" for="flexSwitchCheckDefault">V2 controller</label>
				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckCheckedDisabled" checked disabled>
					<label class="form-check-label" for="flexSwitchCheckCheckedDisabled">Disabled V8</label>
				</div>
			</div>
			<div class="col-3">
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
					<label class="form-check-label" for="flexSwitchCheckDefault">V3 controller</label>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
import PID from "./ACON_PID.vue"
// import dataTestStore from "../modules/ACON_dataTestStore"


import { SmoothieChart } from 'smoothie';
import { TimeSeries } from 'smoothie';

//import Tooltip from "./Tooltip.vue";


export default {
	name: "ControlPanel",
	components: {
		//Tooltip,
		PID,

	},
	props: {
		url: String,
	},
	data() {
		return {
	
		}
	},
	computed: {
		
		

	},
	watch: {


	},
	mounted() {



	},
	methods: {


		// test() {
		// 	console.log('SECOND');
		// },
		// connect() {

		// 	let _this = this;

		// 	this.dataSocket = new WebSocket(this.url);
		// 	//console.log(this.dataSocket);
		// 	this.$store.dispatch('setDataSocket', this.dataSocket);

		// 	//let dataOpen = false;
		// 	var delay = 0;
		// 	let delay_sum = 0;
		// 	// let avgDelay = 0;
		// 	// let delays = [];
		// 	var messageCount = 0;
		// 	let a;
		// 	let b;
		// 	let debug = false;
		// 	let wrapEncoder = true;

		// 	var initialSamplingCount = 1200 // 2 mins at 10Hz
		// 	var delayWeightingFactor = 60  // 1 minute drift in 1 hour
		// 	let encoderPPR = 2400

		// 	let responsiveSmoothie = true;
		// 	let thisTime;

		// 	var chart = new SmoothieChart({ responsive: responsiveSmoothie, millisPerPixel: 10, grid: { fillStyle: '#ffffff' }, interpolation: "linear", maxValue: 135, minValue: -135, labels: { fillStyle: '#0024ff', precision: 0 } }); //interpolation:'linear
		// 	this.canvas = document.getElementById("smoothie-chart");
		// 	let series = new TimeSeries();
		// 	chart.addTimeSeries(series, { lineWidth: 2, strokeStyle: '#0024ff' });
		// 	chart.streamTo(this.canvas, 0);

		// 	this.dataSocket.onopen = () => {
		// 		//dataOpen = true; 
		// 		_this.updateDrive(50);
		// 		_this.sendDrive(false);
		// 		console.log('drive');

		// 		setTimeout(() => {
		// 			_this.updateInterval(50);
		// 			_this.sendInterval(false);
		// 			console.log('interval');
		// 		}, 1000)

		// 		setTimeout(() => {
		// 			_this.updateBrake(50);
		// 			_this.sendBrake(false);
		// 			console.log('brake');
		// 		}, 2000)





		// 		console.log('sent starting parameters');

		// 	};


		// 	this.dataSocket.onmessage = (event) => {

		// 		try {
			//delay of timestamp from device and UI
		// 			var obj = JSON.parse(event.data);
		// 			var msgTime = obj.time;
		// 			var thisDelay = new Date().getTime() - msgTime;

		// 			var enc = obj.enc;

		// 			if (messageCount == 0) {
		// 				_this.$store.dispatch('setStartTime', msgTime);
		// 				delay = thisDelay
		// 				delay_sum += thisDelay;
		// 			} else {
		// 				if (!isNaN(thisDelay)) {
		// 					delay_sum += thisDelay;
		// 					delay = delay_sum / (messageCount + 1);
		// 				} else {
		// 					delay_sum += delay;
		// 					delay = delay_sum / (messageCount + 1);

		// 				}

		// 			}



		// 			a = 1 / delayWeightingFactor
		// 			b = 1 - a


		// 			if (messageCount < initialSamplingCount) {
		// 				thisDelay = ((delay * messageCount) + thisDelay) / (messageCount + 1)
		// 			} else {
		// 				thisDelay = (delay * b) + (thisDelay * a)
		// 			}

		// 			messageCount += 1

		// 			//https://stackoverflow.com/questions/4633177/c-how-to-wrap-a-float-to-the-interval-pi-pi
		// 			if (wrapEncoder) { //wrap and convert to degrees
		// 				enc = Math.atan2(Math.sin(obj.enc / (encoderPPR / 2) * Math.PI), Math.cos(obj.enc / (encoderPPR / 2) * Math.PI)) / Math.PI * 180
		// 				enc = Math.min(135, enc)
		// 				enc = Math.max(-135, enc)
		// 			}
		// 			else { //convert to degrees only
		// 				enc = enc * 360.0 / encoderPPR;
		// 			}

		// 			thisTime = msgTime + thisDelay

		// 			if (!isNaN(thisTime) && !isNaN(enc)) {
		// 				series.append(msgTime + thisDelay, enc)

		// 				//Calculate angular velocity using new data sent through as well as currently stored values - before updating those values
		// 				let values = { theta_1: enc * Math.PI / 180, theta_0: _this.$store.getters.getCurrentAngle, t_1: msgTime, t_0: _this.$store.getters.getCurrentTime }
		// 				_this.$store.dispatch('setCurrentAngVel', values)

		// 				_this.$store.dispatch('setCurrentAngle', enc * Math.PI / 180);		//for output graph, convert to radians
		// 				_this.$store.dispatch('setCurrentTime', msgTime);			//for output graph

		// 				if (debug) {
		// 					console.log(delay, thisDelay, msgTime, enc)
		// 				}
		// 			}
		// 			else {
		// 				if (debug) {
		// 					console.log("NaN so not logging to smoothie", delay, thisDelay, msgTime, enc)
		// 				}
		// 			}

		// 		} catch (e) {
		// 			if (debug) {
		// 				console.log(e)
		// 			}
		// 		}
		// 	}



		// 	window.addEventListener('keydown', this.hotkey, false);
		// 	//window.addEventListener('pagehide', this.free);				//closing window
		// 	//window.addEventListener('beforeunload', this.free);			//refreshing page, changing URL


		// },

	},
}




</script>

<style scoped>
#smoothie-chart {
	width: 100%;
	height: 120px;
}

.slidecontainer {
	width: 100%;
	/* Width of the outside container */
}

.slider {
	/* -webkit-appearance: none; */
	width: 100%;
	height: 15px;
	border-radius: 5px;
	background: #d3d3d3;
	outline: none;
	opacity: 0.7;
	-webkit-transition: .2s;
	transition: opacity .2s;
	cursor: pointer;
}

.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: #1433BA;
	/* Persian Blue */
	cursor: grab;
}

.slider::-moz-range-thumb {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: #1433BA;
	/* Persian Blue */
	cursor: grab;
}

/* Mouse-over effects */
.slider:hover {
	opacity: 1;
	/* Fully shown on mouse-over */
}

.column {
	float: left;
	width: 50%;
}


.sliderlabel {
	text-align: left;
}

.column1-4 {
	float: left;
	width: 30%;
}

.column2-4 {
	float: left;
	width: 40%;
}

.column3-4 {
	float: left;
	width: 75%;
}

.column1-3 {
	float: left;
	width: 33.3%;
}

.column2-3 {
	float: left;
	width: 66.6%;
}

.row {
	margin-top: 12px;
}

/* Clear floats after the columns */
.row:after {
	content: "";
	display: table;
	clear: both;
}
</style>