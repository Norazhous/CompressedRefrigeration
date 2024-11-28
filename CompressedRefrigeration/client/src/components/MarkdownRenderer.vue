<template>
    <div v-html="renderedMarkdown"></div>
  </template>
  
  <script>
  import { marked } from 'marked';
  
  export default {
    name: 'MarkdownRenderer',
    props: {
      content: {
        type: String,
        required: true
      }
    },
    computed: {
      renderedMarkdown() {
        return marked(this.content);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
  