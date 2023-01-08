import {
  Box,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  Accordion as ChakraAccordion,
} from '@chakra-ui/react';

function Accordion({ handleClick, options, title }) {
  return (
    <ChakraAccordion w='full' allowToggle allowMultiple>
      <AccordionItem borderWidth={0}>
        <AccordionButton>
          <Box flex='1' fontWeight='semibold' textAlign='left'>
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel py={2} px={4}>
          {options.map((opt, index) => (
            <Box
              key={index}
              py={2}
              px={4}
              cursor='pointer'
              textAlign='left'
              _hover={{ bg: 'gray.200' }}
              onClick={() => handleClick(opt)}
            >
              {opt.label}
            </Box>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </ChakraAccordion>
  );
}

export default Accordion;
