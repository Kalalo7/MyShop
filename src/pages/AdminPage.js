import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { seedProducts } from '../utils/seedProducts';
import { uploadToCloudinary } from '../config/cloudinary';

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#007bff' : 'transparent'};
  color: ${props => props.active ? '#007bff' : '#555'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #007bff;
  }
`;

const ProductForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  
  input {
    margin-right: 0.5rem;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0069d9;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #f8f9fa;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-right: 1rem;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 2px solid #eee;
  color: #555;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.delete ? '#dc3545' : '#007bff'};
  cursor: pointer;
  margin-right: 1rem;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const SeedButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: #218838;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const AdminPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [featured, setFeatured] = useState(false);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (!currentUser || !currentUser.email.includes('admin')) {
      navigate('/');
      return;
    }
    
    fetchProducts();
  }, [currentUser, navigate]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImageFile(null);
    setFeatured(false);
    setEditingProduct(null);
    setFormError('');
  };

  const handleSeedProducts = async () => {
    if (window.confirm('Are you sure you want to add sample products to the database?')) {
      
    try {
      setLoading(true);
      const result = await seedProducts();
      if (result.success) {alert(`Successfully added ${result.count} sample products!`);
      // Refresh the product list
      fetchProducts();
    } else {
      alert(`Failed to seed products: ${result.error}`);
    }
  } catch (error) {
    console.error('Error seeding products:', error);
    alert('An error occurred while seeding products.');
    } finally {
      setLoading(false);
    }
  }
};

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setCategory(product.category);
    setFeatured(product.featured || false);
    setActiveTab('add');
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        setProducts(products.filter(product => product.id !== productId));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Validation
    if (!name || !description || !price || !category) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setFormError('Price must be a positive number');
      return;
    }
    
    try {
      setFormLoading(true);
      
      let imageUrl = editingProduct?.imageUrl || '';
      
      // Upload image if a new one is selected
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      } else if (!editingProduct) {
        setFormError('Please select an image');
        setFormLoading(false);
        return;
          }
      
      const productData = {
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl,
        featured,
        updatedAt: new Date().toISOString()
      };
      
      if (editingProduct) {
        // Update existing product
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
        setProducts(products.map(p => 
          p.id === editingProduct.id ? { ...p, ...productData } : p
        ));
        alert('Product updated successfully!');
      } else {
        // Add new product
        productData.createdAt = new Date().toISOString();
        const docRef = await addDoc(collection(db, 'products'), productData);
        setProducts([...products, { id: docRef.id, ...productData }]);
        alert('Product added successfully!');
      }
      
      resetForm();
      setActiveTab('list');
    } catch (error) {
      console.error('Error saving product:', error);
      setFormError('Failed to save product. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <AdminContainer>
      <Title>Admin Dashboard</Title>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'list'} 
          onClick={() => {
            setActiveTab('list');
            resetForm();
          }}
        >
          Product List
        </Tab>
        <Tab 
          active={activeTab === 'add'} 
          onClick={() => {
            setActiveTab('add');
            if (editingProduct) resetForm();
          }}
        >
          {editingProduct ? 'Edit Product' : 'Add Product'}
        </Tab>
      </TabsContainer>
      
      {activeTab === 'list' && (
        <div style={{ textAlign: 'right' }}>
          <SeedButton onClick={handleSeedProducts} disabled={loading}>
            {loading ? 'Processing...' : 'Add Sample Products'}
          </SeedButton>
        </div>
      )}
      
      {activeTab === 'add' ? (
        <ProductForm onSubmit={handleSubmit}>
          {formError && <p style={{ color: '#dc3545', marginBottom: '1rem' }}>{formError}</p>}
          
          <FormGroup>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="description">Description *</Label>
            <TextArea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="category">Category *</Label>
            <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home & Kitchen</option>
              <option value="beauty">Beauty & Personal Care</option>
              <option value="sports">Sports & Outdoors</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="image">Product Image {!editingProduct && '*'}</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              required={!editingProduct}
            />
            {editingProduct && !imageFile && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Leave empty to keep the current image
              </p>
            )}
          </FormGroup>
          
          <FormGroup>
            <Checkbox>
              <input
                id="featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <Label htmlFor="featured" style={{ display: 'inline', marginBottom: 0 }}>
                Featured Product
              </Label>
            </Checkbox>
          </FormGroup>
          
          <ButtonGroup>
            <SubmitButton type="submit" disabled={formLoading}>
              {formLoading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
            </SubmitButton>
            <CancelButton type="button" onClick={() => {
              resetForm();
              setActiveTab('list');
            }}>
              Cancel
            </CancelButton>
          </ButtonGroup>
        </ProductForm>
      ) : (
        <>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <ProductTable>
              <thead>
                <tr>
                  <TableHeader>Image</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Price</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Featured</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <ProductImage src={product.imageUrl} alt={product.name} />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.featured ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <ActionButton onClick={() => handleEditProduct(product)}>
                        Edit
                      </ActionButton>
                      <ActionButton delete onClick={() => handleDeleteProduct(product.id)}>
                        Delete
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
                {products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan="6" style={{ textAlign: 'center' }}>
                      No products found. Add some products to get started.
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </ProductTable>
          )}
        </>
      )}
    </AdminContainer>
  );
};

export default AdminPage;