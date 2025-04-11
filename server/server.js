
const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

//
let products = [
  { id: 1, name: "Sample", price: 10, description: "example product" }
];

// Middleware
app.use(cors());
app.use(express.json());

// Frontend static
app.use(express.static(path.join(__dirname, 'public')));

// API
app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === +req.params.id);
  product ? res.json(product) : res.status(404).json({ error: 'Not found' });
});
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  products[index] = { id: +req.params.id, ...req.body };
  res.json(products[index]);
});
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== +req.params.id);
  res.status(204).send();
});

// SPA route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
