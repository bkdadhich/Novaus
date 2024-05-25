import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, Redirect, useNavigate } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";

// image
//import logo from "../../images/logo-full-white.png";
import loginbg from "./../../images/login/loginbg.jpeg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmployeeLogin(props) {
  const [email, setEmail] = useState("demo@example.com");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   function onLogin(e) {
  //     e.preventDefault();
  //     let error = false;
  //     const errorObj = { ...errorsObj };
  //     if (email === "") {
  //       errorObj.email = "Email is Required";
  //       error = true;
  //     }
  //     if (password === "") {
  //       errorObj.password = "Password is Required";
  //       error = true;
  //     }
  //     setErrors(errorObj);
  //     if (error) {
  //       return;
  //     }
  //     dispatch(loadingToggleAction(true));
  //     dispatch(loginAction(email, password, props.history));
  //   }

  // const history = useHistory();
  const notify = (data) => toast.warning(data);

  const handlePostRequest = async (e) => {
    e.preventDefault();
    if (password === "") {
      notify("Password is required");
      if (email === "") {
        notify("Email is required");
      }
      return;
    }

    const reqBody = {
      email: email,
      password: password,
    };
    await axios({
      method: "POST",
      url: "https://novajobs.us/api/employeer/auth/login",
      headers: {
        "Content-Type": "Application/json",
      },
      data: reqBody,
    })
      .then((response) => {
        console.log(response, "login");
        localStorage.setItem("employeeLoginToken", response?.data?.data?.token);
        navigate("/employee");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="page-wraper">
      <ToastContainer />
      <div
        className="page-content bg-white login-style2"
        style={{
          backgroundImage: "url(" + loginbg + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          
        }}
      >
        <div className="section-full">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex">
                <div className=" max-w400 align-self-center">
                  <div className="logo">
                    {/* <Link to={"/"}><img src={logo2} alt="" /></Link> */}
                    {/* <Link to={"/"}>
                      <img
                        src={require("./../../images/logo/NovaUS.png")}
                        alt=""
                      />
                    </Link> */}
                  </div>
                  <h2 className="m-b10 text-white"> Sign up or Login To Dashboard</h2>
                  <p className="m-b30" style={{ 
                      fontWeight:"bolder",  color:"white"
                    }}>
                    Welcome To One Stop Ai Powered Staffing Solution
                  </p>
                  <ul className="list-inline m-r10 text-white " style={{ 
                      fontWeight:"bolder", fontSize:"30px" , 
                    }}>
                    {/* <li>
                      <Link to={""} className="m-r10 text-white ">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li> */}
                    {/*<li>
                      <Link to={""} className="m-r10 text-black fs-4">
                        <i className="fa fa-google-plus"></i>
                      </Link>
                  </li>*/}
                    <li>
                      <Link to={""} className="m-r10 text-white"
                    >
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                    {/* <li>
                      <Link to={""} className="m-r10 text-white ">
                        <i className="fa fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={""} className="m-r10 text-white">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="login-2 submit-resume p-a30 seth">
                  <div className="nav">
                    <form className="col-12 p-a0 ">
                      <p className="font-weight-600">
                        If you have an account with us, please log in.
                      </p>
                      {props.errorMessage && (
                        <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                          {props.successMessage}
                        </div>
                      )}
                      <div className="form-group ">
                        <label>E-Mail Address*</label>
                        <div className="input-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Type Your Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {errors.email && (
                            <div className="text-danger fs-12">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Password *</label>
                        <div className="input-group d-flex align-items-center">
                          <span
                            className="input-group-addon position-absolute"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              cursor: "pointer",
                              right: "0px",
                              zIndex: "11",
                              position: "absolute",
                            }}
                          >
                            <i
                              className={
                                showPassword ? "fa fa-eye-slash " : "fa fa-eye"
                              }
                            ></i>
                          </span>
                          <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            className="form-control position-relative"
                            value={password}
                            placeholder="Type Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        {errors.password && (
                          <div className="text-danger fs-12">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="form-group text-center">
                        <Link
                          data-toggle="tab"
                          to="#forgot-password"
                          className="forget-pass m-l5"
                        >
                          <i className="fa fa-unlock-alt"></i> Forgot Password
                        </Link>
                      </div>
                      <div className="dz-social clearfix">
                        <h5 className="form-title m-t5 pull-left">
                          Sign In With
                        </h5>
                        <ul className="dez-social-icon dez-border pull-right dez-social-icon-lg text-white">
                          <li>
                            <Link
                              to={""}
                              className="fa fa-linkedin link-btn mr-1"
                              target="bank"
                            ></Link>
                          </li>
                          <li onClick="">
                            <Link
                              to={""}
                              className="fa fa-google link-btn mr-1"
                              target="bank"
                            ></Link>
                          </li>
                        </ul>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={handlePostRequest}
                          className="site-button float-left"
                        >
                          login
                        </button>
                        <Link
                          to="/employee/register-2"
                          className="site-button-link forget-pass m-t15 float-right"
                        >
                          <i className="fa fa-unlock-alt"></i> Sign up
                        </Link>
                      </div>
                    </form>
                    <div className="form-group text-center">
                      <Link
                        to="mailto:mailto:contact@novajobs.us"
                        className="site-button-link  m-t15 "
                      >
                        Need help click here
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="login-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center text-white">
                <span className="float-left ">
                  © Copyright by{" "}
                  <img
                    src="../../images/WhatsApp_Image_2024-05-11_at_19.51.05-removebg-preview.png"
                    alt=""
                    style={{ 
                      width: "40px",
                    }}
                  />{" "}
                  <Link to={"#"} style={{color:"white",fontWeight:"bold"}}>Nova Jobs </Link>{" "}
                </span>
                <span className="float-right">
                  “Hyper V Solutions” | All Rights Reserved
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(EmployeeLogin);
