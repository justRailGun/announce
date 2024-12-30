import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Store, ArrowLeft, Shirt, Car, Building, Package, Sofa } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CreateForm from "./forms/createForm";

type CategoryKeys = "clothes" | "real-estate" | "vehicle" | "product" | "furniture"; // Étape 1 : Déclare le type

export default function ModalTrigger({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopChoosed, setShopIsChoosed] = useState(false);
  const [isProductChoosed, setProductIsChoosed] = useState(false);
  const [isCategoryChoosed, setCategoryIsChoosed] = useState<CategoryKeys | null>(null); // Étape 2

  const handleShopChoose = useCallback(() => setShopIsChoosed(true), []);
  const handleAnnounceChoose = useCallback(() => setProductIsChoosed(true), []);
  const handleArrowLeft = useCallback(() => {
    setShopIsChoosed(false);
    setProductIsChoosed(false);
    setCategoryIsChoosed(null);
  }, []);
  const handleCategoryChoose = useCallback((value: CategoryKeys) => setCategoryIsChoosed(value), []);



  const selectedCategory = isCategoryChoosed ? categoryConfig[isCategoryChoosed] : null; // Étape 3

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-4 py-2 rounded-lg btn-secondary flex flex-row gap-4 items-center text-black dark:text-white"
          size="lg"
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
          {!isShopChoosed && !isProductChoosed && (
            <DialogDescription>Choose an option to continue</DialogDescription>
          )}
          {isShopChoosed && <DialogDescription>Fill The Form to Create Your Own Shop</DialogDescription>}
          {isProductChoosed && !selectedCategory &&<DialogDescription>Choose The Category to Conitnue</DialogDescription>}
          {isProductChoosed && selectedCategory && <DialogDescription>Fill The Form to Create Your Own <span className="capitalize">{isCategoryChoosed}</span> </DialogDescription>}
        </DialogHeader>

        {isShopChoosed ? (
          <CreateForm
            defaultValues={ShopDefaultValues}
            fetchApi="/api/create/shop"
            SchemaType={ShopSchema}
          />
        ) : (isProductChoosed && selectedCategory) ? (
          <CreateForm
            defaultValues={selectedCategory.defaultValues}
            fetchApi={selectedCategory.fetchApi}
            SchemaType={selectedCategory.schema}
          />
        ) : (
          <>
            {isProductChoosed && (
              <div className="flex gap-4 py-4">
                <Button className="w-full" onClick={() => handleCategoryChoose("clothes")}>
                  Clothes <Shirt className="ml-2" />
                </Button>
                <Button
                  className="w-full"
                  onClick={() => handleCategoryChoose("real-estate")}
                  variant="outline"
                >
                  Real Estate <Building className="ml-2" />
                </Button>
                <Button className="w-full" onClick={() => handleCategoryChoose("vehicle")}>
                  Vehicule <Car className="ml-2" />
                </Button>
                <Button
                  className="w-full"
                  onClick={() => handleCategoryChoose("product")}
                  variant="outline"
                >
                  Product <Package className="ml-2" />
                </Button>
                <Button
                  className="w-full"
                  onClick={() => handleCategoryChoose("furniture")}
                  variant="outline"
                >
                  Furniture <Sofa className="ml-2" />
                </Button>
              </div>
            )}

            {!isProductChoosed && (
              <div className="flex gap-4 py-4">
                <Button className="w-full" onClick={handleShopChoose}>
                  Shop <Store className="ml-2" />
                </Button>
                <Button className="w-full" onClick={handleAnnounceChoose} variant="outline">
                  Announce
                </Button>
              </div>
            )}
          </>
        )}

        {(isShopChoosed || isProductChoosed) && (
          <ArrowLeft
            aria-label="Go back"
            onClick={handleArrowLeft}
            className="mx-auto cursor-pointer hover:scale-110"
            size={20}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
