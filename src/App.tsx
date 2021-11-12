import AppRouter from "./routing/AppRoute";
import '../src/assets/styles/shared/app.scss';
import { Provider } from "react-redux";
import { store } from './stateManagement/store';
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
