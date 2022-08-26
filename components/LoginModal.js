import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {login} from "../redux/actions/main";

function LoginModal ({variant}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Button variant={variant||"solid"} colorScheme={variant?"gray":"whatsapp"} onClick={onOpen}>
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign in here</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
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
                dispatch(login(username, password));
                onClose();
              }}
            >
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
