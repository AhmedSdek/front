import { Add, Remove } from '@mui/icons-material'
import { Badge, Button, Card, Divider, IconButton, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, deleteProduct, increaseQuantity } from '../../Redux/CartSlice'

function Cart() {
    const { SelectedProducts } = useSelector((state) => state.cart)
    // console.log(SelectedProducts)
    const dispatch = useDispatch()
    let total = 0
    return (
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
            Cart
            <Stack sx={{ gap: 2, width: { xs: '95%', sm: '85%', md: '60%' } }}>
                {SelectedProducts.map((item, index) => {
                    total += item.price * item.quantity
                    return (
                        <Card key={index} sx={{ width: '100%', padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <Button onClick={(e) => {
                                dispatch(deleteProduct(item))
                            }} color='error'>
                                delete
                            </Button>
                            <Typography>
                                {item.price * item.quantity} $
                            </Typography>
                            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>

                                <IconButton onClick={(e) => {
                                    dispatch(increaseQuantity(item))
                                }}>
                                    <Add />
                                </IconButton>
                                <Badge color="primary" badgeContent={item.quantity} />
                                <IconButton onClick={(e) => {
                                    dispatch(decreaseQuantity(item))
                                }}>
                                    <Remove />
                                </IconButton>
                            </Stack>
                            <Typography>{item.productName}</Typography>
                            <img style={{ width: '50px', height: '50px' }} src={item.imageLink[0]} alt='' />
                        </Card>
                    )
                })}
            </Stack>
            <Paper sx={{ padding: '20px 10px ', margin: '10px 0 0', width: { lg: '30%', xs: '95%', sm: '70%', md: '50%' }, textAlign: 'center' }}>
                <Typography>
                    Cart Total
                </Typography>
                <Divider />
                <Typography>
                    {total} $
                </Typography>
                <Button variant='contained' fullWidth>
                    puy
                </Button>
            </Paper>
        </Stack>
    )
}

export default Cart