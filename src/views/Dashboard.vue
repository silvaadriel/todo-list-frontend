<template>
  <div>
    <toolbar/>

    <ToDo/>
  </div>
</template>

<script>
import ToDo from "../components/ToDo";
import Toolbar from "../components/Toolbar";

export default {
  components: {
    ToDo,
    Toolbar
  }
};
</script>

<style lang="sass" scoped>

</style>
