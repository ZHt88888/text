import { createAPI } from 'cube-ui'
import Vue from 'vue'
// 头部详情遮罩层
import HeaderDetail from 'components/header-detail/header-detail'
// 底部结算遮罩层
import ShopCartList from 'components/shop-cart-list/shop-cart-list'

// 有name 才可以调用
createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopCartList)
