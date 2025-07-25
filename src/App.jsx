import React from 'react';
import { useGSAP } from "@gsap/react";
import Mainroutes from './routes/Mainroutes';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  useGSAP(() => {
    // Add animations here if needed
  }, []);

  return (
    <AuthProvider>
      <Mainroutes />
    </AuthProvider>
  );
};

export default App;
