import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { Flex } from "@chakra-ui/react";

function Blogs({dir}) {
  const { blog_data, blog_data_loading, blog_data_error } = useSelector(
    (state) => state.main
  );
  return (
    <>
      <Flex dir="row" gap="40px" overflowX={"scroll"} p="0 8%">
        {blog_data &&
          blog_data.map((element, index) => (
            <BlogCard key={element._id} index={index} data={element} w="510px" h="220px" />
          ))}
      </Flex>
    </>
  );
}
export default Blogs;
