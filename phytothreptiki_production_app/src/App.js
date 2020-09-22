import React from 'react';

import { Flex } from '@chakra-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';
import Recipe from './components/recipe/recipe';
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
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/new-recipe'>
                <Recipe />
              </Route>
            </Switch>
          </Flex>
          <Footer />
        </Flex>
      </Layout>
    </Router>
  );
}

export default App;
