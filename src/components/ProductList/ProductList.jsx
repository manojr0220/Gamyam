import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/slices/productsSlice';
import ListView from './ListView';
import CardView from './CardView';
import ViewToggle from './ViewToggle';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import ProductModal from '../ProductModal/ProductModal';
import './ProductList.scss';

const ProductList = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.items); 
  const [viewMode, setViewMode] = useState('card');   
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); 
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter products based on search
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  ); 
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Handlers
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmitProduct = (productData) => {
    if (editingProduct) {
      dispatch(updateProduct({ ...productData, id: editingProduct.id }));
    } else {
      dispatch(addProduct(productData));
    }
    handleCloseModal();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>Product Management</h1>
        <button className="btn-add" onClick={handleAddProduct}>
          + Add Product
        </button>
      </div>

      <div className="product-list-controls">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <ViewToggle 
          viewMode={viewMode}
          onChange={setViewMode}
        />
      </div>

      <div className="product-list-info">
        <p>Showing {currentProducts.length} of {filteredProducts.length} products</p>
      </div>

      <div className="product-list-content">
        {currentProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found</p>
          </div>
        ) : (
          viewMode === 'list' ? (
            <ListView 
              products={currentProducts}
              onEdit={handleEditProduct}
            />
          ) : (
            <CardView 
              products={currentProducts}
              onEdit={handleEditProduct}
            />
          )
        )}
      </div>

      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredProducts.length}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={editingProduct}
          onSubmit={handleSubmitProduct}
        />
      )}
    </div>
  );
};

export default ProductList;
