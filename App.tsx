import React from 'react';
import { CartProvider } from './src/contexts/CartContext';
import { UserProvider } from './src/contexts/UserContext';
import Routes from './src/routes';

const App = () => {

  return (
    <UserProvider>
        <Routes/>
    </UserProvider>
  )
};

export default App;
