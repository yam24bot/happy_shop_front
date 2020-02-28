<template>
  <div id="products">
    <div v-for="product in products" :key="product.id">
      <p>{{product.name}}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Products',
    data() {
      return {
        products: [],
        name: [],
        errors: []
      }
    },
    created() {
      axios.get('http://localhost:3003/products')
        .then((response) => {
          console.log('-----------')
          console.log(response)
          this.products = response.data
        })
        .catch(e => {
          this.error.push(e)
        })
    }
  }
</script>
