import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider , BrowserRouter } from 'react-router-dom';
import { ContextProvider } from "./contexts/ContextProvider";
import MyRoutes from "./Routes";
import { Provider } from 'react-redux';
import store from './redux/store'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <RouterProvider router={MyRoutes}/>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);