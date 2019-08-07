import Vue from 'vue'
import Vuex from 'vuex'

import { defaultClient as apolloClient } from './main';

import { GET_POSTS, SIGNIN_USER, SIGNUP_USER } from './queries';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      posts: [],
      loading: false
  },

  mutations: {
      setPosts: (state, payload) => {
          state.posts = payload;
      },

      setLoading: (state, payload) => {
          state.loading = payload;
      }
  },

  actions: {
      getPosts: ({ commit }) => {
          apolloClient.query({
              query: GET_POSTS
          }).then(({ data }) => {
              commit('setPosts', data.getPosts);
              commit('setLoading', false);
          }).catch((e) => {
              commit('setLoading', true);
              console.error(e);
          });
      },

      signinUser: ({ commit }, payload) => {
          apolloClient.mutate({
              mutation: SIGNIN_USER,
              variables: payload
          }).then(({ data }) => {
              console.log(data.signinUser);
          }).catch((err) => {
              console.log(err);
          });
      }
  },

  getters: {
      posts: state => state.posts,
      loading: state => state.loading
  }
})
