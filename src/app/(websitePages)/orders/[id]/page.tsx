"use client";

import { getOrderById } from '@/utils/httpRequests';
import { Order } from '@/utils/interfaces';
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { makeStyles, Paper, Typography, Grid, Card, CardContent, Modal } from '@material-ui/core';
import { IntegerToEnum } from '@/utils/enums';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 800,
      margin: 'auto',
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(30),
        height: theme.spacing(20),
        marginRight: theme.spacing(2),
    },
    modalImage: {
      width: '80%',
      maxWidth: 800,
      maxHeight: '80vh',
      margin: 'auto',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: theme.spacing(2),
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginTop: theme.spacing(2),
    },
    boldText: {
      fontWeight: 'bold',
    },
    infoText: {
      marginBottom: theme.spacing(1),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

const OrderPage = () => {

    const pathname = usePathname()
    const id = extractLastDigitAfterSlash(pathname);

    const [order, setOrder] = useState<Order>();
    const [modalOpen, setModalOpen] = useState(false);

    const fetchOrder= async () => {
        const res = await getOrderById(id);
        const data = await res.json().catch((e) => console.log('Error: ', e.message));
        setOrder(data);
      };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const classes = useStyles();
    const productData = order?.product.catalogProduct ? order?.product.catalogProduct : order?.product;

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} variant="h4" align="center">
                    Order Details
                </Typography>

                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12} container alignItems="center">
                        <Avatar 
                            alt="Product Image" 
                            src={order?.product.imageUrl} 
                            className={classes.avatar} 
                            onClick={handleModalOpen}
                            variant="rounded"
                        />
                        <Typography variant="h5" className={classes.boldText}>
                        {order?.product.catalogProduct ? order?.product.catalogProduct.title : 'Custom Cake'}
                        </Typography>
                    </Grid>

                <Grid item xs={12}>
                    <Typography className={classes.sectionTitle}>Product Information</Typography>
                    <Typography className={classes.infoText}>
                        Product Type: {IntegerToEnum.ProductType[productData?.productType]}
                    </Typography>
                    <Typography className={classes.infoText}>Weight: {order?.product.weight} KG</Typography>
                    <Typography className={classes.infoText}>
                        Price of {IntegerToEnum.ProductType[productData?.productType]}: {order?.product.totalPrice} MDL
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="subtitle1">Customer Information</Typography>
                    <Typography variant="subtitle1">Name: {order?.firstName} {order?.lastName}</Typography>
                    <Typography variant="subtitle1">Locality: {order?.locality}</Typography>
                    <Typography variant="subtitle1">Address: {order?.address}</Typography>
                    <Typography variant="subtitle1">Phone Number: {order?.phoneNumber}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Delivery Information</Typography>
                    <Typography variant="subtitle1">Type: {order?.deliveryType}</Typography>
                    <Typography variant="subtitle1">Cost: {order?.deliveryCost}</Typography>
                    <Typography variant="subtitle1">
                        Delivery Date: {moment(order?.deliveryDate).format('DD MMMM, YYYY')}{' '}
                        {moment(order?.deliveryDate).format('HH:mm')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Order Information</Typography>
                    <Typography variant="subtitle1">Quantity: {order?.quantity}</Typography>
                    <Typography variant="subtitle1">Total Price: {order?.totalPrice} MDL</Typography>
                    <Typography variant="subtitle1">Order Status: {order?.status}</Typography>
                </Grid>

                <Modal
                    className={classes.modal}
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="enlarged-image-modal"
                    aria-describedby="enlarged-image-description"
                >
                    <img
                    src={order?.product.imageUrl}
                    alt="Enlarged Product Image"
                    className={classes.modalImage}
                    />
                </Modal>

                </Grid>
            </CardContent>
        </Card>
    );
};

export default OrderPage;


function extractLastDigitAfterSlash(input: string): number | null {
    const parts = input.split('/');
    const lastPart = parts[parts.length - 1];
    const lastDigit = parseInt(lastPart, 10);
    if (!isNaN(lastDigit)) {
      return lastDigit;
    } else {
      return 0;
    }
}