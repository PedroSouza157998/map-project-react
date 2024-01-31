import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListUsers from "./pages/list-users";
import CreateUser from "./pages/create-user";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'react-toastify/dist/ReactToastify.css';
import 'primeicons/primeicons.css';
import './styles/globals.css'
import { ToastContainer } from "react-toastify";
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<ListUsers />} />
          <Route path="/create" element={<CreateUser />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
