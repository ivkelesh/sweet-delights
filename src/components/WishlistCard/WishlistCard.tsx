"use client";

import React, { useState } from "react";
import { connect } from "react-redux";

import Time from "@material-ui/icons/AccessTime";
import Close from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as actions from "../../store/actions/actions";

interface Props {
  id: number;
  date: string;
  title: string;
  toggleForm: () => void;
  handleDeleteRequest: (id: number) => void;
  triggerUpdateAction: (id: number) => void;
  triggerWishlistModal: (id: number) => void;
}

function Wishlistcard(props: Props): JSX.Element {
  const {
    id,
    title,
    date,
    handleDeleteRequest,
    triggerUpdateAction,
    toggleForm,
    triggerWishlistModal,
  } = props;

  const [open, setOpen] = useState(false);

  const toggleDeleteDialog = () => {
    setOpen(!open);
  };

  const handleEdit = () => {
    toggleForm();
    triggerUpdateAction(id);
  };

  return (
    <div className="card">
      <div className="card-top">
        <h1 className="card-title">{title}</h1>
        <div className="card-time">
          <Time />
          <h2>{date}</h2>
        </div>
      </div>
      <div className="button-container">
        <button
          className="card-btn grey-btn more-details-btn"
          onClick={() => triggerWishlistModal(id)}
        >
          More details
        </button>
        <button className="card-btn grey-btn" onClick={handleEdit}>
          Edit
        </button>
      </div>
      <i className="card-delete-btn" onClick={toggleDeleteDialog}>
        <Close />
      </i>
      <Dialog
        open={open}
        onClose={toggleDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          Are you sure you want to delete this wishlist?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={toggleDeleteDialog}
            id="cancel-btn"
            className="dialog-btn"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteRequest(id)}
            id="continue-btn"
            className="dialog-btn"
            color="primary"
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteRequest: (id: number) => dispatch(actions.deleteWishlist(id)),
    toggleForm: () => dispatch(actions.showWishlistForm()),
    triggerUpdateAction: (id: number) =>
      dispatch(actions.triggerUpdateAction(id)),
    triggerWishlistModal: (id: number) =>
      dispatch(actions.triggerWishlistModal(id)),
  };
};

export default connect(null, mapDispatchToProps)(Wishlistcard);
