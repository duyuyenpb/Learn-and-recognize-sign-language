import React from 'react'
import handImages from '../images/handImages.svg';
import {
    Text,
    Button,
    Image,
    Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
Link,
} from '@chakra-ui/react'

import { RiFileList3Fill } from "react-icons/ri"

export default function Alphabet() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return (
        <div>
            <Button leftIcon={<RiFileList3Fill size={20}/>} onClick={onOpen} color="blue.500">Bảng chữ cái</Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.500">Bảng chữ cái</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Image src={handImages}/>
          <Text fontSize="sm">Ảnh mình hoạ thủ ngữ được tạo bởi <Link href="https://thenounproject.com/pelodrome/" isExternal color="blue.400">Pelin Kahraman</Link></Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </div>
    )
}
