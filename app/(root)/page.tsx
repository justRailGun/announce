import Store from "@/components/feed/Store";
import ShopSlider from "@/components/Shop/ShopSlider";


const Home = async () => {


  return (
    <section className="max-xl:pt-24">
      <ShopSlider />
      <div className="flex container min-h-screen mx-auto">
         <Store  />
      </div>
   </section>
  );
}
export default Home ;