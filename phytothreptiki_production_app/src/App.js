import React from 'react';

import { ChakraProvider, Flex } from '@chakra-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Footer from './components/footer/footer';
import NewRecipe from './components/menu/newRecipe';
import RecipeDelete from './components/menu/recipeDelete';
import RecipeSearch from './components/menu/recipeSearch';
import Navbar from './components/navbar/navbar';
import { darkTheme, lightTheme } from './config';
import { FormProvider } from './context/formProvider';
import { useThemeMode } from './context/themeModeProvider';
import { Layout } from './layouts';
import Home from './pages/home';

function App() {
  const { currentTheme } = useThemeMode();
  return (
    <ChakraProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      <Router>
        <Layout>
          <Flex h='full' direction='column'>
            <Navbar />
            <Flex px={[10, 50, 200, 300]} py={10} justify='center'>
              <Switch>
                <FormProvider>
                  <Route exact path='/'>
                    <Home />
                  </Route>
                  <Route path='/recipe'>
                    <NewRecipe />
                  </Route>
                  <Route path='/search'>
                    <RecipeSearch />
                  </Route>
                  <Route path='/delete'>
                    <RecipeDelete />
                  </Route>
                </FormProvider>
              </Switch>
            </Flex>
            <Footer />
          </Flex>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
