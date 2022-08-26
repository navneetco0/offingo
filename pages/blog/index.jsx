import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { getBlogData } from "../../redux/actions/main";
import BlogNav from "../../components/BlogNav";
import MenuBar from "../../components/MenuBar";
import BlogCard from "../../components/BlogCard";
import CreateBlog from "../../components/CreateBlog";
import ReadBlog from "../../components/ReadBlog";
import Cookies from "js-cookie";

export default function Home({ token }) {
  const dispatch = useDispatch();
  const { blog_data, Token, page_status } = useSelector((state) => state.main);

  useEffect(() => {
    dispatch(getBlogData());
  }, [dispatch]);

  return (
    <ChakraProvider>
      <div>
        <Head>
          <title>Offingo - blog</title>
          <meta name="description" content="offingo" />
          <link rel="icon" href="/favicon.png" />
        </Head>

        <main>
          <BlogNav token={token || Token} />
          <Flex
            w={"100%"}
            minH="100vh"
            justifyContent="center"
            alignItems="center"
            direction={"column"}
          >
            {!page_status ? (
              <Flex
                w={"100%"}
                h={"calc(100vh - 80px)"}
                p="0 10%"
                flexWrap="wrap"
                mt="80px"
              >
                <Flex
                  w="full"
                  h="max-content"
                  flexWrap="wrap"
                  margin={"0 auto"}
                >
                  {blog_data &&
                    blog_data.map((Element, index) => (
                      <BlogCard
                      key={Element._id}
                        index={index}
                        data={Element}
                        w="280px"
                        h="100px"
                      />
                    ))}
                </Flex>
              </Flex>
            ) : (
              ""
            )}
            {page_status === "write" ? (
              <CreateBlog token={token || Token} />
            ) : page_status ? (
              <ReadBlog data={blog_data} token={token || Token} />
            ) : (
              ""
            )}
          </Flex>
          <MenuBar token={token || Token} />
        </main>

        <footer></footer>
      </div>
    </ChakraProvider>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
