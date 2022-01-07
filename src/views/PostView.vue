<template>
  <div class="post-view" v-if="post">
    <v-card class="mx-auto post-card" max-width="444">
      <div class="post-avatar">
        <v-avatar size="45">
          <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg">
        </v-avatar>
        <div class="post-user">
          <span>
            John Doe
          </span>
        </div>
        <v-spacer></v-spacer>
        <v-btn text class="share-button" @click="deletePost">
          Delete
        </v-btn>
      </div>
      <v-img :src="post?.image" height="200px"></v-img>

      <v-card-title>
        <span @click="() => hideText = !hideText" class="post-text">
          {{ post?.text }}
        </span>
      </v-card-title>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="like-button" text>
          Like {{ post?.likesCount }}
        </v-btn>
        <v-btn class="comment-button" @click="() => show = !show" color="orange lighten-2" text>
          Comments {{ post?.commentsCount }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text class="share-button">
          Share
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show" style="padding-bottom: 1px;">
          <v-divider></v-divider>
          <div v-for="(comment, i) in post?.comments" v-bind:key="i" class="comment-body">
            <v-avatar size="40">
              <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg">
            </v-avatar>
            <div class="comment-text">

              <span class="comment-user-name">
                John Doe
              </span>
              {{ comment?.text }}
            </div>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
  <div v-else>
    <v-card class="no-post-found">
      <v-card-title>
        No Post Found
      </v-card-title>

    </v-card>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "PostView",
  data() {
    return {
      show: false,
      hideText: true,
      postText: "",
      post: null
    }
  },
  async mounted() {
    this.post = this.getPosts.find((post: any) => `${post.id}` === `${this.$route.params.post_id}`)
  },
  computed: {
    ...mapGetters(['getPosts']),
  },
  methods: {
    ...mapActions(['deletePost']),
    async deletePost() {
      let params = {
        id: this.post?.id
      }
      this.deletePost(params).then(() => this.$router.push({ path: '/' }))
    }
  },
}
</script>

<style lang='scss' scoped>
@import '../css/typography';
@import "../css/variables";
@import "../css/styles";

.post-view {
  display: flex;
  justify-content: center;
  align-items: center;

  .post-card {
    margin: 1rem;
    border-radius: 10px;
  }

  .post-text {
    color: darkslategrey;
    font-size: medium;
  }

  .post-avatar {
    padding-top: 0.5rem;
    margin: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .comment-body {
    margin: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
  }

  .post-user {
    margin-left: 1rem;
  }

  .like-button {
    background-color: #cfcece26;
    text-transform: capitalize;
    height: 30px !important;
  }

  .share-button {
    background-color: #cfcece26;
    text-transform: capitalize;
    height: 30px !important;
  }

  .comment-button {
    background-color: #cfcece26;
    text-transform: capitalize;
    margin-left: 0.5rem;
    height: 30px !important;
  }

  .comment-text {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 0.4rem 0.6rem;
    background-color: #cfcece7a;

  }

  .comment-user-name {
    font-size: small;
    margin-bottom: 1px;
  }

}

.no-post-found {
  height: 200px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 100px;
}
</style>