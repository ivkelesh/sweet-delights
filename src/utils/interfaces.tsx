export interface AppState {
  username: string;
  showWishlistForm: boolean;
  showRegisterForm: boolean;
  showLoginForm: boolean;
  showItemForm: boolean;
  allWishlists: WishlistData;
  isLoggedIn: boolean;
  token: string;
  editWishlistId: number;
  wishlistModal: boolean;
  wishlistModalId: number;
}

export interface WishlistData {
  wishlists: Wishlists[];
}

export interface Wishlists {
  id: number;
  title: string;
  wishListDate: string;
}

export interface PostWishlistData {
  wishlistDescription: string;
  eventType: string;
  privacyType: string;
  title: string;
  wishListDate: string;
}

export interface ItemData {
  itemName: string;
  itemLink: string;
  price: string;
  currency: string;
  itemDescription: string;
  priority: string;
}

export interface RegisterCredentials {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Errors {
  error: boolean;
  description: string;
}

export interface WishlistItems {
  id: number;
  itemName: string;
  itemLink: string;
  price: string;
  currency: string;
  itemDescription: string;
  priority: string;
}

export interface PagedRequest {
  pageNumber?: number;
  pageSize?: number;
}

export interface ProductListDto {
  title?: string;
  pricePerKg?: number;
  imageUrl?: string;
}

export interface PagedResult<T> {
  pageNumber: number;
  pageSize: number;
  totalItemCount: number;
  pageCount: number;
  items: T[];
}

export interface GetOrdersListModel {
  pageSize: number;
  pageNumber: number;
  productTypes?: number[];
  locality?: string;
  deliveryType?: number;
  status?: number;
  deliveryDateFrom?: Date;
  deliveryDateTo?: Date;
  orderDateFrom?: Date;
  orderDateTo?: Date;
  sort?: string;
  ascending: boolean;
}

export interface OrdersListModel {
  id: number;
  productType: number;
  status: number;
  locality: string;
  deliveryType: number;
  deliveryDate: Date;
  totalPrice: number;
  createdAt: Date;
}

export interface CakeElementModel {
  id: number;
  pricePerKg: number;
  imageName: string;
  imageUrl: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  title: string;
  description: string;
}
