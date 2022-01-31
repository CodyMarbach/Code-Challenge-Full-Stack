import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import BoatsBoard from "./components/BoatsBoard";
import { Container } from '@mui/material';
import { ToastProvider } from "react-toast-notifications";
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ToastProvider autoDismiss={true}>
          <Container maxWidth="xl">
            <Header />
            <BoatsBoard />
          </Container>
        </ToastProvider>
      </Provider>
    </div>
  );
}

export default App;
