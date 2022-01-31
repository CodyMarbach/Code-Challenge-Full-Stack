import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Boats from './components/Boats';
import { Container } from '@mui/material';
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ToastProvider autoDismiss={true}>
          <Container maxWidth="lg">
            <Boats />
          </Container>
        </ToastProvider>
      </Provider>
    </div>
  );
}

export default App;
