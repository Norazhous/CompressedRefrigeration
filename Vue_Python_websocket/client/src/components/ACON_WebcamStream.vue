<template>
	<div class='container-fluid m-2 background-white border rounded'>
		<div class="row">
			<div class="col-8" id="rigImage">
				<RigElement />
				
			</div>
			<div class="col-4" id="video" style="margin: auto;">
				<video-element :url="url" />
				<br>
				<video-element :url="url" />
			</div>
			<div class="row" >
				<websockets/>
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
//import * as pendulum from "../pendulum";
//import { eventBus } from "../main";
//import { JSMpeg } from "../../public/js/jsmpeg.min.js";
//import JSMpeg from "jsmpeg";
//import JSMpeg from '@cycjimmy/jsmpeg-player';
//playerUrl = scheme + host + ':' + port + '/' + stream;
//let playerUrl = 'ws://video.practable.io:8080/out/dpr/video0';
import axios from "axios";
import VideoElement from "./ACON_VideoElement.vue";
import RigElement from "./ACON_RigElement.vue";
import websockets from "./Websocket.vue";

export default {
	name: "WebcamStream",
	components: {
		VideoElement,
		RigElement,
		websockets,
	},
	data() {
		return {
			// player: null,
			stream: Object,
		}
	},
	computed: {
		urlOK() {
			return this.$store.getters.getVideoURLObtained;
		},
		streamOK() {
			return this.$store.getters.getStream("video");
		},
		url() {
			return this.$store.getters.getVideoURL;

		},

	},
	mounted() {
		var _this = this;
		var reconnect = function () {
			_this.accessVideo();
		};
		//make second and subsequent connections
		document.addEventListener("streams:dropped", reconnect);
	},
	methods: {
		accessVideo() {
			this.stream = this.$store.getters.getStream("video");
			var accessURL = this.stream.url;
			var token = this.stream.token;
			var store = this.$store;
			store.dispatch("deleteVideoURL");		////THIS HAS BEEN ADDED
			axios
				.post(accessURL, {}, { headers: { Authorization: token } })
				.then((response) => {
					store.dispatch("setVideoURL", response.data.uri);
				})
				.catch((err) => console.log(err));
		}
	},
	watch: {
		streamOK: function (is) {
			if (is) {
				this.accessVideo();
			} else {
				console.log("no stream");
			}
		},
		// urlOK(is) {
		// 	if (is) {
		// 		console.log("get videoURL", this.urlOK, this.url);
		// 	}
		// },

	}
}


</script>

<style scoped></style>