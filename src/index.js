import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css'

import { AuthContextProvider } from './context/AuthContext';
import { RootcollectionContextProvider } from './context/RootcollectionContext';
import { CollectionContextProvider } from './context/CollectionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RootcollectionContextProvider>
        <CollectionContextProvider>
          <App />
        </CollectionContextProvider>
      </RootcollectionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
