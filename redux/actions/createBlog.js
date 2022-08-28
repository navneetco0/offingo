export const FONT_SIZE = "FONT_SIZE";
export const FONT_WEIGHT = "FONT_WEIGHT";
export const FONT_STYLE = "FONT_STYLE";
export const FONT_DECORATION = "FONT_DECORATION";
export const FILE_TYPE = "FILE_TYPE";
export const FONT_COLOR = "FONT_COLOR"

export const setFontSize = (payload) => ({
  type: FONT_SIZE,
  payload,
});

export const setFontWeight = (payload) => ({
  type: FONT_WEIGHT,
  payload,
});

export const setFontStyle = (payload) => ({
  type: FONT_STYLE,
  payload,
});
export const setFontDecoration = (payload) => ({
  type: FONT_DECORATION,
  payload,
});
export const setFileType = (payload) => ({
  type: FILE_TYPE,
  payload,
});

export const setFontColor = (payload) =>({
  type:FONT_COLOR,
  payload
})
