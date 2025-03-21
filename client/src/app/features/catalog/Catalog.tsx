 
import { useEffect, useState } from "react";
import { Product } from "../../models/product" 
import ProductList from "./ProductList";

   
function Catalog() { 
   
  const [products, setProducts] = useState<Product[]>([]) 
 
   useEffect(()=>{
     fetch("https://localhost:5001/api/products/")
     .then(response => response.json())
     .then(data => setProducts(data))  
   }, [])

  return (
    <>      
        <ProductList products={products}/>
    </>
  )
}

export default Catalog