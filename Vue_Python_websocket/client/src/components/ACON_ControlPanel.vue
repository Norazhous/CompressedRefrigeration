<template>
	<div class='container-fluid m-2 background-white border rounded'>

		<div>
			<PID />
		</div>
		<div id="buttons" class="row">
			<div class="col-3 offset-2">
				<!-- <button id="V1" class="button-lg button-primary"> V1 </button> -->
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
						:checked="V1SwitchControllor" :disabled="V1SwitchDisabled" @click="valve1ColorChange()">
					<label class="form-check-label" for="flexSwitchCheckDefault">V1 {{ V1state }}</label>

				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
					<label class="form-check-label" for="flexSwitchCheckDefault">V4 controller</label>

				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckDisabled" disabled>
					<label class="form-check-label" for="flexSwitchCheckDisabled">Disabled V7</label>
				</div>

			</div>
			<div class="col-3">
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
						:checked="V2SwitchControllor" :disabled="V2SwitchDisabled" @click="valve2ColorChange()">
					<label class="form-check-label" for="flexSwitchCheckDefault">V2 {{ V2state }}</label>
				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
					<label class="form-check-label" for="flexSwitchCheckDefault">V5 controller</label>
				</div>
			</div>
			<div class="col-3">
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
						:checked="V3SwitchControllor" :disabled="V3SwitchDisabled" @click="valve3ColorChange()">
					<label class="form-check-label" for="flexSwitchCheckDefault">V3 {{ V3state }}</label>
				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
					<label class="form-check-label" for="flexSwitchCheckDefault">V6 controller</label>
				</div>
			</div>

			<div class="btn-group btn-group-toggle" data-toggle="buttons">
				<label class="btn btn-secondary active">
					<input type="radio" name="options" id="option1" autocomplete="off" checked> ON
				</label>
				<label class="btn btn-secondary">
					<input type="radio" name="options" id="option2" autocomplete="off"> OFF
				</label>
			</div>
		</div>


	</div>
</template>

