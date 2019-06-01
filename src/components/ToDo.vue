<template>
  <v-container style="max-width: 500px">
    <v-text-field
      v-model="task"
      label="What are you working on?"
      solo
      @keydown.enter="create"
      append-icon="add_circle"
      @click:append="create"
      clearable
    ></v-text-field>

    <h2 class="display-1 success--text pl-3">
      Tasks:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">{{ tasks.length }}</span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-3"></v-divider>

    <v-layout my-1 align-center>
      <strong class="mx-3 info--text text--darken-3">Remaining: {{ remainingTasks }}</strong>

      <v-divider vertical></v-divider>

      <strong class="mx-3 black--text">Completed: {{ completedTasks }}</strong>

      <v-spacer></v-spacer>
      <v-progress-circular :value="progress" color="success" class="mr-2"></v-progress-circular>
    </v-layout>

    <v-divider class="mb-3"></v-divider>

    <v-card v-if="tasks.length > 0">
      <v-slide-y-transition class="py-0" group>
        <template v-for="(task, i) in tasks">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

          <v-list-tile :key="`${i}-${task.text}`">
            <v-list-tile-action>
              <v-checkbox v-model="task.done" color="info darken-3">
                <template v-slot:label>
                  <div
                    :class="task.done && 'grey--text' || 'text--primary'"
                    class="ml-3"
                    v-text="task.text"
                  ></div>
                </template>
              </v-checkbox>
            </v-list-tile-action>

            <v-spacer></v-spacer>

            <v-icon class="mr-3" color="info darken-3" @click="create">edit</v-icon>
            <v-icon class="mr-3" color="red darken-4" @click="create">delete</v-icon>

            <v-expand-x-transition>
              <v-icon v-if="task.done" color="success">check</v-icon>
            </v-expand-x-transition>
          </v-list-tile>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ToDo",
  data: () => ({
    tasks: [],
    task: null
  }),

  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.done).length;
    },
    progress() {
      return this.tasks.length
        ? (this.completedTasks / this.tasks.length) * 100
        : 0;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    }
  },

  methods: {
    create() {
      this.task &&
        this.tasks.push({
          done: false,
          text: this.task
        });

      this.task = null;
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
</style>
