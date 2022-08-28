import { useState } from "react";
import {
  Flex,
  Button,
  Hide,
  Box,
  Text,
  Square,
  Circle,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { postBlogData } from "../redux/actions/main";
import { EditPanel } from "./EditPanel";
import {
  setFileType,
  setFontColor,
  setFontDecoration,
  setFontSize,
  setFontStyle,
  setFontWeight,
} from "../redux/actions/createBlog";
import { Camera } from "./Camera";
import { Close } from "../assets/svgs/Close";

function CreateBlog({ token }) {
  const dispatch = useDispatch();
  const [contentData, setContentData] = useState([]);
  const [updateStatus, setUpdataStatus] = useState("last");
  const {
    font_size,
    font_weight,
    font_style,
    font_decoration,
    font_color,
    file_type,
  } = useSelector((state) => state.createBlog);
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const saveBlog = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);
    dispatch(postBlogData(formData, token));
  };
  const [realImage, setRealImage] = useState("");

  const handleContent = (e) => {
    const text = e.target.value;
    setContent(text);
  };
  const updateParagraph = (index) => {
    const paragraph = {
      text: content,
      font_size: font_size,
      font_weight: font_weight,
      font_style: font_style,
      font_decoration: font_decoration,
      type: "text",
      font_color: font_color,
    };
    setContentData([...contentData, paragraph]);
    setContent(contentData[index].text);
    dispatch(setFontSize(contentData[index.font_size]));
    dispatch(setFontWeight(contentData[index].font_weight));
    dispatch(setFontStyle(contentData[index].font_style));
    dispatch(setFontDecoration(contentData[index].font_decoration));
    dispatch(setFontColor(contentData[index].font_color));
    setUpdataStatus(index);
  };
  console.log("data", contentData);
  console.log("updateStatus", updateStatus);
  return (
    <Flex w="100%" position={"relative"}>
      <Button
        position={"absolute"}
        zIndex="5"
        right="10%"
        colorScheme={"whatsapp"}
        top="90px"
        onClick={() => {
          saveBlog();
          setContent(null);
          setTitle(null);
        }}
      >
        save
      </Button>
      <Hide breakpoint="(max-width: 600px)">
        <Box
          minW={"280px"}
          borderRight="1px solid rgba(127, 127, 127, 0.1)"
          h={"100vh"}
          overflowY="scroll"
          p={"10px"}
        >
          <Box
            w={"100%"}
            borderRadius={"10px"}
            padding={"2px"}
            mt="100px"
            id="blogDiv"
            overflow="hidden"
          >
            <Box
              w={"100%"}
              border="1px solid rgba(127, 127, 127, 0.2)"
              borderRadius={"10px"}
              padding={"4px"}
              bg="white"
            >
              <Box
                h={"100px"}
                w={"260px"}
                backgroundColor="rgba(127, 127, 127, 0.2)"
                borderRadius="6px 6px 0 0"
                position={"relative"}
              >
                  {/* <Image layout="fill" src={contentData[0].img} alt="" /> */}

              </Box>
              <Box h={"fit-content"} p="5px">
                <Box color="black" fontWeight="500">
                  {title ? title : "Title"}
                </Box>
                <Box
                  width={"250px"}
                  height="34px"
                  lineHeight="17px"
                  color="gray"
                  fontSize="14px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  mt="5px"
                >
                  <Text>{content ? content : "Blog Content"}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Hide>
      <Box mt={"100px"} flexGrow={1} pl="5%" pr="5%" position={"relative"}>
        <EditPanel />
        <input
          type={"text"}
          placeholder="Title"
          value={title}
          style={{
            fontSize: "40px",
            width: "100%",
            outline: "transparent",
            fontWeight: "500",
          }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Box>
          {contentData &&
            contentData.map((element, index) => (
              <>
                {updateStatus === index ? (
                  <textarea
                    type={"text"}
                    value={content}
                    style={{
                      fontSize: font_size,
                      color: font_color,
                      fontWeight: font_weight,
                      textDecoration: font_decoration,
                      fontStyle: font_style,
                      outline: "transparent",
                      width: "100%",
                      height: "fit-content",
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const paragraph = {
                          text: content,
                          font_size: font_size,
                          font_weight: font_weight,
                          font_style: font_style,
                          font_decoration: font_decoration,
                          type: "text",
                          font_color: font_color,
                        };
                        let data = contentData;
                        data[index] = paragraph;
                        setContentData(data);
                        setContent("");
                        updateParagraph(index + 1);
                      }
                    }}
                    onChange={(e) => handleContent(e)}
                  />
                ) : (
                  <>
                    {element.type === "image" ? (
                      <>
                        {/* {element.imgFile} */}
                        <Box
                          h={"400px"}
                          w={"100%"}
                          backgroundColor="rgba(127, 127, 127, 0.2)"
                          borderRadius="10px"
                          position={"relative"}
                          overflow="hidden"
                        >
                          <box position="absolute">
                            <Close/>
                          </box>
                            <Image layout="fill" src={element.img} alt="" />
                        </Box>
                      </>
                    ) : (
                      <Text
                        key={index}
                        fontSize={element.font_size}
                        color={element.font_color}
                        fontWeight={element.font_weight}
                        textDecoration={element.font_decoration}
                        fontStyle={element.font_style}
                        whiteSpace="wrap"
                        mt={"10px"}
                        onClick={() => updateParagraph(index)}
                      >
                        {element.text}
                      </Text>
                    )}
                  </>
                )}
              </>
            ))}
        </Box>
        {file_type === "text" ? (
          <>
            {updateStatus === "last" || updateStatus > contentData.length ? (
              <textarea
                type={"text"}
                value={content}
                style={{
                  fontSize: font_size,
                  color: font_color,
                  fontWeight: font_weight,
                  textDecoration: font_decoration,
                  fontStyle: font_style,
                  outline: "transparent",
                  width: "100%",
                  height: "400px",
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    const paragraph = {
                      text: content,
                      font_size: font_size,
                      font_weight: font_weight,
                      font_style: font_style,
                      font_decoration: font_decoration,
                      type: "text",
                      font_color: font_color,
                    };
                    setContentData([...contentData, paragraph]);
                    setContent("");
                  }
                }}
                onChange={(e) => handleContent(e)}
              />
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <Circle
              size="40px"
              border={"1px solid gray"}
              cursor="pointer"
              position={"relative"}
            >
              <input
                style={{
                  position: "absolute",
                  opacity: "0",
                  cursor: "pointer",
                }}
                top="-100px"
                type={"file"}
                onChange={(e) => {
                  setFiles([...files, e.target.files[0]]);
                  console.log(e.target.files[0]);
                  const imgFile = URL.createObjectURL(e.target.files[0]);
                  setContentData([
                    ...contentData,
                    {
                      type: file_type,
                      name: e.target.files[0].name,
                      img: imgFile,
                    },
                  ]);
                }}
              />
              <Box h="24px" w="24px">
                <Camera />
              </Box>
            </Circle>
          </>
        )}
        {/* <input
          type={"file"}
          onChange={(e) => {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
            const imgFile = URL.createObjectURL(e.target.files[0]);
            setRealImage(imgFile);
          }}
        /> */}
      </Box>
    </Flex>
  );
}

export default CreateBlog;
