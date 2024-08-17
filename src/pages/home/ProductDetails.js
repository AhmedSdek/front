import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetproductByIdQuery } from '../../Redux/Products'
import { Badge, Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { addToCart, decreaseQuantity, increaseQuantity } from '../../Redux/CartSlice'
import { useTheme } from '@emotion/react'

function ProductDetails() {
    const { id } = useParams()
    const { data, error, isLoading } = useGetproductByIdQuery(id)
    const { SelectedProductsID, SelectedProducts } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const productQuant = (id) => {
        const myProduct = SelectedProducts.find((item) => {
            return item.id === id
        })
        return myProduct.quantity
    }
    const them = useTheme()
    const [image, setImage] = useState(0);
    if (data) {
        return (
            <Stack sx={{ minHeight: 'calc(100vh - 102px)', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>

                <Card sx={{ display: 'flex', justifyContent: 'center', width: '80%', height: '80%', padding: '40px 20px', gap: 2, flexDirection: { xs: 'column', md: 'row', alignItems: 'center' } }}>
                    <Box sx={{ width: { md: '35%', xs: '300px' } }}>
                        <img style={{ borderRadius: '10px', width: '100%', height: '100%' }} src={data.imageLink[image]} alt='' />
                    </Box>

                    <Box sx={{ width: { xs: '100%', md: '65%' }, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: { xs: '100%' } }}>
                            <Stack sx={{ flexDirection: { md: 'row', xs: 'column' }, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>
                                    {data.productName}
                                </Typography>
                                <Typography color={them.palette.error.dark}>
                                    {data.price} $
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                                {data.description}
                            </Typography>
                        </CardContent>
                        <Stack sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 2, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                            {data.imageLink.map((img, index) => {
                                return (
                                    <img onClick={(e) => {
                                        setImage(index)
                                    }} style={{ width: '100px', height: '100px', cursor: 'pointer' }} key={index} src={img} alt='' />
                                )
                            })}

                        </Stack >
                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }} disableSpacing>
                            {
                                SelectedProductsID.includes(data.id) ?
                                    <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                                        <IconButton onClick={(e) => {
                                            dispatch(increaseQuantity(data))
                                        }}>
                                            <Add />
                                        </IconButton>
                                        <Badge color="primary" badgeContent={productQuant(data.id)} />
                                        <IconButton onClick={(e) => {
                                            dispatch(decreaseQuantity(data))
                                        }}>
                                            <Remove />
                                        </IconButton>
                                    </Stack>
                                    :
                                    <Button onClick={(e) => {
                                        dispatch(addToCart(data));
                                    }
                                    } sx={{ p: '5px' }} variant='contained'>
                                        Add to Cart
                                    </Button>
                            }

                        </CardActions>
                    </Box>
                </Card>

            </Stack>
        )
    }
}

export default ProductDetails