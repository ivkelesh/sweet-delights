import {
  PostWishlistData,
  RegisterCredentials,
  LoginCredentials,
  ItemData,
  PagedRequest,
  GetOrdersListModel,
  GenerateReportModel,
  GenerateImageRequest,
} from "./interfaces";

// export const url = 'https://wishlist-service-dev.herokuapp.com/api';
export const url = "http://localhost:8082/api";

// Authentication
export function registerUser(registerData: RegisterCredentials) {
  return fetch(`http://localhost:8080/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(registerData),
  });
}

export function loginUser(loginData: LoginCredentials) {
  return fetch(`http://localhost:8080/api/auth/login`, {
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
  return fetch("https://confectioneryplatform.azurewebsites.net/api/products/cakes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(pagedRequest),
  });
}

export function getCheesecakes(pagedRequest: PagedRequest) {
  return fetch("https://confectioneryplatform.azurewebsites.net/api/products/cheesecakes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(pagedRequest),
  });
}

export function getMacarons(pagedRequest: PagedRequest) {
  return fetch("https://confectioneryplatform.azurewebsites.net/api/products/macarons", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(pagedRequest),
  });
}

export function getCupcakes(pagedRequest: PagedRequest) {
  return fetch("https://confectioneryplatform.azurewebsites.net/api/products/cupcakes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(pagedRequest),
  });
}

export function getOrders(getOrdersListModel: GetOrdersListModel) {
  return fetch("https://confectioneryplatform.azurewebsites.net/api/orders", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(getOrdersListModel),
  });
}

export function getOrderById(orderId: number) {
  return fetch(`https://confectioneryplatform.azurewebsites.net/api/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
}

export function getFillings() {
  return fetch(`${url}/confectionery/fillings`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
}

export function getCoating() {
  return fetch(`${url}/confectionery/coatings`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
}

export function getDecors() {
  return fetch(`${url}/confectionery/decors`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
}

export function calculateCakeCost(selectedArgs: any) {
  return fetch(`${url}/confectionery/calculate-cake-cost`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(selectedArgs),
  });
}

export function exportAsExcel(getOrdersListModel: GetOrdersListModel) {
  return fetch("https://confectioneryplatform.azurewebsites.net/api/orders/get-orders-excel", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(getOrdersListModel),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Orders.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    })
    .catch((error) => {
      console.error("Error exporting as Excel:", error);
    });
}

export function generateReport(generateReportModel: GenerateReportModel) {
  return fetch("https://confectioneryplatform.azurewebsites.net/api/orders/generate-report", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(generateReportModel),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Orders_Report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    })
    .catch((error) => {
      console.error("Error generating the Report:", error);
    });
}

export function generateImages(prompt: string) {
  return fetch(
    `https://confectioneryplatform.azurewebsites.net/api/orders/generate-images-parallel?prompt=${prompt}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
}

export function generateImagesNew(request: GenerateImageRequest) {
  return fetch(
    "https://confectioneryplatform.azurewebsites.net/api/orders/generate-images-parallel",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
}

export function postCake(payload) {
  return fetch(`${url}/confectionery/save-order`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
