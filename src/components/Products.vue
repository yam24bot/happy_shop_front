<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#"></a>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <h1 class="my-4">Happy Shop</h1>
          <div class="list-group">
<!--            <button v-on:click="getProductsWithCategory(category)" class="btn btn-light">All products</button>-->
            <div class="list-group" v-for="(category) in ['For soul', 'For body', 'For dinner']">
              <button v-on:click="getProductsWithCategory(category)" class="btn btn-light">{{category}}</button>
            </div>
            <div class="btn-group">
              <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort by cost
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" v-on:click="sortByCostLow()">Low price</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" v-on:click="sortByCostHigh()">High price</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="row">
            <div v-for="(product) in getProducts()" :key="product.id" class="col-lg-4 col-md-6 mb-4">
              <div class="border card h-100">
  <!--                <a href="#"><img class="card-img-top" src="" alt=""></a>-->
                <div class="card-body">
                  <h4 class="card-title">
                    <a data-toggle="modal" @click="getProduct(product.id)" data-target="#exampleModalCenter" href="#">{{product.name}}</a>
                  </h4>
                  <h5 v-if="product.price === product.sale_price">${{product.price}}</h5>
                  <h5 style="color: darkred" v-else>{{product.sale_price}} <del>${{product.price}}</del></h5>
<!--                  <p class="card-text">Description</p>-->
                </div>
                <div class="card-footer">
                  <a v-if="product.sold_out" class="text-muted">SOLD OUT</a>
                  <a v-else class="text-muted">{{product.sale_text}}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">{{currentProduct.name}}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              <div class="modal-body">
                {{currentProduct.sale_text}}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
          <div class="page">
            <button v-on:click="previousPageClick()" :disabled="this.$store.state.pageNumber<1" type="button" class="btn btn-info">Prev page</button>
            <button v-on:click="nextPageClick()" :disabled="this.getProducts().length < 6" type="button" class="btn btn-info">Next page</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import axios from 'axios'
  export default {

    data() {
      return {
        currentProduct: {}
      }
    },

    mounted() {
    },

    created() {
      this.products = this.$store.dispatch('GET_PRODUCTS');
    },
    methods: {
      getProduct(id){
        this.currentProduct = this.getProducts().find(elem => {
          return elem.id === id
        })
      },
      getProductsWithCategory(displayCategory) {
        let category = displayCategory;
        this.$store.commit("SET_CATEGORY", category);
        this.$store.dispatch("GET_PRODUCTS")
      },
      getProducts() {
        return this.$store.getters.products;
      },
      previousPageClick() {
        let pageNumber = this.$store.state.pageNumber - 1;
        this.$store.commit("SET_PAGE", pageNumber);
        this.$store.dispatch("GET_PRODUCTS")
      },
      nextPageClick() {
        let pageNumber = this.$store.state.pageNumber + 1;
        this.$store.commit("SET_PAGE", pageNumber);
        this.$store.dispatch("GET_PRODUCTS")
      },
      sortByCostLow() {
        let order_by = true;
        this.$store.commit("SET_SORT", order_by);
        this.$store.dispatch("GET_PRODUCTS")
      },
      sortByCostHigh() {
        let order_by = false;
        this.$store.commit("SET_SORT", order_by);
        this.$store.dispatch("GET_PRODUCTS")
      }
    }
  }
</script>
