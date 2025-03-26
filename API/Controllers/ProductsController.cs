using API.Data;
using API.Entities; 
using Microsoft.AspNetCore.Mvc; 

namespace API.Controllers
{ 
    public class ProductController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public ActionResult<List<Product>> GetProducts()
        {
            return context.Products.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = context.Products.Find(id);

            if(product == null){
                return NotFound();
            }

            return product;


        }
    }
}
