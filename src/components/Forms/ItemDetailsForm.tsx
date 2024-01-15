import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getItemById } from '../../utils/httpRequests';
import { AppState } from '../../utils/interfaces';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Close from '@material-ui/icons/Close';

interface Props {
    itemId: number;
    cancelReadOnlyFormState: () => void;
}

function ItemDetailsForm({ itemId, cancelReadOnlyFormState }: Props) {
    const wishlistId = useSelector((state: AppState) => state.wishlistModalId);
    const token = useSelector((state: AppState) => state.token);

    const [itemName, setItemName] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [price, setPrice] = useState<string>('0.00');
    const [currency, setCurrency] = useState<string>('MDL');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<string>('Want to have');

    const getItemRequest = () => {
        getItemById(token, wishlistId, itemId).then((res) => {
            setCurrency(res.currency);
            setDescription(res?.itemDescription);
            setLink(res.itemLink);
            setItemName(res.itemName);
            setPrice(res.price);
            setPriority(res.priority);
        });
    };

    useEffect(() => {
        getItemRequest();
    }, []);

    // Styles
    const useStyles = makeStyles({
        disabledInput: {
            '& .MuiInputBase-root.Mui-disabled': {
                color: 'black',
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
                    onClick={cancelReadOnlyFormState}
                >
                    <Close />
                </i>
                <form className="wishlist-form">
                    <h1 className="form-title">Item Details</h1>
                    <TextField
                        required
                        value={itemName}
                        label="Item Name"
                        id="item-details-name"
                        inputProps={{ maxLength: 25 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        className={classes.disabledInput}
                    />

                    <TextField
                        value={link}
                        label="Link"
                        id="item-details-link"
                        inputProps={{ maxLength: 100 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        className={classes.disabledInput}
                    />

                    <TextField
                        value={price}
                        label="Price"
                        id="item-details-price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        className={classes.disabledInput}
                    />

                    <TextField
                        label="Currency"
                        id="item-details-currency"
                        value={currency}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        className={classes.disabledInput}
                    ></TextField>

                    <TextField
                        multiline
                        label="Description"
                        id="item-details-description"
                        variant="outlined"
                        rows={4}
                        inputProps={{ maxLength: 50 }}
                        value={description}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        className={classes.disabledInput}
                    />

                    <TextField
                        label="Priority"
                        id="item-details-priority"
                        value={priority}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        className={classes.disabledInput}
                    ></TextField>
                </form>
            </div>
        </div>
    );
}

export default ItemDetailsForm;
