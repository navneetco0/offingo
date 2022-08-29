import {
  BLOG_DATA,
  BLOG_DATA_ERROR,
  BLOG_DATA_LOADING,
  DELETE_BLOG_DATA_ERROR,
  DELETE_BLOG_DATA_LOADING,
  LOGIN_ERROR,
  LOGIN_LOADING,
  MENU_STATUS,
  PAGE_STATUS,
  PATCH_BLOG_DATA_ERROR,
  PATCH_BLOG_DATA_LOADING,
  POST_BLOG_DATA_ERROR,
  POST_BLOG_DATA_LOADING,
  TOKEN,
} from "../actions/main";

const initial = {
  login_loading: false,
  login_error: null,
  Token: "Hello",
  blog_data_loading: false,
  post_blog_data_loading: false,
  patch_blog_data_loading: false,
  delete_blog_data_loading: false,
  blog_data_error: null,
  post_blog_data_error: null,
  patch_blog_data_error: null,
  delete_blog_data_error: null,
  blog_data: null,
  menu_status:false,
  page_status:null,
};

export const main = (store = initial, { type, payload }) => {
  switch (type) {
    case BLOG_DATA_LOADING:
      return { ...store, blog_data_loading: true };
    case POST_BLOG_DATA_LOADING:
      return { ...store, post_blog_data_loading: true };
    case LOGIN_LOADING:
      return { ...store, login_loading: true };
    case LOGIN_ERROR:
      return { ...store, login_loading: false, login_error: payload };
    case TOKEN:
      return { ...store, login_loading: false, Token: payload };
    case PATCH_BLOG_DATA_LOADING:
      return { ...store, patch_blog_data_loading: true };
    case DELETE_BLOG_DATA_LOADING:
      return { ...store, delete_blog_data_loading: true };
    case BLOG_DATA_ERROR:
      return { ...store, blog_data_loading: false, blog_data_error: payload };
    case POST_BLOG_DATA_ERROR:
      return {
        ...store,
        post_blog_data_error: payload,
        post_blog_data_loading: false,
      };
    case PATCH_BLOG_DATA_ERROR:
      return {
        ...store,
        patch_blog_data_error: payload,
        patch_blog_data_loading: false,
      };
    case DELETE_BLOG_DATA_ERROR:
      return {
        ...store,
        delete_blog_data_error: payload,
        delete_blog_data_loading: false,
      };
    case BLOG_DATA:
      return {
        ...store,
        blog_data_loading: false,
        post_blog_data_loading: false,
        patch_blog_data_loading: false,
        delete_blog_data_loading: false,
        post_blog_data_error: null,
        blog_data_error: null,
        delete_blog_data_error: null,
        patch_blog_data_error: null,
        blog_data: payload,
      };
    case MENU_STATUS:
        return {...store, menu_status:payload}
    case PAGE_STATUS:
        return {...store, page_status:payload}
    default:
      return store;
  }
};
