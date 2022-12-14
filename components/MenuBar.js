import { useSelector, useDispatch } from "react-redux";
import { Button, Flex, Box, Show, CloseButton } from "@chakra-ui/react";
import { menuStatus, pageStatus } from "../redux/actions/main";
import Cookies from "js-cookie";

function MenuBar  ({ token }) {
    const dispatch = useDispatch();
  const { menu_status } = useSelector((state) => state.main);
  return (
    <Show breakpoint="(max-width: 600px)">
      {menu_status && (
        <Flex
          dir="row"
          bg="white"
          position="fixed"
          w={"100%"}
          minH={"100vh"}
          top={0}
          left={0}
          zIndex={5}
          justify={"center"}
          alignItems={"center"}
        >
          <Box
            position={"absolute"}
            left="30px"
            top="30"
            onClick={() => {
              dispatch(menuStatus(false));
            }}
          >
            <CloseButton size="lg" />
          </Box>
          {token ? (
            <Flex direction={"column"} w="100%">
              <Button
                variant={"ghost"}
                w={"100%"}
                onClick={() => {
                  dispatch(menuStatus(false));
                  dispatch(pageStatus("write"))
                }}
              >
                Write Blog
              </Button>
              <Button variant={"ghost"} w={"100%"} onClick={()=>Cookies.remove('token', {path:'/',  domain: '.vercel.app'})}>
                Logout
              </Button>
            </Flex>
          ) : (<></>
          )}
        </Flex>
      )}
    </Show>
  );
};
export default MenuBar;