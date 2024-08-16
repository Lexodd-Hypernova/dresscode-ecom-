const baseUrl = "https://dresscode-updated.onrender.com";
const DressCodeApi = {
  getGroups: {
    url: `${baseUrl}/e-com/getGroups`,
  },
  getCategories: {
    url: `${baseUrl}/e-com/getCategories`,
  },
  getSubCategories: {
    url: `${baseUrl}/e-com/getSubCategories`,
  },
  getProductTypes: {
    url: `${baseUrl}/e-com/getProductTypes`,
  },
  getProductFilters: {
    url: `${baseUrl}/e-com/getProductFilters`,
  },
  getProductsByFilters: {
    url: `${baseUrl}/e-com/getProductsByFilters`,
  },
  getProductDetailsWithSpecificVariant: {
    url: `${baseUrl}/e-com/getProductDetailsWithSpecificVariant`,
  },
  generateImageURL: {
    url: `${baseUrl}/image/generateImgUrl`,
  },
  checkout: {
    url: `${baseUrl}/payment/checkout`,
  },
  verifyPayment: {
    url: `${baseUrl}/payment/verifyPayment`,
  },
};
export default DressCodeApi;

export const authUrls = {
  login: `${baseUrl}/user/login`,
  signup: `${baseUrl}/user/createUser`,
};
export const accountInfoApis = {
  getAccountInfo: (userId) => `${baseUrl}/user/${userId}/getUserDetails`,
  updateAccountInfo: (userId) => `${baseUrl}/user/${userId}/updateUserDetails`,
  getOrders: (userId) => `${baseUrl}/user/${userId}/getOrders`,
  updateAddress: (userId, addressId) =>
    `${baseUrl}/user/${userId}/address/${addressId}/updateAddress`,
  addAddress: (userId) => `${baseUrl}/user/${userId}/addAddress`,
  getAddress: (userId) => `${baseUrl}/user/${userId}/addresses/active`,
  deleteAddress: (userId, addressId) =>
    `${baseUrl}/user/${userId}/address/${addressId}/removeAddress`,
  setAsDefaultAddress: (userId, addressId) =>
    `${baseUrl}/user/${userId}/address/${addressId}/setToDefault`,
};
export const shoppingInfoApis = {
  getCartData: (userId) => `${baseUrl}/user/${userId}/getCart`,
  addCartData: (userId) => `${baseUrl}/user/${userId}/addProductToCart`,
  handleItemsCount: (userId, productId) =>
    `${baseUrl}/user/${userId}/updateCartItemQuantity/${productId}`,
  deleteCartItem: (userId, productId) =>
    `${baseUrl}/user/${userId}/removeCartItem/${productId}`,
  getWhishList: (userId) => `${baseUrl}/user/${userId}/getWishlist`,
  addWhishList: (userId) => `${baseUrl}/user/${userId}/addToWishlist`,
  removeCartItems: (userId) => `${baseUrl}/user/${userId}/removeCartItems`,
  removeFromWishList: (userId, productId) =>
    `${baseUrl}/user/${userId}/removeWishlistItem/${productId}`,
  addReview: (group, productId) =>
    `${baseUrl}/user/${group}/${productId}/writeReview`,
  getReviews: (group, productId) =>
    `${baseUrl}/user/${group}/${productId}/getProductReviews`,
};
export const S3imageApis = {
  uploadImage: `${baseUrl}/image/generateImgUrl`,
};
