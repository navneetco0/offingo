import {
  Flex,
  Button,
  Box,
  Hide,
  Text,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Edit } from "../assets/svgs/Edit";
import {
  deleteBlogData,
  pageStatus,
  patchBlogData,
} from "../redux/actions/main";
import BlogCard from "./BlogCard";
import { API } from "./data";
import { MyImage } from "./MyImage";

function ReadBlog({ data, token }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  const [updateStatus, setUpdateStatus] = useState(null);
  const { page_status } = useSelector((state) => state.main);
  return (
    <Flex w="100%" h={"100vh"} position="relative">
      {token ? (
        <Flex position="absolute" top="80px" right={"50px"} gap="10px">
          {updateStatus === page_status ? (
            <Button
              colorScheme={"whatsapp"}
              variant="outline"
              onClick={() => {
                setUpdateStatus(null);
                dispatch(
                  patchBlogData(
                    { id: data[page_status - 1]._id },
                    title,
                    content,
                    token
                  )
                );
              }}
            >
              Done
            </Button>
          ) : (
            <Button
              colorScheme={"yellow"}
              variant="outline"
              onClick={() => {
                setUpdateStatus(page_status);
                setContent(data[page_status - 1].content);
                setTitle(data[page_status - 1].title);
              }}
            >
              Update
            </Button>
          )}
          <Button
            colorScheme={"red"}
            onClick={() => {
              dispatch(
                deleteBlogData({ id: data[page_status - 1]._id }, token)
              );
              dispatch(pageStatus(page_status - 1));
            }}
          >
            Delete
          </Button>
        </Flex>
      ) : (
        ""
      )}
      <Hide breakpoint="(max-width: 600px)">
        <Box
          minW={"280px"}
          borderRight="1px solid rgba(127, 127, 127, 0.1)"
          h={"calc(100vh - 70px)"}
          overflowY="scroll"
          p={"10px"}
          mt="70px"
        >
          {data &&
            data.map((Element, index) => (
              <Box key={Element._id}>
                <BlogCard
                  index={index}
                  data={Element}
                  w={"260px"}
                  h={"100px"}
                />
              </Box>
            ))}
        </Box>
      </Hide>
      <Box mt={"110px"} flexGrow={1} pl="5%" pr="5%" overflow={"scroll"}>
        {updateStatus === page_status ? (
          <>
            <Input
              mt="50px"
              fontSize={"40px"}
              fontWeight="500"
              value={title}
              height="fit-content"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Box
              h={"400px"}
              w={"100%"}
              mt="20px"
              backgroundColor="rgba(127, 127, 127, 0.2)"
              borderRadius="6px"
              overflow={"hidden"}
              position={"relative"}
            >
              <MyImage src={data[page_status - 1].image.filePath} />
            </Box>
          </>
        ) : (
          <>
            <Text fontSize={"40px"} fontWeight="500">
              {data[page_status - 1].title}
            </Text>
            <Box
              h={"400px"}
              w={"100%"}
              mt="20px"
              backgroundColor="rgba(127, 127, 127, 0.2)"
              borderRadius="6px"
              overflow={"hidden"}
              position={"relative"}
            >
              <MyImage src={data[page_status - 1].image.filePath} />
            </Box>
            <Text fontSize={"20px"} mt="20px" color="gray">
              {data[page_status - 1].content}
            </Text>
          </>
        )}
      </Box>
    </Flex>
  );
}

export default ReadBlog;
