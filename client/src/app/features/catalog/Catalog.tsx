 
 
import ProductList from "./ProductList";
import { useFetchProductDetailsQuery } from "./catalogApi";

   
function Catalog() { 
const {data, isLoading} = useFetchProductDetailsQuery();

if(isLoading || !data) return <div> Loading...</div>

  return (
    <>      
        <ProductList products={data}/>
    </>
  )
}

export default Catalog