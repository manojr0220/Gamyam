import React from "react";
import "./CardView.scss";

const CardView = ({ products, onEdit }) => {
  return (
    <div className="card-view">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="card-header">
            <h3 className="product-title">{product.name}</h3>
            <span className="category-badge">{product.category}</span>
          </div> 
          <div className="card-body">
            <div className="price-section">
              <span className="price-label">Price</span>
              <span className="price">${product.price.toFixed(2)}</span>
            </div> 
            <div className="stock-section">
              <span className="stock-label">Stock</span>
              <span
                className={`stock ${
                  product.stock === 0
                    ? "out-of-stock"
                    : product.stock < 20
                    ? "low-stock"
                    : ""
                }`}
              >
                {product.stock} units
              </span>
            </div>

            {product.description && (
              <p className="description">{product.description}</p>
            )}
          </div> 
          <div className="card-footer">
            <button className="btn-edit" onClick={() => onEdit(product)}>
              Edit Product
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;
