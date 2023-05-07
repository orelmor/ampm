class AppConfig {

 

}

class DevelopmentConfig extends AppConfig {
    public isDevelopment = true
    public isProduction = false
    // Database: 
    public host = "localhost"; // Computer name/address of our database
    public user = "root"; // Database user
    public password = ""; // Database password
    public database = "am:pm"; // Database name

    // Server port: 
    public port = 3001;


}

class ProductionConfig extends AppConfig {

    public isDevelopment = false
    public isProduction = true
    // Database: 
    public host = ""; // Computer name/address of our database
    public user = ""; // Database user
    public password = ""; // Database password
    public database = ""; // Database name

    // Server port: 
    public port = 0;
}



const appConfig = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig()

export default appConfig;