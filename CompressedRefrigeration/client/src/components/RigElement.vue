<template>
  <div class="row">
    <div class="col-12 background-white" id="rigImage">
      <!-- <div v-for="(position, index) in highlightedPositions" :key="index" class="highlight"
        :style="{ left: position.x, top: position.y }"></div> -->
      <!-- <img src="/images/ET-411C-Compression-refrigeration-system-gunt-206-foto_totale.jpg" alt=""> -->
      <img src="/images/ET-411C-Compression-refrigeration-system2.jpg" id="mainImage"
        alt="ET-411C-Compression-refrigeration-system">
      <!-- <button >{{ highlightedPositions }}</button> -->
    </div>
    <div class="col-12 background-white" id="realTimeTable">
				<realtimetable/>
			</div>

  </div>
</template>

<script>
import realtimetable from "./RealtimeTable.vue";
export default {

  name: "RigElement",

  data() {
    return {
      // xPercentage: 0.2,
      // yPercentage: 0.3,
    }
  },
  components: {
    realtimetable,

  },
  computed: {
    // highlightedPositions: {
    //   get() {
    //     return this.$store.state.ui.highlightedPositions;
    //   },
    //   set() {

    //   }

    // },


  },
  watch: {
  },
  created() {

  },
  mounted() {

  },
  methods: {

    // setposition() {
    //   // console.log(this.highlightedPositions.xPercentage);
    //   this.xPercentage = this.highlightedPositions.xPercentage;
    //   this.yPercentage = this.highlightedPositions.yPercentage;
    //   // console.log(this.xPercentage)
    //   this.highlightPosition(this.xPercentage, this.yPercentage);
    // },

    highlightPosition(xPercentage, yPercentage,highlightwidth, highlightheight) {
      // Get the image element
      var image = document.getElementById('mainImage');

      // Calculate the position based on percentages
      var x = xPercentage * image.width;
      var y = yPercentage * image.height;

      // Create a div element for the highlight
      var highlightDiv = document.createElement('div');
      highlightDiv.id = "highlightDiv";
      highlightDiv.classList.add('highlight');

      // Set position and size of the highlight
      highlightDiv.style.left = x + 'px';
      highlightDiv.style.top = y + 'px';
      highlightDiv.style.width = highlightwidth; // Initial width as a percentage
      highlightDiv.style.height = highlightheight; // Initial height as a percentage


      // Append the highlight div to the image container
      image.parentNode.appendChild(highlightDiv);

      window.addEventListener('resize', function () {
        var imageRect = image.getBoundingClientRect();

        var newX = xPercentage * imageRect.width;
        var newY = yPercentage * imageRect.height;

        highlightDiv.style.left = newX + 'px';
        highlightDiv.style.top = newY + 'px';
        highlightDiv.style.width = highlightwidth; // Adjust highlight width as a percentage
        highlightDiv.style.height = highlightheight; // Adjust highlight height as a percentage
      });

    },

    removeHighlightPosition(){
      document.getElementById('mainImage').parentNode.removeChild(highlightDiv);
    },


  }
}


</script>


<style>
#rigImage {
  display: inline;
  position: relative;
  width: 100%;
  max-width: 800px;
  /* Adjust max-width as needed */
}

#rigImage img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

/* CSS for highlighting */

.highlight {
  border: 5px solid red;
  box-sizing: border-box;
  position: absolute;
  animation: twinkling 1s infinite alternate;
  /* Twinkling effect animation */
  width: 5%;
  /* Initial width as a percentage */
  height: 5%;
  /* Initial height as a percentage */
}

@keyframes twinkling {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
}
</style>