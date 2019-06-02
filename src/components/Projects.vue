<template>
  <v-container style="max-width: 500px">
    <v-text-field
      autofocus
      v-model="project"
      label="What are you working on?"
      solo
      @keydown.enter="create"
      append-icon="add_circle"
      @click:append="create"
      clearable
    ></v-text-field>

    <h2 class="display-1 success--text pl-3">
      Projects:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`projects-${projects.length}`">{{ projects.length }}</span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-3"></v-divider>

    <v-layout my-1 align-center>
      <strong class="mx-3 info--text text--darken-3">Remaining: {{ remainingProjects }}</strong>

      <v-divider vertical></v-divider>

      <strong class="mx-3 black--text">Completed: {{ completedProjects }}</strong>

      <v-spacer></v-spacer>
      <v-progress-circular :value="progress" color="success" class="mr-2"></v-progress-circular>
    </v-layout>

    <v-divider class="mb-3"></v-divider>

    <v-card v-if="projects.length > 0">
      <v-slide-y-transition hide-on-leave class="py-0" group>
        <template v-for="(project, i) in projects">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

          <v-list-tile class="projects" :key="`${i}-${project.title}`">
            <v-text-field
              class="project-title"
              @input="(text) => updateProjectTitle(project, text)"
              :value="project.title"
              :readonly="!project.isEditMode"
              :autofocus="!project.isEditMode"
              single-line
              full-width
              hide-details
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon
                v-if="!project.isEditMode"
                class="mr-3"
                color="info darken-3"
                @click="() => setEditMode(project)"
              >edit</v-icon>
            </v-scroll-x-transition>

            <v-scroll-x-transition>
              <v-icon
                v-if="!project.isEditMode"
                color="red darken-4"
                @click="() => deleteProject(i)"
              >delete</v-icon>
            </v-scroll-x-transition>

            <v-expand-x-transition>
              <v-icon
                v-if="project.isEditMode"
                color="success"
                @click="() => unsetEditMode(project)"
              >check_circle</v-icon>
            </v-expand-x-transition>
          </v-list-tile>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  name: "projects",
  data: () => ({
    project: null,
    editable: false,
    newProjectTitle: null
  }),
  props: {
    projects: {
      type: Array,
      required: true
    }
  },

  computed: {
    completedProjects() {
      return this.projects.filter(project => project.done).length;
    },
    progress() {
      return this.projects.length
        ? (this.completedProjects / this.projects.length) * 100
        : 0;
    },
    remainingProjects() {
      return this.projects.length - this.completedProjects;
    }
  },

  methods: {
    create() {
      this.project &&
        this.projects.push({
          done: false,
          title: this.project,
          tasks: []
        });

      this.project = null;
    },
    deleteProject(id) {
      this.projects.splice(id, 1);
    },
    setEditMode(project) {
      Vue.set(project, "isEditMode", true);
    },
    unsetEditMode(project) {
      console.log(project.title);
      Vue.set(project, "isEditMode", false);
      this.newProjectTitle && Vue.set(project, "title", this.newProjectTitle);

      this.newProjectTitle = null;
    },
    updateProjectTitle(project, text) {
      this.newProjectTitle = text;
    }
  }
};
</script>

<style scoped>
.text-field {
  position: relative;
}
.add-circle {
  position: absolute;
  top: 12px;
  right: 20px;
  z-index: 1000;
}
.projects {
  cursor: pointer;
  transition: 0.3s;
}
.projects:hover {
  background-color: #e5e5e5;
}
.project-title {
}
</style>