<template>
  <div class="bg">
    <Login/>
    <Footer/>
  </div>
</template>

<script>
import Login from "../components/Login";
import Footer from "../components/Footer";

export default {
  components: {
    Login,
    Footer
  }
};
</script>

<style scoped>
.bg {
  height: 100%;
  background: url("https://cdn.pixabay.com/photo/2014/10/07/13/48/mt-fuji-477832_960_720.jpg")
    no-repeat center;
  background-size: cover;
}
</style>
