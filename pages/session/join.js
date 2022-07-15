import {useContext, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { TokenContext } from '../callback';
import { Flex, Spacer } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'
import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const Join = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)
  return (   
    <>
      <Button colorScheme='blue' size='lg' onClick={onOpen}>
        Join Session
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay 
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader color="black">Enter Session ID</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <FormControl>
              <Input ref={initialRef} color="black" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Join
            </Button>
            <Button colorScheme='blue' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}   

export default Join;