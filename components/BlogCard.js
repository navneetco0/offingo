import {
  Box,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { pageStatus } from "../redux/actions/main";
import Link from "next/link";

function BlogCard ({ key,index, data, w, h }){
  const dispatch = useDispatch();
  const { page_status } = useSelector((state) => state.main);
  const API = "https://offingo.herokuapp.com";
  return (
    <Link href={"/blog"}>
      <Box
        key={key}
        minW={w}
        maxW={w}
        borderRadius={"10px"}
        padding={"2px"}
        overflow="hidden"
        cursor={page_status === index + 1 ? "" : "pointer"}
        id={page_status === index + 1 ? "blogDiv" : "blog_card"}
        onClick={() => dispatch(pageStatus(index + 1))}
      >
        <Box
          w={"100%"}
          border="1px solid rgba(127, 127, 127, 0.2)"
          borderRadius={"10px"}
          padding={"4px"}
          bg="white"
        >
          <Box
            h={h}
            w={"100%"}
            backgroundColor="rgba(127, 127, 127, 0.2)"
            borderRadius="6px 6px 0 0"
            overflow={"hidden"}
            position={"relative"}
          >
            <Image
              borderRadius="6px 6px 0 0"
              layout="fill"
              src={`${API}/${data.image.filePath}`}
              alt=""
            />
          </Box>
          <Box h={"fit-content"} p="5px">
            <Box color="black" fontWeight="500">
              {data.title}
            </Box>
            <Box
              height="34px"
              lineHeight="17px"
              color="gray"
              fontSize="14px"
              overflow="hidden"
              textOverflow="ellipsis"
              mt="5px"
            >
              {data.content}
            </Box>
            {index + 1 === page_status ? (
              ""
            ) : (
              <Text color={"red"} cursor="pointer" mt="4px" fontSize={"12px"}>
                Read more...
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default BlogCard;
