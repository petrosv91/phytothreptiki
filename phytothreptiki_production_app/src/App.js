import { Flex } from '@chakra-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';
import Recipe from './components/recipe/recipe';
import Layout from './layouts/layout';
import Home from './pages/home';

function App() {
  return (
    <Layout>
      <Router>
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
      </Router>
    </Layout>
  );
}

export default App;
