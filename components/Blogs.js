import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { Flex, Skeleton, SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";

function Blogs({ dir }) {
  const { blog_data, blog_data_loading, blog_data_error } = useSelector(
    (state) => state.main
  );
  const arr = new Array(25).fill(0);
  return (
    <>
      <Flex dir="row" gap="2%" overflowX={"scroll"} p="0 8%">
        {blog_data_loading&&arr.map((Element, index) => (
          <Box key={index}>
            <Box
              minW={'320px'}
              maxW={'150px'}
              borderRadius={"10px"}
              padding={"2px"}
              overflow="hidden"
            >
              <Box
                w={"100%"}
                border="1px solid rgba(127, 127, 127, 0.2)"
                borderRadius={"10px"}
                padding={"4px"}
                bg="white"
              >
                <Skeleton h={"220px"} w="100%" borderRadius={"6px 6px 0 0"} />
                <Box h={"fit-content"} p="5px">
                  <Box color="black" fontWeight="500">
                    <Skeleton w={"350px"} h="20px"/>
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
                    <SkeletonText w="100%"  noOfLines={2} />
                  </Box>
                  <Skeleton w="100px" h="15px" />
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
        {blog_data &&
          blog_data.map((element, index) => (
            <Box key={element._id}>
              <BlogCard Key={element._id} index={index} data={element} w="320px" h="160px" path={'/blog'} />
            </Box>
          ))}
      </Flex>
    </>
  );
}
export default Blogs;
