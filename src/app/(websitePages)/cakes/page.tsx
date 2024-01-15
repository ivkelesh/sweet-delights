"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
} from "@mui/material";
import { PagedRequest } from "@/utils/interfaces";
import { getCakes } from "@/utils/httpRequests";

const Cakes = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(10);

  const fetchCakes = async () => {
    var pagedRequest: PagedRequest = {
      pageNumber: currentPage,
      pageSize: productsPerPage,
    };

    const res = await getCakes(pagedRequest);
    const data = await res
      .json()
      .catch((e) => console.log("Error: ", e.message));
    setProducts(data.items);
    setTotalCount(data.totalItemCount);
  };

  useEffect(() => {
    // var pagedRequest: PagedRequest = {
    //     pageNumber: currentPage,
    //     pageSize: productsPerPage
    // };

    // const fetchProducts = async () => {
    //   try {
    //     const response = await axios.post<PagedResult<ProductListDto>>('https://localhost:7091/api/products/paged', pagedRequest);
    //     setProducts(response.data.items);
    //     setTotalCount(response.data.totalItemCount);
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //   }
    // };

    fetchCakes();
  }, [currentPage, productsPerPage]);

  // Change page
  const handlePageChange = (event, value) => setCurrentPage(value);

  // Change products per page
  const handleProductsPerPageChange = (event) =>
    setProductsPerPage(event.target.value);

  return (
    <Container
      maxWidth="md"
      style={{ marginTop: "2rem", marginBottom: "2rem" }}
    >
      {/* Product grid */}
      <Grid container spacing={7} justifyContent="center">
        {products.map((product) => (
          <Grid key={product.title} item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image={product.imageUrl}
                alt={product.title}
              />
              <CardContent style={{ textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  <Link href={`/product/${product.id}`} passHref>
                    <a style={{ textDecoration: "none", color: "inherit" }}>
                      {product.title}
                    </a>
                  </Link>
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {`Price per KG: ${product.pricePerKg} MDL`}
                </Typography>
                <Link href={`/product/${product.id}`} passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    component="a"
                    style={{ marginTop: "10px" }}
                  >
                    Order
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="center" alignItems="center" marginTop={4}>
        <Pagination
          count={Math.ceil(totalCount / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
        <FormControl style={{ marginLeft: "20px" }}>
          <InputLabel shrink>Items per page</InputLabel>
          <Select
            value={productsPerPage}
            onChange={handleProductsPerPageChange}
            input={<OutlinedInput label="Products per page" />}
            startAdornment={
              <InputAdornment position="start">Show</InputAdornment>
            }
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Container>
  );
};

export default Cakes;
