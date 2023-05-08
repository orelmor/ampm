import { Button } from "react-bootstrap";
import ProductModel from "../../../Models/ProductModel";
import "./ProductCard.css";

interface ProductCardProps {
    product: ProductModel

}

function ProductCard(props: ProductCardProps): JSX.Element {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src="path/to/product-image.jpg" alt="Product Image" />
            </div>
            <div className="product-info">
                <h2 className="product-name">{props.product.name}</h2>
                <p className="product-description">Category: {props.product.categoryName}</p>
                <p className="product-description">Manefacture Date: {props.product.manefactureDate}</p>
                <p className="product-description">Expiration Date: {props.product.expireDate}</p>
                <p className="product-price">{props.product.price}$</p>
                <button className="product-button">Add to Cart</button>
            </div>
        </div>
    );
}

export default ProductCard;
