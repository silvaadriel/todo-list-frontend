<template>
  <div class="bg">
    <toolbar/>
    <ToDo/>
  </div>
</template>

<script>
import ToDo from "../components/ToDo";
import Toolbar from "../components/Toolbar";
import { mapActions } from "vuex";

export default {
  components: {
    ToDo,
    Toolbar
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    ...mapActions(["fetchUser"])
  }
};
</script>

<style scoped>
.bg {
  height: 100%;
  background: url("https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg")
    no-repeat center;
  background-size: cover;
}
</style>
