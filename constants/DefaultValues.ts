export const defaultValues = {
  Shop :{
    name: "",
    description: "",
    location: "",
    adress: "",
    phone: "",
  },
  Comment: {
    context: "",
    rating: "0",
  },
 Clothe : {
    size :"",
    color :'',
    brand :'',
    materiel :'',
  }
,
"Real Estate" :{
    location :'',
    bedrooms :'',
    bathrooms :'',
    surface :'',
    floors :'',
  },

// smallproduct :{
//     brand :'',
//     model :'',
//     state :"" ,
//   },

 Vehicule : {
    brand :'',
    model :'',
    color :'',
    date :"",
    fuel :"",
    mileage :"",
    power :"",
  },

Furniture : {
    type :"",
    size :"",
    materiel :''
  }, 
  ShippingForm :{
    "User Information" :{
      name : "",
      email :"" ,
      phone : "",
    },
    "Shipping Adress" :{
      country : "",
      city : "",
      address : "",
      "Zip Code" : "",
  },
  "Delivery-Instructions" : "",
  }, 
}

export const getDefaultValues = (value: keyof typeof defaultValues) => {
    const defaultValue = defaultValues[value]
    return defaultValue
}