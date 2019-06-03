<template>
  <v-layout wrap>
    <v-toolbar-side-icon
      large
      class="menu-hamburger"
      color="info darken-3"
      dark
      @click.stop="drawer = !drawer"
    ></v-toolbar-side-icon>

    <v-navigation-drawer v-model="drawer" :mini-variant="mini" mobile-break-point="980" absolute>
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
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
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
export default {
  name: "toolbar",
  data: () => ({
    drawer: false,
    items: [
      { title: "Home", icon: "dashboard", handle: "" },
      { title: "About", icon: "question_answer", handle: "" }
    ],
    mini: true,
    right: null
  }),
  mounted() {
    window.innerWidth > 980 ? (this.drawer = true) : (this.drawer = false);
  }
};
</script>

<style scoped>
.menu-hamburger {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1;
}
</style>
