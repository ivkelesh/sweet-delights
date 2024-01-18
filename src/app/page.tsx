"use client";

import { createContext, useEffect, useState } from "react";
import { connect } from "react-redux";

import * as actions from "@/store/actions/actions";

import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { getWishlists } from "@/utils/httpRequests";
import Dashboard from "@/components/Dashboard/Dashboard";
import WishlistForm from "@/components/Forms/WishlistForm";
import LandingPage from "@/components/LandingPage/LandingPage";
import RegisterForm from "@/components/Forms/RegisterForm";
import LoginForm from "@/components/Forms/LoginForm";
import Footer from "@/components/Footer/Footer";
import { AppState, WishlistData } from "@/utils/interfaces";

const AuthContext = createContext<{ loggedIn: boolean; setLoggedStatus: (loggedIn: boolean) => void; role : string | null}>({ loggedIn: false, setLoggedStatus: () => {}, role: null });
export {AuthContext}

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
  const [loggedIn, setLoggedStatus] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);

  const fetchWishlists = async () => {
    const res = await getWishlists(token);
    const data = await res
      .json()
      .catch((e) => console.log("Error: ", e.message));
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
    message: "",
  });

  const handleToast = (email: string) => {
    setEmailToast({
      open: true,
      message: `Please confirm the email sent to : ${email}`,
    });
  };

  const handleClose = () => {
    setEmailToast({ open: false, message: "" });
  };

  return (
    <>
    <AuthContext.Provider value={{loggedIn, setLoggedStatus, role}}>
      <div className="page-container">
        {isLoggedIn ? (
          <>
            <Dashboard wishlists={wishlists} />
            {showWishlistForm ? (
              <WishlistForm update={!editWishlistId ? false : true} />
            ) : null}
          </>
        ) : (
          <>
            <LandingPage />
            {showRegisterForm ? (
              <RegisterForm handleToast={handleToast} />
            ) : null}
            {showLoginForm ? <LoginForm /> : null}
          </>
        )}
        <Footer />

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
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
    </AuthContext.Provider>
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
