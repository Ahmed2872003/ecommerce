// Components
import Auth from "./Auth";
import MainApp from "./MainApp";
import NotFound from "./NotFound";
import CustomSwitch from "./util/CustomSwitch";

// Modules
import { BrowserRouter, Route } from "react-router-dom";
// CSS
import "./App.css";
// Utils
import { PageContextProvider } from "./util/Contexts/Page";

export default function App() {
  return (
    <BrowserRouter>
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
