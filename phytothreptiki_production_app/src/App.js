import React from 'react';

import { Flex } from '@chakra-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';
import Recipe from './components/recipe/recipe';
import { FormProvider } from './context/formProvider';
import { Layout } from './layouts';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Layout>
        <Flex h='full' direction='column'>
          <Navbar />
          <Flex px={[10, 50, 200, 300]} py={5} justify='center'>
            <Switch>
              <FormProvider>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route path='/recipe'>
                  <Recipe />
                </Route>
                <Route path='/search'>hello</Route>
              </FormProvider>
            </Switch>
          </Flex>
          <Footer />
        </Flex>
      </Layout>
    </Router>
  );
}

export default App;
