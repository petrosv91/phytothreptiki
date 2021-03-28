import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactQueryConfigProvider } from 'react-query';
import { Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/navbar';
import { formDefaultValues } from './config';
import ErrorBoundary from './error/errorBoundary';
import { useReactFormSchema, useReactQueryConfig } from './hooks';
import { Layout } from './layouts';
import NewRecipe from './pages/newRecipe';
import ProductionFile from './pages/productionfile';
import RawMaterials from './pages/rawMaterials';

function App() {
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
        <Navbar />
        <Layout>
          <ErrorBoundary>
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
              <Redirect to='/' />
            </Switch>
          </ErrorBoundary>
        </Layout>
      </FormProvider>
    </ReactQueryConfigProvider>
  );
}

export default App;
