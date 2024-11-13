<template>
	<div class='container-fluid m-2 background-white border rounded'>
		<div class="row">
			<!-- <div class="col-12" id="rigImage">
				<RigElement />
			</div> -->
			<div class="col-12" id="video" style="margin: auto;">
				<span>Evaporator</span>
				<video-element1 :url="url1" />
			</div>
			<div class="col-12" id="video2" style="margin: auto;">
				<span>Condenser</span>
				<video-element2 :url="url2" />
			</div>
			<div class="col-12" id="video3" style="margin: auto;">
				<span>Sight glass and Valve leds</span>
				<video-element3 :url="url3" />
			</div>
			
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
import axios from "axios";
import VideoElement1 from "./VideoElement1.vue";
import VideoElement2 from "./VideoElement2.vue";
import VideoElement3 from "./VideoElement3.vue";
// import RigElement from "./RigElement.vue";
import realtimetable from "./RealtimeTable.vue"

export default {
	name: "WebcamStream",
	components: {
		VideoElement1,
		VideoElement2,
		VideoElement3,
		// RigElement,
		// realtimetable,
	},
	data() {
		return {
			// player: null,
			stream1: Object,
			stream2: Object,
			stream3: Object,
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
			return this.$store.getters.getStream("video-b");
		},
		streamOK3() {
			return this.$store.getters.getStream("video-c");
		},
		url1() {
			return this.$store.getters.getVideoURL;

		},
		url2() {
			return this.$store.getters.getVideoBURL;

		},
		url3() {
			return this.$store.getters.getVideoCURL;

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
			_this.accessVideo3();
		};
		//make second and subsequent connections
		document.addEventListener("streams:dropped", reconnect);
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
			.then((response) => {
					store.dispatch("setVideoURL", response.data.uri);
				})
			.catch((err) => console.log(err))	
		},
		// CheckURL1() {
		// 	console.log(this.$store.getters.getVideoURL);
		// },

		accessVideo2() {
			this.stream2 = this.$store.getters.getStream("video-b");
			var accessURL2 = this.stream2.url;
			var token2 = this.stream2.token;
			var store = this.$store;
			store.dispatch("deleteVideoBURL");		////THIS HAS BEEN ADDED
			axios
			.post(accessURL2, {}, { headers: { Authorization: token2 } })
			.then((response) => {
					store.dispatch("setVideoBURL", response.data.uri);
				})
			.catch((err) => console.log(err))	
		},
		// CheckURL2() {
		// 	console.log(this.$store.getters.getVideoBURL);
		// }

		accessVideo3() {
			this.stream3 = this.$store.getters.getStream("video-c");
			var accessURL3 = this.stream3.url;
			var token3 = this.stream3.token;
			var store = this.$store;
			store.dispatch("deleteVideoCURL");		////THIS HAS BEEN ADDED
			axios
			.post(accessURL3, {}, { headers: { Authorization: token3 } })
			.then((response) => {
					store.dispatch("setVideoCURL", response.data.uri);
				})
			.catch((err) => console.log(err))	
		},
		// CheckURL3() {
		// 	console.log(this.$store.getters.getVideoCURL);
		// }
	},
	watch: {
		streamOK1: function (is) {
			if (is) {
				this.accessVideo1();
			} else {
				console.log("no video stream");
			}
		},
		streamOK2: function (is) {
			if (is) {
				this.accessVideo2();
			} else {
				console.log("no video-b stream");
			}
		},
		streamOK3: function (is) {
			if (is) {
				this.accessVideo3();
			} else {
				console.log("no video-c stream");
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