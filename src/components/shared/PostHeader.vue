<template>
    <v-card class="mx-auto post-header-card" @click="() => (
        emitEvent()
      )" max-width="444">
        <div style="padding-bottom: 1px;">
            <div class="post-header-body">
                <v-avatar size="40">
                    <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg">
                </v-avatar>
                <div class="post-header-text">
                    Whats on your mind
                </div>
            </div>
        </div>
    </v-card>
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

<style lang='scss'>
@import '../../css/typography';
@import "../../css/variables";
@import "../../css/styles";

.post-header-card {
    margin: 1rem;
    border-radius: 10px;
}

.post-header-body {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
}

.post-header-text {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    border: solid 1px lightgrey;
    border-radius: 60px;
    padding: 0.5rem;
    width: 100%;
}
</style>