import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { useEffect, useState } from 'react';
import { fetchProducts, type Products } from '../features/products/productSlice';

const ProductList = () => {
    const [searchProduct, setSearchProduct] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
    const { products, error, loading } = useSelector((state: RootState) => state.products);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchProduct(value);
         const filteredProductsFromList= products.filter(product => 
                product.title.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filteredProductsFromList);
    }
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const filteredProductsFromList= products.filter(product => 
                product.title.toLowerCase().includes(searchProduct.toLowerCase())
            );
            setFilteredProducts(prev => [...prev, ...filteredProductsFromList]);
        }
    }

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    return (
        <div>

            <div>
                <input type="text"
                    placeholder='Search Products...'
                    value={searchProduct}
                    style={{ padding: '10px', width: '300px', margin: '20px 0' }}
                    onChange={(e) => handleChange(e)}  
                    onKeyDown={(e) => {
                       handleEnter(e);}}
                />
            </div>

            {loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                    {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
                        <div key={product.id} style={{ border: '1px solid black', padding: '10px' }}>
                            <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
                            <h3>{product.title}</h3>
                            <p>${product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductList;