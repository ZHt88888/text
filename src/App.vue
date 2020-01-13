<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import { getSeller } from './api'
import VHeader from './components/v-header/v-header.vue'
import Seller from './components/seller/seller.vue'
import Ratings from './components/ratings/ratings.vue'
import Goods from './components/goods/goods.vue'
import Tab from './components/tab/tab.vue'

export default {
  name: 'app',
  data () {
    return {
      seller: {}
    }
  },
  computed: {
    tabs () {
      return [
        {
          label: '点餐',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评价',
          component: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: Seller,
          data: {
            seller: this.seller
          }
        }
      ]
    }
  },
  created () {
    this._getSeller()
  },
  methods: {
    _getSeller () {
      getSeller().then(seller => {
        this.seller = seller
      })
    }
  },
  components: {
    VHeader,
    Tab
  }
}

</script>

<style lang="stylus">
#app {
  .tab-wrapper {
    position: fixed;
    top: 136px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
