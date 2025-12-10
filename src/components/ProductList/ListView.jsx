import React from 'react';
import './ListView.scss';

const ListView = ({ products, onEdit }) => {
  return (
    <div className="list-view">
      <table className="products-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td data-label="Product Name">
                <div className="product-name">
                  <span className="name">{product.name}</span>
                  {product.description && (
                    <span className="description">{product.description}</span>
                  )}
                </div>
              </td>
              <td data-label="Price">
                <span className="price">${product.price.toFixed(2)}</span>
              </td>
              <td data-label="Category">
                <span className="category-badge">{product.category}</span>
              </td>
              <td data-label="Stock">
                <span className={`stock ${product.stock === 0 ? 'out-of-stock' : product.stock < 20 ? 'low-stock' : ''}`}>
                  {product.stock} units
                </span>
              </td>
              <td data-label="Actions">
                <button 
                  className="btn-edit"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
