import Head from "next/head";
import axios from "axios";
import cookies from "js-cookie";
import {
  ChakraProvider,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  InputGroup,
  Flex,
  Text,
  Textarea
} from "@chakra-ui/react";
import { useState } from "react";
import React, { useEffect } from "react";

export default function Home({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tok, setTok] = useState(token);
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
       setTok(res.data.token)
      })
      .catch((error) => console.log(error));
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
            {tok?<>
            <Box w={"70%"} resize="none">
                <Textarea minH="500px" mt={"50px"} placeholder="write your blog here..." />
            </Box>
            </>:
              <FormControl
                isRequired
                w={"400px"}
                m="auto"
                border="1px solid rgba(127, 127, 127, 0.2)"
                borderRadius={"16px"}
                padding="20px"
              >
                <Text
                  fontSize={"50px"}
                  fontWeight="600"
                  textAlign={"center"}
                  marginBottom="40px"
                >
                  Sign In
                </Text>
                <InputGroup size={"md"} mb="40px" display={"block"}>
                  <FormLabel>Username</FormLabel>

                  <Input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    id="username"
                    placeholder="Enter your username here..."
                  />
                </InputGroup>
                <InputGroup size="md" display="block">
                  <FormLabel>Password</FormLabel>
                  <Input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    id="password"
                    pr="4.5rem"
                    placeholder="Enter your password here..."
                  />
                </InputGroup>
                <Button
                  mt={4}
                  colorScheme="red"
                  type="submit"
                  display={"block"}
                  m="40px auto 0"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </FormControl>}
            </Flex>
        </main>

        <footer></footer>
      </div>
    </ChakraProvider>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
