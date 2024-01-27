import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Faqa from "../components/Faq/faq";
import PreLoader from "../components/Preloader";
import Top from "./Top";
import "./PolicyForm.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const host = "https://bajaj-5uw0.onrender.com";
  const [data1, setData] = useState("");
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    // dys:false,
    income: "",
    payTill: "",
    nominee: "",
    paymentFreq: "",
  });

  useEffect(() => {
    const loginData = async () => {
      const response = await fetch(`${host}/api/v1/bajaj/user/loginData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      // console.log(await response.json());
      try {
        const storedResponse = await response.json();

        setData(storedResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // console.log(data1);
    loginData();
    // console.log(data1);
  }, []);
  console.log(data1);
  if (!data1) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //   console.log(userName, email, password, authority, flatNo);
    const response = await fetch(`${host}/api/v1/bajaj/policy/buyPolicy`, {
      method: "POST",
      // crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: data1.user.data.data.pan_data.name,
        gender: data1.user.data.data.pan_data.gender,
        dob: data1.user.data.data.pan_data.date_of_birth,
        email: data1.user.email,
        dys: false,
        phone: data1.user.phone,
        income: credentials.income,
        pin: data1.user.data.data.pan_data.address_data.pincode,
        state: data1.user.data.data.pan_data.address_data.state,
        payTill: credentials.payTill,
        nominee: credentials.nominee,
        paymentFreq: credentials.paymentFreq,
      }),
    });
    const json = await response.json();
    // console.log(json, "hi");
    // console.log(localStorage.getItem("token"));
    if (json.success) {
      navigate("/Payments");
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <PreLoader />
      <Top />
      <Layout>
        <div className="flex justify-center items-center">
          <div className="premiumMainBox w-[80%]">
            <h1 className="formTitle">Policyholder Details</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center items-center">
                <div className="m-10 mb-1 w-1/3 ">
                  <input
                    type="text"
                    id="email"
                    style={{ width: "11rem" }}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l    rounded-lg border-black focus:ring-blue-500 focus:border-blue-500 block w-full h-[3rem] p-2.5 "
                    // placeholder={data1.user.email}
                    required=""
                    name="name"
                    value={data1.user.data.data.pan_data.name || "email"}
                  />
                </div>
                <div className="m-10 mb-1 w-1/3">
                  <input
                    placeholder="Gender"
                    style={{ width: "11rem" }}
                    type="text"
                    id="Gender"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg border-black focus:ring-blue-500 focus:border-blue-500 block w-full h-[3rem] p-2.5 "
                    required=""
                    name="gender"
                    value={data1.user.data.data.pan_data.gender || "email"}
                  />
                </div>
                <div className="m-10 mb-1 w-1/3">
                  <input
                    placeholder="DD-MM-YYYY"
                    type="text"
                    style={{ width: "11rem" }}
                    id="repeatpassword"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg border-black focus:ring-blue-500 focus:border-blue-500 block w-full h-[3rem] p-2.5 "
                    required=""
                    name="date_of_birth"
                    value={
                      data1.user.data.data.pan_data.date_of_birth || "email"
                    }
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="m-10 mb-1 w-1/3">
                  <input
                    type="email"
                    style={{ width: "11rem" }}
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l    rounded-lg border-black focus:ring-blue-500 focus:border-blue-500 block w-full h-[3rem] p-2.5 "
                    placeholder="Email ID "
                    required=""
                    name="email"
                    value={data1.user.email || "email"}
                  />
                </div>
                <div className="m-10 mb-1 w-1/3">
                  <label className="labelTitle"> Do you smoke</label>
                  <div className="flex">
                    <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 m-3 w-1/2">
                      <input
                        id="bordered-radio-1"
                        type="radio"
                        defaultValue=""
                        name="bordered-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="bordered-radio-1"
                        className="w-full py-4 ml-2 text-sm font-medium text-black-900 dark:text-black-300"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 m-3 w-1/2">
                      <input
                        defaultChecked=""
                        id="bordered-radio-2"
                        type="radio"
                        defaultValue=""
                        name="bordered-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="bordered-radio-2"
                        className="w-full py-4 ml-2 text-sm font-medium text-black-900 dark:text-black-300"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="m-10 mb-1 w-1/3">
                  <input
                    type="text"
                    style={{ width: "11rem" }}
                    id="pin"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l    rounded-lg border-black focus:ring-blue-500 focus:border-blue-500 block w-full h-[3rem] p-2.5 "
                    placeholder="Occupation"
                    required=""
                    name="phone"
                    value={data1.user.phone || "email"}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="m-10 mb-1 w-1/3">
                  <input
                    type="tel"
                    style={{ width: "11rem" }}
                    id=""
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l  rounded-lg border-black focus:ring-blue-500 focus:border-blue-500 block w-full h-[3rem] p-2.5 "
                    placeholder="Income "
                    required=""
                    name="income"
                    value={credentials.income}
                    onChange={onChange}
                  />
                </div>
                {/* <div className="m-10 mb-1 w-1/3">
                  <input
                    placeholder="Pin code"
                    type="tel"
                    style={{ width: "11rem" }}
                    id=""
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg border-black focus:ring-blue-500 focus:border-blue-500 block w-full h-[3rem] p-2.5 "
                    required=""
                    name="pincode"
                    value={
                      data1.user.data.data.pan_data.address_data.pincode ||
                      "email"
                    }
                  />
                </div> */}
                {/* <div className="m-10 mb-1 w-1/3">
                  <input
                    placeholder="Address"
                    type="text"
                    style={{ width: "11rem" }}
                    id=""
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg border-black focus:ring-blue-500 focus:border-blue-500 block w-full h-[3rem] p-2.5 "
                    required=""
                    name="address"
                    value={
                      data1.user.data.data.pan_data.address_data.state ||
                      "email"
                    }
                  />
                </div> */}
              </div>
              <div className="flex justify-center items-center">
                <div className="m-10  w-1/3">
                  <input
                    type="number"
                    id=""
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l  rounded-lg border-black focus:ring-blue-500 focus:border-blue-500 block w-full h-[3rem] p-2.5 "
                    placeholder="Pay till age "
                    required=""
                    name="payTill"
                    value={credentials.payTill}
                    onChange={onChange}
                  />
                </div>
                <div className="m-10  w-1/3">
                  <input
                    placeholder="Nominee Name"
                    type="text"
                    style={{ width: "11rem" }}
                    id="Nominee Name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg border-black focus:ring-blue-500 focus:border-blue-500 block w-full h-[3rem] p-2.5 "
                    required=""
                    name="nominee"
                    value={credentials.nominee}
                    onChange={onChange}
                  />
                </div>
                <div className="m-10  w-1/3">
                  <input
                    placeholder="Payment Frequency"
                    type="text"
                    style={{ width: "12rem" }}
                    id="repeatpassword"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg border-black focus:ring-blue-500 focus:border-blue-500 block w-full h-[3rem] p-2.5 "
                    required=""
                    name="paymentFreq"
                    value={credentials.paymentFreq}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="flex m-1 justify-center  items-center">
                <div className="m-25 flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="m-25 ml-2 text-sm font-medium text-black-900 dark:text-black-300"
                >
                  I agree with the{" "}
                  <a
                    href="#"
                    className="m-25 text-blue-600 hover:underline dark:text-blue-500"
                  >
                    terms and conditions
                  </a>
                </label>
                <ReCAPTCHA
                  className="m-12"
                  sitekey="6LezpkEnAAAAAMtCta7F5xeFf_D5C_1UqqktRE2x"
                />
              </div>
              <div className="flex justify-center items-center btnBoxPolicy">
                <button
                  type="submit"
                  className="inline-flex w-full rounded-full justify-center content-center bg-[#f89c30] px-6 pt-[0.5rem] pb-[0.5rem] font-poppins font-semibold  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-[#DF8E2F] m-12"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  id="calBtn"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="inline-flex w-full rounded-full justify-center content-center bg-[#0072BC] px-6 pt-[0.5rem] pb-[0.5rem] font-poppins font-semibold  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-[blue] m-12"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  id="calBtn"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Faqa />
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
