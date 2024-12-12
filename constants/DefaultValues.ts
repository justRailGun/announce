export const defaultValues = {
  Shop :{
    name: "",
    description: "",
    location: "",
    adress: "",
    phone: "",
  },
  Comment :{
    context :"" , 
    rating : 0,
  },
 Clothes : {
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
  }
}

export const getDefaultValues = (value: keyof typeof defaultValues) => {
    const defaultValue = defaultValues[value]
    return defaultValue
}