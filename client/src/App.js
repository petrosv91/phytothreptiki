import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactQueryConfigProvider } from 'react-query';
import { Redirect, Route, Switch } from 'react-router-dom';

import ErrorBoundary from './components/error/errorBoundary';
import Navbar from './components/navbar/navbar';
import NewRecipe from './components/pages/newRecipe';
import ProductionFile from './components/pages/productionfile';
import RawMaterials from './components/pages/rawMaterials';
import { formDefaultValues } from './config';
import { useReactFormSchema, useReactQueryConfig } from './hooks';
import { Layout } from './lib/layouts';

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
