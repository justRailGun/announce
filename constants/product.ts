export interface Product {
    name: string;
    category : {
        name : string ;
        slug : string ; 
        _id: string ; 
    } ;
    "Sub-Category" : {
        name : string ;
        slug : string ;
        _id : string ; 
        parentCategory : string ;
    } ;
    description: string;
    price: number;
    rating?: number;
    numberOfRatings?: number;
    image: string;  // or `string[]` if it’s an array of URLs
    _id : string ;
    quantity : number ;
    user : {
        name : string ;
        _id : string ;
        image : string ;
        email : string ;
        role : "admin" | "user" ;
    }
  }

export interface Transaction {
    "User Information" : {
      name : string ;
      email : string  ;
      phone : string ;
    }
    products : Product[] ;
    "Shipping Adress" : {
      address : string ;
      city : string ;
      "Zip Code" : string ;
      country : string ;
    }
    userId : string ;
    totalCost : number ;
    createdAt : string ;
    quantity : number[] ;
}