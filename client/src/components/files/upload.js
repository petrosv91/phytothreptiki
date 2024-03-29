import { Flex, Link, Text, useToast } from '@chakra-ui/react';

import { FILES_API } from '../../api/services';
import { CloseIcon, PdfIcon } from '../../lib/ui';
import { createToast } from '../../utils';

export function UploadFile({ file, saveFile, deleteFile }) {
  const toast = useToast();

  function open() {
    document.getElementById('upload').click();
  }
  function onBrowse(e) {
    const [selectedFile] = e.target.files;
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      return createToast(toast, {
        type: 'error',
        title: 'Αποτυχία',
        content: 'Το αρχείο θα πρέπει να είναι σε μορφή pdf',
      });
    }
    if (selectedFile.size > 4000000) {
      return createToast(toast, {
        type: 'error',
        title: 'Αποτυχία',
        content: 'Το αρχείο θα πρέπει να είναι λιγότερο απο 4mb',
      });
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    saveFile({ name: selectedFile.name, formData });
    // reset the input field for re-add to work
    e.target.value = '';
  }

  return (
    <Flex
      align='center'
      gridGap={2}
      alignSelf={['flex-start', 'flex-end']}
      direction={['row-reverse', 'row']}
    >
      {(() => {
        if (!file) {
          return (
            <Text color='red.500' fontWeight='semibold'>
              No File
            </Text>
          );
        }
        return (
          <Flex gridGap={1}>
            <CloseIcon cursor='pointer' boxSize={6} onClick={deleteFile} />
            <Link
              fontWeight='semibold'
              textAlign='center'
              cursor='pointer'
              target='_blank'
              href={`${FILES_API}/${file.id}/${file.name}`}
            >
              {file.name}
            </Link>
          </Flex>
        );
      })()}
      <input hidden id='upload' type='file' onChange={onBrowse} />
      <PdfIcon onClick={open} />
    </Flex>
  );
}
