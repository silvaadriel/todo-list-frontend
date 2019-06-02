<template>
  <projects :projects="projects"/>
</template>

<script>
import Projects from "./Projects";

export default {
  name: "todo",
  data: () => ({
    projects: [
      {
        done: false,
        title: "pj1",
        tasks: []
      },
      {
        done: true,
        title: "pj2",
        tasks: []
      }
    ]
  }),
  components: {
    Projects
  }
};
</script>

<style>
</style>

  
