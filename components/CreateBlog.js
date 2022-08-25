import { useState } from "react";
import { Flex, Button, Hide, Box, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { postBlogData } from "../redux/actions/main";

function CreateBlog ({token}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  console.log(title, content);
  const saveBlog = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);
    dispatch(postBlogData(formData, token));
  };
  const [realImage, setRealImage] = useState("");
  return (
    <Flex w="100%" position={"relative"}>
      <Button
        position={"absolute"}
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
                position={'relative'}
              >
                {realImage ? <Image layout="fill" src={realImage} alt="" /> : ""}
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
      <Box mt={"100px"} flexGrow={1} pl="5%" pr="5%">
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
        <textarea
          placeholder="Write your blog here..."
          value={content}
          style={{
            fontSize: "20px",
            width: "100%",
            outline: "transparent",
            mt: "20px",
            color: "gray",
            resize: "none",
            height: "400px",
          }}
          onChange={(e) => setContent(e.target.value)}
        />
        <h3>Upload an image for your blog</h3>
        <input
          type={"file"}
          onChange={(e) => {
            setFile(e.target.files[0]);
            const imgFile = URL.createObjectURL(e.target.files[0]);
            setRealImage(imgFile);
          }}
        />
      </Box>
    </Flex>
  );
};

export default CreateBlog;