<script>
import PID from "./ACON_PID.vue"
// import dataTestStore from "../modules/ACON_dataTestStore"
//import Tooltip from "./Tooltip.vue";
import { mapGetters, mapActions } from 'vuex';

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
			V1state: "OFF",
			V1SwitchControllor: false,
			V1SwitchDisabled: false,
			V1msg: "msg",

			V2state: "OFF",
			V2SwitchControllor: false,
			V2SwitchDisabled: false,
			V2msg: "msg",

			V3state: "OFF",
			V3SwitchControllor: false,
			V3SwitchDisabled: false,
			V3msg: "msg",


		}
	},
	computed: {



	},
	watch: {


	},
	mounted() {



	},
	methods: {
		...mapActions([
			'setV1color',// set the color of the valve,setV1color(2)-waiting, setV1color(1)-on,setV1color(0)-off
			'SENDV1CONTROL',//send command to server,SENDV1CONTROL(1)-open,SENDV1CONTROL(1)-close
			'setV2color',
			'SENDV2CONTROL',
			'setV3color',
			'SENDV3CONTROL',
		]),

		//send command first, and the state changes to opening. waith 1 -2 second, check the state again, if the state become opened, then UI change. otherwise, alert and UI keep original.
		valve1ColorChange() {

			if (this.V1SwitchControllor == false && this.$store.state.websockets.V1 == 0) {

				this.setV1color(2);
				this.V1state = "opening";
				this.SENDV1CONTROL(1);
				this.V1msg = "V1opening";
				console.log(this.V1msg);
				this.V1SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.websockets.V1 == 1) {
						this.V1SwitchDisabled = false;
						this.setV1color(1);
						this.V1state = "ON";
						this.V1msg = "V1opened";
						console.log(this.V1msg);
						this.V1SwitchControllor = true;
					}
					else if (this.$store.state.websockets.V1 == 1) {
						this.V1SwitchDisabled = false;
						this.setV1color(0);
						this.V1state = "OFF";
						this.V1msg = "V1_not_opened_success";
						console.log(this.V1msg);
						this.V1SwitchControllor = false;
					}
				}, 1000);

			} else if (this.V1SwitchControllor == true && this.$store.state.websockets.V1 == 1) {

				this.setV1color(2);
				this.V1state = "closing";
				this.SENDV1CONTROL(0);
				this.V1msg = "V1closing";
				console.log(this.V1msg);
				this.V1SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.websockets.V1 == 0) {
						this.V1SwitchDisabled = false;
						this.setV1color(0);
						this.V1state = "OFF";
						this.V1msg = "V1closed";
						console.log(this.V1msg);
						this.V1SwitchControllor = false;
					}
					else if (this.$store.state.websockets.V1 == 1) {
						this.V1SwitchDisabled = false;
						this.setV1color(1);
						this.V1state = "ON";
						this.V1msg = "V1_not_closed_success";
						console.log(this.V1msg);
						this.V1SwitchControllor = true;
					}
				}, 1000);

			} else {
				// this.V1SwitchControllor = this.V1SwitchControllor;
				alert(this.V1msg);
				console.log("error");
				console.log(this.V1state);
				console.log(this.$store.state.websockets.V1);
			}
		},


		valve2ColorChange() {

			if (this.V2SwitchControllor == false && this.$store.state.websockets.V2 == 0) {

				this.setV2color(2);
				this.V2state = "opening";
				this.SENDV2CONTROL(1);
				this.V2msg = "V2opening";
				console.log(this.V2msg);
				this.V2SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.websockets.V2 == 1) {
						this.V2SwitchDisabled = false;
						this.setV2color(1);
						this.V2state = "ON";
						this.V2msg = "V2opened";
						console.log(this.V2msg);
						this.V2SwitchControllor = true;
					}
					else if (this.$store.state.websockets.V2 == 1) {
						this.V2SwitchDisabled = false;
						this.setV2color(0);
						this.V2state = "OFF";
						this.V2msg = "V2_not_opened_success";
						console.log(this.V2msg);
						this.V2SwitchControllor = false;
					}
				}, 1000);

			} else if (this.V2SwitchControllor == true && this.$store.state.websockets.V2 == 1) {

				this.setV2color(2);
				this.V2state = "closing";
				this.SENDV2CONTROL(0);
				this.V2msg = "V2closing";
				console.log(this.V2msg);
				this.V2SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.websockets.V2 == 0) {
						this.V2SwitchDisabled = false;
						this.setV2color(0);
						this.V2state = "OFF";
						this.V2msg = "V2closed";
						console.log(this.V2msg);
						this.V2SwitchControllor = false;
					}
					else if (this.$store.state.websockets.V2 == 1) {
						this.V2SwitchDisabled = false;
						this.setV2color(1);
						this.V2state = "ON";
						this.V2msg = "V2_not_closed_success";
						console.log(this.V2msg);
						this.V2SwitchControllor = true;
					}
				}, 1000);

			} else {
				// this.V1SwitchControllor = this.V1SwitchControllor;
				alert(this.V2msg);
				console.log("error");
				console.log(this.V2state);
				console.log(this.$store.state.websockets.V2);
			}
		},


		valve3ColorChange() {

			if (this.V3SwitchControllor == false && this.$store.state.websockets.V3 == 0) {

				this.setV3color(2);
				this.V3state = "opening";
				this.SENDV3CONTROL(1);
				this.V3msg = "V3opening";
				console.log(this.V3msg);
				this.V3SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.websockets.V3 == 1) {
						this.V3SwitchDisabled = false;
						this.setV3color(1);
						this.V3state = "ON";
						this.V3msg = "V3opened";
						console.log(this.V3msg);
						this.V3SwitchControllor = true;
					}
					else if (this.$store.state.websockets.V3 == 1) {
						this.V3SwitchDisabled = false;
						this.setV3color(0);
						this.V3state = "OFF";
						this.V3msg = "V3_not_opened_success";
						console.log(this.V3msg);
						this.V3SwitchControllor = false;
					}
				}, 1000);

			} else if (this.V3SwitchControllor == true && this.$store.state.websockets.V3 == 1) {

				this.setV3color(2);
				this.V3state = "closing";
				this.SENDV3CONTROL(0);
				this.V3msg = "V3closing";
				console.log(this.V3msg);
				this.V3SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.websockets.V3 == 0) {
						this.V3SwitchDisabled = false;
						this.setV3color(0);
						this.V3state = "OFF";
						this.V3msg = "V3closed";
						console.log(this.V3msg);
						this.V3SwitchControllor = false;
					}
					else if (this.$store.state.websockets.V3 == 1) {
						this.V3SwitchDisabled = false;
						this.setV3color(1);
						this.V3state = "ON";
						this.V3msg = "V3_not_closed_success";
						console.log(this.V3msg);
						this.V3SwitchControllor = true;
					}
				}, 1000);

			} else {
				// this.V1SwitchControllor = this.V1SwitchControllor;
				alert(this.V3msg);
				console.log("error");
				console.log(this.V3state);
				console.log(this.$store.state.websockets.V3);
			}
		},


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