import { put, takeLatest, all, select } from 'redux-saga/effects';

import {
    createWishlist,
    deleteWishlist,
    getWishlists,
    updateWishlist,
} from '../../utils/httpRequests';
import { AppState } from '../../utils/interfaces';
import * as actions from '../actions/actionTypes';

const getToken = (state: AppState) => state.token;

function* getWishlistsSaga() {
    const token = yield select(getToken);
    const wishlists = yield getWishlists(token).then((res) =>
        res.json().catch((e) => {
            throw new Error(e);
        })
    );
    yield put({ type: actions.UPDATE_STORE_WISHLISTS, wishlists });
}

function* deleteWishlistSaga(action) {
    const token = yield select(getToken);
    yield deleteWishlist(token, action.id).catch((e) => {
        throw new Error(e);
    });
    yield getWishlistsSaga();
}

function* createWishlistSaga(action) {
    const token = yield select(getToken);
    yield createWishlist(action.data, token).catch((e) => {
        throw new Error(e);
    });
    yield getWishlistsSaga();
}

function* updateWishlistSaga(action) {
    const token = yield select(getToken);
    yield updateWishlist(token, action.id, action.data).catch((e) => {
        throw new Error(e);
    });
    yield getWishlistsSaga();
}

function* watchSagas() {
    yield all([
        takeLatest(actions.DELETE_WISHLIST, deleteWishlistSaga),
        takeLatest(actions.CREATE_WISHLIST, createWishlistSaga),
        takeLatest(actions.LOGIN, getWishlistsSaga),
        takeLatest(actions.UPDATE_WISHLIST, updateWishlistSaga),
    ]);
}

export default watchSagas;
