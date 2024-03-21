import Desktop from "components/desktop";
import Taskbar from "components/taskbar";
import { AppProvider } from "./app_context";

const App = () => (
  <AppProvider>
    <Taskbar />
    <Desktop />
  </AppProvider>
);

export default App;
