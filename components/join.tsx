import {useContext, useEffect, useState, useRef} from 'react';
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import {
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
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
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('success')
  const router = useRouter()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const getSession = async (value: string) => {
    try {
      const res = await fetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
          id: value,
        }),
      })
      return res.json()
    } catch (err) {
      console.log(err);
    }
  }

  const joinSession = async (value: string) => {
    const res = await getSession(value)
    if(res.success) {
      window.localStorage.setItem("token", res.session.authCode)
      window.localStorage.setItem("sessionID", res.session.id)
      router.push('/callback')
      setStatus('success')
    }
    else {
      setStatus('error')
    }
  }

  const SessionAlert = ({ status }) => {
    if (status === 'error') {
      return (
        <Alert status='error' colorScheme='red' color="black" mt={5}>
          <AlertIcon />
          Invalid Session ID
        </Alert>
      )
    }
    return null 
  }

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
          <ModalCloseButton color={'blue.500'} />
          <ModalBody pb={2}>
            <FormControl>
              <Input ref={initialRef} value={value} onChange={handleChange} color="black" />
            </FormControl>
            <SessionAlert status={status}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}  onClick={e => {
              joinSession(value)} 
            }>
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