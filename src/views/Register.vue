<template>
  <div class="bg">
    <Register/>
    <Footer/>
  </div>
</template>

<script>
import Register from "../components/Register";
import Footer from "../components/Footer";

export default {
  components: {
    Register,
    Footer
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