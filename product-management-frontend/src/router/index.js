// frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductDetails from '../views/ProductDetails.vue'
import ProductForm from '../views/ProductForm.vue'

const routes = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/products',
    name: 'products',
    component: ProductList
  },
  {
    path: '/products/new',
    name: 'product-new',
    component: ProductForm
  },
  {
    path: '/products/:id',
    name: 'product-details',
    component: ProductDetails,
    props: true
  },
  {
    path: '/products/:id/edit',
    name: 'product-edit',
    component: ProductForm,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router