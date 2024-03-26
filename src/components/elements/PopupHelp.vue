//Vue3 update

<template>
<div id='popup-help'>
    <button type='button' class='button-toolbar button-tertiary' id='help-button' @click='toggleHelp'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>
    </button>


    <transition name='fade'>
        <div v-if='popup_showing' id='popup-div'>
             <button type='button' class='btn-close btn-close-white' id='close-button' @click='toggleHelp'></button>
            <slot id='popup-text'></slot>
        </div>
    </transition>
    
</div>
</template>

<script>

export default {

  name: 'PopupHelp',
  props:{
      'parentDivID': String
  },
  data () {
    return {
        popup_showing: false,
        // popupWidth: 50,
        // popupHeight: 50,
    }
  },
  components: {
    
  },
  created(){
      
  },
  mounted(){
      

  },
  computed:{
      
  },
  watch:{
      
  },
  
  methods: {
      toggleHelp(){
          //this.setPopupWidth();
          //this.setPopupHeight();
          this.popup_showing = !this.popup_showing;
      },
    //   setPopupWidth(){
    //       let div = document.getElementById(this.parentDivID);
    //       if(div != null){
    //           this.popupWidth = div.clientWidth - 50;
    //       } 
    //   },
    //   setPopupHeight(){
    //       let div = document.getElementById(this.parentDivID);
    //       if(div != null){
    //           this.popupHeight = div.clientHeight - 50;
    //       } 
    //   }
     
      
  }
}
</script>

<style scoped>

#popup-div{
    position: fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:50%;
    border: 5px solid #000000;
    z-index: 998;
    background-color: rgba(0,0,0,0.8);
    color: white;
    overflow: scroll;
    max-height: 50vh;

}

#close-button{
    position:absolute;
    right:0px;
}

#popup-text{
    z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>