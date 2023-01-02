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
    if (selectedFile.type !== 'application/pdf') {
      return createToast(toast, {
        type: 'error',
        title: 'Αποτυχία',
        content: 'Το αρχείο θα πρέπει να είναι σε μορφή pdf',
      });
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    saveFile({ name: selectedFile.name, formData });
  }

  return (
    <Flex alignSelf={['center', 'flex-end']} align='center' gridGap={2}>
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
