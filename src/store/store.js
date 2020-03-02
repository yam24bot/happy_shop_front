import Vue from 'vue';
import Vuex from 'vuex';
// import Api from './api';
import Axios from 'axios';

Vue.use(Vuex);

// eslint-disable-next-line
export const store = new Vuex.Store({
  state: {
    apiBaseUrl: 'http://localhost:3003/',
    products: [],
    productsPerPage: 6,
    pageNumber: 0,
    name: [],
    errors: []
  },

  getters : {
    // PRODUCTS : state => {
    //   return state.products;
    // }
    products(state) {
      return state.products;
    }
  },

  mutations: {
    SET_PRODUCTS : (state, payload) => {
      state.products = payload;
    },
    SET_PAGE : (state, pageNumber) => {
      state.pageNumber = pageNumber;
    }
  },

  actions: {
  //   usersCreate: (context, data) => {
  //     Api.post('/users', data)
  //       .then(response => context.commit('updateProperty', { property: 'authenticatedUser', value: response.body }))
  //       // eslint-disable-next-line
  //       .catch(error => console.error(error));
  //   },

    GET_PRODUCTS : (context, payload) => {
      let params = {
        ...(payload || {}),
        ...{
          productsPerPage: context.state.productsPerPage,
          pageNumber: context.state.pageNumber
        }
      };

      Axios.get('http://localhost:3003/products', {params: params}).then((response) => {
        context.commit('SET_PRODUCTS', response.data);
      })

    },
  },
});
