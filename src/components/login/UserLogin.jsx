import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@material-tailwind/react";
import Swal from "sweetalert2";

const UserLogin = () => {
  const [formData, setFormData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertTrue, setShowAlertTrue] = useState(false);
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   if (showAlert == true) {
  //     // Show the SweetAlert dialog when showAlert is true
  //     Swal.fire({
  //       title: "Error!",
  //       text: "Do you want to continue",
  //       icon: "error",
  //       // confirmButtonText: "Cool",
  //     }).then((result) => {
  //       // Handle the user's response if needed
  //       if (result.isConfirmed) {
  //         // User clicked 'OK' button
  //         // Add any action you want to perform here
  //       } else {
  //         // User clicked 'Cancel' button or closed the dialog
  //         // Add any action you want to perform here
  //       }
  //       // Reset showAlert after handling the alert
  //       setShowAlert(false);
  //     });
  //   }
  // }, [showAlert]); // Run this effect whenever showAlert changes
  const handleShowAlert = () => {
    setShowAlert(true); // Set showAlert to true to trigger the alert
  };
  const handleSubmit = () => {
    if (formData.email && formData.password) {
      const jsonData = {
        login_id: `${formData.email}`,
        login_pass: `${formData.password}`,
      };
      axios
        .post(`${import.meta.env.VITE_API_KEY}/admin/login`, jsonData)
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("token", true);
            localStorage.setItem("BearerToken", response.data.token);
            localStorage.setItem("currency", response.data.currency);
            localStorage.setItem("tax", response.data.tax);
            localStorage.setItem(
              "restaurant_name",
              response.data.restaurant_name
            );
            localStorage.setItem("restaurant_id", response.data.restaurant_id);
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            }).then(
              setTimeout(() => {
                navigate("/dashboard");
              }, 2000)
            );
            // setShowAlertTrue(true);
            // setTimeout(() => {
            //   // setShowAlertTrue(false);
            //   navigate("/dashboard");
            // }, 2000);
          } else {
            localStorage.setItem("token", false);
          }
          console.log(response);

          // Handle the response data here if needed
        })
        .catch((error) => {
          localStorage.setItem("token", false);
          // setShowAlert(true);
          Toast.fire({
            icon: "error",
            title: "Invalid email or password. Please try again.",
          });
          // setTimeout(() => {
          //   setShowAlert(false);
          // }, 2000);
          console.error("Error making post request", error);
          // Handle errors here if needed
          // alert(error);
        });
    } else {
      Toast.fire({
        icon: "warning",
        title: "Enter email and password",
      });
    }
  };
  return (
    <div className="h-screen w-screen bg-blue-gray-50 flex items-center justify-center">
      <div className="relative h-fit flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
        {/* bg-gradient-to-tr from-gray-900 to-gray-800 */}
        <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-sidebar bg-clip-border shadow-gray-900/20">
          <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
            Sign In
            {/* {import.meta.env.VITE_API_KEY} */}
          </h3>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              required
              className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Email
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              required
              className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Password
            </label>
          </div>
          <div className="-ml-2.5">
            <div className="inline-flex items-center">
              <label
                htmlFor="checkbox"
                className="relative flex items-center p-3 rounded-full cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                  id="checkbox"
                />
                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <label
                className="mt-px font-light text-gray-700 cursor-pointer select-none"
                htmlFor="checkbox"
              >
                Remember Me
              </label>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button
            className="block w-full select-none rounded-lg bg-sidebar py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            // type="submit"
            onClick={handleSubmit}
            // onClick={handleShowAlert}
          >
            Sign In
          </button>
          {/* <p className="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
            Don't have an account?
            <a
              href="#signup"
              className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
            >
              Sign up
            </a>
          </p> */}
        </div>
        {/* Alert to show when user is not logged in */}

        {/* </form> */}
      </div>
      {/* {showAlert &&
        // <div className="fixed top-4 right-4 z-50">
        //   <Alert
        //     icon={<Icon />}
        //     className="transition-opacity rounded-md border-l-4 border-[#ff5252] bg-[#ff5252]/10 font-medium text-[#ff5252]"
        //   >
        //     Invalid email or password. Please try again.
        //   </Alert>
        // </div>
        // Swal.fire({
        //   title: "Error!",
        //   text: "Do you want to continue",
        //   icon: "error",
        //   // confirmButtonText: "Cool",
        // })
        // Toast.fire({
        //   icon: "success",
        //   title: "Signed in successfully",
        // }).then(() => {
        //   window.location.reload();
        // })} */}
      {showAlertTrue && (
        <div className="fixed top-4 right-4 z-50">
          <Alert
            icon={<Icon />}
            className="transition-opacity rounded-none border-l-4 border-green-500 bg-green-100 font-medium text-green-500"
          >
            Login Successful
          </Alert>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export default UserLogin;
