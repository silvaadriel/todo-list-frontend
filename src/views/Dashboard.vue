<template>
  <div>
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

<style lang="sass" scoped>

</style>
