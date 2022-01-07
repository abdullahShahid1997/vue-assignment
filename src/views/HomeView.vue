<template>
  <main class="home-page">
    <div v-if="getPosts.length > 0">
      <CreatePostHeader />
      <template v-for="(post, i) in getPosts">
        <PostCard :id="post.id" :text="post.text" :comments="post.comments" :image="post.image"
          :likesCount="post.likesCount" :commentsCount="post.commentsCount" />
      </template>
      <div data-app>
        <CreatePostModal />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import PostCard from "../components/shared/PostCard.vue";
import CreatePostModal from "../components/shared/PostCreate.vue"
import CreatePostHeader from '../components/shared/PostHeader.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Home",
  components: { PostCard, CreatePostHeader, CreatePostModal },
  async mounted() {
    await this.fetchPosts();
  },
  computed: {
    ...mapGetters(['getPosts']),
  },
  methods: {
    ...mapActions(['fetchPosts']),
  }
}
</script>

<style lang='scss' scoped>
@import '../css/typography';
@import "../css/variables";
@import "../css/styles";

.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  flex-direction: column;
}
</style>