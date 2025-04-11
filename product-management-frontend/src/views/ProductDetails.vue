
<template>
  <div class="product-details">
    <div v-if="loading" class="loading">Loading product details...</div>
    
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    
    <div v-if="!loading && product" class="details-content">
      <h2>{{ product.name }}</h2>
      
      <div class="product-info">
        <p><strong>ID:</strong> {{ product.id }}</p>
        <p><strong>Price:</strong> ${{ product.price }}</p>
        <p><strong>Description:</strong> {{ product.description }}</p>
      </div>
      
      <div class="actions">
        <router-link to="/products" class="btn btn-secondary">Back to List</router-link>
        <router-link :to="`/products/${product.id}/edit`" class="btn btn-warning">Edit</router-link>
        <button @click="confirmDelete" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from '../services/ProductService'

export default {
  name: 'ProductDetails',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      product: null,
      loading: true,
      error: null
    }
  },
  created() {
    this.fetchProduct()
  },
  methods: {
    fetchProduct() {
      this.loading = true
      this.error = null
      
      ProductService.getProduct(this.id)
        .then(response => {
          this.product = response.data
          this.loading = false
        })
        .catch(error => {
          console.error('Error fetching product:', error)
          this.error = 'Failed to load product details. Please try again.'
          this.loading = false
        })
    },
    confirmDelete() {
      if (confirm(`Are you sure you want to delete "${this.product.name}"?`)) {
        this.deleteProduct()
      }
    },
    deleteProduct() {
      ProductService.deleteProduct(this.product.id)
        .then(() => {
          this.$router.push('/products')
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
.product-details {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.details-content h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.product-info {
  margin-bottom: 2rem;
}

.product-info p {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}
</style>