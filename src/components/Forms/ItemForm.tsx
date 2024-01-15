import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions/actions';
import { Errors, AppState, ItemData } from '../../utils/interfaces';

import TextField from '@material-ui/core/TextField';
import Close from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { createItem, getItemById, updateItem } from '../../utils/httpRequests';

interface Props {
    updateItems: () => void;
    updateForm: boolean;
    itemId?: number;
    cancelUpdateState: () => void;
}

function ItemForm({ updateItems, updateForm = false, itemId = null, cancelUpdateState }: Props) {
    const wishlistId = useSelector((state: AppState) => state.wishlistModalId);
    const token = useSelector((state: AppState) => state.token);
    const dispatch = useDispatch();

    const [itemName, setItemName] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [price, setPrice] = useState<string>('0.00');
    const [currency, setCurrency] = useState<string>('MDL');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<string>('Want to have');

    const [itemErrors, setItemErrors] = useState<Errors>({
        error: false,
        description: ' ',
    });

    const currencyOptions = ['MDL', 'EUR', 'USD'];
    const priorityOptions = ['Want to have', 'Nice to have', 'Must have'];

    // Event Handlers
    const itemHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(event.target.value);
    };

    const linkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    };

    const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const positiveValue = Math.abs(parseFloat(event.target.value));
        const stringifiedNumber = String(positiveValue).slice(0, 7);
        setPrice(stringifiedNumber);
    };

    const onBlurPriceHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (!inputValue.length) {
            setPrice('0.00');
        }
    };

    const currencyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const priorityHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriority(event.target.value);
    };

    const createItemRequest = (update = false) => {
        const trimmedItemName = itemName.trim();
        const trimmedLink = link?.trim();
        const trimmedDescription = description?.trim();

        const itemData: ItemData = {
            itemName: trimmedItemName,
            itemLink: trimmedLink,
            price,
            currency,
            itemDescription: trimmedDescription,
            priority,
        };

        {
            update
                ? updateItem(token, wishlistId, itemId, itemData).then(() => updateItems())
                : createItem(token, wishlistId, itemData).then(() => updateItems());
        }
    };

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

    const itemFormVerification = () => {
        const itemValid =
            !!itemName.length && !!itemName.trim().length && /^[\sA-Za-z]*$/.test(itemName);

        if (!itemValid) {
            setItemErrors({ error: true, description: 'Please enter the item name' });
        }

        if (!/^[\sA-Za-z]*$/.test(itemName)) {
            setItemErrors({
                error: true,
                description: 'Symbols and numbers are not valid',
            });
        }

        if (itemValid && !updateForm) {
            createItemRequest();
            dispatch(actions.toggleItemForm());
        }

        if (itemValid && updateForm) {
            createItemRequest(updateForm);
            dispatch(actions.toggleItemForm());
        }
    };

    useEffect(() => {
        {
            updateForm ? getItemRequest() : null;
        }
    }, [updateForm]);

    const closeUpdateForm = () => {
        dispatch(actions.toggleItemForm());
        cancelUpdateState();
    };

    // Styles
    const useStyles = makeStyles({
        input: {
            marginTop: 24,
        },
        link: {
            marginTop: 10,
        },
    });

    const classes = useStyles();

    return (
        <div className="overlay">
            <div className="form-container item-form">
                <i id="item-form-delete-btn" className="form-delete-btn" onClick={closeUpdateForm}>
                    <Close />
                </i>
                <form className="wishlist-form">
                    <h1 className="form-title">{updateForm ? 'Edit Item' : 'Create Item'}</h1>
                    <TextField
                        required
                        value={itemName}
                        label="Item Name"
                        id="item-name"
                        inputProps={{ maxLength: 25 }}
                        onChange={itemHandler}
                        error={itemErrors.error}
                        helperText={itemErrors.description}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        value={link}
                        label="Link"
                        id="item-link"
                        inputProps={{ maxLength: 100 }}
                        onChange={linkHandler}
                        className={classes.link}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        value={price}
                        label="Price"
                        id="item-price"
                        type="number"
                        onChange={priceHandler}
                        onBlur={onBlurPriceHandler}
                        className={classes.input}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        select
                        label="Currency"
                        id="item-currency"
                        value={currency}
                        onChange={currencyHandler}
                        className={classes.input}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        {currencyOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        multiline
                        label="Description"
                        id="item-description"
                        className={classes.input}
                        variant="outlined"
                        rows={4}
                        inputProps={{ maxLength: 250 }}
                        value={description}
                        onChange={descriptionHandler}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        select
                        label="Priority"
                        id="item-priority"
                        value={priority}
                        onChange={priorityHandler}
                        className={classes.input}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        {priorityOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </form>
                <button
                    className="primary-btn form-btn item-form-btn"
                    id="item-form-btn"
                    onClick={itemFormVerification}
                >
                    {updateForm ? 'Update Item' : 'Add item'}
                </button>
            </div>
        </div>
    );
}

export default ItemForm;
