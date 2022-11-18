import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Img, Input, InputGroup, InputLeftElement, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUserTie} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext/AuthContext'
import { AuthAction } from '../Context/AuthContext/AuthAction';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { CartContext } from '../Context/CartContext/CartProvider';

const initialState = {
  email: "",
  password: "",
};
function Login() {
  const [formData, setFormData] = React.useState(initialState);
  const { isOpen,onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const toast = useToast();
  const {cartdispatch} = useContext(CartContext);
  const {authState,dispatch,registeredUser} = useContext(AuthContext)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


 
 const handleLogin = (e) => {
    console.log('log' ,formData)
    
    const user = registeredUser.find((user) => user.email === formData.email);
    console.log('user: ', user);
    if (user) {
      if (user.password === formData.password) {
        
        axios.patch(`https://nordstromdb.herokuapp.com/loginUser/1`,{
          firstName:user.firstName,
          email:user.email,
          password:user.password
      })
      .then((res) => {
        dispatch({type:AuthAction.LOGIN,payload:user.firstName})
    toast({
      title: "Login Successful",
      description: "Welcome to Nordstrom",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-left",
    });
      })
    
  } else {
    toast({
      title: "Incorrect Password",
      description: "Please try again",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top-left",
    });
  }
  }else{
     toast({
      title: "User not found",
      description: "Please register",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-left",
    });
  }
  
 }

 const handleLogout = (e) => {
  
  axios.patch(`https://nordstromdb.herokuapp.com/loginUser/1`,{
    firstName:'',
    email:'',
    password:''
}).then((res) => {
  dispatch({type:AuthAction.LOGOUT})
  cartdispatch({type:'CLEAR_CART'})
toast({
  title: "Logout Successful",
  description: "See you soon",
  status: "success",
  duration: 3000,
  isClosable: true,
  position: "top-left",
});
})
 }
  if(!authState.authStatus){
    return (
      <> 
      <Text
    onClick={onOpen}
    fontSize="18px"
    fontWeight={500}
    cursor="pointer"

  >
    Login &nbsp;
    
    <FontAwesomeIcon  icon={faUserTie}/>
  </Text>
  
       <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={{base:"xs",md:"md"}}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
           WELCOME USER
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing={4} my={8}>
              <Img src='https://preply.com/wp-content/uploads/2018/04/shopping_bags.jpg'/>
              <InputGroup>
            {" "}
            <InputLeftElement
              pointerEvents="none"
              children={<EmailIcon color="gray.600" />}
            />
            <Input
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="Email"
              value={formData.email}
              required={true}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<LockIcon color="gray.600" />}
            />
            <Input
              type={"password"}
              onChange={handleChange}
              name="password"
              placeholder="Password"
              value={formData.password}
            />
          </InputGroup>
            <Button colorScheme='blue' onClick={handleLogin}>Login</Button>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            </Stack>
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </>
  )
    }else{
      return (<>
        <Text
        fontSize="18px"
        fontWeight={500}
      >
        <FontAwesomeIcon  icon={faUserTie}/>
        &nbsp;
        
        {authState.username}  
      </Text>
        <Text
        fontSize="18px"
        fontWeight={500}
        cursor="pointer"
        onClick={handleLogout}
      >
        Logout  &nbsp;
        
        <FontAwesomeIcon  icon={faRightFromBracket}/>
      </Text>
      </>
      )
    }
 
}

export default Login
