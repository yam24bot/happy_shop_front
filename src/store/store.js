import Vue from 'vue';
import Vuex from 'vuex';
// import Api from './api';
import Axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    apiBaseUrl: 'http://localhost:3003/',
    products: [],
    productsPerPage: 6,
    pageNumber: 0,
    name: [],
    errors: [],
    order_by: true
  },

  getters : {
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
    },
    SET_SORT : (state, orderBy) => {
      state.order_by = orderBy;
    }
  },

  actions: {
    GET_PRODUCTS : (context, payload) => {
      let params = {
        ...(payload || {}),
        ...{
          productsPerPage: context.state.productsPerPage,
          pageNumber: context.state.pageNumber,
          order_by: context.state.order_by
        }
      };

      Axios.get('http://localhost:3003/products', {params: params}).then((response) => {
        context.commit('SET_PRODUCTS', response.data);
      })
    },
  },
});
