import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import CategoryModel from "../4-models/categoryModel";
import ProductModel from "../4-models/productModel";
import { ResourceNotFoundErrorModel } from "../4-models/error-models";


async function getAllCategories(): Promise<CategoryModel[]> {

    const sql = `SELECT * FROM categories`

    const categories = await dal.execute(sql)

    return categories
}

async function getAllProducts():Promise<ProductModel[]> {
    const sql = `SELECT * FROM products`

    const products = await dal.execute(sql)
    return products
}

async function getProductsByCategory(category:number): Promise<ProductModel[]> {
    const sql = `
    SELECT P.*, C.categoryName
    FROM products AS P JOIN categories AS C
    ON P.categoryId = C.categoryId
    WHERE P.categoryId = ?
     
     `
     const products = await dal.execute(sql,[category])

     return products
}

async function addNewProducts(product:ProductModel):Promise<ProductModel>{

    const sql = `
        INSERT INTO products VALUES(DEFAULT,?,?,?,?,?)
    `
    const info:OkPacket = await dal.execute(sql,
        [product.name,product.manefactureDate,product.expireDate,product.categoryId,product.price])

    product.code = info.insertId

    return product
}

async function deleteProduct(codeToDelete:number):Promise<void>{

    const sql =`DELETE  FROM products WHERE code=?`

    const info:OkPacket = await dal.execute(sql,[codeToDelete])

    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(codeToDelete)


}


export default {
    getAllProducts,
    getAllCategories,
    getProductsByCategory,
    addNewProducts,
    deleteProduct
};
