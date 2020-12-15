import React from 'react';

import { Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactQueryConfigProvider } from 'react-query';

// import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';
import NewRecipe from '../components/recipe/newRecipe';
import { useReactFormSchema, useReactQueryConfig } from '../config/';
import { MainMachineProvider } from '../context/mainMachineProvider';
import { Layout } from '../layouts';

function Home() {
  const overrides = useReactQueryConfig();
  const { mainFormSchema } = useReactFormSchema();
  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(mainFormSchema),
  });
  return (
    <ReactQueryConfigProvider config={overrides}>
      <FormProvider {...methods}>
        <MainMachineProvider>
          <Layout>
            <Navbar />
            <Flex p={[5, 10]} justify='center'>
              <NewRecipe />
            </Flex>
            {/* <Footer /> */}
          </Layout>
        </MainMachineProvider>
      </FormProvider>
    </ReactQueryConfigProvider>
  );
}

export default Home;
