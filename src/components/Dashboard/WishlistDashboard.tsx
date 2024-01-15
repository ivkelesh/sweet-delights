import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Close from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TodayIcon from '@material-ui/icons/Today';
import CommentIcon from '@material-ui/icons/Comment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import { AppState, WishlistItems } from '../../utils/interfaces';
import { getWishlistById, deleteItem } from '../../utils/httpRequests';
import * as actions from '../../store/actions/actions';
import ItemForm from '../Forms/ItemForm';
import ItemDetailsForm from '../Forms/ItemDetailsForm';

interface Wishlist {
    id: number;
    eventType: string;
    privacyType: string;
    title: string;
    wishListDate: string;
    wishlistDescription: string;
}

function WishlistDashboard() {
    const dispatch = useDispatch();

    const wishlistId = useSelector((state: AppState) => state.wishlistModalId);
    const token = useSelector((state: AppState) => state.token);
    const showItemForm = useSelector((state: AppState) => state.showItemForm);

    const [wishlist, setWishlist] = useState<Wishlist | null>(null);
    const [wishlistItems, setWishlistItems] = useState<WishlistItems[]>([]);
    const [dialog, setDialog] = useState<boolean>(false);
    const [itemId, setItemId] = useState<number | null>(null);
    const [updateForm, setUpdateForm] = useState<boolean>(false);
    const [readOnlyForm, setReadOnlyForm] = useState<boolean>(false);

    const toggleDialog = (id: number = null) => {
        setItemId(id);
        setDialog(!dialog);
    };

    const deleteRequest = () => {
        deleteItem(token, wishlistId, itemId);
        const remainingWishlists = wishlistItems.filter((item) => item.id !== itemId);
        setWishlistItems(remainingWishlists);
        setDialog(false);
        setItemId(null);
    };

    const updateItems = () => {
        getWishlistById(token, wishlistId)
            .then((res) => res.json())
            .then((res) => {
                setWishlist(res);
                setWishlistItems(res.items);
            });
    };

    useEffect(() => {
        updateItems();
    }, []);

    const triggerEdit = (itemId: number) => {
        setItemId(itemId);
        setUpdateForm(true);
        dispatch(actions.toggleItemForm());
    };

    const triggerReadOnlyForm = (itemId: number) => {
        setItemId(itemId);
        setReadOnlyForm(true);
    };

    const cancelReadOnlyFormState = () => {
        setReadOnlyForm(false);
    };

    const cancelUpdateState = () => {
        setUpdateForm(false);
    };

    return (
        <>
            <div className="overlay wishlist-dashboard-container">
                <section className="wishlist-dashboard">
                    <i
                        className="dashboard-delete-btn"
                        onClick={() => dispatch(actions.toggleWishlistModal())}
                        id="close-item-btn"
                    >
                        <Close />
                    </i>
                    {wishlist ? (
                        <div className="wishlist-info">
                            <h1 className="wishlist-title">{wishlist?.title}</h1>
                            <div className="wishlist-details-container">
                                <div className="wishlist-details">
                                    <div className="wishlist-details-box">
                                        <TodayIcon />
                                        <p className="wishlist-details-date">
                                            {wishlist?.wishListDate.split('T')[0]}
                                        </p>
                                    </div>
                                    <div className="wishlist-details-box">
                                        <DashboardIcon />
                                        <p className="wishlist-details-text">
                                            {wishlist?.eventType.toLowerCase()}
                                        </p>
                                    </div>
                                    <div className="wishlist-details-box">
                                        <PeopleAltIcon />
                                        <p className="wishlist-details-text">
                                            {wishlist?.privacyType.toLowerCase()}
                                        </p>
                                    </div>
                                </div>

                                {wishlist?.wishlistDescription ? (
                                    <div className="wishlist-details-box desc-box">
                                        <CommentIcon />
                                        <p className="wishlist-details-desc">
                                            {wishlist?.wishlistDescription}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                    <table className="items-table">
                        <tbody>
                            {wishlistItems.map((item) => {
                                return (
                                    <tr className="item-row" key={item.id}>
                                        <td className="item-name">
                                            <h1>{item.itemName}</h1>
                                        </td>
                                        <td>
                                            <h2>
                                                {item.price} {item.currency}
                                            </h2>
                                        </td>
                                        <td>
                                            {item.itemLink ? (
                                                <a
                                                    className="card-btn grey-btn view-btn"
                                                    id="view-link-btn"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={item.itemLink}
                                                >
                                                    Link
                                                </a>
                                            ) : null}
                                        </td>
                                        <td>
                                            <button
                                                className="card-btn grey-btn"
                                                id="item-view-btn"
                                                onClick={() => triggerReadOnlyForm(item.id)}
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="card-btn grey-btn"
                                                id="item-edit-btn"
                                                onClick={() => triggerEdit(item.id)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="card-btn red-btn"
                                                id="delete-item-btn"
                                                onClick={() => toggleDialog(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button
                        id="add-item-btn"
                        className="primary-btn"
                        onClick={() => dispatch(actions.toggleItemForm())}
                    >
                        Add Item
                    </button>
                </section>
            </div>

            {showItemForm ? (
                <ItemForm
                    updateItems={updateItems}
                    updateForm={updateForm}
                    itemId={itemId}
                    cancelUpdateState={cancelUpdateState}
                />
            ) : null}

            {readOnlyForm ? (
                <ItemDetailsForm
                    itemId={itemId}
                    cancelReadOnlyFormState={cancelReadOnlyFormState}
                />
            ) : null}

            <Dialog
                open={dialog}
                onClose={() => toggleDialog()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                id="item-dialog"
            >
                <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
                <DialogActions>
                    <Button
                        id="cancel-btn-item"
                        className="dialog-btn"
                        onClick={() => toggleDialog()}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={deleteRequest}
                        id="confirm-btn-item"
                        className="dialog-btn"
                        color="primary"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default WishlistDashboard;
