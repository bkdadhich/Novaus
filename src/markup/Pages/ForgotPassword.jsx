import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import loginbg from "./../../images/bg6.jpg";
import axios from "axios";

function ForgotPassword(props) {
  const [email, setEmail] = useState("demo@example.com");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const navigate = useNavigate();
  const token = localStorage.getItem("jobSeekerLoginToken");
  const handlePostRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    await axios({
      method: "POST",
      url: "https://novajobs.us/api/jobseeker/forgot-password",
      headers: {
        "Content-Type": "Application/json",
      },
      data: formData,
    })
      .then((response) => {
        console.log(response);
        navigate("/user/reset-password");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="page-wraper">
      <div
        className="page-content bg-white login-style2"
        style={{
          backgroundImage: "url(" + loginbg + ")",
          backgroundSize: "cover",
        }}>
        <div className="section-full">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="text-white max-w400 align-self-center">
                  <div className="logo">
                    <Link to={"/"}>
                      <img
                        src={require("./../../images/logo/NovaUS.png")}
                        alt=""
                      />
                    </Link>
                  </div>
                  <h2 className="m-b10">Login To You Now</h2>
                  <p className="m-b30">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry has been the industry.
                  </p>
                  <ul className="list-inline m-a0">
                    <li>
                      <Link to={""} className="m-r10 text-white ">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="login-2 submit-resume p-a30 seth">
                  <div className="nav">
                    <form className="col-12 p-a0 ">
                      <p className="font-weight-600">
                        Please verify your Email... Here!
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

                      <div className="mt-4 ">
                        <button
                          onClick={handlePostRequest}
                          className="site-button float-left">
                          Submit
                        </button>
                      </div>
                    </form>
                    <div className="form-group text-center">
                      <Link
                        to="/user/login"
                        className="site-button-link  m-t15 ">
                        Back to Login
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
              <div className="col-lg-12 text-center">
                <span className="float-left text-white">
                  © Copyright by{" "}
                  <img
                    src="../../images/Navy Blue Gradient Marketing Agency Instagram Post_prev_ui.png"
                    alt=""
                    style={{
                      width: "40px",
                    }}
                  />{" "}
                  <img
                    src="../../images/Navy Blue Gradient Marketing Agency Instagram Post_prev_ui.png"
                    alt=""
                    style={{
                      width: "40px",
                    }}
                  />
                  <span className="text-white">Nova Jobs </span>
                  <Link style={{ color: "white" }} to={"#"}>
                    Powered By Hyper V Solutions
                  </Link>
                </span>
                <span className="float-right text-white">
                  All rights reserved.
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
export default connect(mapStateToProps)(ForgotPassword);
