import axios from "axios";
import CategoryModel from "../Models/CategoryModel";
import appConfig from "../Utils/Config";
import ProductModel from "../Models/ProductModel";

class ProductService {

    async getAllCategories():Promise<CategoryModel[]> {

        const response = await axios.get<CategoryModel[]>(appConfig.categoriesUrl)
        const categories = response.data
        return categories
        
    }

    async getProductsByCategory(category:number):Promise<ProductModel[]>{

        const response = await axios.get<ProductModel[]>(appConfig.productsUrl + category)
        const products = response.data
        return products
    }

    async postNewProduct(product:ProductModel):Promise<void>{

        const response = await axios.post<ProductModel>(appConfig.productsUrl,product)

        const addedProduct = response.data

    }

    async deleteProduct(prodCodeToDelete:number):Promise<void>{
        
        await axios.delete(appConfig.productsUrl+`delete/${prodCodeToDelete}`)
    }

}

const dataService = new ProductService();

export default dataService;