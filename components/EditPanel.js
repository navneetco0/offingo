import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { Drop } from "../assets/svgs/Drop";
import { Edit } from "../assets/svgs/Edit";
import {
  setFontDecoration,
  setFontSize,
  setFontStyle,
  setFontWeight,
} from "../redux/actions/createBlog";

export const EditPanel = () => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(false);
  const [fontDisplay, setFontDisplay] = useState(false);
  const { font_size, font_weight, font_style, font_decoration, file_type } =
    useSelector((state) => state.createBlog);
  const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 26, 28, 36, 48, 72];
  const fonts = [
    { type: "B", style: "bold" },
    { type: "I", style: "italic" },
    { type: "U", style: "underline" },
  ];
  return (
    <Draggable>
      <Box id="mydiv" position={"absolute"} top="-31px">
        <Flex
          bg={"gray"}
          w="44px"
          h="44px"
          padding={"2px"}
          justifyContent="center"
          alignItems={"center"}
          borderRadius="50%"
          zIndex={"18"}
        >
          <Flex
            zIndex={"15"}
            id="mydivheader"
            borderRadius={"50%"}
            bg={"black"}
            w="40px"
            h="40px"
            cursor="move"
            onClick={() => setWidth(true)}
            padding="5px"
            overflow={"hidden"}
            _hover={{ transform: "scale(1.05, 1.05) rotate(10deg)" }}
            _active={{ transform: "scale(0.95, 0.95) rotate(-10deg)" }}
          >
            <Edit />
          </Flex>
        </Flex>
        {width ? (
          <Flex
            bg={"black"}
            position="absolute"
            left={width ? "44px" : "-200px"}
            top="0"
            zIndex={12}
            color="white"
            textAlign={"center"}
            p="4px"
            borderRadius={"0 6px 6px 0"}
          >
            <Flex border="1px solid gray" position={"relative"}>
              <input
                type={"number"}
                value={font_size}
                style={{
                  width: "20px",
                  backgroundColor: "transparent",
                  outline: "transparent",
                }}
                onChange={(e) => dispatch(setFontSize(e.target.value))}
              />
              {fontDisplay ? (
                <Flex
                  direction={"column"}
                  border={"1px solid rgba(127, 127, 127, 0.1)"}
                  w="38px"
                  position="absolute"
                  top={"30px"}
                  left="-1px"
                  zIndex="15"
                  backgroundColor="black"
                  borderRadius={"0 0 6px 6px"}
                >
                  {fontSizes.map((Element, index) => (
                    <Text
                      key={index}
                      lineHeight="18px"
                      p="0 4px"
                      textAlign={"left"}
                      cursor="default"
                      _hover={{ bg: "rgba(255, 255, 255, 0.3)" }}
                      onClick={() => dispatch(setFontSize(Element))}
                    >
                      {Element}
                    </Text>
                  ))}
                  <Text
                    lineHeight="15px"
                    p="0 4px"
                    _hover={{ cursor: "default" }}
                  >
                    ....
                  </Text>
                </Flex>
              ) : (
                ""
              )}
              <Center
                borderLeft={"1px solid gray"}
                onClick={() => setFontDisplay(!fontDisplay)}
                _hover={{ bg: "rgba(255, 255, 255, 0.3)" }}
              >
                <Drop w={"15px"} />
              </Center>
            </Flex>
            <Flex
              p="0 5px"
              ml="5px"
              gap="2px"
              borderLeft={"1px solid gray"}
              borderRight="1px solid gray"
            >
              {fonts.map((element, index) => (
                <Text
                  key={index}
                  cursor={"pointer"}
                  color="white"
                  fontWeight={element.style == "bold" ? "bold" : "normal"}
                  fontStyle={element.style == "italic" ? "italic" : "normal"}
                  fontDecoration={
                    element.style == "underline" ? "underline" : "normal"
                  }
                  fontSize={"20px"}
                  p="0 5px"
                  w="25px"
                  bg={
                    element.style === "bold"
                      ? font_weight === "bold"
                        ? "rgba(255, 255, 255, 0.4)"
                        : "rgba(255, 255, 255, 0)"
                      : element.style === "italic"
                      ? font_style === "italic"
                        ? "rgba(255, 255, 255, 0.4)"
                        : "rgba(255, 255, 255, 0)"
                      : font_decoration === "underline"
                      ? "rgba(255, 255, 255, 0.4)"
                      : "rgba(255, 255, 255, 0)"
                  }
                  _hover={{ bg: "rgba(255, 255, 255, 0.3)" }}
                  onClick={() =>
                    element.style === "bold"
                      ? dispatch(
                          setFontWeight(
                            font_weight === "normal" ? "bold" : "normal"
                          )
                        )
                      : element.style === "italic"
                      ? dispatch(
                          setFontStyle(
                            font_style === "normal" ? "italic" : "normal"
                          )
                        )
                      : dispatch(
                          setFontDecoration(
                            font_decoration === "normal"
                              ? "underline"
                              : "normal"
                          )
                        )
                  }
                >
                  {element.type}
                </Text>
              ))}
            </Flex>

            <Center w={"25px"}>
              <Box
                transform={"rotate(90deg)"}
                cursor="pointer"
                onClick={() => {
                  setWidth(false);
                }}
                w="20px"
                _hover={{ w: "25px" }}
                _active={{ w: "20px" }}
              >
                <Drop w={"100%"} />
              </Box>
            </Center>
          </Flex>
        ) : (
          ""
        )}
      </Box>
    </Draggable>
  );
};
