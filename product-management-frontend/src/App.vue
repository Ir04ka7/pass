<!-- frontend/src/App.vue -->
<template>
  <div class="app">
    <header>
      <h1>Product Management System</h1>
    </header>
    
    <main>
      <router-view />
    </main>
    
    <footer>
      <p>&copy; 2025 Product Management System</p>
    </footer>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
}

main {
  flex: 1;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>