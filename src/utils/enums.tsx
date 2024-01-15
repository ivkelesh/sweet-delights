export enum ProductType {
    Cake = 'Cake',
    Cheesecake = 'Cheesecake',
    Macarons = 'Macarons',
  }
  
  export enum DeliveryType {
    Pickup = 'Pickup',
    CourierDelivery = 'Courier Delivery',
  }
  
  export enum OrderStatus {
    New = 'New',
    Processed = 'Processed',
    InProgress = 'In Progress',
    Ready = 'Ready',
    Delivered = 'Delivered',
    Rejected = 'Rejected',
  }
  
  export const EnumToInteger = {
    ProductType: {
      Cake: 0,
      Cheesecake: 1,
      Macarons: 2,
    },
    DeliveryType: {
      Pickup: 0,
      CourierDelivery: 1,
    },
    OrderStatus: {
      New: 0,
      Processed: 1,
      InProgress: 2,
      Ready: 3,
      Delivered: 4,
      Rejected: 5,
    },
  };

  export const IntegerToEnum = {
    ProductType: {
      0: ProductType.Cake,
      1: ProductType.Cheesecake,
      2: ProductType.Macarons,
    },
    DeliveryType: {
      0: DeliveryType.Pickup,
      1: DeliveryType.CourierDelivery,
    },
    OrderStatus: {
      0: OrderStatus.New,
      1: OrderStatus.Processed,
      2: OrderStatus.InProgress,
      3: OrderStatus.Ready,
      4: OrderStatus.Delivered,
      5: OrderStatus.Rejected,
    },
  };