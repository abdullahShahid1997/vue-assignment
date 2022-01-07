import Vue from 'vue';
import Vuex from 'vuex';
import Posts from './modules/posts/posts'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
})


const modules = {
    Posts
};

export default new Vuex.Store({
    modules,
    plugins: [vuexLocalStorage.plugin]

});
