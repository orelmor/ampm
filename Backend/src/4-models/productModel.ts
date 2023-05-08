
class ProductModel{

    public code: number
    public name: string
    public manefactureDate : string
    public expireDate : string
    public categoryId: number
    public price: string
    public categoryName:string

    public constructor(prod:ProductModel){
        this.code = prod.code
        this.name = prod.name
        this.manefactureDate = prod.manefactureDate
        this.expireDate = prod.expireDate
        this.categoryId = prod.categoryId
        this.price = prod.price
        this.categoryName = prod.categoryName
    }
}


export default ProductModel