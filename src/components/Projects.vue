<template>
  <v-container grid-list-xl text-xs-left>
    <v-layout v-bind="binding" my-1 align-center justify-center fill-height row wrap>
      <v-flex class="progress-circular" text-xs-center xs6>
        <v-progress-circular
          class="display-3"
          :rotate="360"
          :size="250"
          :width="20"
          :value="progress"
          color="teal"
        >{{ Math.ceil(progress) }}%</v-progress-circular>
        <v-flex xs12 class="mt-5">
          <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="headline mb-2">Welcome Back!</div>
                <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-flex>
      <v-flex class="tasks-list" xs6>
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

        <h2 class="display-1 teal--text pl-3">
          Projects:&nbsp;
          <v-fade-transition leave-absolute>
            <span :key="`projects-${projects.length}`">{{ projects.length }}</span>
          </v-fade-transition>
        </h2>

        <v-divider class="mt-3"></v-divider>

        <v-layout my-1 align-center>
          <v-flex xs6>
            <strong class="mx-3 info--text text--darken-3">Remaining: {{ remainingProjects }}</strong>
          </v-flex>
          <v-divider vertical></v-divider>
          <v-flex xs6>
            <strong class="mx-3 black--text">Completed: {{ completedProjects }}</strong>
          </v-flex>
        </v-layout>

        <v-divider class="mb-3"></v-divider>

        <v-card v-if="projects.length > 0">
          <v-slide-y-transition hide-on-leave class="py-0" group>
            <template v-for="(project, i) in projects">
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

              <v-list-tile class="projects" :key="`${i}-${project.title}`">
                <v-checkbox
                  v-model="project.done"
                  :readonly="project.isEditMode"
                  color="info darken-3"
                >
                  <template v-slot:label>
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
                  </template>
                </v-checkbox>

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
                    color="teal"
                    @click="() => unsetEditMode(project)"
                  >check_circle</v-icon>
                </v-expand-x-transition>
              </v-list-tile>
            </template>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
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
    },
    binding() {
      const binding = {};

      if (this.$vuetify.breakpoint.mdAndUp) binding.row = true;

      return binding;
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
.tasks-list,
.progress-circular {
  height: calc(100vh - 60px);
  min-width: 400px;
  max-width: 500px;
}
.tasks-list {
  overflow-y: scroll;
}
</style>