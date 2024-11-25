import { z } from 'zod'

export const SignInSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please provide a valid email address." }),
  
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long. " })
      .max(100, { message: "Password cannot exceed 100 characters." }),
  });
  
  export const SignUpSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." })
      .max(30, { message: "Username cannot exceed 30 characters." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores.",
      }),
  
    name: z
      .string()
      .min(1, { message: "Name is required." })
      .max(50, { message: "Name cannot exceed 50 characters." })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Name can only contain letters and spaces.",
      }),
  
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Please provide a valid email address." }),
  
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(100, { message: "Password cannot exceed 100 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
  });

export const ShopSchema = z.object({
    name: z.string().min(2).max(50),
    description : z.string().min(2).max(50),
    location : z.string().min(2).max(10),
    adress: z.string().min(2).max(50),
    phone: z.string().min(2).max(50).regex(/^[0-9]+$/),
  })

export const ProductSchema = z.object({
    name: z.string().min(2).max(50),
    description : z.string().min(2).max(500),
    price: z.string().min(1).max(1000),
    category: z.string().min(2).max(50),
})


export const ClothesSchema = ProductSchema.extend({
    type: z.string().min(2).max(50),
    size: z.string().max(50),
    color: z.string().min(2).max(50),
    brand: z.string().min(2).max(50),
    materiel: z.string().min(2).max(50),
})

export const SmallProductSchema = ProductSchema.extend({
    type: z.string().min(2).max(50),
    brand: z.string().min(2).max(50),
    model: z.string().min(2).max(50),
    state: z.string().min(2).max(50),
})

export const RealEstateSchema = ProductSchema.extend({
    location: z.string().min(2).max(50),
    bedrooms: z.string().min(1).max(2),
    bathrooms: z.string().min(1).max(2),
    surface: z.string().min(1).max(20),
    floors: z.string().min(1).max(2),
})

export const VehiculeSchema = ProductSchema.extend({
    brand: z.string().min(2).max(50),
    model: z.string().min(2).max(50),
    color: z.string().min(2).max(50),
    date: z.string().min(2).max(50),
    fuel: z.string().min(2).max(50),
    mileage: z.string().min(2).max(50),
    power: z.string().min(2).max(50),
})

export const FurnitureSchema = ProductSchema.extend({
    type: z.string().max(50),
    size: z.string().max(50),
    materiel: z.string().max(50),
})