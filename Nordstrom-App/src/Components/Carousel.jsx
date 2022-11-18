import { Box, Flex, Img, Text } from '@chakra-ui/react'
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

function Carousel(props) {
    const [index,setIndex]=React.useState(1);
    const {carousel}=props;
    React.useEffect(()=>{
        const interval=setInterval(()=>{
            setIndex(index=>index+1)
            if(index===carousel.length-1){
                setIndex(0)
            }
        },3000)
        return ()=>clearInterval(interval)
    },[index,carousel.length])

    const handleClick=(value)=>{
        
        let newIndex=index+value;
        if(newIndex === carousel.length){
            newIndex=0
        }
        if(newIndex<0){
            newIndex=carousel.length-1
        }
        setIndex(newIndex);
    }
  return (
    <Flex width={'90%'} gap='2' alignItems='center' m='80px auto'>
       <FontAwesomeIcon cursor={'pointer'} onClick={()=>handleClick(-1)} icon={faBackward}/>
       <Img src={carousel[index].img} w={carousel[index].title ?{base:'70%',md:'70%',lg:'60%'}:{base:'95%'}} h={'100%'} objectFit={'cover'} /> 

       {
               carousel[index].title &&  <Box >
               <Text fontSize={{base:'20px',md:'25px',lg:'30px'}} fontWeight={'bold'}>{carousel[index].title}</Text>
                 <Text fontSize={{base:'12px',md:'16px',lg:'18px'}} fontWeight={'normal'}>{carousel[index].desc}</Text>
               </Box>
       }
      
      <FontAwesomeIcon cursor={'pointer'} onClick={()=>handleClick(+1)} icon={faForward}/>
    </Flex>
  )
}

export default Carousel
