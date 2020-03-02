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
            <a href="#" class="list-group-item">Category 1</a>
            <a href="#" class="list-group-item">Category 2</a>
            <a href="#" class="list-group-item">Category 3</a><div class="btn-group">

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

              <button v-on:click="previousPageClick()" :disabled="pageNumber==1" type="button" class="btn btn-info">Prev page</button>
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
      // axios.get('http://localhost:3003/products')
      //   .then((response) => {
      //     console.log('-----------')
      //     console.log(response)
      //     this.products = response.data
      //   })
      //   .catch(e => {
      //     this.error.push(e)
      //   })
      this.products = this.$store.dispatch('GET_PRODUCTS');

    },
    methods: {
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
        store.products.sort((a, b) => a.price - b.price)
      },
      sortByCostHigh() {
        store.products.sort((a, b) => b.price - a.price)
      }
    }
  }
</script>
