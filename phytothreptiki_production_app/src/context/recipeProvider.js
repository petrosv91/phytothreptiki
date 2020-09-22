import React, { useContext } from 'react';

import { useMachine, useService } from '@xstate/react';

import { RecipeMachine } from '../machines/recipeMachine';

const RecipeContext = React.createContext();

function RecipeProvider({ children }) {
  const [, , service] = useMachine(RecipeMachine, { devTools: true });
  return <RecipeContext.Provider value={service}>{children}</RecipeContext.Provider>;
}

function useRecipeService() {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipeMachine must be used within a RecipeProvider');
  }
  return useService(context);
}

export { RecipeProvider, useRecipeService };
