import axios from 'axios';
import type { Posts, PostsState, Post } from './interfaces';


const state: PostsState = {
  posts: <Posts>[],
  serviceUrl: <string>import.meta.env.VITE_SERVICE_URL
};

const getters = {
  getPosts: (state: PostsState) => state.posts,
};

const actions = {
  async fetchPosts({ commit, state }: any, params: { id: any; }) {
    try {
      let posts_url = params?.id ? `${state.serviceUrl}/posts/${params?.id}` : `${state.serviceUrl}/posts/`
      let response = await axios.get(
        posts_url,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        commit('setPostsState', response.data);
        return response.data;
      }
    } catch (error: any) {
      return error.response;
    }
  },
  async deletePost({ commit, state }: any, params: { id: any; }) {
    try {
      let posts_url = `${state.serviceUrl}/posts/${params?.id}`
      let response = await axios.delete(
        posts_url,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        commit('setDeletePostState', response.data);
        return response.data;
      }
    } catch (error: any) {
      return error.response;
    }
  },
  async createPost({ commit, state }: any, params: { text: string; image: string }) {
    try {
      let posts_url = `${state.serviceUrl}/posts/`
      let response = await axios.post(
        posts_url,
        params,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      if (response.status === 201) {
        let newPost: Post = {
          id: state.posts.length + 1,
          text: params.text,
          image: params.image,
          likesCount: 0,
          commentsCount: 0,
          comments: []
        }
        commit('setNewPostState', newPost);
        return response.data;
      }
    } catch (error: any) {
      return error.response;
    }
  },
};

const mutations = {
  setPostsState: (state: PostsState, posts: Posts) => (state.posts = posts),
  setNewPostState: (state: PostsState, post: Post) => (state.posts = [...state.posts, post]),
  setDeletePostState: (state: PostsState, id: number) => (state.posts = [...state.posts.filter((post: Post) => post.id !== id)])
};

export default {
  state,
  getters,
  actions,
  mutations
};
