//Vue3 update

<template>
    <div class='d-flex flex-row'>
        
        <download-image-button v-if='showDownload' :parentComponentName="getParentComponentName" :parentCanvasID="getCanvasID"/>
       
        <popup-help v-if='showPopupHelp' :parentDivID="getParentDivID"> 
                <slot name='popup'></slot> 
        </popup-help>
        
        <options-tool v-if='showOptions'>
            <slot name='options'></slot>
        </options-tool>
    </div>
</template>

<script>

import DownloadImageButton from './DownloadImageButton.vue';
import PopupHelp from './PopupHelp.vue';
import OptionsTool from './OptionsTool.vue';

export default {

  name: 'Toolbar',
  props:{
      'parentComponentName': String, 
      'parentCanvasID': String,
      'parentDivID': String,
      'showDownload': Boolean,
      'showPopupHelp': Boolean,
      'showOptions': Boolean
  },
  data () {
    return {
   
    }
  },
  components: {
    DownloadImageButton,
    PopupHelp,
    OptionsTool
  },
  created(){
      
  },
  mounted(){
      

  },
  computed:{
      getParentComponentName(){
          return this.parentComponentName;
      },
      getCanvasID(){
          return this.parentCanvasID;
      },
      getParentDivID(){
          return this.parentDivID;
      }
      
  },
  watch:{
      
  },
  methods: {
      
      
  }
}
</script>

<style scoped>


</style>