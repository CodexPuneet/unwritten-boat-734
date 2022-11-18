import { Box, Text, Image, Button, Flex, Spacer, Container, Grid, GridItem, Input,useToast, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, PinInputField, PinInput, HStack } from '@chakra-ui/react'
import React, { useState, useContext, useRef } from 'react'
import { CartContext } from '../Context/CartContext/CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,  faDotCircle, faGift, faTags, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import Action from '../Context/CartContext/Action';

function Cart() {

  const { state, cartdispatch } = useContext(CartContext);
  const [product, setProduct] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:IsOpen, onOpen:OnOpen, onClose:OnClose } = useDisclosure();
  const cancelRef = useRef()
 const total = state.reduce((acc, item) => acc + item.price, 0);
  const toast = useToast()

  return (
    <Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Remove Item
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You want to remove {product.name} from the cart?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' ml={3} onClick={() => {
                cartdispatch({ type: 'REMOVE_FROM_CART', payload: product });
                onClose()
                toast({
                  title: `${product.name} `,
                  position: 'bottom-left',
                  description: "Removed from cart.",
                  status: "warning",
                  duration: 4000,
                  isClosable: true,
                })
              }} >
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {
        state.length > 0 ? 
        <Box>
          <Container maxW='container.lg' mt={8}>
            <Grid templateColumns={"repeat(5, 1fr)"} gap='6'>
              <GridItem colSpan={{base:5,md:3}}>
                <Box display='flex' bg='white' p='6' borderRadius='3px' border='1px solid' borderColor='gray.200' justifyContent='space-between'>
                  <Text mt={'6px'} fontSize='14px'>Deliver To: <Text as='span' fontWeight='bold'>831015</Text></Text>
                  <Button border='1px solid' borderColor='black' _hover={{ bg: 'black', color: 'white' }} borderRadius='4px' color='black' bg='transparent' size='sm' fontSize='13px'>CHANGE ADDRESS</Button>
                </Box>
                <Box mt={2} bg='white' p='6' borderRadius='3px' border='1px solid' borderColor='gray.200' >
                  <Text fontSize='14px'><FontAwesomeIcon icon={faTags} /> <Text as='span' fontWeight='bold'>&nbsp; Avaliable Offers</Text></Text>
                  <Text color={'gray.500'} mt='4' fontSize='12px'><FontAwesomeIcon icon={faDotCircle} /> <Text as='span' fontWeight='bold'>&nbsp; 10% Instant Discount On ICICI Bank Credit Cards On Min Spend Of 3,500 TCA</Text></Text>
                  <Text color={'gray.500'} mt='4' fontSize='12px'><FontAwesomeIcon icon={faDotCircle} /> <Text as='span' fontWeight='bold'>&nbsp; 10% Cashback upto Rs 150 on Ola Money Postpaid or wallet transaction on a min spend of Rs 1000 . TCA</Text></Text>
                </Box>
                <Box mt={2} bg='white' p='6' borderRadius='3px' border='1px solid' borderColor='gray.200' >
                  <Text color={'gray.600'} fontSize='13px'><FontAwesomeIcon icon={faTruck} /> &nbsp; Yay! <Text as='span' fontWeight='bold'>No Convenience Fee </Text>On This Order</Text>
                </Box>
                {
                  state.map((item) => (
                    <Box key={item.id} mt={2} bg='white' p='6' borderRadius='3px' border='1px solid' borderColor='gray.200' >
                      <Box  borderRadius='3px' bg='white' display='grid' gridTemplateColumns='24% 75%' gridGap='1%'>
                        <Box colSpan='1'>
                          <Image src={item.images[0]} w='100%' />
                        </Box>
                        <Box p='4' colSpan='2'>
                          <Flex justifyContent={'space-between'}>
                            <Text fontSize='16px' fontWeight='bold'>{item.name}</Text>
                            <Box mt='-15px'>
                              <FontAwesomeIcon position='relative' fontSize={22} color='gray' icon={faXmark} cursor='pointer' onClick={() => { onOpen(); setProduct(item) }} />
                            </Box>
                          </Flex>
                          <Text fontSize='13px' mt={1} fontWeight='thin'>{item.tagline}</Text>
                          <Text fontSize='11px' mt={1} fontWeight='thin'>Sold By: Omnitech Retail</Text>
                          <Flex gap={1} alignItems='center'>
                            <Text fontWeight='bold' fontSize='16px' mt='1'>Rs. {item.price}</Text>
                            <Text fontWeight='thin' as={'s'} fontSize='13px' color='gray' mt='6px'>Rs. {item.mrp}</Text>
                            <Text fontWeight='thin' fontSize='13px' color='orange.400' mt='6px'>({((item.price * 100) / item.mrp).toFixed(0)}% OFF)</Text>
                          </Flex>
                          <Text fontSize='11px' mt={1} fontWeight='thin'><FontAwesomeIcon icon={faCheck} fontSize='13px' color='teal' /> Delivered By <strong>6 Oct 2022</strong></Text>
                        </Box>
                      </Box>
                    </Box>
                  ))
                }

              </GridItem>
              <GridItem colSpan={{base:5,md:2}}>
                <Box bg='white' p='6' borderRadius='3px' border='1px solid' borderColor='gray.200' j>
                  <Box display='flex' justifyContent='space-between'>
                    <Text fontSize='14px' mt={1}><FontAwesomeIcon icon={faTags} /> <Text as='span' fontWeight='bold'>&nbsp; Apply Coupons</Text></Text>
                    <Button border='1px solid' borderColor='black' _hover={{ bg: 'black', color: 'white' }} borderRadius='4px' color='black' bg='transparent' size='sm' >APPLY</Button>
                  </Box>
                  <Input mt={4} bg='white' p='4' borderRadius='3px' border='1px solid' borderColor='gray.200' placeholder='Enter Coupon Code' />
                </Box>
                <Box mt={4} display={{base:'none',lg:'inherit'}} bg='white' borderRadius='3px'  >
                  <Text ml='1' fontSize='14px'><FontAwesomeIcon icon={faGift} /> <Text as='span' fontWeight='bold'>&nbsp; Gifting And Personalisation</Text></Text>
                  <Box bg='red.50' mt={4} display='grid' gridTemplateColumns='25% 74%' gridGap='2%' px='4' h='125px' boxSizing='border-box'>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                      <Image src='https://constant.myntassets.com/checkout/assets/img/gift-big.webp' h='125px' />
                    </Box>
                    <Box>
                      <Text mt='4' fontSize='14px'><Text as='span' fontWeight='extrabold'>Buying For Loved One? </Text></Text>
                      <Text mt='1' fontSize='11px'><Text as='span' fontWeight='thin'>Gift wrap and personalised message on card, Only for Rs. 25 </Text></Text>
                      <Text mt='3' fontSize='14px' color='#ff3c6f'><Text as='span' fontWeight='bold'>ADD GIFT WRAP</Text></Text>
                    </Box>
                  </Box>
                </Box>
                <Box mt={4} bg='white' p='6' borderRadius='3px' border='1px solid' borderColor='gray.200' >
                  <Text fontSize='14px' fontWeight='bold'>Price Details ({state.length} Items)</Text>
                  <Flex justifyContent='space-between' mt={4}>
                    <Text fontSize='14px' fontWeight='thin'>Total MRP</Text>
                    <Text fontSize='14px' fontWeight='thin'>Rs. {state.reduce((acc, item) => acc + item.mrp, 0)}</Text>
                  </Flex>
                  <Flex justifyContent='space-between' mt={3}>
                    <Text fontSize='14px' fontWeight='thin'>Discount on MRP</Text>
                    <Text fontSize='14px' color='teal' fontWeight='thin'>- Rs. {state.reduce((acc, item) => acc + item.mrp, 0) - (total)}</Text>
                  </Flex>
                  <Flex justifyContent='space-between' mt={3}>
                    <Text fontSize='14px' fontWeight='thin'>Coupon Discount</Text>
                    <Text fontSize='14px' color='blue' fontWeight='thin'>Apply Now</Text>
                  </Flex>
                  <Flex justifyContent='space-between' mt={3}>
                    <Text fontSize='14px' fontWeight='thin'>Convenience Fee</Text>
                    <Text fontSize='14px' color='teal' fontWeight='thin'><Text as={'s'} color='blue'>Rs. 99</Text> &nbsp;Free</Text>
                  </Flex>
                  <Box borderBottom={'1px solid'} borderColor='gray.200' mt={4} />
                  <Flex justifyContent='space-between' mt={4}>
                    <Text fontSize='14px' fontWeight='bold'>Total MRP</Text>
                    <Text fontSize='14px' fontWeight='bold'>Rs. {total}</Text>
                  </Flex>
                  <Button mt={4} w='100%' bg='rgb(80,80,80)' color='white' _hover={{ bg: 'black' }} borderRadius='4px' onClick={OnOpen} >PLACE ORDER</Button>
                  <Modal isOpen={IsOpen} onClose={OnClose}>
          <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify Cvv</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <HStack>
  <PinInput>
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
  <Button my={4} colorScheme="blue" onClick={
    ()=>{
      toast({
        title: "Order Placed",
        description: "Your order has been placed successfully",
        status: "success",
        duration: 2000,
        position: "top-right",
        isClosable: true,
      })
      cartdispatch({type:Action.CLEAR_CART})
      OnClose()
    }
  }>Verify</Button>
          </ModalBody>

         
        </ModalContent>
      </Modal>


                </Box>
              </GridItem>
            </Grid>
          </Container>
        </Box> :
          <Box w='400px' h='400px' m='auto' mt='150px' textAlign='center'>
            <Box>
              <Image src='https://cdn3d.iconscout.com/3d/premium/thumb/cart-5590712-4652404.png' w='40%' m='auto' />
              <Text fontWeight='bold' fontSize='xl' mt='4'>Hey, it feels so light!</Text>
              <Text fontWeight='thin' fontSize='12px' color='gray' mt='1'>There is nothing in your bag. Let's add some items</Text>
              <Link to={'/mens'}>
              <Button border='1px solid black' borderRadius='3px' mt='8' color='black' bg='white' _hover={{ bg: 'black', color: 'white' }}>Start Shopping</Button>
              </Link>
            </Box>
          </Box>
      }
      <Container  mt='8' mb='10' bottom='0' w='100%' bg='white' h='60px' borderTop='1px solid' borderColor='gray.100'>
        <Grid gap={1} templateColumns={{base:'1fr', md:'1fr 1fr'}} >

          <Flex>
          <Image src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ssl.png" width="70px" height="37px" />
          <Image src="https://constant.myntassets.com/checkout/assets/img/footer-bank-visa.png" width="60px" height="37px" />
          <Image src="https://constant.myntassets.com/checkout/assets/img/footer-bank-mc.png" width="60px" height="37px" />
          <Image src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ae.png" width="60px" height="37px" />
          <Image src="https://constant.myntassets.com/checkout/assets/img/footer-bank-dc.png" width="60px" height="37px" />
          </Flex>
          <Flex>
          <Image src="https://constant.myntassets.com/checkout/assets/img/footer-bank-nb.png" width="60px" height="37px" />
          <Image src="https://constant.myntassets.com/checkout/assets/img/footer-bank-cod.png" width="60px" height="37px" />
          <Image src="https://constant.myntassets.com/checkout/assets/img/footer-bank-rupay.png" width="60px" height="37px" />
          <Image src="https://constant.myntassets.com/checkout/assets/img/footer-bank-paypal.png" width="60px" height="37px" />
          <Image src="https://constant.myntassets.com/checkout/assets/img/footer-bank-bhim.png" width="60px" height="37px" />
          </Flex>
        </Grid>
        <Spacer />
        <Box>
          <Text fontWeight='600' fontSize='13px'>Need Help&nbsp; ? &nbsp;Contact Us</Text>
        </Box>
      </Container>
    </Box>
  )
}

export default Cart

