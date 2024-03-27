import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";
import axios from "axios";
var bnr = require("./../../images/background/bg6.jpg");

function EmployeeRegister2(props) {
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [showUpload, setShowUpload] = useState(true);
  const [file, setFile] = useState();
  const [jobSeekerId, setJobSeekerId] = useState("");

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleIdChange(event) {
    setJobSeekerId(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("job_seeker_id", jobSeekerId);
    if (file) {
      formData.append("files", file);
    }

    axios
      .post("https://jobsbooklet.in/api/jobseeker/resume-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("response");
        console.log(response.data);
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
      first_name: firstName,
      last_name: LastName,
      email: email,
      phone: phone,
      password: password,
    };
    console.log(body);
    try {
      axios({
        url: "https://jobsbooklet.in/api/employee/auth/signup",
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        data: body,
      })
        .then((res) => {
          console.log(res);
          setShowUpload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
  const [visible, setVisible] = useState(false);

  const cards = [
    { id: 1, color: "red" },
    { id: 2, color: "blue" },
    { id: 3, color: "green" },
    // Add as many cards as you like
  ];

  const styles = {
    cardStack: {
      position: "relative",
      height: "200px", // Adjust based on your card size and how they stack
      width: "300px", // Adjust to fit your content
    },
    card: (index) => ({
      position: "absolute",
      width: "100%",
      height: "100px", // Adjust based on your preference
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.5s ease-in-out",
      backgroundColor: cards[index].color,
      transform: `translateY(${index * -20}px)`, // Adjust the multiplier for different effects
    }),
  };
  return (
    <div className="page-wraper">
      <div style={styles.cardStack}>
        {cards.map((card, index) => (
          <div key={card.id} style={styles.card(index)}>
            Card {card.id}
          </div>
        ))}
      </div>
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix"
          style={{
            backgroundImage: `url(${bnr})`,
            height: "100vh",
          }}>
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom">
              <div className="login-form style-2">
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
                      <form className=" dez-form p-b30" onSubmit={onSignUp}>
                        <div className="dez-separator-outer m-b5">
                          <div className="dez-separator bg-primary style-liner"></div>
                        </div>
                        <p>Enter your e-mail address and your password. </p>
                        <div className="form-group">
                          <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="form-control"
                            placeholder="First Name"
                          />
                          <div className="text-danger">
                            {errors.email && <div>{errors.email}</div>}
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            value={LastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="form-control"
                            placeholder="Last Name"
                          />
                          <div className="text-danger">
                            {errors.email && <div>{errors.email}</div>}
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            value={phone}
                            className="form-control"
                            defaultValue="Password"
                            placeholder="Phone Number"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          <div className="text-danger">
                            {errors.password && <div>{errors.password}</div>}
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Email"
                          />
                          <div className="text-danger">
                            {errors.email && <div>{errors.email}</div>}
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            value={password}
                            className="form-control"
                            defaultValue="Password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="text-danger">
                            {errors.password && <div>{errors.password}</div>}
                          </div>
                        </div>
                        <div className="form-group text-left">
                          <button
                            type="submit"
                            className="site-button dz-xs-flex m-r5">
                            Sign me up
                          </button>
                          <span className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="check1"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="check1">
                              Remember me
                            </label>
                          </span>
                          <Link
                            data-toggle="tab"
                            to="#forgot-password"
                            className="forget-pass m-l5">
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
                                className="fa fa-facebook  fb-btn mr-1"
                                target="bank"></Link>
                            </li>
                            <li>
                              <Link
                                to={""}
                                className="fa fa-twitter  tw-btn mr-1"
                                target="bank"></Link>
                            </li>
                            <li>
                              <Link
                                to={""}
                                className="fa fa-linkedin link-btn mr-1"
                                target="bank"></Link>
                            </li>
                            <li>
                              <Link
                                to={""}
                                className="fa fa-google-plus  gplus-btn"
                                target="bank"></Link>
                            </li>
                          </ul>
                        </div>
                      </form>
                      <div className="text-center bottom">
                        <Link
                          to="/employee/login"
                          className="site-button button-md btn-block text-white">
                          Sign In
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        value={jobSeekerId}
                        className="form-control"
                        onChange={handleIdChange}
                        placeholder="Job Seeker ID"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="file"
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <button
                      type="submit"
                      className="site-button dz-xs-flex m-r5">
                      Upload Resume
                    </button>
                  </form>
                )}
                <div className="bottom-footer clearfix m-t10 m-b20 row text-center">
                  <div className="col-lg-12 text-center">
                    <span>
                      {" "}
                      © Copyright by{" "}
                      <i className="fa fa-heart m-lr5 text-red heart"></i>
                      <Link to={""}>Nova Jobs </Link> All rights reserved.
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
export default connect(mapStateToProps)(EmployeeRegister2);
