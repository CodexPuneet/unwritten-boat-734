import { Box, Heading, Img } from '@chakra-ui/react'
import React from 'react'
import Footerlink from './Footerlink'

function Footer() {
  return (
    <Box  style={{
      backgroundColor: 'rgb(237, 234, 234)',
      padding: "50px 0px"
    }}>
      <Box>
        <Heading mx={10}>About us</Heading>
        <Footerlink/>
        <Box className='media'>

        <Img w={{base:'200px',md:'300px'}} ml={10} src="https://cdn.pixabay.com/photo/2021/02/08/15/44/social-media-5995266_960_720.png" alt="" />
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
