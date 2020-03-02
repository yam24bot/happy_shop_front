<template>
  <!-- Navigation -->
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Start Bootstrap</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>


    <div class="container">

      <div class="row">

        <div class="col-lg-3">

          <h1 class="my-4">Shop Name</h1>

          <div class="list-group">

            <button v-on:click="getProducts()" class="btn btn-light">All products</button>

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
        <!-- /.col-lg-3 -->

        <div class="col-lg-9">


          <div class="row">

              <div v-for="(product) in getProducts()" :key="product.id" class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
  <!--                <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>-->
                  <div class="card-body">
                    <h4 class="card-title">
                      <a href="#">{{product.name}}</a>
                    </h4>
                    <h5>${{product.price}}</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
                  </div>
                  <div class="card-footer">
                    <a class="text-muted">{{product.sale_text}}</a>
                  </div>
                </div>
              </div>

            </div>

<!--          ===-->


            <div class="page">

              <button v-on:click="previousPageClick()" :disabled="this.$store.state.pageNumber<1" type="button" class="btn btn-info">Prev page</button>
              <button v-on:click="nextPageClick()" :disabled="pageNumber > (productsPerPage / pageNumber) - 2" type="button" class="btn btn-info">Next page</button>

            </div>



<!--          ===-->

          </div>
          <!-- /.row -->

        </div>
        <!-- /.col-lg-9 -->

      </div>
    <!-- /.row -->
    </div>


</template>
<style>

</style>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import axios from 'axios'
  export default {

    mounted() {
    },

    created() {
      this.products = this.$store.dispatch('GET_PRODUCTS');
    },
    methods: {
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
