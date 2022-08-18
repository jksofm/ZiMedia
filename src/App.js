import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import UserPage from "./pages/UserPage/UserPage";
import Chat from "./pages/Chat/Chat";
import ErrorPage from "./pages/Error/ErrorPage";

function App() {
  // const { user } = useSelector((store) => store.user);
  return (
    <div className="App">
      <div style={{ top: "-18%", right: "0" }} className="blur"></div>
      {/* <div style={{ top: "20%", left: "-8rem" }} className="blur"></div> */}
      <ToastContainer />

      {/* <Home /> */}
      {/* <Profile /> */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mydata"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
