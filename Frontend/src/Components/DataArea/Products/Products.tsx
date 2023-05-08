import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import "./Products.css";
import ProductModel from "../../../Models/ProductModel";
import productService from "../../../Services/ProductService";
import { useForm } from "react-hook-form";
import CategoryModel from "../../../Models/CategoryModel";
import ProductCard from "../ProductCard/ProductCard";





function Products(): JSX.Element {

    const [products, setProducts] = useState<ProductModel[]>([])
    const [categories, setCategories] = useState<CategoryModel[]>([])



    useEffect(() => {
        productService.getAllCategories()
            .then(category => setCategories(category))
            .catch(err => alert(err))

        productService.gelAllProducts()
            .then(product => setProducts(product))
            .catch(err => alert(err))    
    }, [])

    async function showProducts(args: ChangeEvent<HTMLSelectElement>) {
        const value = +args.target.value
        productService.getProductsByCategory(value)
            .then(product => setProducts(product))
            .catch(err => alert(err))
    }


    return (
        <div className="Products">
            <h2>Products</h2>
            <label >Choose category: </label>
            <select defaultValue='' onChange={showProducts}>
                <option  value={0}>All products</option>
                {categories.map(category =>
                    <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                )}
            </select>
            <hr />

            <div className="product-grid">
            {products.map(product =>
                        <ProductCard key={product.code} product={product} />)}

            </div>
                    
            
        </div>
    );
}

export default Products;
