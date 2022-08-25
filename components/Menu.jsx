import { useSelector, useDispatch } from "react-redux";
import { Button, Flex, Box, Show, CloseButton } from "@chakra-ui/react";
import { menuStatus, modalStatus, pageStatus } from "../redux/actions/main";
import { LoginModal } from "./LoginModal";

function Menu  ({ token }) {
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
              <Button variant={"ghost"} w={"100%"}>
                Logout
              </Button>
            </Flex>
          ) : (
            <Flex direction={"column"} w="100%">
              <LoginModal variant={"ghost"}/>
            </Flex>
          )}
        </Flex>
      )}
    </Show>
  );
};
export default Menu;