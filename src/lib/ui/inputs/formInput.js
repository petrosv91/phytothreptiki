import { memo } from 'react';

import {
  Tag,
  Text,
  FormLabel,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react';

import Input from './input';

function FormInput(props) {
  const {
    w,
    tag,
    name,
    label,
    formRef,
    leftIcon,
    rightIcon,
    errors = {},
    horizontal,
    rightIconClick = () => {},
    ...rest
  } = props;

  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;
  const horizontalProps = horizontal ? { display: 'flex', alignItems: 'flex-end' } : {};

  return (
    <FormControl w={w} mt={2} isInvalid={errors[name]} {...horizontalProps}>
      <FormLabel htmlFor={name} color='text' fontSize={{ sm: 'sm', md: 'md' }}>
        {label}
      </FormLabel>
      <InputGroup>
        <InputLeftElement>{leftIcon && <LeftIcon boxSize={6} />}</InputLeftElement>
        <Input
          name={name}
          formRef={formRef}
          pl={leftIcon ? '10' : '4'}
          pr={rightIcon || tag ? '10' : '4'}
          {...rest}
        />
        <InputRightElement>
          {rightIcon && (
            <RightIcon boxSize={6} cursor='pointer' onClick={rightIconClick} />
          )}
          {tag && (
            <Tag p={0} size='lg' borderRadius='sm' bg='special.500'>
              <Text w='full' textAlign='center' color='colorText'>
                {tag}
              </Text>
            </Tag>
          )}
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage fontSize='md' fontWeight='semibold'>
        {errors[name]?.message}
      </FormErrorMessage>
    </FormControl>
  );
}

export default memo(FormInput);
