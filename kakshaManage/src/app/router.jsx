import {BrowserRouter,Routes,Route} from "react-router-dom";

import Login from "../features/auth/Login";
import Protected from "../routes/ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
export default function Router(){
  return(<BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Protected><Dashboard/></Protected>}/>
    </Routes>
  </BrowserRouter>);
}
