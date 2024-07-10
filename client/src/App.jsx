
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import Message from "./components/Message";
import AuthLayout from './layout'
import PrivateRoute from "./components/PrivateRoute";
function App() {

  const routes = (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route
          path="/"
          element={<Home />}
        >
          <Route path=":userId" element={<Message />} />
        </Route>

      </Route>
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
    </Routes>
  );

  return (
    <>
      <div>
        {routes}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </>
  )
}

export default App
