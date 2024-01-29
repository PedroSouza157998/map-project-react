import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListUsers from "./pages/list-users";
import CreateUser from "./pages/create-user";
import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import './styles/globals.css'
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<ListUsers />} />
          <Route path="/create" element={<CreateUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
