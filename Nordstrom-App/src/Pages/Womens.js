import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import Footer from "../Components/Footer";
import axios from "axios";
import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { CartContext } from "../Context/CartContext/CartProvider";
import Action from "../Context/CartContext/Action";
import { AuthContext } from "../Context/AuthContext/AuthContext";

let timer;
function Womens() {
  const { cartdispatch} = React.useContext(CartContext);
  const [womensData, setWomensData] = React.useState([]);
  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const toast = useToast();
  const {authState} = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [Index, setIndex] = React.useState(0);
  const [ActiveImage, setActiveImage] = React.useState(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalIndex, setModalIndex] = React.useState(0);
  const [modalProduct, setModalProduct] = React.useState({});
  React.useEffect(() => {
    setIsLoading(true);
    axios.get(`https://nordstromdb.herokuapp.com/womensData`).then((res) => {
      

      setWomensData(res.data);
      setIsLoading(false);
    });
  }, []);
  
  const handleHover = (id, length) => {
    
    setActiveImage(id);
    let counter = 1;
    if (id !== -1) {
      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(() => {
        setIndex(counter++);

        if (counter === length) {
          counter = 0;
        }
      }, 1500);
    } else {
      clearInterval(timer);
    }
  };


  const handleFilter = (e) => {
    let filter;
    if(ref1.current.checked)
    {
      filter=`?_sort=price&_order=asc`
      setIsLoading(true);
    }
    if(ref2.current.checked)
    {
      filter=`?_sort=price&_order=desc`
      setIsLoading(true);
    }
    console.log('filter: ', filter);
    axios.get(`https://nordstromdb.herokuapp.com/womensData${filter}`).then((res) => {
      
      setWomensData(res.data);
      setIsLoading(false);
    });
    
  }

  return (
    <Box>
      {modalProduct.name && (
        <Modal onClose={onClose} size={{base:'md',md:"2xl"}} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton onClick={onClose} />
            <ModalBody>
              <Grid templateColumns={"1fr 1fr"} mt={8}>
                <Grid justifyContent="center">
                  <Image h={400} src={modalProduct.images[modalIndex]} />
                  <Flex gap={4} m="10px auto" alignItems={"center"}>
                  <ArrowLeftIcon
                    cursor={"pointer"}
                    onClick={() => {
                      setModalIndex(modalIndex - 1);
                      if (modalIndex === 0) {
                        setModalIndex(modalProduct.images.length - 1);
                      }
                    }}
                  />
                  <Text>
                    {modalIndex + 1}/{modalProduct.images.length}
                  </Text>
                  <ArrowRightIcon
                    cursor={"pointer"}
                    onClick={() => {
                      setModalIndex(modalIndex + 1);
                      if (modalIndex === modalProduct.images.length - 1) {
                        setModalIndex(0);
                      }
                    }}
                  />
                </Flex>
                </Grid>
                <Box>
                  <Text fontWeight={"bold"} fontSize="25">
                    {modalProduct.tagline}
                  </Text>
                  <Text>{modalProduct.name}</Text>
                  <Text mt={20}>Sizes</Text>
                  <Flex gap={3}>
                    <Box
                      p={2}
                      _hover={{ bg: "black", color: "white" }}
                      cursor="pointer"
                      borderRadius="50%"
                      border={"1px solid gray"}
                    
                    >
                      SM
                    </Box>
                    <Box
                      p={2}
                      _hover={{ bg: "black", color: "white" }}
                      cursor="pointer"
                      borderRadius="50%"
                      border={"1px solid gray"}
                    >
                      MD
                    </Box>
                    <Box
                      p={2}
                      _hover={{ bg: "black", color: "white" }}
                      cursor="pointer"
                      borderRadius="50%"
                      border={"1px solid gray"}
                    >
                      LG
                    </Box>
                    <Box
                      p={2}
                      _hover={{ bg: "black", color: "white" }}
                      cursor="pointer"
                      borderRadius="50%"
                      border={"1px solid gray"}
                    >
                      XL
                    </Box>
                  </Flex>
                  <Text fontWeight={"bold"} fontSize="25">
                    INR - {womensData[0].price}
                  </Text>
                  <Button
                    _hover={{ bg: "black" }}
                    bg="rgb(80,80,80)"
                    color={"white"}
                    w={"100%"}
                    onClick={() => {
                      if(authState.authStatus){
                        cartdispatch({type:Action.ADD_TO_CART, payload:modalProduct})
                       
                        toast({
                          title:` ${modalProduct.tagline} added to cart`,
                          status: "success",
                          duration: 2000,
                          isClosable: true,
                          position: "top",
                        });
                      }else{
                        toast({
                          title:`Please Login to add to cart`,
                          status: "error",
                          duration: 2000,
                          isClosable: true,
                          position: "top",
                        });
                      }
                    }}
                  >
                    <AddIcon mx={2} />
                    Add to Cart
                  </Button>
                </Box>
               
              </Grid>
            </ModalBody>
            
          </ModalContent>
        </Modal>
      )}

      <Grid templateColumns={"20% 80%"} w="95%" m={"auto"}>
        <Box my={4}>
          <Box shadow={"md"} position={"sticky"} top="10px">
            <Accordion>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight={700}>
                    Gender
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Flex direction={"column"}>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox />
                      <Text fontSize={{ md: "20" }}>Boys</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox />
                      <Text fontSize={{ md: "20" }}>Girls</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox />
                      <Text fontSize={{ md: "20" }}>Men</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox />
                      <Text fontSize={{ md: "20" }}>Kids</Text>
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight={700}>
                    Color
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Flex alignItems={"center"} gap={2}>
                    <Box bg={"black"} w="4" h="4"></Box>
                    <Text fontSize={{ md: "20" }}>Black</Text>
                  </Flex>
                  <Flex alignItems={"center"} gap={2}>
                    <Box bg={"blue"} w="4" h="4"></Box>
                    <Text fontSize={{ md: "20" }}>Blue</Text>
                  </Flex>
                  <Flex alignItems={"center"} gap={2}>
                    <Box border={"1px solid gray"} w="4" h="4"></Box>
                    <Text fontSize={{ md: "20" }}>White</Text>
                  </Flex>
                  <Flex alignItems={"center"} gap={2}>
                    <Box bg={"purple"} w="4" h="4"></Box>
                    <Text fontSize={{ md: "20" }}>Purple</Text>
                  </Flex>
                  <Flex alignItems={"center"} gap={2}>
                    <Box bg={"gray"} w="4" h="4"></Box>
                    <Text>Gray</Text>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight={700}>
                    Size
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Flex direction={"column"}>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox />
                      <Text fontSize={{ md: "20" }}>Small</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox />
                      <Text fontSize={{ md: "20" }}>Medium</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox />
                      <Text fontSize={{ md: "20" }}>Large</Text>
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight={700}>
                    Brand
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Flex direction={"column"}>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox />
                      <Text fontSize={{ md: "20" }}>Adidas</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox />
                      <Text fontSize={{ md: "20" }}>Puma</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox />
                      <Text fontSize={{ md: "20" }}>Nike</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox />
                      <Text fontSize={{ md: "20" }}>Levis</Text>
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight={700}>
                    Price
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Flex direction={"column"}>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox ref={ref1}/>
                      <Text fontSize={{ md: "20" }}>Low to High</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                      {" "}
                      <Checkbox  ref={ref2}/>
                      <Text fontSize={{ md: "20" }}>High to Low</Text>
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          <Button
            _hover={{ bg: "black" }}
            bg="rgb(80,80,80)"
            color={"white"}
             w={"100%"}
             onClick={handleFilter}
          >
            APPLY
          </Button>
          </Box>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
          p={4}
        >
          {isLoading ? [0,0,0,0,0,0,0,0,0,0,0,0].map((item,index)=><Skeleton key={index} h={300}></Skeleton>):womensData.map((item, index) => {
            return (
              <Box key={index}>
                {ActiveImage === index ? (
                  <Box
                  borderRadius={"md"}
                    key={item.id}
                    bg={"white"}
                    onMouseEnter={() => handleHover(index, item.images.length)}
                    onMouseLeave={() => handleHover(-1)}
                    shadow={"md"}
                    p={4}
                  >
                    <Image
                      cursor={"pointer"}
                      src={item.images[Index]}
                      w={"100%"}
                      h={"350px"}
                    />
                     <Box  mt={"-40px"}>
                    <Button
                      
                      w={'100%'}
                      _hover={{ bg: "black" }}
                      bg="rgb(80,80,80)"
                      color={"white"}
                      onClick={() => {
                        setModalProduct(item);
                        setModalIndex(0);
                        clearInterval(timer);
                        onOpen();
                      }}
                    >
                      View More
                    </Button>
                    </Box>

                    <Text fontSize={{ md: "20" }} fontWeight={700} mt={2}>
                      {item.tagline.slice(0, 15)}...
                    </Text>
                    <Text fontSize={{ md: "20" }} fontWeight={500} mt={2}>
                      INR-{item.price}
                    </Text>
                  </Box>
                ) : (
                  <Box
                    key={item.id}
                    borderRadius={"md"}
                    bg={"white"}
                    onMouseEnter={() => handleHover(index, item.images.length)}
                    onMouseLeave={() => handleHover(-1)}
                    shadow={"xl"}
                    p={4}
                  >
                    <Image
                      cursor={"pointer"}
                      src={item.images[0]}
                      w={"100%"}
                      h={"350px"}
                    />

                    <Text fontSize={{ md: "20" }} fontWeight={700} mt={2}>
                      {item.tagline.slice(0, 15)}...
                    </Text>
                    <Text fontSize={{ md: "20" }} fontWeight={500} mt={2}>
                      INR-{item.price}
                    </Text>
                  </Box>
                )}
              </Box>
            );
          })}
        </Grid>
      </Grid>

      <Footer />
    </Box>
  );
}

export default Womens;
