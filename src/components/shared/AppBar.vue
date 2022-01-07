<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar-title>Posts Assignment</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{}">
          <v-btn link to="/">
            Home
          </v-btn>
          <v-btn @click="() => (
            emitEvent()
          )">
            Create post
          </v-btn>
        </template>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
export default {
    name: "CreatePostHeader",
    methods: {
      emitEvent(){
        this.$root.$emit('create-post')
      },
    },
}
</script>