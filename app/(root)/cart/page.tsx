'use client'
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
import { useContext, useMemo, useState, useEffect } from "react";
import { CartContext } from "@/app/Context/CartContext";
import { Product } from "@/constants/product";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { Rating } from "@mui/material";
import CartRow from "@/components/Cart/CartRow";
interface productPage extends Product {
    quantity: number;
}

const Page = () => {
    const cartContext = useContext(CartContext);
    const cart = useMemo(() => cartContext ? cartContext.cart : [], [cartContext]);
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<productPage[] | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch("http://localhost:3000/api/products/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cart }),
            });
            if (res.ok) {
                const data = await res.json();
                // Initialize `quantity` field here
                const productsWithQuantity = data.data.map((product: Product) => ({
                    ...product,
                    quantity: 1,
                }));
                setProducts(productsWithQuantity);
                setLoading(false);
            }
        };
        if (cart.length > 0) {
            getProducts();
        } else {
            setLoading(false);
        }
    }, [cart]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!products) {
        return <div>Error in fetching products</div>;
    }

    const plusQuantity = (_id: string) => {
        setProducts((prev) =>
            prev!.map((product) =>
                product._id === _id
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        );
    };

    const minusQuantity = (_id: string) => {
        setProducts((prev) =>
            prev!.map((product) =>
                product._id === _id && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };

    return (
        <main className="container mx-auto gap-4 flex flex-col lg:flex-row pt-24 min-h-screen">
            <div>
                {products.map((product)=>(
                <CartRow key={product._id} product={product} plusQuantity={plusQuantity} minusQuantity={minusQuantity}/>
            ))}
            </div>
            <div className="flex w-full justify-center bg-red-500">

            </div>
        </main>
    );
};

export default Page;
