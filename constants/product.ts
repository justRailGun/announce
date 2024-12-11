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
  }