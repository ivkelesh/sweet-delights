import {
  PostWishlistData,
  RegisterCredentials,
  LoginCredentials,
  ItemData,
  PagedRequest,
  GetOrdersListModel,
  FillingsModel,
} from "./interfaces";

// export const url = 'https://wishlist-service-dev.herokuapp.com/api';
export const url = "http://localhost:8080/api";

// Authentication
export function registerUser(registerData: RegisterCredentials) {
  return fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(registerData),
  });
}

export function loginUser(loginData: LoginCredentials) {
  return fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
}

export function createWishlist(data: PostWishlistData, token: string) {
  return fetch(`${url}/wishlists`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export function getWishlists(token: string) {
  return fetch(`${url}/wishlists`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getWishlistById(token: string, id: number) {
  return fetch(`${url}/wishlists/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteWishlist(token: string, id: number) {
  return fetch(`${url}/wishlists/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export function updateWishlist(
  token: string,
  id: number,
  data: PostWishlistData
) {
  return fetch(`${url}/wishlists/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export function createItem(token: string, id: number, data: ItemData) {
  return fetch(`${url}/wishlists/${id}/items`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export function deleteItem(token: string, wishlistId: number, itemId: number) {
  return fetch(`${url}/wishlists/${wishlistId}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export function getItemById(token: string, wishlistId: number, itemId: number) {
  return fetch(`${url}/wishlists/${wishlistId}/items/${itemId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export function updateItem(
  token: string,
  wishlistId: number,
  itemId: number,
  data: ItemData
) {
  return fetch(`${url}/wishlists/${wishlistId}/items/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export function getCakes(pagedRequest: PagedRequest) {
  return fetch("https://localhost:7091/api/products/paged", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(pagedRequest),
  });
}

export function getOrders(getOrdersListModel: GetOrdersListModel) {
  return fetch("https://localhost:7091/api/orders", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(getOrdersListModel),
  });
}

export function getFillings() {
  return fetch(`${url}/confectionery/fillings"`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
}
