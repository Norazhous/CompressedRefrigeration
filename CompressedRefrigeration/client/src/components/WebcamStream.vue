<template>
	<div class='container-fluid m-2 background-white border rounded'>
		<div class="row">
			<!-- <div class="col-12" id="rigImage">
				<RigElement />
			</div> -->
			<div class="col-12" id="video2" style="margin: auto;">
				<span>Evaporator</span>
				<video-element2 :url="url2" />
			</div>
			<div class="col-12" id="video" style="margin: auto;">
				<span>Condenser</span>
				<video-element1 :url="url1" />
			</div>
			
			<!-- <div class="col-4" id="video" style="margin: auto;">	
				<video-element :url="url" />
			</div> -->
			<!-- <button @click="CheckURL1()">checkURL1</button>
			<button @click="CheckURL2()">checkURL2</button> -->
			<!-- <div class="row">
				<websockets />
			</div> -->
			<!-- <div class="col-12" id="realTimeTable">
				<realtimetable/>
			</div> -->
		</div>


		<!-- 
<div class='row' id="video">
	<div class='col-12'>
		<video-element :url="url" />
	</div>
</div> -->

	</div>
</template>

<script>
//import * as pendulum from "../pendulum";
//import { eventBus } from "../main";
//import { JSMpeg } from "../../public/js/jsmpeg.min.js";
//import JSMpeg from "jsmpeg";
//import JSMpeg from '@cycjimmy/jsmpeg-player';
//playerUrl = scheme + host + ':' + port + '/' + stream;
//let playerUrl = 'ws://video.practable.io:8080/out/dpr/video0';
import axios from "axios";
import VideoElement1 from "./VideoElement1.vue";
import VideoElement2 from "./VideoElement2.vue";
// import RigElement from "./RigElement.vue";
import realtimetable from "./RealtimeTable.vue"

export default {
	name: "WebcamStream",
	components: {
		VideoElement1,
		VideoElement2,
		// RigElement,
		// realtimetable,
	},
	data() {
		return {
			// player: null,
			stream1: Object,
			stream2: Object,
		}
	},
	computed: {
		// url1OK() {
		// 	return this.$store.getters.getVideoURLObtained;
		// },
		// url2OK() {
		// 	return this.$store.getters.videoAltURLObtained;
		// },
		streamOK1() {
			return this.$store.getters.getStream("video");
		},
		streamOK2() {
			return this.$store.getters.getStream("video-alt");
		},
		url1() {
			return this.$store.getters.getVideoURL;

		},
		url2() {
			return this.$store.getters.getVideoAltURL;

		},
		// url2() {
		// 	return this.$store.getters.getVideoAltURL;

		// },

	},
	mounted() {
		var _this = this;
		var reconnect = function () {
			_this.accessVideo1();
			_this.accessVideo2();
		};
		//make second and subsequent connections
		document.addEventListener("streams:dropped", reconnect);
	},
	methods: {
		// accessVideo() {
		// 	this.stream1 = this.$store.getters.getStream("video");
		// 	var accessURL1 = this.stream1.url;
		// 	this.stream2 = this.$store.getters.getStream("video-alt");
		// 	var accessURL2 = this.stream2.url;
		// 	var token1 = this.stream1.token;
		// 	var token2 = this.stream2.token;
		// 	var store = this.$store;
		// 	store.dispatch("deleteVideoURL");		////THIS HAS BEEN ADDED
		// 	store.dispatch("deleteVideoAltURL");		////THIS HAS BEEN ADDED
		// 	axios.all([
		// 		axios.post(accessURL1, {}, { headers: { Authorization: token1 } }),
		// 		axios.post(accessURL2, {}, { headers: { Authorization: token2 } })
		// 	])
		// 	.then(axios.spread((response1,response2) => {
		// 			store.dispatch("setVideoURL", response1.data.uri);
		// 			store.dispatch("setVideoAltURL", response2.data.uri);
		// 		}))
		// 	.catch((err) => console.log(err))	
		// },
		// CheckURL() {
		// 	console.log(this.$store.getters.getVideoURL);
		// 	console.log(this.$store.getters.getVideoAltURL);
		// }

		accessVideo1() {
			this.stream1 = this.$store.getters.getStream("video");
			var accessURL1 = this.stream1.url;
			var token1 = this.stream1.token;
			var store = this.$store;
			store.dispatch("deleteVideoURL");		////THIS HAS BEEN ADDED
			axios
			.post(accessURL1, {}, { headers: { Authorization: token1 } })
			.then((response1) => {
					store.dispatch("setVideoURL", response1.data.uri);
				})
			.catch((err) => console.log(err))	
		},
		// CheckURL1() {
		// 	console.log(this.$store.getters.getVideoURL);
		// },

		accessVideo2() {
			this.stream2 = this.$store.getters.getStream("video-alt");
			var accessURL2 = this.stream2.url;
			var token2 = this.stream2.token;
			var store = this.$store;
			store.dispatch("deleteVideoAltURL");		////THIS HAS BEEN ADDED
			axios
			.post(accessURL2, {}, { headers: { Authorization: token2 } })
			.then((response2) => {
					store.dispatch("setVideoAltURL", response2.data.uri);
				})
			.catch((err) => console.log(err))	
		},
		// CheckURL2() {
		// 	console.log(this.$store.getters.getVideoAltURL);
		// }
	},
	watch: {
		streamOK1: function (is) {
			if (is) {
				this.accessVideo1();
			} else {
				console.log("no A stream");
			}
		},
		streamOK2: function (is) {
			if (is) {
				this.accessVideo2();
			} else {
				console.log("no B stream");
			}
		},
		// urlOK(is) {
		// 	if (is) {
		// 		console.log("get videoURL", this.urlOK, this.url);
		// 	}
		// },
	},

}


</script>

<style scoped></style>