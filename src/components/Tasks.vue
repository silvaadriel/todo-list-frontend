<template>
  <v-container grid-list-xl text-xs-left>
    <v-layout v-bind="binding" my-1 align-center justify-space-around fill-height row wrap>
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
          :value="newTaskName"
          @input="setNewTaskName"
          label="What are you working on?"
          solo
          @keydown.enter="createTask"
          append-icon="add_circle"
          @click:append="createTask"
          clearable
        ></v-text-field>

        <h2 class="display-1 teal--text pl-3">
          Tasks:&nbsp;
          <v-fade-transition leave-absolute>
            <span :key="`tasks-${tasks.length}`">{{ tasks.length }}</span>
          </v-fade-transition>
        </h2>

        <v-divider class="mt-3"></v-divider>

        <v-layout my-1 align-center>
          <v-flex xs6>
            <strong class="mx-3 info--text text--darken-3">Remaining: {{ remainingTasks }}</strong>
          </v-flex>
          <v-divider vertical></v-divider>
          <v-flex xs6>
            <strong class="mx-3 black--text">Completed: {{ completedTasks }}</strong>
          </v-flex>
        </v-layout>

        <v-divider class="mb-3"></v-divider>

        <v-card v-if="tasks.length > 0">
          <v-slide-y-transition hide-on-leave class="py-0" group>
            <template v-for="(task, i) in tasks">
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

              <v-list-tile class="tasks" :key="`${i}-${task.title}`">
                <v-checkbox
                  v-model="task.isDone"
                  @change="checkClicked(task)"
                  :readonly="task.isEditMode"
                  color="info darken-3"
                >
                  <template v-slot:label>
                    <v-text-field
                      class="task-title"
                      @input="(event) => updateTaskTitle(task, event)"
                      :value="task.title"
                      :readonly="!task.isEditMode"
                      :autofocus="!task.isEditMode"
                      single-line
                      full-width
                      hide-details
                    ></v-text-field>
                  </template>
                </v-checkbox>

                <v-spacer></v-spacer>

                <v-scroll-x-transition>
                  <v-icon
                    v-if="!task.isEditMode"
                    class="mr-3"
                    color="info darken-3"
                    @click="() => setEditMode(task)"
                  >edit</v-icon>
                </v-scroll-x-transition>

                <v-scroll-x-transition>
                  <v-icon
                    v-if="!task.isEditMode"
                    color="red darken-4"
                    @click="() => deleteTask(task)"
                  >delete</v-icon>
                </v-scroll-x-transition>

                <v-expand-x-transition>
                  <v-icon
                    v-if="task.isEditMode"
                    color="teal"
                    @click="() => {
                      setTaskTitle({ task, title: newTaskTitle })
                      saveTask(task)
                    }"
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
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "tasks",
  data: () => ({
    task: null,
    editable: false,
    newTaskTitle: null
  }),
  mounted() {
    this.fetchTasks();
  },
  computed: {
    ...mapState(["tasks", "newTaskName"]),
    completedTasks() {
      return this.tasks.filter(task => task.isDone).length;
    },
    progress() {
      return this.tasks.length
        ? (this.completedTasks / this.tasks.length) * 100
        : 0;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
    binding() {
      const binding = {};

      if (this.$vuetify.breakpoint.mdAndUp) binding.row = true;

      return binding;
    }
  },
  methods: {
    ...mapActions(["fetchTasks", "createTask", "saveTask", "deleteTask"]),
    ...mapMutations([
      "setNewTaskName",
      "setTaskTitle",
      "setEditMode",
      "unsetEditMode"
    ]),
    updateTaskTitle(task, text) {
      this.newTaskTitle = text;
    },
    checkClicked(task) {
      this.saveTask(task);
    }
  }
};
</script>

<style scoped>
.tasks {
  cursor: pointer;
  transition: 0.3s;
}
.tasks:hover {
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
@media (max-width: 825px) {
  .tasks-list {
    overflow-y: initial;
  }
}
</style>