import React, { useState, useEffect } from 'react';
import './ProductForm.scss';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        description: product.description || '',
      });
    }
  }, [product]);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Product name is required';
        }
        if (value.trim().length < 2) {
          return 'Product name must be at least 2 characters';
        }
        return '';

      case 'price':
        if (!value) {
          return 'Price is required';
        }
        const priceNum = parseFloat(value);
        if (isNaN(priceNum)) {
          return 'Price must be a valid number';
        }
        if (priceNum <= 0) {
          return 'Price must be greater than 0';
        }
        return '';

      case 'category':
        if (!value.trim()) {
          return 'Category is required';
        }
        if (value.trim().length < 2) {
          return 'Category must be at least 2 characters';
        }
        return '';

      case 'stock':
        if (value === '') {
          return '';
        }
        const stockNum = parseInt(value, 10);
        if (isNaN(stockNum)) {
          return 'Stock must be a valid number';
        }
        if (stockNum < 0) {
          return 'Stock cannot be negative';
        }
        return '';

      case 'description':
        if (value && value.length > 500) {
          return 'Description must be less than 500 characters';
        }
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    const submitData = {
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      category: formData.category.trim(),
      stock: formData.stock ? parseInt(formData.stock, 10) : 0,
      description: formData.description.trim(),
    };

    onSubmit(submitData);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name" className="required">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.name && touched.name ? 'error' : ''}
          placeholder="Enter product name"
        />
        {errors.name && touched.name && (
          <span className="error-message">{errors.name}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price" className="required">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.price && touched.price ? 'error' : ''}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
          {errors.price && touched.price && (
            <span className="error-message">{errors.price}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.stock && touched.stock ? 'error' : ''}
            placeholder="0"
            min="0"
          />
          {errors.stock && touched.stock && (
            <span className="error-message">{errors.stock}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category" className="required">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.category && touched.category ? 'error' : ''}
          placeholder="Enter category"
        />
        {errors.category && touched.category && (
          <span className="error-message">{errors.category}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.description && touched.description ? 'error' : ''}
          placeholder="Enter product description (optional)"
          rows="4"
        />
        <div className="char-count">
          {formData.description.length} / 500 characters
        </div>
        {errors.description && touched.description && (
          <span className="error-message">{errors.description}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          {product ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
