export const SHOPS =[
    {
       id: 1 ,
       name : 'Samsung Store',
       bannerURL :'/images/banner.png',
       popularity : 1756,
       overallRating : 3.8,
       numberOfOrders : 1790,
       location : 'Korea - Seoul',
       phone : '+91 987654321',
       email : 'samsung@gmail.com',
       address : '123 Main Street, Bangalore',
       type : 'shop',
    },
    {
       id: 2 ,
       name : 'Apple Store',
       bannerURL :'/images/banner.png',
       popularity : 2458,
       overallRating : 4.2,
       numberOfOrders : 4789,
       location : 'Korea - Seoul',
       phone : '+91 987654321',
       email : 'apple@gmail.com',
       address : '123 Main Street, Bangalore',
       type : 'shop',
       category :["Headset","Laptop","Smartphone","Tablet","Watch" , "Mouse" , "Keyboard" , "Monitor" , "Storage", "Camera" , "Speakers" , "Headphones" , "Accessories"],
    },
    {
       id: 3 ,
       name : 'Google Store',
       bannerURL :'/images/banner.png',
       popularity : 5860,
       overallRating : 4.9,
       numberOfOrders : 4589,
       location : 'Korea - Seoul',
       phone : '+91 987654321',
       email : 'google@gmail.com',
       address : '123 Main Street, Bangalore',
       type : 'shop',
    },
    {
       id: 4 ,
       name : 'Hiscense Store',
       bannerURL :'/images/banner.png',
       popularity : 7593,
       overallRating : 5,
       numberOfOrders : 1440,
       location : 'Korea - Seoul',
       phone : '+91 987654321',
       email : 'samsung@gmail.com',
       address : '123 Main Street, Bangalore',
       type : 'shop',
    },
    {
       id: 5 ,
       name : 'Apple Store',
       bannerURL :'/images/banner.png',
       popularity : 7896,
       overallRating : 2.9,
       numberOfOrders : 6930,
       location : 'Korea - Seoul',
       phone : '+91 987654321',
       email : 'apple@gmail.com',
       address : '123 Main Street, Bangalore',
       type : 'shop',
    },
    {
       id: 6 ,
       name : 'Google Store',
       bannerURL :'/images/banner.png',
       popularity : 8420,
       overallRating : 4.7,
       numberOfOrders : 4850,
       location : 'Korea - Seoul',
       phone : '+91 987654321',
       email : 'google@gmail.com',
       address : '123 Main Street, Bangalore',
       type : 'shop',
    },  
]

export interface Shop {
    id: number;
    name: string;
    bannerURL: string;
    popularity: number;
    overallRating: number;
    numberOfOrders: number;
    location: string;
    phone: string;
    email: string;
    address: string;
    type : string;
    category : string[];
  }
export interface ShopCategory {
   category: string[];
  }