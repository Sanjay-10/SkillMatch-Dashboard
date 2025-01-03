import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import store, { persistor } from "./store"; // Correct default and named import
import './index.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>  
  </Provider>
);
