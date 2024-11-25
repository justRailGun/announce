export const CATEGORY ={
     pc :'Electronics & Computers',
     shirt :'Fashion & Accessories',
     kitchen:'Home & Kitchen',
     beauty:'Beauty & Personal Care',
     health :'Health & Wellness',
     game :'Toys & Games',
     sport :'Sports & Outdoors', 
     book:'Books & Media',
}

export const arrayCategory: Array<"Real Estate" | "Clothing" | "Product" | "Vehicule" | "Furniture"> = [
     "Real Estate",
     "Clothing",
     "Product",
     "Vehicule",
     "Furniture"
   ];
import { Building, Home, Store , Car, Truck, Bike,Footprints ,SendToBack, Luggage, Briefcase, Shirt, Sofa, BedSingle, Armchair } from "lucide-react";

export const categoryItems : Record<
"Real Estate" | "Clothing" | "Product" | "Vehicule"| "Furniture",
{ title: string; icon: React.ElementType }[]
> = {
  "Real Estate": [
    { title: "Villa", icon: Home },
    { title: "House", icon: Home },
    { title: "Flat", icon: Building },
    { title: "Apartment", icon: Building },
    { title: "Office", icon: Briefcase },
    { title: "Shop", icon: Store },
  ],
  "Clothing": [
    { title: "Shirt", icon: Shirt },
    { title: "Pant", icon: Shirt },
    { title: "Jacket", icon: Shirt },
    { title: "Shoes", icon: Footprints },
    { title: "Bag", icon: Luggage },
    { title: "Accessory", icon: SendToBack },
  ],
  "Product": [
    { title: "Small Product", icon: Sofa }, 
    { title: "Clothe", icon: Shirt },
    { title: "Shop", icon: Store },
  ],
  "Vehicule": [
    { title: "Car", icon: Car },
    { title: "Motorcycle", icon: Bike },
    { title: "Bicycle", icon: Bike },
    { title: "Truck", icon: Truck },
  ],
   "Furniture" : [
    { title: "Sofa", icon: Sofa },
    { title: "Chair", icon: Armchair },
    { title: "Table", icon:  BedSingle},
   ],
};

