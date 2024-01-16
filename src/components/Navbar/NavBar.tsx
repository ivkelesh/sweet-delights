import { useState } from "react";
import { connect } from "react-redux";

import Settings from "@material-ui/icons/SettingsOutlined";
import Notifications from "@material-ui/icons/NotificationsOutlined";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as actions from "../../store/actions/actions";
import { AppState } from "../../utils/interfaces";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Link from "next/link";

interface Props {
  isLoggedIn: boolean;
  username: string;
  toggleWishlistForm: () => void;
  toggleRegisterForm: () => void;
  toggleLoginForm: () => void;
  logoutUser: () => void;
}

function NavBar({
  isLoggedIn,
  username,
  toggleRegisterForm,
  toggleLoginForm,
  logoutUser,
}: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  const logout = () => {
    logoutUser();
    setOpen(false);
  };

  return (
    <nav className={`${isLoggedIn ? "navbar" : "nav-landing-container"}`}>
      {isLoggedIn ? (
        <>
          <div className="main-heading">
            <h3 className="nav-greeting">Welcome back, {username}</h3>
            <h1 className="nav-title">Your Dashboard</h1>
          </div>
          <div className="navbar-btn-wrapper">
            <button
              id="navbar-logout-btn"
              className="primary-btn logout-btn"
              onClick={toggleDialog}
            >
              Log out
            </button>
            <div className="nav-quick-access">
              <Settings className="nav-icons" />
              <Notifications className="nav-icons" />
              <Avatar alt="Guest Image" className="nav-avatar" />
            </div>
          </div>
          <Dialog
            open={open}
            onClose={toggleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogActions>
              <Button
                onClick={toggleDialog}
                id="cancel-btn"
                className="dialog-btn"
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={logout}
                id="continue-btn"
                className="dialog-btn"
                color="primary"
              >
                Continue
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <div className="nav-container">
            <div className="landing-heading">
              <Link href="/">
                <h1 className="nav-title">Sweet Delights</h1>
              </Link>
            </div>
            <div className="nav-links">
              <a className="nav-link" href="#my-orders">
                My orders
              </a>
              <div className="nav-link">
                Products
                <span className="dropdown-indicator">&#9662;</span>
                <div className="dropdown-menu" id="products-menu">
                  <a href="/cakes">Cakes</a>
                  <a href="/coating">Coating</a>
                  <a href="/decors">Decor</a>
                  <a href="/fillings">Filling</a>
                </div>
              </div>
              <a className="nav-link" href="/cake-constructor">
                Order a Cake
              </a>
              <a className="nav-link" href="#prices">
                Prices and Delivery
              </a>
              <a className="nav-link" href="#contact">
                Contact Us
              </a>
              <div className="icon-container">
                <div className="login-icon" onClick={toggleLoginForm}>
                  <FaSignInAlt size={30} />
                </div>
                <div className="register-icon" onClick={toggleRegisterForm}>
                  <FaUserPlus size={30} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    username: state.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleWishlistForm: () => dispatch(actions.showWishlistForm()),
    toggleRegisterForm: () => dispatch(actions.showRegisterForm()),
    toggleLoginForm: () => dispatch(actions.showLoginForm()),
    logoutUser: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
