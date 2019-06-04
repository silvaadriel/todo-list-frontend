<template>
  <tasks/>
</template>

<script>
import Tasks from "./Tasks";
import { mapGetters } from "vuex";
import router from "../router";

export default {
  name: "todo",
  mounted() {
    if (!this.isLoggedIn) {
      return router.push("/");
    }
  },
  components: {
    Tasks
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
};
</script>

<style>
</style>

  
