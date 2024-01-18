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
  id?: number;
  productTypes?: number [];
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

export interface GenerateReportModel {
  dateFrom?: Date,
  dateTo?: Date,
  reportDate?: Date,
  reportType: number
}

export interface CatalogProduct {
  id: number,
  title: string,
  description?: string,
  productType: number,
  category?: number,
  pricePerKg: number,
  imageUrl: string
}

export interface CakeComponent {
  title: string,
  imageUrl: string
}

export interface OrderedProduct {
  id: number,
  productType: number,
  filling?: CakeComponent,
  decor?: CakeComponent,
  coating?: CakeComponent,
  weight: number,
  comments?: string,
  inscription?: string,
  shape?: number,
  aiPrompt?: string,
  totalPrice: number,
  imageUrl: string,
  productId?: number,
  catalogProduct?: CatalogProduct
}

export interface Order {
  id: number,
  product: OrderedProduct,
  firstName: string,
  lastName: string,
  locality?: string,
  address?: string,
  phoneNumber?: string,
  deliveryType?: number,
  deliveryCost?: number,
  deliveryDate?: Date,
  quantity?: number,
  totalPrice: number,
  status: number,
  isFromCatalog: boolean
}

export interface GenerateImageRequest {
  shape?: string,
  coating?: string,
  decor?: string,
  inscription?: string,
  prompt?: string
}


