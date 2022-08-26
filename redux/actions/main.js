import axios from "axios";

export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const TOKEN = "TOKEN";
export const BLOG_DATA_LOADING = "BLOG_DATA_LOADING";
export const POST_BLOG_DATA_LOADING = "POST_BLOG_DATA_LOADING";
export const PATCH_BLOG_DATA_LOADING = "PATCH_BLOG_DATA_LOADING";
export const DELETE_BLOG_DATA_LOADING = "DELETE_BLOG_DATA_LOADING";
export const BLOG_DATA_ERROR = "BLOG_DATA_ERROR";
export const POST_BLOG_DATA_ERROR = "POST_BLOG_DATA_ERROR";
export const PATCH_BLOG_DATA_ERROR = "PATCH_BLOG_DATA_ERROR";
export const DELETE_BLOG_DATA_ERROR = "DELETE_BLOG_DATA_ERROR";
export const BLOG_DATA = "BLOG_DATA";

export const MENU_STATUS = "MENU_STATUS";
export const PAGE_STATUS = "PAGE_STATUS";

export const loginLoading = () => ({
  type: LOGIN_LOADING,
});
export const loginError = (payload) => ({
  type: LOGIN_ERROR,
  payload,
});
export const setToken = (payload) => ({
  type: TOKEN,
  payload,
});
export const blogDataLoading = () => ({
  type: BLOG_DATA_LOADING,
});

export const postBlogDataLoading = () => ({
  type: POST_BLOG_DATA_LOADING,
});

export const patchBlogDataLoading = () => ({
  type: PATCH_BLOG_DATA_LOADING,
});

export const deleteBlogDataLoading = () => ({
  type: DELETE_BLOG_DATA_LOADING,
});

export const blogDataError = (payload) => ({
  type: BLOG_DATA_ERROR,
  payload,
});

export const postBlogDataError = (payload) => ({
  type: POST_BLOG_DATA_ERROR,
  payload,
});

export const patchBlogDataError = (payload) => ({
  type: PATCH_BLOG_DATA_ERROR,
  payload,
});
export const deleteBlogDataError = (payload) => ({
  type: DELETE_BLOG_DATA_ERROR,
  payload,
});

export const blogData = (payload) => ({
  type: BLOG_DATA,
  payload,
});

export const menuStatus = (payload) =>({
    type:MENU_STATUS, payload
})

export const pageStatus = (payload) =>({
    type:PAGE_STATUS, payload
})

export const logout = (username, password)=>(dispatch)=>{
  fetch("/api/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: res.data.token }),
  });
  dispatch(setToken(res.data.token));
}

export const login = (username, password) => (dispatch) => {
  dispatch(loginLoading());
  axios
    .post("https://offingo.herokuapp.com/login", {
      username,
      password,
    })
    .then((res) => {
      fetch("/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: res.data.token }),
      });
      dispatch(setToken(res.data.token));
    })
    .catch((error) => dispatch(loginError(error)));
};


export const getBlogData = () => (dispatch) => {
  dispatch(blogDataLoading());
  axios
    .get("https://offingo.herokuapp.com/blog")
    .then((res) => dispatch(blogData(res.data)))
    .catch((error) => dispatch(blogDataError(error.response.data)));
};

export const postBlogData = (formData, token) => (dispatch) => {
  dispatch(postBlogDataLoading());
  axios
    .post("https://offingo.herokuapp.com/blog", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => dispatch(getBlogData()))
    .catch((error) => dispatch(postBlogDataError(error.response.data)));
};
export const patchBlogData =
  ({ id }, title, content, token) =>
  (dispatch) => {
    dispatch(patchBlogDataLoading());
    axios
      .patch(
        `https://offingo.herokuapp.com/blog/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getBlogData()))
      .catch((error) => dispatch(patchBlogDataError(error.response.data)));
  };

export const deleteBlogData =
  ({ id }, token) =>
  (dispatch) => {
    dispatch(deleteBlogDataLoading());
    axios
      .delete(`https://offingo.herokuapp.com/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(getBlogData()))
      .catch((error) => dispatch(deleteBlogDataError(error.response.data)));
  };
