
<template>
  <div class="product-list">
    <div class="list-header">
      <h2>Products</h2>
      <router-link to="/products/new" class="btn btn-primary">Add New Product</router-link>
    </div>
    
    <div v-if="loading" class="loading">Loading products...</div>
    
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    
    <div v-if="!loading && products.length === 0" class="empty-state">
      <p>No products found. Add a new product to get started.</p>
    </div>
    
    <table v-if="!loading && products.length > 0" class="products-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>${{ product.price }}</td>
          <td class="actions">
            <router-link :to="`/products/${product.id}`" class="btn btn-info">View</router-link>
            <router-link :to="`/products/${product.id}/edit`" class="btn btn-warning">Edit</router-link>
            <button @click="confirmDelete(product)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductService from '../services/ProductService'

export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
      loading: true,
      error: null
    }
  },
  created() {
    this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      this.loading = true
      this.error = null
      
      ProductService.getProducts()
        .then(response => {
          this.products = response.data
          this.loading = false
        })
        .catch(error => {
          console.error('Error fetching products:', error)
          this.error = 'Failed to load products. Please try again.'
          this.loading = false
        })
    },
    confirmDelete(product) {
      if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        this.deleteProduct(product.id)
      }
    },
    deleteProduct(id) {
      ProductService.deleteProduct(id)
        .then(() => {
          this.products = this.products.filter(product => product.id !== id)
        })
        .catch(error => {
          console.error('Error deleting product:', error)
          this.error = 'Failed to delete product. Please try again.'
        })
    }
  }
}
</script>

<style scoped>
.product-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.products-table th,
.products-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.products-table th {
  font-weight: 600;
  background-color: #f8f9fa;
}

.products-table tr:hover {
  background-color: #f9f9f9;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #6c757d;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}
</style>