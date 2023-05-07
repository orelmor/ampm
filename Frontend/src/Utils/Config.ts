class Config {
    public productsUrl = "http://localhost:3001/api/products/";
    public categoriesUrl = "http://localhost:3001/api/categories/";
}

const appConfig = new Config(); // Singleton

export default appConfig;
