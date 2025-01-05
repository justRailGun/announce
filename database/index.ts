
import BaseProduct from "./products/baseProducts.model"
import Category from "./category.model"
import SubCategory from "./subCategory.model"
import Comment from "./comment.model"
import User from "./user.model"
import Shop from "./shop.model"
import Furniture from "./products/furniture.model"
import Clothe from "./products/clothe.model"
import RealEstate from "./products/realEstate.model"
import Vehicule from "./products/vehicule.model"
import Transaction from "./transaction.model"
export {
    Category ,
    SubCategory ,
    Comment ,
    User ,
    BaseProduct ,
    Shop,
    Furniture,
    Clothe,
    RealEstate,
    Vehicule,
    Transaction,
}

export const getSchemaModel = (value : string) =>{
    switch (value.toLowerCase().replaceAll(" ", "")) {
        case 'baseproduct' : return BaseProduct
        case "categoryschema" : return Category
        case "subcategoryschema" : return SubCategory
        case "comment" : return Comment
        case "userschema" : return User
        case "shopschema" : return Shop
        case "furniture" : return Furniture
        case "clothe" : return Clothe
        case "realestate" : return RealEstate
        case "vehicule" : return Vehicule
        case "transaction" : return Transaction
        default : return null
    }
}