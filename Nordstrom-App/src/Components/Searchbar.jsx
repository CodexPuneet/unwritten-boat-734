import { SearchIcon } from '@chakra-ui/icons'
import {  Modal, Input, ModalContent, ModalOverlay, useDisclosure, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Searchbar()  {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const ref1 = React.useRef(null);
    const ref2 = React.useRef(null);
const navigate = useNavigate();
    const handleSubmit1 = (eve) => {
        if (eve.key === "Enter") {
            eve.preventDefault();
          navigate(`/${ref1.current.value}`);
          onClose();
        }
      };
    const handleSubmit2 = (eve) => {
        if (eve.key === "Enter") {
            eve.preventDefault();
          navigate(`/${ref2.current.value}`);
          onClose();
        }
      };
  
    return (
      <>
        <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.500" />}
              />
              <Input onClick={onOpen} onKeyPress={e=> {
                let eve=e;
                handleSubmit2(eve)}} 
                ref={ref2} type="text" placeholder="Search" />
            </InputGroup>
  
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
          <InputGroup  >
              <InputLeftElement
                pointerEvents="none"
                h={'50px'}
                w={'50px'}
                children={<SearchIcon color="gray.500" />}
              />
              <Input h={'50px'}
               onKeyPress={e=> {
                let eve=e;
                handleSubmit1(eve)}}
              ref={ref1} fontSize='18px' type="tel" placeholder="Search " />
            </InputGroup>
            
  
          </ModalContent>
        </Modal>
      </>
    )
  }

export default Searchbar
