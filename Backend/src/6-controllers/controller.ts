import express, { Request, Response, NextFunction } from "express";
import logic from "../5-logic/logic";
import ProductModel from "../4-models/productModel";
import verifyLoggedIn from "../3-middleware/verify-loggedIn";
import verifyAdmin from "../3-middleware/verify-admin";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/_____
router.get("/categories", [verifyAdmin],async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await logic.getAllCategories()
        response.json(categories).sendStatus(200)
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/_____
router.get("/products",[verifyLoggedIn], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await logic.getAllProducts()
        response.json(products).sendStatus(200)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/products/:category", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const category = +request.params.category
        const products = await logic.getProductsByCategory(category)
        response.json(products).sendStatus(200)
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const product = new ProductModel(request.body)
       const addedProduct = await logic.addNewProducts(product)
       response.status(201).json(addedProduct)

    }
    catch (err: any) {
        next(err);
    }
});


router.delete("/products/delete/:prodCodeToDelete", async (request: Request, response: Response, next: NextFunction) => {
    try {
      const codeToDelete = +request.params.prodCodeToDelete 
      await logic.deleteProduct(codeToDelete)
      response.status(204).json("Deleted succefully!")
      console.log("hello")

    }
    catch (err: any) {
        next(err);
    }
});




export default router;