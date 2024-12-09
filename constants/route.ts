export const ROUTES={
    HOME:'/',
    LOGIN:'/login',
    REGISTER:'/register', 
    CART:'/cart',
    CREATE:"/create/shop",
    PRODUCTSAPIPOST: "/api/products/create/",
    PRODUCTSGET:  '/api/products/',
    SHOPSPOST : '/api/shop/create',
    SHOPSGET :"/api/shop/"
}


export const CREATE_API={
    PRODUCTS(value:string){
        return `http://localhost:3000/api/create/${value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`
    },
}

export const GET_API={
    PRODUCTS(value:string){
        return `http://localhost:3000/api/products/${value.toLowerCase()}`
    },
}