import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

// Import Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './store';

// Import components
import AppRouter from '@screens/Router';
import AppLoader from '@/ui/AppLoader';

// Import styles
import 'normalize.css';
import './index.scss';

const App: React.FC = () => (
  <HashRouter>
    <AppRouter />
  </HashRouter>
);

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate loading={<AppLoader />} persistor={store.persistor}>
      <App />
    </PersistGate>
  </Provider>, document.getElementById('root'));