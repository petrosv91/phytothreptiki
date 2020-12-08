import React from 'react';

import { Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import Footer from './components/footer/footer';
import NewRecipe from './components/menu/newRecipe';
import RecipeSearch from './components/menu/recipeSearch';
import Navbar from './components/navbar/navbar';
import useReactFormSchema from './config/reactFormSchema';
import { MainFormProvider } from './context/mainFormProvider';
import { Layout } from './layouts';

function Menu() {
  const { mainFormSchema } = useReactFormSchema();
  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(mainFormSchema),
  });
  return (
    <FormProvider {...methods}>
      <MainFormProvider>
        <Layout>
          <Navbar />
          <Flex py={10} justify='center'>
            <NewRecipe />
            <RecipeSearch />
          </Flex>
          <Footer />
        </Layout>
      </MainFormProvider>
    </FormProvider>
  );
}

export default Menu;
