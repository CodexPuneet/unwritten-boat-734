import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";

let text1 = ["Sell online", "Features", "Examples", "Website builder"];
let text2 = ["Online retail", "Ecommerce website", "Themes", "Shopping cart"];
let text3 = [
  "Mobile commerce",
  "Ecommerce software",
  "Online store builder",
  "Store themes",
];
let text4 = [
  "24/7 support",
  "NordStrom Help Center",
  "NordStrom Community",
  "API documentation",
];
function Footerlink() {
  return (
    <Grid
      m={"auto"}
      borderBottom="2px solid gray"
      borderTop="2px solid gray"
      gap={4}
      py={20}
      px={24}
      templateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
    >
      <Box>
        <Text fontWeight={"bold"}>ONLINE STORE</Text>
        {text1.map((text,index) => (
          <Text key={index} _hover={{color:'red',cursor:'pointer'}}>{text}</Text>
        ))}
      </Box>
      <Box>
        <Text fontWeight={"bold"}>Retail</Text>
        {text2.map((text,index) => (
          <Text key={index} _hover={{color:'red',cursor:'pointer'}}>{text}</Text>
        ))}
      </Box>
      <Box>
        <Text fontWeight={"bold"}>E-commerce</Text>
        {text3.map((text,index) => (
          <Text key={index} _hover={{color:'red',cursor:'pointer'}}>{text}</Text>
        ))}
      </Box>
      <Box>
        <Text fontWeight={"bold"}>SUPPORT</Text>
        {text4.map((text,index) => (
          <Text key={index} _hover={{color:'red',cursor:'pointer'}}>{text}</Text>
        ))}
      </Box>
    </Grid>
  );
}

export default Footerlink;
