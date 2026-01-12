import { AppContainer, AppTitle } from "./styled";
import ProductTable from "../ProductList";
import ActionsPanel from "../ActionsPanel";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import ProductSummary from "../ProductSummary";

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer className="page-container">
        <AppTitle>Product Management</AppTitle>
        <ActionsPanel />
        <ProductTable />
        <ProductSummary />
      </AppContainer>
    </Provider>
  );
};

export default App;
