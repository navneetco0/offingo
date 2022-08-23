import Head from "next/head";
import axios from "axios";
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
  Divider
} from "@chakra-ui/react";
import { useState, useSyncExternalStore } from "react";
import React, { useEffect } from "react";
import { Logo } from "../assets/svgs/Logo";
import { Menu } from "../assets/svgs/Menu";
import { Close } from "../assets/svgs/Close";

export default function Home({ token }) {
  const [tok, setTok] = useState(token);
  const [loginBox, setLoginBox] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [pageStatus, setPageStatus] = useState(null);
  const [menuStatus, setMenuStatus] = useState(false);

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/login", {
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

  return (
    <ChakraProvider>
      <div>
        <Head>
          <title>Offingo - blog</title>
          <meta name="description" content="offingo" />
          <link rel="icon" href="/favicon.png" />
        </Head>

        <main>
          <Flex
            w={"100%"}
            minH="100vh"
            justifyContent="center"
            alignItems="center"
            direction={"column"}
          >
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
            >
              <Box w={["80px", "104px", "134px", "134px"]}>
                <Logo h={"100%"} />
              </Box>
              <Hide breakpoint="(max-width: 600px)">
                {tok ? (
                  <Flex gap={"10px"}>
                    <Button colorScheme={"green"} variant={"ghost"}>
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
          </Flex>
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
                    placeholder="Enter your password here..."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
                  left="40px"
                  top={"40px"}
                  cursor="pointer"
                  onClick={() => setMenuStatus(false)}
                >
                  <Close />
                </Box>
                <Flex direction={"column"} w="100%">
                  <Button variant={'ghost'} w={"100%"}>Write Blog</Button>
                  <Button variant={'ghost'} w={"100%"}>Logout</Button>
                </Flex>
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
