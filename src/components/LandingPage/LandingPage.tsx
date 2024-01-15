import Box from '@mui/material/Box';
import { Button, Typography, Container, Grid, Card, CardContent, CardMedia, makeStyles, Icon } from '@material-ui/core';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';
import CakeIcon from '@material-ui/icons/Cake';

const useStyles = makeStyles((theme) => ({
	root: {
	  marginTop: theme.spacing(4),
	  marginBottom: theme.spacing(4),
	},
	card: {
	  marginTop: theme.spacing(8),
	  maxWidth: 400,
	},
	media: {
	  height: 250,
	},
	advantagesSection: {
		marginTop: theme.spacing(8),
		padding: theme.spacing(4),
		backgroundColor: '#fceab6',
		borderRadius: theme.spacing(2),
	  },
	  advantageCard: {
		textAlign: 'center',
		padding: theme.spacing(2),
	  },
	  advantageIcon: {
		fontSize: 50,
		marginBottom: theme.spacing(2),
		color: theme.palette.secondary.main,
	  },
	  advantageText: {
		fontSize: 16,
		marginBottom: theme.spacing(2),
	  },
	  divider: {
		backgroundColor: theme.palette.primary.main,
		height: '80%',
	  },
  }));

function LandingPage(): JSX.Element {
	const classes = useStyles();

    return (
        <Box  width='100%'>
			<div id="headerwrap"></div>

			<Container className={classes.root}>
				<Typography variant="h2" align="center" gutterBottom>
					Welcome to Sweet Delights
				</Typography>
				<Typography variant="h5" align="center" paragraph>
					Indulge in our delectable confectionery products made with love and the finest ingredients
				</Typography>

				<Grid container spacing={3} justify="center">
					<Grid item xs={12} sm={6} md={4}>
						<Card className={classes.card}>
							<CardMedia
							className={classes.media}
							image="https://utmstorageaccount.blob.core.windows.net/others/cake.jpg"
							title="Cakes"
							/>
							<CardContent>
							<Typography gutterBottom variant="h5" component="div" align='center' style={{ fontWeight: 'bold' }}>
								Cakes
							</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={1} sm={1} md={1} />

					<Grid item xs={12} sm={6} md={4}>
						<Card className={classes.card}>
							<CardMedia
							className={classes.media}
							image="https://utmstorageaccount.blob.core.windows.net/others/cheesecakes.jpg"
							title="Cheesecakes"
							/>
							<CardContent>
							<Typography gutterBottom variant="h5" component="div" align='center' style={{ fontWeight: 'bold' }}>
								Сheesecakes
							</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				<Grid container spacing={3} justify="center">
					{/* Product Cards */}
					<Grid item xs={12} sm={6} md={4}>
						<Card className={classes.card}>
							<CardMedia
							className={classes.media}
							image="https://utmstorageaccount.blob.core.windows.net/others/macarons3.jpg"
							title="Macarons"
							/>
							<CardContent>
							<Typography gutterBottom variant="h5" component="div" align='center' style={{ fontWeight: 'bold' }}>
								Macarons
							</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={1} sm={1} md={1} />

					<Grid item xs={12} sm={6} md={4}>
						<Card className={classes.card}>
							<CardMedia
							className={classes.media}
							image="https://utmstorageaccount.blob.core.windows.net/others/cupcakess.jpg"
							title="Cupcakes"
							/>
							<CardContent>
							<Typography gutterBottom variant="h5" component="div" align='center' style={{ fontWeight: 'bold' }}>
								Cupcakes
							</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				{/* Advantages Section */}
				<Grid container item xs={12} className={classes.advantagesSection} alignItems="center" justify='center'>
					<Grid item xs={12}>
						<Typography variant="h4" style={{ fontWeight: 'bold' }} align="center" gutterBottom>
						OUR ADVANTAGES
						</Typography>
					</Grid>
					<Grid container spacing={10} item xs={12} md={10} justify="center">
						<Grid item xs={12} sm={4} className={classes.advantageCard}>
							<Icon className={classes.advantageIcon}>
								<LocalShippingIcon fontSize="large" />
							</Icon>
							<Typography variant="h5" style={{ fontWeight: 'bold' }}>Quick Delivery</Typography>
							<Typography variant="body1" className={classes.advantageText}>
								Enjoy fast and reliable delivery services. Your sweets will be at your doorstep in no time.
							</Typography>
						</Grid>
						<Grid item xs={12} sm={4} className={classes.advantageCard}>
							<Icon className={classes.advantageIcon}>
								<StarIcon fontSize="large"/>
							</Icon>
							<Typography variant="h5" style={{ fontWeight: 'bold' }}>Premium Quality</Typography>
							<Typography variant="body1" className={classes.advantageText}>
								Savor the taste of excellence with our premium quality confectionery made from the finest ingredients.
							</Typography>
						</Grid>
						<Grid item xs={12} sm={4} className={classes.advantageCard}>
							<Icon className={classes.advantageIcon}>
								<CakeIcon fontSize="large"/>
							</Icon>
							<Typography variant="h5" style={{ fontWeight: 'bold' }}>Diverse Selection</Typography>
							<Typography variant="body1" className={classes.advantageText}>
								Explore a wide range of delightful options, from classic treats to innovative and unique creations.
							</Typography>
						</Grid>
					</Grid>
				</Grid>
    		</Container>
		</Box>
    );
}

export default LandingPage;
