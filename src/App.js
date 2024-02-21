// Components
import Auth from "./components/Auth";
import MainApp from "./components/MainApp";
import NotFound from "./components/NotFound";
import CustomSwitch from "./util/CustomSwitch";

// Modules
import { BrowserRouter, Route } from "react-router-dom";
// CSS
import "./App.css";
// Utils
import { PageContextProvider } from "./Contexts/Page";

export default function App() {
  return (
    <BrowserRouter basename="/ecommerce">
      <PageContextProvider>
        <CustomSwitch>
          <Route path="/*" element={<MainApp />}></Route>
          <Route path="/auth/*" element={<Auth />}></Route>
          <Route path="/notfoundpage" element={<NotFound />}></Route>
        </CustomSwitch>
      </PageContextProvider>
    </BrowserRouter>
  );
}
