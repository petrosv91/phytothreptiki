import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactQueryConfigProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CreateElement from '../components/element/createElement';
import Navbar from '../components/navbar/navbar';
import CreateProduct from '../components/product/createProduct';
import { formDefaultValues } from '../config';
import { useReactFormSchema, useReactQueryConfig } from '../hooks';
import { Layout } from '../layouts';
import NewRecipe from './newRecipe';
import ProductionFile from './productionfile';
import RawMaterials from './rawMaterials';

function Home() {
  const overrides = useReactQueryConfig();
  const { mainFormSchema } = useReactFormSchema();
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: { ...formDefaultValues },
    resolver: yupResolver(mainFormSchema),
  });
  return (
    <ReactQueryConfigProvider config={overrides}>
      <FormProvider {...methods}>
        <BrowserRouter>
          <Navbar />
          <Layout>
            <Switch>
              <Route exact path='/'>
                <NewRecipe />
              </Route>
              <Route path='/rawMaterials'>
                <RawMaterials />
              </Route>
              <Route path='/productionFile'>
                <ProductionFile />
              </Route>
            </Switch>
          </Layout>
        </BrowserRouter>
      </FormProvider>
    </ReactQueryConfigProvider>
  );
}

export default Home;
