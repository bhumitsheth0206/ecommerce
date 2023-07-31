import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ReactGA from "react-ga4";

import 'react-toastify/dist/ReactToastify.css';
import { persistor, store } from "./Redux/store";
import { ToastContainer } from "react-toastify";
import UserRoute from "./Components/UserRoute";

ReactGA.initialize('UA-280086515-1');

function App() {
  return (
    <div className="App">
      <ToastContainer
        autoClose={4000}
        position="top-right"
        className="toast-container"
        toastClassName="dark-toast"
      />
      
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <UserRoute />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
