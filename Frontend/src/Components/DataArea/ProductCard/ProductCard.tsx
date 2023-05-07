import { Button } from "react-bootstrap";
import ProductModel from "../../../Models/ProductModel";
import "./ProductCard.css";

interface ProductCardProps {
    product:ProductModel
	
}

function ProductCard(props: ProductCardProps): JSX.Element {
    return (
        <div className="ProductCard">
			{props.product.categoryName}
        </div>
    );
}

export default ProductCard;
