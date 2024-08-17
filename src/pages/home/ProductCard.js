import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Badge, Button, Stack } from '@mui/material';
import { useGetproductsByNameQuery } from '../../Redux/Products';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity, increaseQuantity } from '../../Redux/CartSlice';
import { Add, Remove } from '@mui/icons-material';
import { Link } from 'react-router-dom';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
function ProductCard() {
    const { data, error, isLoading } = useGetproductsByNameQuery()
    const [expanded, setExpanded] = React.useState(false);
    const them = useTheme()
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const dispatch = useDispatch()
    const { SelectedProductsID, SelectedProducts } = useSelector((state) => state.cart)
    const productQuant = (id) => {
        const myProduct = SelectedProducts.find((item) => {
            return item.id === id
        })
        return myProduct.quantity
    }
    // React.useEffect(() => {
    //     dispatch(addToCart(localStorage.getItem));

    // }, []);
    if (data) {
        return (
            <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                {
                    data.map((item) => {

                        return (
                            <Card key={item.id} sx={{ maxWidth: 280 }}>
                                <Link to={`/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <CardMedia
                                        component="img"
                                        height="277"
                                        image={item.imageLink[0]}
                                        alt=""
                                        sx={{ width: '100%', objectFit: 'inherit' }}
                                    />
                                    <CardContent>
                                        <Typography>
                                            {item.productName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </Link>

                                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }} disableSpacing>
                                    {
                                        SelectedProductsID.includes(item.id) ?
                                            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                                                <IconButton onClick={(e) => {
                                                    dispatch(increaseQuantity(item))
                                                }}>
                                                    <Add />
                                                </IconButton>
                                                <Badge color="primary" badgeContent={productQuant(item.id)} />
                                                <IconButton onClick={(e) => {
                                                    dispatch(decreaseQuantity(item))
                                                }}>
                                                    <Remove />
                                                </IconButton>
                                            </Stack>
                                            :
                                            <Button onClick={(e) => {
                                                dispatch(addToCart(item));
                                            }
                                            } sx={{ p: '5px' }} variant='contained'>
                                                Add to Cart
                                            </Button>
                                    }
                                    <Typography color={them.palette.error.dark}>
                                        {item.price} $
                                    </Typography>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </Stack>
        )

    }
    if (isLoading) {
        return (
            <>
                <Typography>
                    Loading
                </Typography>
            </>
        )
    }
}

export default ProductCard