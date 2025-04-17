import React, { useState } from 'react';
import '../style.css';

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [role, setRole] = useState('customer'); // 'manager' or 'customer'

  const addItem = (e) => {
    e.preventDefault();
    if (itemName.trim() === '' || itemPrice.trim() === '') return;
    setMenuItems([...menuItems, { name: itemName, price: itemPrice }]);
    setItemName('');
    setItemPrice('');
  };

  const deleteItem = (index) => {
    const newItems = [...menuItems];
    newItems.splice(index, 1);
    setMenuItems(newItems);
  };

  return (
    <div className="manager-container">
      <nav className="navbar">
        <div className="logo">🍽️ Restaurant Menu Manager</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Menu</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <select
          className="role-selector"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Customer View</option>
          <option value="manager">Manager View</option>
        </select>
      </nav>

      {/* Role Card */}
      <div className="role-card">
        <h2>{role === 'manager' ? 'Manager View' : 'Customer View'}</h2>
        <p>
          {role === 'manager'
            ? 'You can add, edit, and delete menu items.'
            : 'Browse the menu and enjoy your meal!'}
        </p>
      </div>

      {role === 'manager' && (
        <form className="menu-form" onSubmit={addItem}>
          <input
            type="text"
            placeholder="Item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <button type="submit">Add Item</button>
        </form>
      )}

      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <div className="menu-card" key={index}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            {role === 'manager' && (
              <button className="delete-btn" onClick={() => deleteItem(index)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManager;