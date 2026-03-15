import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "/api/v1";

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const loadUsers = () => {
    fetch(`${API_BASE_URL}/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }

  const loadProducts = () => {
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }

  useEffect(() => {
    loadUsers();
    loadProducts();
  }, []);

  const createUser = async () => {

    await fetch(`${API_BASE_URL}/users?name=${name}&email=${email}`, {
      method: "POST"
    });

    setName("");
    setEmail("");
    loadUsers();
  }

  const createProduct = async () => {

    await fetch(`${API_BASE_URL}/products?name=${productName}&price=${price}`, {
      method: "POST"
    });

    setProductName("");
    setPrice("");
    loadProducts();
  }

  return (
    <div className="container">

      <h1>Microservices Demo</h1>

      <div className="section">

        <h2>Create User</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button onClick={createUser}>Add User</button>

        <h3>Users</h3>

        {users.map(user => (
          <div className="card" key={user.id}>
            {user.name} - {user.email}
          </div>
        ))}

      </div>


      <div className="section">

        <h2>Create Product</h2>

        <input
          placeholder="Product Name"
          value={productName}
          onChange={e => setProductName(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <button onClick={createProduct}>Add Product</button>

        <h3>Products</h3>

        {products.map(product => (
          <div className="card" key={product.id}>
            {product.name} - ${product.price}
          </div>
        ))}

      </div>

    </div>
  );
}

export default App;