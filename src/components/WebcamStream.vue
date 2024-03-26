<template>
	<div class='container-fluid m-2 background-white border rounded'>
		<div class="row">
			<div class="col-12" id="rigImage">
				<!-- <span>Apparatus Image</span> -->
				<RigElement />
			</div>
			
			<div class="col-4" id="video" style="margin: auto;">
				<span>Evaporator Video:</span>
				<video-element2 :url="url2" />
			</div>
			
			<div class="col-4" id="video" style="margin: auto;">
				<span>Condenser Video:</span>
				<video-element1 :url="url1" />
				
			</div>

			<!-- <button @click="CheckURL1()">checkURL1</button> -->
			<!-- <button @click="CheckURL2()">checkURL2</button> -->

			
			<div class="col-12" id="realTimeTable">
				<realtimetable/>
			</div>
		</div>
	</div>
</template>

<script>


import axios from "axios";
import VideoElement1 from "./VideoElement1.vue";
import VideoElement2 from "./VideoElement2.vue";
import RigElement from "./RigElement.vue";
import realtimetable from "./RealtimeTable.vue"
// import WebcamStream2 from "./WebcamStream2.vue"
// import WebcamStream1 from "./WebcamStream1.vue"

export default {
	name: "WebcamStream",
	components: {
		VideoElement1,
		VideoElement2,
		RigElement,
		realtimetable,
		// WebcamStream2,
		// WebcamStream1,
	},
	data() {
		return {
			// player: null,
			stream1: Object,
			stream2: Object,
		}
	},
	computed: {

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


	},
	mounted() {
		var _this = this;
		var reconnect = function () {
			_this.accessVideo1();
			_this.accessVideo2();
		};
	},
	methods: {

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

	},

}


</script>

<style scoped>

</style>