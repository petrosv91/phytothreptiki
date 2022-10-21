import { useCallback, useState } from 'react';

import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Buttons, DeleteIcon, Loading, Modal, PdfIcon } from '../../lib/ui';

export function UploadFiles() {
  const modal = useDisclosure();
  const [loading, setLoading] = useState(false);

  const [state, send] = useMainMachine();

  const onDrop = useCallback(
    (uploadedFiles) => {
      // Read the files that have been dropped
      uploadedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setLoading(false);
        reader.onloadstart = () => setLoading(true);
        reader.onabort = () => console.log('file reader aborted');
        reader.onerror = () => console.log('file reader failed');
        reader.onload = () => {
          const newFile = {
            key: uuidv4(),
            name: file.name,
            path: file.path,
            size: file.size,
            data: reader.result,
          };
          send({ type: 'SAVE_FILE', file: newFile });
        };
      });
    },
    [send],
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  console.log(state.context.files);

  return (
    <>
      <Loading isLoading={loading} />
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} header='Φόρτωση PDF'>
        <Flex w='full' my={2} mx={8} gridGap={4} direction='column'>
          <Flex
            w='full'
            py={8}
            gridGap={2}
            align='center'
            direction='column'
            borderWidth={3}
            borderColor='special.500'
            borderStyle='dashed'
            {...getRootProps()}
          >
            <Text>Σύρετε PDF αρχεία</Text>
            <Text fontWeight='semibold'>ή</Text>
            <Buttons.Secondary onClick={open}>Επιλέξτε Τοπικά</Buttons.Secondary>
            <input {...getInputProps()} />
          </Flex>
          {state.context.files.map((file) => (
            <Flex key={file.key} ml={4} align='center' justify='space-between'>
              <Box as='li'>
                <Text
                  as='ul'
                  cursor='pointer'
                  color='special.500'
                  fontWeight='semibold'
                  _hover={{ color: 'special.600' }}
                >
                  {file.name}
                </Text>
              </Box>
              <DeleteIcon onClick={() => send({ type: 'DELETE_FILE', id: file.key })} />
            </Flex>
          ))}
        </Flex>
      </Modal>
      <PdfIcon onClick={modal.onOpen} />
    </>
  );
}
