<template>
  <v-content>
    <Login/>
    <Footer/>
  </v-content>
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
