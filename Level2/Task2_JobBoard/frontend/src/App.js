import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./redux/slice/userSlice";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobDetail from "./pages/JobDetail";
import { fetchJobActionRecords } from "./redux/slice/jobActionSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchJobActionRecords());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:user_id" element={<Profile />} />
          <Route path="/jobs/:jobid" element={<JobDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
