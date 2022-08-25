import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import cookies from "js-cookie";
import {
  ChakraProvider,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Show,
  Hide,
  Divider,
  CloseButton,
  Text,
  Textarea,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useState, useSyncExternalStore } from "react";
import React, { useEffect } from "react";
import { Logo } from "../assets/svgs/Logo";
import { Menu } from "../assets/svgs/Menu";
import { Close } from "../assets/svgs/Close";

export default function Home({ token }) {
  const API = "https://offingo.herokuapp.com";
  const [tok, setTok] = useState(token);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState(null);
  const [content, setContent] = useState("");
  const [loginBox, setLoginBox] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [blogData, setBlogData] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [pageStatus, setPageStatus] = useState(null);
  const [menuStatus, setMenuStatus] = useState(false);
  const toast = useToast();
  const handleSubmit = () => {
    axios
      .post(`${API}/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        fetch("/api/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: res.data.token }),
        });
        setTok(res.data.token);
      })
      .catch((error) => console.log(error));
    onClose();
  };
  const saveBlog = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);
    await axios.post("http://localhost:5000/blog", formData, {
      headers: {
        Authorization: `Bearer ${tok}`,
      },
    });
    axios
      .get(`${API}/blog`)
      .then((res) => setBlogData(res.data))
      .catch((error) => console.log(error));
  };
  const updateValue = async () => {
    await axios.patch(
      `${API}/blog/${blogData[pageStatus - 1]._id}`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${tok}`,
        },
      }
    );
    axios
      .get(`${API}/blog`)
      .then((res) => setBlogData(res.data))
      .catch((error) => console.log(error));
  };
  const delteBlog = async () => {
    await axios
      .delete(`http://localhost:5000/blog/${blogData[pageStatus - 1]._id}`, {
        headers: {
          Authorization: `Bearer ${tok}`,
        },
      })
      .then((res) => blogData.length===1?setPageStatus(null):setPageStatus(pageStatus - 1))
      .catch((error) => {
        if (error.response.data === "jwt expires") setTok(null);
        toast({
          position: "top",
          title: error.response.data,
          variant: "solid",
          isClosable: true,
        });
      });

    axios
      .get(`${API}/blog`)
      .then((res) => setBlogData(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`${API}/blog`)
      .then((res) => setBlogData(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <ChakraProvider>
      <div>
        <Head>
          <title>Offingo - blog</title>
          <meta name="description" content="offingo" />
          <link rel="icon" href="/favicon.png" />
        </Head>

        <main>
          {/* navbar */}
          <Flex
            pt={["10px", "12px"]}
            pb={["10px", "12px"]}
            position="fixed"
            top={0}
            dir="row"
            w={"100%"}
            bg="white"
            borderBottom={"1px solid rgba(127, 127, 127, 0.1)"}
            h={"fit-content"}
            pl="5%"
            alignItems="center"
            pr={"5%"}
            justifyContent="space-between"
            zIndex={5}
          >
            <Box
              w={["80px", "104px", "134px", "134px"]}
              cursor="pointer"
              onClick={() => setPageStatus(null)}
            >
              <Logo h={"100%"} />
            </Box>
            <Hide breakpoint="(max-width: 600px)">
              {tok ? (
                <Flex gap={"10px"}>
                  <Button
                    colorScheme={"green"}
                    variant={"ghost"}
                    onClick={() => {
                      setPageStatus("write");
                      setContent(null);
                      setTitle(null);
                    }}
                  >
                    Write Blog
                  </Button>
                  <Button colorScheme={"red"}>Logout</Button>
                </Flex>
              ) : (
                <Button onClick={onOpen} colorScheme={"whatsapp"}>
                  Login
                </Button>
              )}
            </Hide>
            <Show breakpoint="(max-width: 600px)">
              <Box cursor={"pointer"} onClick={() => setMenuStatus(true)}>
                <Menu />
              </Box>
            </Show>
          </Flex>
          <Flex
            w={"100%"}
            minH="100vh"
            justifyContent="center"
            alignItems="center"
            direction={"column"}
          >
            {/* write  */}
            {!pageStatus ? (
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
                  // justifyContent="space-between"
                >
                  {blogData &&
                    blogData.map((Element, index) => (
                      <Box
                        key={Element._id}
                        w={"280px"}
                        borderRadius={"10px"}
                        padding={"2px"}
                        overflow="hidden"
                        cursor={"pointer"}
                        onClick={() => setPageStatus(index + 1)}
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
                            w={"100%"}
                            backgroundColor="rgba(127, 127, 127, 0.2)"
                            borderRadius="6px 6px 0 0"
                            overflow={"hidden"}
                            position={"relative"}
                          >
                            <Image
                              borderRadius="6px 6px 0 0"
                              layout="fill"
                              src={`${API}/${Element.image.filePath}`}
                            />
                          </Box>
                          <Box h={"fit-content"} p="5px">
                            <Box color="black" fontWeight="500">
                              {Element.title}
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
                              {Element.content}
                            </Box>
                            <Text
                              color="red"
                              fontSize={"12px"}
                              mt="4px"
                              cursor={"pointer"}
                            >
                              Read more...
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </Flex>
              </Flex>
            ) : (
              ""
            )}

            {pageStatus === "write" ? (
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
                          backgroundColor="rgba(127, 127, 127, 0.2)"
                          borderRadius="6px 6px 0 0"
                        >
                          {/* <img /> */}
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
                    }}
                  />
                </Box>
              </Flex>
            ) : pageStatus ? (
              <Flex w="100%" h={"100vh"} position="relative">
                {tok ? (
                  <Flex
                    position="absolute"
                    top="80px"
                    right={"50px"}
                    gap="10px"
                  >
                    {updateStatus === pageStatus ? (
                      <Button
                        colorScheme={"whatsapp"}
                        variant="outline"
                        onClick={() => {
                          setUpdateStatus(null);
                          updateValue();
                        }}
                      >
                        Done
                      </Button>
                    ) : (
                      <Button
                        colorScheme={"yellow"}
                        variant="outline"
                        onClick={() => {
                          setUpdateStatus(pageStatus);
                          setContent(blogData[pageStatus - 1].content);
                          setTitle(blogData[pageStatus - 1].title);
                        }}
                      >
                        Update
                      </Button>
                    )}
                    <Button colorScheme={"red"} onClick={() => delteBlog()}>
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
                    {blogData &&
                      blogData.map((Element, index) => (
                        <Box
                          key={index}
                          w={"260px"}
                          borderRadius={"10px"}
                          padding={"2px"}
                          mt="10px"
                          id={pageStatus === index + 1 ? "blogDiv" : ""}
                          overflow="hidden"
                          cursor={pageStatus === index + 1 ? "" : "pointer"}
                          onClick={() => setPageStatus(index + 1)}
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
                              w={"100%"}
                              backgroundColor="rgba(127, 127, 127, 0.2)"
                              borderRadius="6px 6px 0 0"
                              overflow={"hidden"}
                              position={"relative"}
                            >
                              <Image
                                borderRadius="6px 6px 0 0"
                                layout="fill"
                                src={`${API}/${Element.image.filePath}`}
                              />
                            </Box>
                            <Box h={"fit-content"} p="5px">
                              <Box color="black" fontWeight="500">
                                {Element.title}
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
                                {Element.content}
                              </Box>
                              {index + 1 === pageStatus ? (
                                ""
                              ) : (
                                <Text color={"red"} cursor="pointer" mt="4px">
                                  Read more...
                                </Text>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      ))}
                  </Box>
                </Hide>
                <Box mt={"80px"} flexGrow={1} pl="5%" pr="5%" overflow={"scroll"}>
                  {updateStatus === pageStatus ? (
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
                    </>
                  ) : (
                    <>
                      <Text fontSize={"40px"} fontWeight="500">
                        {blogData[pageStatus - 1].title}
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
                        <Image
                          borderRadius="6px 6px 0 0"
                          layout="fill"
                          src={`${API}/${blogData[pageStatus-1].image.filePath}`}
                        />
                      </Box>
                      <Text fontSize={"20px"} mt="20px" color="gray">
                        {blogData[pageStatus - 1].content}
                      </Text>
                    </>
                  )}
                </Box>
              </Flex>
            ) : pageStatus ? (
              <Flex></Flex>
            ) : (
              ""
            )}
          </Flex>

          {/* popup login  */}
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Sign in here</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Enter your username here..."
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type={"password"}
                    placeholder="Enter your password here..."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="whatsapp"
                  mr={3}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Login
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* res menu */}
          <Show breakpoint="(max-width: 600px)">
            {menuStatus && (
              <Flex
                dir="row"
                bg="white"
                position="fixed"
                w={"100%"}
                minH={"100vh"}
                top={0}
                left={0}
                zIndex="2"
                justify={"center"}
                alignItems={"center"}
              >
                <Box
                  position={"absolute"}
                  left="30px"
                  top="30"
                  onClick={() => {
                    setMenuStatus(false);
                  }}
                >
                  <CloseButton size="lg" />
                </Box>
                {tok ? (
                  <Flex direction={"column"} w="100%">
                    <Button
                      variant={"ghost"}
                      w={"100%"}
                      onClick={() => {
                        setMenuStatus(false);
                        setPageStatus("write");
                      }}
                    >
                      Write Blog
                    </Button>
                    <Button variant={"ghost"} w={"100%"}>
                      Logout
                    </Button>
                  </Flex>
                ) : (
                  <Flex direction={"column"} w="100%">
                    <Button
                      variant={"ghost"}
                      w={"100%"}
                      onClick={() => {
                        setMenuStatus(false);
                        onOpen();
                      }}
                    >
                      Login
                    </Button>
                  </Flex>
                )}
              </Flex>
            )}
          </Show>
        </main>

        <footer></footer>
      </div>
    </ChakraProvider>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
