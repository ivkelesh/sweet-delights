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
      textTransform: 'uppercase',
      color: '#613503'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginTop: theme.spacing(2),
      textTransform: 'uppercase',
      color: '#613503'
    },
    sectionContainer: {
        marginBottom: theme.spacing(1),
    },
    boldText: {
      fontWeight: 'bold',
    },
    productTitle: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#613503'
    },
    infoText: {
      marginBottom: theme.spacing(1),
      fontSize: '1.1rem',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    boldFieldName: {
        fontWeight: 'bold',
        textTransform: 'uppercase'
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
                    Order details
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
                        <Typography variant="h5" className={classes.productTitle}>
                            {order?.isFromCatalog ? order?.product.catalogProduct.title : 'Custom Cake'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.sectionContainer}>
                        <Typography className={classes.sectionTitle}>Product information</Typography>
                        
                        { (order?.isFromCatalog) ? 
                        <>
                            <Typography className={classes.infoText}>
                            <span className={classes.boldFieldName}>Product Type: </span> {IntegerToEnum.ProductType[order?.product.catalogProduct.productType]}
                            </Typography>
                        </>
                        : 
                        <>
                            <Typography className={classes.infoText}>
                                <span className={classes.boldFieldName}>Product Type: </span> 
                                {IntegerToEnum.ProductType[order?.product.productType]}
                            </Typography>
                            <Typography className={classes.infoText}>
                                <span className={classes.boldFieldName}>Shape: </span> 
                                {IntegerToEnum.Shape[order?.product.shape]}
                            </Typography>
                            <Typography className={classes.infoText}>
                                <span className={classes.boldFieldName}>Filling: </span> 
                                {order?.product.filling?.title}
                            </Typography>
                            <Typography className={classes.infoText}>
                                <span className={classes.boldFieldName}>Coating: </span>
                                {order?.product.coating?.title}
                            </Typography>
                            <Typography className={classes.infoText}>
                                <span className={classes.boldFieldName}>Decor: </span>
                                {order?.product.decor?.title}
                            </Typography>
                            {(order?.product.inscription) ? <Typography className={classes.infoText}><span className={classes.boldFieldName}>Inscription: </span> {order?.product.inscription}</Typography> : <></>}
                            {(order?.product.aiPrompt) ? <Typography className={classes.infoText}><span className={classes.boldFieldName}>AI Prompt: </span> {order?.product.aiPrompt}</Typography> : <></>}
                        </> 
                        }
                        {(order?.product.comments) ? <Typography className={classes.infoText}><span className={classes.boldFieldName}>Comments: </span> {order?.product.comments}</Typography> : <></>}
                        <Typography className={classes.infoText}><span className={classes.boldFieldName}>Weight: </span> {order?.product.weight} KG</Typography>
                        <Typography className={classes.infoText}>
                        <span className={classes.boldFieldName}>Price of {IntegerToEnum.ProductType[order?.isFromCatalog ? order?.product.catalogProduct.productType : order?.product.productType]}: </span> {order?.product.totalPrice} MDL
                        </Typography>
                    </Grid>

                    {/* Customer Information */}
                    <Grid item xs={12} className={classes.sectionContainer}>
                        <Typography variant="subtitle1" className={classes.sectionTitle}>Customer information</Typography>
                        <Typography variant="subtitle1" className={classes.infoText}> <span className={classes.boldFieldName}>Name: </span> {order?.firstName} {order?.lastName}</Typography>
                        <Typography variant="subtitle1" className={classes.infoText}><span className={classes.boldFieldName}>Phone number: </span> {order?.phoneNumber}</Typography>
                    </Grid>

                    {/* Delivery Information */}
                    <Grid item xs={12} className={classes.sectionContainer}>
                        <Typography variant="subtitle1" className={classes.sectionTitle}>Delivery information</Typography>
                        <Typography variant="subtitle1" className={classes.infoText}><span className={classes.boldFieldName}>Delivery type: </span> {IntegerToEnum.DeliveryType[order?.deliveryType]}</Typography>

                        {(order?.deliveryType === 1) ?
                        <>
                            <Typography variant="subtitle1" className={classes.infoText}><span className={classes.boldFieldName}>Locality: </span> {order?.locality}</Typography>
                            <Typography variant="subtitle1" className={classes.infoText}><span className={classes.boldFieldName}>Address: </span> {order?.address}</Typography>
                        </>  
                        : <></>}
                        <Typography variant="subtitle1" className={classes.infoText}><span className={classes.boldFieldName}>Delivery cost: </span> {order?.deliveryCost} MDL</Typography>
                        <Typography variant="subtitle1" className={classes.infoText}>
                            <span className={classes.boldFieldName}>
                                {(order?.deliveryType === 1) ? 'Delivery date: ' : 'Pickup date: ' }
                            </span>
                            {moment(order?.deliveryDate).format('DD MMMM, YYYY')}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.infoText}>
                            <span className={classes.boldFieldName}>
                                {(order?.deliveryType === 1) ? 'Delivery time: ' : 'Pickup time: ' }
                            </span>
                            {moment(order?.deliveryDate).format('HH:mm')}
                        </Typography>
                    </Grid>

                    {/* Order Information */}
                    <Grid item xs={12} className={classes.sectionContainer}>
                        <Typography variant="subtitle1" className={classes.sectionTitle}>Summary</Typography>
                        <Typography variant="subtitle1" className={classes.infoText}><span className={classes.boldFieldName}>Quantity: </span> {order?.quantity}</Typography>
                        <Typography variant="subtitle1" className={classes.infoText}><span className={classes.boldFieldName}>Total Price: </span> {order?.totalPrice} MDL</Typography>
                        <Typography variant="subtitle1" className={classes.infoText}><span className={classes.boldFieldName}>Order Status: </span> {IntegerToEnum.OrderStatus[order?.status]}</Typography>
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