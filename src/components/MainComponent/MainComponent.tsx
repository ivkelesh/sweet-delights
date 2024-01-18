import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Navbar from '../Navbar/NavBar';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import WishlistForm from '../Forms/WishlistForm';
import RegisterForm from '../Forms/RegisterForm';
import LoginForm from '../Forms/LoginForm';

import { getWishlists } from '../../utils/httpRequests';
import { AppState, WishlistData } from '../../utils/interfaces';
import * as actions from '../../store/actions/actions';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
    isLoggedIn: boolean;
    updateInitialWishlists: (data) => void;
    token: string;
    showWishlistForm: boolean;
    showRegisterForm: boolean;
    showLoginForm: boolean;
    wishlistsFromStore: WishlistData;
    editWishlistId: number;
}

interface ToastState {
    open: boolean;
    message: string;
}

function MainComponent(props: Props): JSX.Element {
    const {
        isLoggedIn,
        updateInitialWishlists,
        token,
        showWishlistForm,
        showRegisterForm,
        showLoginForm,
        wishlistsFromStore,
        editWishlistId,
    } = props;

    const [wishlists, setWishlists] = useState([]);

    const fetchWishlists = async () => {
        const res = await getWishlists(token);
        const data = await res.json().catch((e) => console.log('Error: ', e.message));
        updateInitialWishlists(data);
    };

    // Smooth scroll to top when form is clicked
    useEffect(() => {
        showWishlistForm ? window.scrollTo(0, 0) : null;
    });

    useEffect(() => {
        if (token) fetchWishlists();
    }, []);

    useEffect(() => {
        setWishlists(wishlistsFromStore.wishlists);
    }, [wishlistsFromStore]);

    // Toast Notification State & Handlers
    const [emailToast, setEmailToast] = useState<ToastState>({
        open: false,
        message: '',
    });

    const handleToast = (email: string) => {
        setEmailToast({
            open: true,
            message: `Please confirm the email sent to : ${email}`,
        });
    };

    const handleClose = () => {
        setEmailToast({ open: false, message: '' });
    };

    return (
        <>
            <div className="page-container">
                <header>
                    <Navbar isLoggedIn={isLoggedIn} />
                </header>
                {isLoggedIn ? (
                    <>
                        <LandingPage />
                    </>
                ) : (
                    <>
                        <LandingPage />
                        {showRegisterForm ? <RegisterForm handleToast={handleToast} /> : null}
                        {showLoginForm ? <LoginForm /> : null}
                    </>
                )}
                <Footer />

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={emailToast.open}
                    id="snackbar-email-confirmation"
                    autoHideDuration={8000}
                    onClose={handleClose}
                    message={emailToast.message}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
            </div>
        </>
    );
}

const mapStateToProps = (state: AppState) => {
    return {
        showWishlistForm: state.showWishlistForm,
        showRegisterForm: state.showRegisterForm,
        showLoginForm: state.showLoginForm,
        wishlistsFromStore: state.allWishlists,
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        editWishlistId: state.editWishlistId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateInitialWishlists: (wishlists) => {
            dispatch(actions.updateStoreWishlists(wishlists));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
