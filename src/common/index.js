// testing api
// const baseUrl = "https://dresscode-updated.onrender.com";
// const baseUrl = "https://dresscode-unique.onrender.com";


// production api
const baseUrl = "https://dresscode-bck.onrender.com";

//  const baseUrl = "https://9e25-2405-201-c404-293c-4ddf-adfe-1857-27bb.ngrok-free.app";


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
    url: `${baseUrl}/uploadToS3/generateImgUrl`,
  },
  checkout: {
    url: `${baseUrl}/payment/checkout`,
  },
  verifyPayment: {
    url: `${baseUrl}/payment/verifyPayment`,
  },
  getSchoolNames: {
    url: `${baseUrl}/e-com/getAllSchoolNames`,
  },
};
export default DressCodeApi;

export const authUrls = {
  login: `${baseUrl}/user/login`,
  signup: `${baseUrl}/user/createUser`,
  signInWithGoogle: `${baseUrl}/oAuth/login`,
  generateAccessToken: `${baseUrl}/token/generateAccessToken`,
  forgotPassword: `${baseUrl}/user/forgot-password`,
  resetPassword: `${baseUrl}/user/reset-password`,
};
export const accountInfoApis = {
  getAccountInfo: (userId) => `${baseUrl}/user/${userId}/getUserDetails`,
  updateAccountInfo: (userId) => `${baseUrl}/user/${userId}/updateUserDetails`,
  getOrders: (userId) => `${baseUrl}/user/${userId}/getOrders`,
  getQuotes: (userId) => `${baseUrl}/user/${userId}/getQuotes`,
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
  // updateCartItemQuantity: (userId, productId) =>
  //   `${baseUrl}/user/${userId}/updateCartItemQuantity/${productId}`,
  deleteCartItem: (userId, productId) =>
    `${baseUrl}/user/${userId}/removeCartItem/${productId}`,
  getWhishList: (userId) => `${baseUrl}/user/${userId}/getWishlist`,
  updateCartItemCheck: (userId, cartId) =>
    `${baseUrl}/user/${userId}/updateCartItemCheck/${cartId}`,
  addWhishList: (userId) => `${baseUrl}/user/${userId}/addToWishlist`,
  removeCartItems: (userId) => `${baseUrl}/user/${userId}/removeCartItems`,
  removeFromWishList: (userId, productId) =>
    `${baseUrl}/user/${userId}/removeWishlistItem/${productId}`,

  addReview: (group, productId) => `${baseUrl}/user/${group}/${productId}/writeReview`,
  getReviews: (group, productId) => `${baseUrl}/user/${group}/${productId}/getProductReviews`,
  checkProductQuantity: (group, productId, color, size, quantity) =>
    `${baseUrl}/user/checkProductQuantity?group=${group}&productId=${productId}&color=${color}&size=${size}&quantityRequired=${quantity}`,
  createOrder: (userId, activeAddressId) => `${baseUrl}/order/createOrder/user/${userId}/address/${activeAddressId}`,
  getOrderDetails: (orderId) => `${baseUrl}/dashboard/getOrderDetails/${orderId}`,
  createQuote: (userId) => `${baseUrl}/order/createQuote/user/${userId}`,
  trackPackage: (awbCode) => `${baseUrl}/dashboard/track/awb/${awbCode}`,
  cancelOrder: (userId, orderId) => `${baseUrl}/user/${userId}/cancelOrder/${orderId}`,
  getCanceledOrders: (userId) => `${baseUrl}/user/${userId}/getCanceledOrders`,
  getFiltersByGroup: (groupName) => `${baseUrl}/e-com/getFiltersByGroup?groupName=${groupName}`,
  getProductsByGroup: (groupName) => `${baseUrl}/e-com/getProductsByGroup?groupName=${groupName}`,
  getProductsByGroupAndSchoolName: (schoolName) => `${baseUrl}/e-com/getProductsByGroupAndSchoolName?groupName=TOGS&schoolName=${schoolName}`,

};
export const S3imageApis = {
  uploadImage: `${baseUrl}/image/generateImgUrl`,
};
