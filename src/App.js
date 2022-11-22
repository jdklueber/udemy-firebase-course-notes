import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Header from "./components/Header";
import Content from "./components/ui/Content";

function App() {
  return (
    <div>
      <BrowserRouter>
          <Header/>
          <Content>
              <Routes>
                  <Route path={"/"} element={<Home/>}/>
                  <Route path={"/profile"} element={<Profile/>}/>
                  <Route path={"/sign-in"} element={<SignIn/>}/>
                  <Route path={"/sign-up"} element={<SignUp/>}/>
                  <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
                  <Route path={"/offers"} element={<Offers/>}/>
              </Routes>
          </Content>
      </BrowserRouter>
    </div>
  );
}

export default App;
