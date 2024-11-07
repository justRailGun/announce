import Store from "@/components/feed/Store";
import ShopSlider from "@/components/Shop/ShopSlider";

export default function Home() {
  return (
    <>
      <ShopSlider />
      <div className="flex container min-h-screen mx-auto">
         <Store />
      </div>
     
   </>
  );
}
