import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";
import axios from "axios";
import processVid from "../../gif process.mp4";
import { DNA, InfinitySpin, MutatingDots } from "react-loader-spinner";
import validator from "validator";
// var bnr = require("./../../images/background/bg6.jpg");
import bnr from "../../images/login/loginbg.jpeg";

function Register2(props) {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [runAiButton, setRunAiButton] = useState("Run Ai");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [jobtitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [showUpload, setShowUpload] = useState(true);
  const [file, setFile] = useState();
  const [jobSeekerId, setJobSeekerId] = useState("");
  const token = localStorage.getItem("jobSeekerLoginToken");
  const [AiBtn, setAiBtn] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [showPercentage, setShowPercentage] = useState(false);
  const [percentage, setPercentage] = useState();
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const [registerValues, setRegisterValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    jobTitle: "",
  });
  console.log(registerValues, "values");
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterValues({ ...registerValues, [name]: value });
    // first name
    if (
      name === "firstName" &&
      !validator.matches(value, /^(?!\d)[a-zA-Z0-9]{3,}$/)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName:
          "First Name must be at least 3 characters long and not start with a number.",
      }));
    } else if (name === "firstName") {
      const newErrors = { ...errors };
      delete newErrors.firstName;
      setErrors(newErrors);
    }
    // lastName

    if (
      name === "lastName" &&
      !validator.matches(value, /^(?!\d)[a-zA-Z0-9]{3,}$/)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName:
          "Last Name must be at least 3 characters long and not start with a number.",
      }));
    } else if (name === "lastName") {
      const newErrors = { ...errors };
      delete newErrors.lastName;
      setErrors(newErrors);
    }

    // phone number

    if (name === "phone" && !validator.matches(value, /^\d{7,10}$/)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone Number must be between 7 and 10 digits.",
      }));
    } else if (name === "phone") {
      const newErrors = { ...errors };
      delete newErrors.phone;
      setErrors(newErrors);
    }
  };

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleIdChange(event) {
    setJobSeekerId(event.target.value);
  }

  function handleSubmit(event) {
    setSpinner(true);
    event.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("files", file);
    }

    axios
      .post("https://novajobs.us/api/jobseeker/resume-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((res) => {
        setSpinner(false);
        setResumeUrl(res.data.data[0].file_path);
        setAiBtn(false);
        console.log(resumeUrl, res, res.data.data[0].file_path);
      })
      .catch((error) => {
        alert("error");
        console.error(error);
      });
  }

  const dispatch = useDispatch();

  async function onSignUp(e) {
    e.preventDefault();
    const body = {
      first_name: registerValues.firstName,
      last_name: registerValues.lastName,
      company: registerValues.company,
      jobtitle: registerValues.jobTitle,
      email: registerValues.email,
      phone: registerValues.phone,
      password: registerValues.password,
    };
    console.log(body);
    try {
      axios({
        url: "https://novajobs.us/api/jobseeker/auth/signup",
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        data: body,
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("jobSeekerLoginToken", res.data.data.token);

          setShowUpload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const runAi = async (e) => {
    setRunAiButton("Running Ai");
    setShowVideo(true);
    e.preventDefault();
    console.log(resumeUrl);
    await axios({
      method: "post",
      url: "https://novajobs.us/api/jobseeker/file-based-ai",
      data: {
        keyword: "Rate this resume content in percentage ?",
        file_location: resumeUrl,
      },
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data.content_acuracy_percentage);
        setShowPercentage(true);
        setPercentage(
          `Your Ai Resume score is ${res.data.data.content_acuracy_percentage}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix"
          style={{
            backgroundImage: `url(${bnr})`,
            height: "100%",
          }}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-8 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom">
              <div
                className="login-form style-2"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="logo-header text-center p-tb30">
                  {/* <Link to={"./"}><img src={require("./../../images/logo.png")} alt="" /></Link> */}
                  <Link to={"./"}>
                    <img
                      src={require("./../../images/logo/NovaUS.png")}
                      className="logo"
                      alt=""
                    />
                  </Link>
                </div>

                {showUpload ? (
                  <div className="tab-content nav p-b30 tab">
                    <div id="login" className="tab-pane active ">
                      {props.errorMessage && (
                        <div className="">{props.errorMessage}</div>
                      )}
                      {props.successMessage && (
                        <div className="">{props.successMessage}</div>
                      )}
                      <form className=" dez-form " onSubmit={onSignUp}>
                        <div className="dez-separator-outer m-b5">
                          <div className="dez-separator bg-primary style-liner"></div>
                        </div>
                        <div className="row">
                          <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <input
                              name="firstName"
                              id="firstName"
                              value={registerValues.firstName}
                              onChange={handleRegisterChange}
                              className="form-control"
                              placeholder="First Name"
                              required
                            />
                            {/* <div className="text-danger">
                              {errors.email && <div>{errors.email}</div>}
                            </div> */}
                          </div>
                          <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <input
                              name="lastName"
                              id="lastName"
                              value={registerValues.lastName}
                              onChange={handleRegisterChange}
                              className="form-control"
                              placeholder="Last Name"
                              required
                            />
                            {/* <div className="text-danger">
                              {errors.email && <div>{errors.email}</div>}
                            </div> */}
                          </div>

                          <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <input
                              id="phone"
                              name="phone"
                              value={registerValues.phone}
                              type="number"
                              className="form-control"
                              defaultValue="Password"
                              placeholder="Phone Number"
                              required
                              onChange={handleRegisterChange}
                            />
                            {/* <div className="text-danger">
                              {errors.password && <div>{errors.password}</div>}
                            </div> */}
                          </div>
                          <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <input
                              type="text"
                              name="jobTitle"
                              id="jobTitle"
                              onChange={handleRegisterChange}
                              value={registerValues.jobTitle}
                              className="form-control"
                              placeholder="Job Title"
                              required
                            />
                            {/* <div className="text-danger">
                              {errors.email && <div>{errors.email}</div>}
                            </div> */}
                          </div>

                          <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={registerValues.email}
                              onChange={handleRegisterChange}
                              className="form-control"
                              placeholder="Work Email Address"
                              required
                            />
                            {/* <div className="text-danger">
                              {errors.email && <div>{errors.email}</div>}
                            </div> */}
                          </div>
                          <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
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
                                    showPassword
                                      ? "fa fa-eye-slash "
                                      : "fa fa-eye"
                                  }
                                ></i>
                              </span>
                              <input
                                type={showPassword ? "text" : "password"} // Toggle password visibility
                                name="password"
                                id="password"
                                className="form-control position-relative"
                                value={registerValues.password}
                                placeholder="Type Your Password"
                                defaultValue="Password"
                                onChange={handleRegisterChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group text-left ">
                            {/* <button
                            type="submit"
                            className="site-button dz-xs-flex m-r5"
                          >
                            Sign me up
                          </button> */}

                            <span className="custom-control custom-checkbox mt-3">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="terms"
                                name="terms"
                                required
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="terms"
                              >
                                I agree to the{" "}
                                {
                                  <Link to={"/employee/privacy-rights"}>
                                    Privacy Policy
                                  </Link>
                                }{" "}
                                and{" "}
                                <Link to={"/employee/term-of-use-nova-jobs"}>
                                  Terms & conditions{" "}
                                </Link>
                              </label>
                            </span>
                          </div>
                        </div>

                        <div className="text-danger mb-3 ">
                          {errors.firstName && (
                            <div className="text-center ">
                              {errors.firstName}
                            </div>
                          )}

                          {errors.lastName && (
                            <div className="text-center ">
                              {errors.lastName}
                            </div>
                          )}

                          {errors.phone && (
                            <div className="text-center ">{errors.phone}</div>
                          )}
                        </div>
                        <div className="text-center ">
                          <button
                            type="submit"
                            className="site-button dz-xs-flex m-r5"
                          >
                            Create Account
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div>
                    {AiBtn ? (
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="form-group">
                            <input
                              type="file"
                              onChange={handleChange}
                              className="form-control"
                              accept=".pdf, .doc, .docx"
                            />
                          </div>
                          <p>{percentage}</p>
                        </div>
                        {spinner ? (
                          <MutatingDots
                            visible={true}
                            height="100"
                            width="100"
                            color="#1c2957"
                            secondaryColor="#1c2957"
                            radius="12.5"
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        ) : (
                          <button
                            type="submit"
                            className="site-button dz-xs-flex m-r5"
                          >
                            Upload Resume
                          </button>
                        )}
                      </form>
                    ) : (
                      <div>
                        <div>
                          <video
                            width="200px"
                            loop={showVideo}
                            autoPlay={showVideo}
                          >
                            <source src={processVid} type="video/mp4" />
                          </video>
                        </div>
                        {showPercentage ? (
                          <div>
                            <p>{percentage}</p>
                            <button
                              className="site-button dz-xs-flex m-r5"
                              onClick={(e) => {
                                navigate("/");
                              }}
                            >
                              Go To Dashboard
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              runAi(e);
                            }}
                            className="site-button dz-xs-flex m-r5"
                          >
                            {runAiButton}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <div className="bottom-footer clearfix m-t10 m-b20 row text-center">
                  <div className="col-lg-12 text-center">
                    <span>
                      {/* {" "}
                      © Copyright by{" "} */}
                      {/*   <img
                    src="../../images/WhatsApp_Image_2024-05-11_at_19.51.05-removebg-preview.png"
                    alt=""
                    style={{
                      width: "40px",
                    }}
                  />  <img
                    src="../../images/WhatsApp_Image_2024-05-11_at_19.51.05-removebg-preview.png"
                    alt=""
                    style={{
                      width: "40px",
                    }}
                  /> */}
                      Already have an account ?
                      <a class="site-button-link " href="/user/login">
                        <i class="fa fa-unlock-alt"></i> Sign In
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
export default connect(mapStateToProps)(Register2);
