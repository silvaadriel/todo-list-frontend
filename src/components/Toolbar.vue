<template>
  <v-layout wrap>
    <v-toolbar-side-icon
      large
      class="menu-hamburger"
      color="info darken-3"
      dark
      @click.stop="drawer = !drawer"
    ></v-toolbar-side-icon>

    <v-navigation-drawer v-model="drawer" :mini-variant="mini" mobile-break-point="980" fixed>
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img v-if="false" src>
            <span class="no-img">{{ user.name ? user.name.substr(0, 1) : "" }}</span>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ user.name }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile v-for="item in items" :key="item.title" @click="item.handle">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Exit</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import router from "../router";

export default {
  name: "toolbar",
  data: () => ({
    drawer: false,
    items: [
      {
        title: "Home",
        icon: "dashboard",
        handle: () => router.push("/dashboard")
      },
      { title: "About", icon: "question_answer", handle: "" }
    ],
    mini: true,
    right: null
  }),
  computed: {
    ...mapState(["user"])
  },
  mounted() {
    window.innerWidth > 980 ? (this.drawer = true) : (this.drawer = false);
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style scoped>
.menu-hamburger {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 10;
}
.no-img {
  color: #fff;
  font-size: 1.8em;
  height: 40px;
  width: 40px;
  background: #009688;
  border-radius: 30px;
  text-transform: uppercase;
  padding: 2px;
}
</style>
