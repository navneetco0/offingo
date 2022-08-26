
  import {FILE_TYPE, FONT_DECORATION, FONT_SIZE, FONT_STYLE, FONT_WEIGHT} from "../actions/createBlog"
  const initial = {
    text: "",
    font_size: 11,
    font_weight: "normal",
    font_style: "normal",
    font_decoration: "normal",
    file_type: "text",
  };
  
  export const createBlog = (store = initial, { type, payload }) => {
    switch (type) {
      case FONT_SIZE:
        return {...store, font_size:payload}
    case FONT_WEIGHT:
        return {...store, font_weight:payload}
    case FONT_STYLE:
        return {...store, font_style:payload}
    case FONT_DECORATION:
        return {...store, font_decoration:payload}
    case FILE_TYPE:
        return {...store, file_type:payload}
      default:
        return store;
    }
  };
  