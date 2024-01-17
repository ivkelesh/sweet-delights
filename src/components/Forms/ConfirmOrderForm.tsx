import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";

import { AppState } from "../../utils/interfaces";

import * as actions from "../../store/actions/actions";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Close from "@material-ui/icons/Close";

interface Props {
  toggleOrderForm: () => void;
  order: (token: string, order: any) => void;
}

function OrderForm({ toggleOrderForm, order }: Props) {
  const token = useSelector((state: AppState) => state.token);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const getItemRequest = () => {};

  useEffect(() => {
    getItemRequest();
  }, []);

  // Styles
  const useStyles = makeStyles({
    disabledInput: {
      "& .MuiInputBase-root.Mui-disabled": {
        color: "black",
      },
      marginTop: 24,
    },
  });

  const classes = useStyles();

  return (
    <div className="overlay">
      <div className="form-container item-details-form">
        <i
          id="item-details-form-delete-btn"
          className="form-delete-btn"
          onClick={toggleOrderForm}
        >
          <Close />
        </i>
        <form className="wishlist-form">
          <h1 className="form-title">Order Conf</h1>
          <TextField
            required
            value={firstName}
            label="First Name"
            id="first-name"
            inputProps={{ maxLength: 25 }}
            InputLabelProps={{
              shrink: true,
            }}
            disabled
            className={classes.disabledInput}
          />

          <TextField
            required
            value={firstName}
            label="First Name"
            id="first-name"
            inputProps={{ maxLength: 25 }}
            InputLabelProps={{
              shrink: true,
            }}
            disabled
            className={classes.disabledInput}
          />
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleOrderForm: (data) => dispatch(actions.showOrderForm(data)),
    login: (token: string, username: string) =>
      dispatch(actions.login(token, username)),
  };
};

export default connect(null, mapDispatchToProps)(OrderForm);
