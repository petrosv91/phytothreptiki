import React from 'react';

import { Flex, Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import Footer from '../components/footer/footer';
import CreateMenu from '../components/menu/createMenu';
import DeleteMenu from '../components/menu/deleteMenu';
import Navbar from '../components/navbar/navbar';
import NewRecipe from '../components/recipe/newRecipe';
import RecipeSearch from '../components/recipe/recipeSearch';
import { useReactFormSchema } from '../config/';
import { MainMachineProvider } from '../context/mainMachineProvider';
import { Layout } from '../layouts';

function Home() {
  const { mainFormSchema } = useReactFormSchema();
  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(mainFormSchema),
  });
  return (
    <FormProvider {...methods}>
      <MainMachineProvider>
        <Layout>
          <Navbar />
          <Flex p={10} justify='center' direction='column'>
            <Stack direction='row' spacing={2} justify='flex-end'>
              <RecipeSearch />
              <CreateMenu />
              <DeleteMenu />
            </Stack>
            <NewRecipe />
          </Flex>
          <Footer />
        </Layout>
      </MainMachineProvider>
    </FormProvider>
  );
}

export default Home;
