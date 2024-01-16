"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Container,
  OutlinedInput,
  InputAdornment,
  Box,
} from '@mui/material';
import { PagedRequest } from '@/utils/interfaces';
import { getCakes } from '@/utils/httpRequests';
import Footer from '@/components/Footer/Footer';
import NavBar from '@/components/Navbar/NavBar';

const Cakes = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(6);

  const fetchCakes = async () => {

    var pagedRequest: PagedRequest = {
      pageNumber: currentPage,
      pageSize: productsPerPage
    };

    const res = await getCakes(pagedRequest);
    const data = await res.json().catch((e) => console.log('Error: ', e.message));
    setProducts(data.items);
    setTotalCount(data.totalItemCount);
  };

  useEffect(() => {
    fetchCakes();
  }, [currentPage, productsPerPage]);

  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleProductsPerPageChange = (event) => setProductsPerPage(event.target.value);

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
                    <Link href={`/product/${product.id}`} passHref>
                      <Button variant="contained" color="primary" component="a" style={{ marginTop: '15px', backgroundColor: '#6c2e00', color: 'white', }}>
                        Order
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Grid container justifyContent="center" alignItems="center" marginTop={4}>
          <Pagination
            count={Math.ceil(totalCount / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
          <FormControl style={{ marginLeft: '20px', minWidth: '120px' }}>
            <InputLabel shrink>Items per page</InputLabel>
            <Select
              value={productsPerPage}
              onChange={handleProductsPerPageChange}
              input={<OutlinedInput label="Products per page" />}
              startAdornment={<InputAdornment position="start">Show</InputAdornment>}
            >
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Container>
  );
};

export default Cakes;
