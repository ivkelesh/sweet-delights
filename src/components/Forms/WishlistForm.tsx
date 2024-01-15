import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';

import * as actions from '../../store/actions/actions';
import { AppState, PostWishlistData } from '../../utils/interfaces';
import { getWishlistById } from '../../utils/httpRequests';

interface Props {
    toggleForm: () => void;
    createWishlist: (postData: PostWishlistData) => void;
    token: string;
    editWishlistId: number;
    update: boolean;
    updateWishlist: (id: number, postData: PostWishlistData) => void;
}

function WishlistForm({
    toggleForm,
    createWishlist,
    updateWishlist,
    editWishlistId,
    token,
    update,
}: Props): JSX.Element {
    const todayDate: Date = new Date();
    const formattedDate: string = todayDate.toISOString().split('T')[0];

    // State
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [titleErrorDescription, setTitleErrorDescription] = useState(' ');
    const [eventType, setEventType] = useState('None');
    const [typeError, setTypeError] = useState(false);
    const [typeErrorDescription, setTypeErrorDescription] = useState(' ');
    const [description, setDescription] = useState('');
    const [wishlistDate, setWishlistDate] = useState(formattedDate);
    const [privacyType, setPrivacyType] = useState('Private');

    const wishlistOptions = ['None', 'Birthday', 'Wedding', 'Other'];
    const privacyOptions = ['Private', 'Public'];

    // Event Handlers
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEventType(event.target.value);
    };

    const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrivacyType(event.target.value);
    };

    const handleDateChange = (event) => {
        setWishlistDate(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    // Form Request
    const postRequest = (update = false) => {
        const privacyTypeUppercase = privacyType.toUpperCase();
        const eventTypeUppercase = eventType.toUpperCase();
        const formattedDateforRequest = wishlistDate.concat('T00:00:00');

        const postData: PostWishlistData = {
            title,
            eventType: eventTypeUppercase,
            wishlistDescription: description,
            wishListDate: formattedDateforRequest,
            privacyType: privacyTypeUppercase,
        };

        update ? updateWishlist(editWishlistId, postData) : createWishlist(postData);
    };

    function capitalizeString(str: string) {
        const lowerCaseStr = str.toLowerCase();
        return lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
    }

    const getWishlistData = (id: number) => {
        getWishlistById(token, id)
            .then((res) => res.json())
            .then((res) => {
                const date = res.wishListDate.split('T')[0];
                const todayDate: Date = new Date(date);
                const formattedDate: string = todayDate.toISOString().split('T')[0];

                const capitalizedEventType: string = capitalizeString(res.eventType);
                const capitalizedPrivacyType: string = capitalizeString(res.privacyType);

                const stringifiedDescription: string = !res.wishlistDescription
                    ? ''
                    : res.wishlistDescription;

                setTitle(res.title);
                setEventType(capitalizedEventType);
                setPrivacyType(capitalizedPrivacyType);
                setDescription(stringifiedDescription);
                setWishlistDate(formattedDate);
            });
    };

    useEffect(() => {
        {
            update ? getWishlistData(editWishlistId) : null;
        }
    }, [update]);

    // Form Verification
    const formVerification = () => {
        const titleValid = /^[\sA-Za-z]*$/.test(title) && title?.trim();
        const eventTypeValid = eventType !== 'None';

        setTitleError(!titleValid);
        setTypeError(!eventTypeValid);

        setTitleErrorDescription(' ');
        if (!/^[\sA-Za-z]*$/.test(title)) {
            setTitleErrorDescription('Symbols, whitespaces and numbers are not valid');
        }

        if (!title?.trim()) {
            setTitleErrorDescription('Please enter your wishlist title');
        }

        !eventTypeValid
            ? setTypeErrorDescription('Please select wishlist type')
            : setTypeErrorDescription(' ');

        if (!update && titleValid && eventTypeValid) {
            postRequest();
            toggleForm();
        }

        if (update && titleValid && eventTypeValid) {
            postRequest(update);
            toggleForm();
        }
    };

    // Styles
    const useStyles = makeStyles({
        input: {
            marginTop: 20,
            borderRadius: 20,
        },
        type: {
            marginTop: 10,
        },
    });

    const classes = useStyles();

    return (
        <div className="overlay">
            <div className="form-container">
                <i className="form-delete-btn" onClick={toggleForm}>
                    <Close />
                </i>
                <form className="wishlist-form">
                    <h1 className="form-title">{update ? 'Update Wishlist' : 'Create Wishlist'}</h1>
                    <TextField
                        required
                        error={titleError}
                        value={title}
                        id="wishlist-form-title"
                        inputProps={{ maxLength: 25 }}
                        onChange={handleTitleChange}
                        helperText={titleErrorDescription}
                        label="Wishlist Title"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        select
                        required
                        label="Wishlist Type"
                        id="wishlist-form-type"
                        error={typeError}
                        value={eventType}
                        className={classes.type}
                        onChange={handleTypeChange}
                        helperText={typeErrorDescription}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        {wishlistOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        multiline
                        id="wishlist-form-description"
                        className={classes.input}
                        variant="outlined"
                        rows={4}
                        inputProps={{ maxLength: 250 }}
                        value={description}
                        onChange={handleDescriptionChange}
                        label="Description"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        className={classes.input}
                        label="Date"
                        type="date"
                        id="wishlist-form-date"
                        onChange={handleDateChange}
                        value={wishlistDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        select
                        required
                        id="wishlist-form-privacy"
                        label="Privacy Type"
                        className={classes.input}
                        value={privacyType}
                        onChange={handlePrivacyChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        {privacyOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </form>
                <button
                    className="primary-btn form-btn"
                    id="wishlist-form-btn"
                    onClick={formVerification}
                >
                    {update ? 'Save Changes' : 'Add Wishlist'}
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => {
    return {
        editWishlistId: state.editWishlistId,
        token: state.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleForm: () => dispatch(actions.showWishlistForm()),
        createWishlist: (wishlist: PostWishlistData) => dispatch(actions.createWishlist(wishlist)),
        updateWishlist: (id: number, postData: PostWishlistData) =>
            dispatch(actions.updateWishlist(id, postData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistForm);
