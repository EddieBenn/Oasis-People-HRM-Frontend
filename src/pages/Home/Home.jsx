import { useState } from "react";
import oasisPhoto from "../../assets/homepage/Oasis.jpeg";
import { useFormik } from "formik";
import * as Yup from "yup";
import oasisLogo from "../../assets/homepage/oasis-logo.png";
import { MdOutlineWavingHand } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {showErrorToast, showSuccessToast} from '../../utilities/toastifySetup';
import {loginHR} from '../../axiosFolder/axiosFunctions/hrApi/hrApi';

function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialFormlikLoginValues = {
    loginKey: "",
    password: "",
  };

  const loginFormik = useFormik({
    initialValues: initialFormlikLoginValues,
    validationSchema: Yup.object({
      loginKey: Yup.string().required("Enter email or username"),
      password: Yup.string().required("Enter password")
    }),

    onSubmit: async (values, setSubmitting) => {
      try {
        setLoading(true);

        const body = {
          email: values.loginKey,
          password: values.password,
        };

        const response = await loginHR(body);

        if (response.status !== 200) {
          setLoading(false);
          return showErrorToast(response.data.message);
        }

        showSuccessToast(response.data.message);

        const user = response.data.user;

        localStorage.setItem("user", JSON.stringify(response.data.user));

        localStorage.setItem("token", response.data.token);

        values.loginKey = "";
        values.password = "";

        setLoading(false);

        return user.isManager ? navigate("/dashboard") : navigate("/employeeDashboard");
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  // bg-[#F8F6FE]
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${oasisPhoto})` }}
    >
      <section className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white bg-opacity-90 p-6 rounded-lg shadow-lg flex items-center justify-center">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="flex w-full gap-2 items-center justify-center mb-6">
            <img
              src={oasisLogo}
              alt="Oasis Logo"
              width="40"
              className="rounded-xl"
            />
            <div className="font-bold text-2xl text-center font-lexend">
              Oasis People HRM
            </div>
          </div>
          <div>
            <div className="font-bold text-2xl text-center flex gap-2 font-lexend">
              Welcome <MdOutlineWavingHand className="mt-1 text-[#A86232]" />
            </div>
          </div>
          <div>
            <div className="text-sm text-center mt-4 flex gap-2 font-lexend font-thin">
              Please login here
            </div>
          </div>
          <form
            className="w-full sm:w-[90%] mt-4"
            onSubmit={loginFormik.handleSubmit}
          >
            <div className="mb-4">
              <input
                type="text"
                id="loginKey"
                name="loginKey"
                className="border-2 border-gray-200 text-[#7152F3] rounded-xl w-full p-2 placeholder:text-[#7152F3] placeholder:text-xs"
                value={loginFormik.values.loginKey}
                onChange={loginFormik.handleChange}
                placeholder="Email Address"
              />
              {loginFormik.errors.loginKey && (
                <div className="text-red-500 text-sm mt-1">
                  <em>{loginFormik.errors.loginKey}</em>
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                className="border-2 text-[#7152F3] border-gray-200 rounded-xl w-full p-2 placeholder:text-[#7152F3] placeholder:text-xs"
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
                placeholder="Password"
              />
              <div className="flex justify-between mt-2">
                {loginFormik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    <em>{loginFormik.errors.password}</em>
                  </div>
                )}
                <div className="text-sm mt-1 mr-2 text-[#7152F3 hover:text-[#7152F3] hover:cursor-pointer">
                  <em>Forgot Password?</em>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#7152F3] border hover:bg-gray-100 mt-4 mb-4 hover:text-[#7152F3] hover:border-[#7152F3] hover:border-2 text-white rounded-xl w-full p-2"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;
