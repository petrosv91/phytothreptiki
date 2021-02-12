import React from 'react';

import { Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactQueryConfigProvider } from 'react-query';

// import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';
import NewRecipe from '../components/recipe/newRecipe';
import { useReactFormSchema, useReactQueryConfig } from '../hooks';
import { Layout } from '../layouts';
import { getCurrentDate } from '../utils';

function Home() {
  const overrides = useReactQueryConfig();
  const { mainFormSchema } = useReactFormSchema();
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      date: getCurrentDate(),
      type: '',
      recipe: '',
      loops: '',
      weights: '',
      restPrice: '',
      totalWeights: '',
    },
    resolver: yupResolver(mainFormSchema),
  });
  return (
    <ReactQueryConfigProvider config={overrides}>
      <FormProvider {...methods}>
        <Navbar />
        <Layout>
          <Flex p={[3, 5, 10]} justify='center'>
            <NewRecipe />
          </Flex>
          {/* <Footer /> */}
        </Layout>
      </FormProvider>
    </ReactQueryConfigProvider>
  );
}

export default Home;
