import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PolicyForm from "./pages/PolicyForm";
import Test from "./pages/Top";
import Otp from "./pages/Otp";
import Register from "./pages/Register";

import PForm from "./pages/PForm";

import Radio from "./components/Radio/Radio";

import pageNotFound from "./pages/pageNotFound";
import PaymentDetails from "./pages/PaymentDetails";
import Razorpay from "./components/Razorpay/Razorpay";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/PolicyForm" element={<PolicyForm />} />
        <Route exact path="/policyFormBank" element={<PForm />} />
        <Route exact path="/Payments" element={<PaymentDetails />} />
        <Route exact path="/Razorpay" element={<Razorpay />} />

        <Route exact path="/Radio" element={<Radio />} />
        <Route exact path="/Otp" element={<Otp />} />
        <Route exact path="/Test" element={<Test />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="*" element={<pageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
