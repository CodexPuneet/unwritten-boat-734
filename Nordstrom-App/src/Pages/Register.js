import {
  useToast,
  Input,
  Box,
  Grid,
  Img,
  Heading,
  Stack,
  Button,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";

import React from "react";
import axios from "axios";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Context/AuthContext/AuthContext";
const initialState = {
  firstName: "",
  email: "",
  password: "",
};
function Register() {
  const toast = useToast();
  const [formData, setFormData] = React.useState(initialState);
  const { registeredUser,setRegisteredUser } = React.useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    for (let key in formData) {
      if (formData[key] === "") {
        toast({
          title: "Please fill all the fields.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }
    }
    const user = registeredUser.find((user) => user.email === formData.email);

    if (user) {
      toast({
        title: "User already exists",
        description: "Please login",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      axios
        .post(`https://nordstromdb.herokuapp.com/registeredUser`, formData)
        .then((res) => {
          toast({
            title: "Account created.",
            description: "Welcome To Our Community.",
            status: "success",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
          setFormData(initialState);
          setRegisteredUser([...registeredUser, formData]);
        });
    }
  };
  return (
    <Grid
      w={{ base: "70%", md: "90%" }}
      m="30px auto"
      gap={8}
      templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
    >
      <Box display={{ base: "none", md: "inherit" }}>
        <Img
          w={"100%"}
          h={"100%"}
          src="https://static.toiimg.com/thumb/msid-59632433,width=1200,height=900/59632433.jpg"
        />
      </Box>
      <Box shadow={{ base: "md", md: "none" }} borderRadius="20px" p={4}>
        <Heading textAlign={"center"}>Welcome To Our Community</Heading>
        <Stack py={8} gap={4} w={{ base: "85%", md: "70%" }} m="auto">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FontAwesomeIcon icon={faUser} />}
            />
            <Input
              type={"text"}
              onChange={handleChange}
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
            />
          </InputGroup>
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

          <Button
            bg={"rgb(88, 88, 88)"}
            onClick={handleSubmit}
            _hover={{ bg: "black" }}
            color={"white"}
            fontSize="18px"
            w={"100%"}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
}

export default Register;
