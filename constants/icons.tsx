import { House, Shirt, Car, Armchair } from "lucide-react";
import React from "react";

const getIcons = ({ name }: { name: string } ) : React.ReactNode => {
  switch (name.toLowerCase().replaceAll(' ', '-')) {
    case 'real-estate':
      return <House size={32}/>;
    case 'clothes':
      return <Shirt size={32}/>;
    case 'vehicule':
      return <Car size={32}/>;
    case 'furniture':
      return <Armchair size={32} />;
    default:
      return <House size={32}/>;
  }
};

export default getIcons;
