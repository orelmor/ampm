import { Button } from "react-bootstrap";
import "./AddProduct.css";
import ProductModel from "../../../Models/ProductModel";
import { useForm } from "react-hook-form";
import productService from "../../../Services/ProductService";
import { useEffect, useState } from "react";
import CategoryModel from "../../../Models/CategoryModel";
import { useNavigate } from "react-router-dom";


function AddProduct(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<ProductModel>()
    const [categories, setCategories] = useState<CategoryModel[]>([])
    const navigate = useNavigate()


    useEffect(() => {
        productService.getAllCategories()
            .then(category => setCategories(category))
            .catch(err => alert(err))

    }, [])


    async function send(prod: ProductModel) {
        try {
            await productService.postNewProduct(prod)
            navigate('/home')


        } catch (err: any) {
            alert(err)
        }

    }

    return (
        <div className="AddProduct">
            <h2>Add products</h2>
            <form onSubmit={handleSubmit(send)}>

                <label >Name:</label>
                <input type="text" {...register("name")} />

                <label>Exp Date:</label>
                <input type="datetime-local"  {...register("expireDate")} />

                <label>Man Date:</label>
                <input type="datetime-local"  {...register("manefactureDate")} />

                <label>Category: </label>
                <select {...register("categoryId")}>
                    {categories.map(category =>
                        <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                    )}
                </select>

                <label>Price:</label>
                <input type="number"  {...register("price")} />

               

                <input type="submit" className="sub" value="Add Product" />
            </form>

        </div>
    );
}

export default AddProduct;


