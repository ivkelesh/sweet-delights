import { PostWishlistData } from '../../utils/interfaces';
import * as actions from './actionTypes';

export const login = (token: string, username: string) => {
    return {
        type: actions.LOGIN,
        token,
        username,
    };
};

export const logout = () => {
    return {
        type: actions.LOGOUT,
    };
};

export const showWishlistForm = () => {
    return {
        type: actions.SHOW_WISHLIST_FORM,
    };
};

export const showRegisterForm = () => {
    return {
        type: actions.SHOW_REGISTER_FORM,
    };
};

export const showLoginForm = () => {
    return {
        type: actions.SHOW_LOGIN_FORM,
    };
};

export const createWishlist = (data: PostWishlistData) => {
    return {
        type: actions.CREATE_WISHLIST,
        data,
    };
};

export const updateStoreWishlists = (wishlists) => {
    return {
        type: actions.UPDATE_STORE_WISHLISTS,
        wishlists,
    };
};

export const triggerUpdateAction = (id: number) => {
    return {
        type: actions.TRIGGER_UPDATE_ACTION,
        id,
    };
};

export const deleteWishlist = (id: number) => {
    return {
        type: actions.DELETE_WISHLIST,
        id,
    };
};

export const updateWishlist = (id: number, data: PostWishlistData) => {
    return {
        type: actions.UPDATE_WISHLIST,
        id,
        data,
    };
};

export const toggleWishlistModal = () => {
    return {
        type: actions.TOGGLE_WISHLIST_MODAL,
    };
};

export const triggerWishlistModal = (id: number) => {
    return {
        type: actions.TRIGGER_WISHLIST_MODAL,
        id,
    };
};

export const toggleItemForm = () => {
    return {
        type: actions.TOGGLE_ITEM_FORM,
    };
};
