import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Product } from "../../models/product"
import { Link, NavLink } from "react-router-dom"

type Props = {
    product: Product
}

function ProductCard({product}: Props) {
  return (
    <Card
    sx={{width:280,
        borderRadius:2,
        display:'flex',
        flexDirection:'column',
        justifyContent: 'space-between'
    }}
    elevation={3}>
        <CardMedia 
            sx={{height: 240, backgroundSize: 'cover'}}
                image={product.pictureUrl}
                title={product.title} 
            />
            <CardContent>
                <Typography gutterBottom
                sx={{textTransform:'uppercase'}}
                variant="subtitle2"> 
                    {product.name}
                </Typography>
                <Typography
                variant="h6"
                sx={{color: 'secondary.main'}}>
                    ${(product.price/100).toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions
            sx={{justifyContent: 'space-between'}}>
                <Button> Add to Cart </Button>
                <Button component={Link} to={`/catalog/${product.id}`}> View </Button>
            </CardActions>
    </Card>
  )
}
export default ProductCard