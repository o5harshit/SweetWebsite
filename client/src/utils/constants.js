export const HOST = import.meta.env.VITE_SERVER_URL

// Auth Routes - 

export const AUTH_ROUTES = `${HOST}/api/auth`
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`
export const LOGOUT_USER  = `${AUTH_ROUTES}/logout`

// Sweets Routes

export const SWEET_ROUTES = `${HOST}/api/sweets`
export const ADD_SWEETS = `${SWEET_ROUTES}/AddSweets`
export const GET_SWEETS_ROUTE = `${SWEET_ROUTES}/GetSweets`
export const UPDATE_SWEETS_ROUTE = `${SWEET_ROUTES}/UpdateSweet`
export const GET_SWEETS_BY_ID_ROUTE = `${SWEET_ROUTES}/GetById`
export const FILTER_SWEETS_ROUTE = `${SWEET_ROUTES}/SearchSweets`
export const DELETE_SWEETS_ROUTES = `${SWEET_ROUTES}/DeleteSweets`

// CART ROUTES 

export const CART_ROUTE = `${HOST}/api/cart`
export const GET_CART_ITEMS = `${CART_ROUTE}/GetCart`
export const ADD_CART_ITEMS = `${CART_ROUTE}/AddCart`
export const DELETE_CART_ITEMS = `${CART_ROUTE}/DeleteCartItem` 
export const UPDATE_CART_ITEMS = `${CART_ROUTE}/UpdateCart`

// Purchase 

export const PURCHASE_ROUTE = `${HOST}/api/purchase`
export const PURCHASE_ITEMS = `${PURCHASE_ROUTE}/BuyItem`;