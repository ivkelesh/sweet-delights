"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Container
} from "@mui/material";
import {getFillings} from "@/utils/httpRequests";
import Box from "@mui/material/Box";

const Fillings = () => {
    const [products, setProducts] = useState([]);

    const fetchFillings = async () => {

        const res = await getFillings();
        const data = await res
            .json()
            .catch((e) => console.log("Error: ", e.message));
        setProducts(data);
    };

    useEffect(() => {
        fetchFillings();
    }, [] );

    return (
        <Container maxWidth="lg" style={{ marginTop: '9rem', marginBottom: '4rem' }}>
            <Box justifyContent="center" marginX="170px">
                <Grid container spacing={4} justifyContent="center">
                    {products.map((product) => (
                        <Grid key={product.title} item xs={12} sm={6} md={4}>
                            <Card style={{ padding: '10px', width: '320px'}}>
                                <CardMedia component="img" height="220" image={product.imageUrl} alt={product.title} />
                                <CardContent style={{ textAlign: 'center' }}>
                                    <Typography variant="h6" gutterBottom>
                                        <Link href={`/product/${product.id}`} passHref>
                                            <p style={{ textDecoration: 'none', color: 'inherit' }}>{product.title}</p>
                                        </Link>
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {`Price per KG: ${product.pricePerKg} MDL`}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Fillings;
