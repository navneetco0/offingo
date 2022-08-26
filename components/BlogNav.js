import { Logo } from "../assets/svgs/Logo";
import { Menu } from "../assets/svgs/Menu";
import {
  Flex,
  Box,
  Show,
  Hide,
  Button
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { menuStatus, pageStatus } from "../redux/actions/main";
import  LoginModal  from "./LoginModal";
import Cookies from "js-cookie";

function BlogNav ({ token }) {
    const dispatch = useDispatch();
  return (
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
        onClick={() =>dispatch(pageStatus(null))}
      >
        <Logo h={"100%"} />
      </Box>
      <Hide breakpoint="(max-width: 600px)">
        {token ? (
          <Flex gap={"10px"}>
            <Button
              colorScheme={"green"}
              variant={"ghost"}
              onClick={() => {
                dispatch(pageStatus("write"));
              }}
            >
              Write Blog
            </Button>
            <Button colorScheme={"red"} onClick={()=>Cookies.remove('token', {path:'/',  domain: '.vercel.app'})}>Logout</Button>
          </Flex>
        ) : (
          <LoginModal />
        )}
      </Hide>
      <Show breakpoint="(max-width: 600px)">
        <Box cursor={"pointer"} onClick={() => dispatch(menuStatus(true))}>
          <Menu />
        </Box>
      </Show>
    </Flex>
  );
};

export default BlogNav;
