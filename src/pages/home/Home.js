import React from 'react'
import MenuAppBar from './MenuAppBar'
import ProductCard from './ProductCard'
import { Container, Stack } from '@mui/material'

function Home() {
    return (
        <div>
            <Container>
                home
                <Stack >
                    <ProductCard />
                </Stack>
            </Container>
        </div>
    )
}

export default Home