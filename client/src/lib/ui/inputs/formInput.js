import React from 'react';

import {
  Tag,
  Text,
  FormLabel,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';

import Input from './input';

function FormInput(props) {
  const {
    w,
    tag,
    name,
    label,
    leftIcon,
    rightIcon,
    errors = {},
    rightIconClick = () => {},
    ...rest
  } = props;

  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;

  return (
    <FormControl w={w} mt={2} isInvalid={errors[name]}>
      {label && (
        <FormLabel htmlFor={name} color='text' fontSize={{ sm: 'sm', md: 'md' }}>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {leftIcon && (
          <InputLeftElement>
            <LeftIcon boxSize={6} />
          </InputLeftElement>
        )}
        <Input
          name={name}
          pl={leftIcon ? '10' : '4'}
          pr={rightIcon || tag ? '10' : '4'}
          {...rest}
        />
        {rightIcon && (
          <InputRightElement cursor='pointer' onClick={rightIconClick}>
            <RightIcon boxSize={6} />
          </InputRightElement>
        )}
        {tag && (
          <InputRightElement zIndex={0}>
            <Tag p={0} size='lg' borderRadius='sm' color='colorText' bg='special.500'>
              <Text w='full' textAlign='center'>
                {tag}
              </Text>
            </Tag>
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
}

export default React.memo(FormInput);
