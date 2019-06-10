<template>
  <v-container fluid fill-height grid-list-md>
    <v-layout v-bind="binding" my-1 align-space-between justify-center fill-height row wrap>
      <v-flex text-xs-center xs12 sm8 md4>
        <v-layout align-space-around justify-space-between column fill-height>
          <v-flex xs12 sm8 md4>
            <div class="blur">
              <div class="inner">
                <v-progress-circular
                  class="display-3"
                  :rotate="360"
                  :size="250"
                  :width="20"
                  :value="progress"
                  color="black"
                >{{ Math.ceil(progress) }}%</v-progress-circular>
                <p
                  class="headline mt-4"
                >{{tasks.length === 0 ? "There're no tasks to complete" : progress === 100 ? "All tasks completed" : "There're tasks to complete" }}</p>
              </div>
            </div>
          </v-flex>

          <v-flex xs12 sm8 md4>
            <div class="blur">
              <div class="inner">
                <v-card color="transparent" flat class="black--text">
                  <v-card-title primary-title>
                    <div>
                      <div class="headline mb-2">Welcome Back!</div>
                      <span>Organize your to-do, work, grocery, movies and household lists. This free application offers an effective and flexible way to stay on top of your daily tasks.</span>
                    </div>
                  </v-card-title>
                </v-card>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm8 md5 offset-md1>
        <div class="blur">
          <div class="inner">
            <v-text-field
              :value="newTaskName"
              @input="setNewTaskName"
              label="What are you working on?"
              solo
              @keydown.enter="createTask"
              append-icon="add_circle"
              @click:append="createTask"
              clearable
            ></v-text-field>

            <h2 class="display-1 black--text pl-3">
              Tasks:&nbsp;
              <v-fade-transition leave-absolute>
                <span :key="`tasks-${tasks.length}`">{{ tasks.length }}</span>
              </v-fade-transition>
            </h2>

            <v-divider class="mt-3"></v-divider>

            <v-layout my-1 align-center>
              <v-flex xs6>
                <strong class="mx-3 black--text">Remaining: {{ remainingTasks }}</strong>
              </v-flex>
              <v-divider vertical></v-divider>
              <v-flex xs6>
                <strong class="mx-3 black--text">Completed: {{ completedTasks }}</strong>
              </v-flex>
            </v-layout>

            <v-divider class="mb-3"></v-divider>

            <v-card class="tasks-list" v-if="tasks.length > 0">
              <v-slide-y-transition hide-on-leave class="py-0" group>
                <template v-for="(task, i) in tasks">
                  <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

                  <v-hover :key="`${i}-${task.title}`">
                    <v-list-tile
                      slot-scope="{ hover }"
                      :class="`${hover ? 'grey lighten-2' : 'white'}`"
                      class="tasks"
                    >
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
                  </v-hover>
                </template>
              </v-slide-y-transition>
            </v-card>
          </div>
        </div>
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

      if (this.$vuetify.breakpoint.xlAndUp) binding.row = true;

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
.inner {
  position: relative;
  z-index: 2;
}
.blur {
  position: relative;
  /* bottom: 0;
  left: 0; */
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  /* background: inherit;
  background-attachment: fixed; */
  overflow: hidden;
  border-radius: 5px;
}
.blur::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg")
    no-repeat center;
  background-size: cover;
  background-attachment: fixed;
  -webkit-filter: blur(20px);
  filter: blur(20px);
  z-index: 0;
}
.blur::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  z-index: 0;
}
.tasks-list {
  max-height: 53vh;
  overflow-y: scroll;
}
/* .tasks {
  cursor: pointer;
  transition: 0.3s;
}
.tasks:hover {
  background-color: #e5e5e5;
}
.tasks-list,
.progress-circular {
  height: 580px;
  min-width: 300px;
  max-width: 500px;
}
.tasks-list {
  overflow-y: scroll;
}
@media (max-width: 825px) {
  .tasks-list {
    overflow-y: initial;
  }
} */
</style>