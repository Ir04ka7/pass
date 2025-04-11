
<template>
  <div class="product-form">
    <h2>{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h2>
    
    <div v-if="loading" class="loading">Loading product data...</div>
    
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    
    <form v-if="!loading" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Product Name</label>
        <input 
          type="text" 
          id="name" 
          v-model="product.name" 
          class="form-control"
          required
        >
      </div>
      
      <div class="form-group">
        <label for="price">Price ($)</label>
        <input 
          type="number" 
          id="price" 
          v-model.number="product.price" 
          class="form-control"
          step="0.01" 
          min="0.01" 
          required
        >
      </div>
      
      <div class="form-group">
        <label for="description">Description</label>
        <textarea 
          id="description" 
          v-model="product.description" 
          class="form-control"
          rows="4" 
          required
        ></textarea>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? 'Update' : 'Create' }} Product
        </button>
        <router-link to="/products" class="btn btn-secondary">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ProductService from '../services/ProductService'

export default {
  name: 'ProductForm',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      product: {
        name: '',
        price: '',
        description: ''
      },
      loading: false,
      error: null,
      isEditMode: false
    }
  },
  created() {
    this.isEditMode = !!this.id
    
    if (this.isEditMode) {
      this.fetchProduct()
    }
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
          this.error = 'Failed to load product. Please try again.'
          this.loading = false
        })
    },
    submitForm() {
      this.loading = true
      this.error = null
      
      const action = this.isEditMode
        ? ProductService.updateProduct(this.product)
        : ProductService.createProduct(this.product)
      
      action
        .then(() => {
          this.$router.push('/products')
        })
        .catch(error => {
          console.error('Error saving product:', error)
          this.error = `Failed to ${this.isEditMode ? 'update' : 'create'} product. Please try again.`
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
.product-form {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.product-form h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  border-color: #4299e1;
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}
</style>