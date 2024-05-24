import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import CompanySideBar from "../Layout/companySideBar";

function EmployeeChangepasswordpage() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword, setChangePassword] = useState({
    old_password: "",
    new_password: "", 
    confirm_password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangePassword({ ...changePassword, [name]: value });
  };
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <CompanySideBar active="jobs-change-password" />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Change Password
                      </h5>
                      <Link
                        to={"/employee/jobs-cv-manager"}
                        className="site-button right-arrow button-sm float-right">
                        Back
                      </Link>
                    </div>
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label htmlFor="old_password">Old Password</label>

                            <div className="input-group d-flex align-items-center">
                              <span
                                className="input-group-addon position-absolute"
                                onClick={() =>
                                  setShowOldPassword(!showOldPassword)
                                }
                                style={{
                                  cursor: "pointer",
                                  right: "0px",
                                  zIndex: "11",
                                  position: "absolute",
                                }}>
                                <i
                                  className={
                                    showOldPassword
                                      ? "fa fa-eye-slash"
                                      : "fa fa-eye"
                                  }></i>
                              </span>
                              <input
                                type={showOldPassword ? "text" : "password"}
                                style={{ marginRight: "0px" }}
                                required
                                className="form-control position-relative "
                                onChange={handleChange}
                                id="old_password"
                                name="old_password"
                                autoComplete="false"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label htmlFor="new_password">New Password </label>
                            <div className="input-group d-flex align-items-center">
                              <span
                                className="input-group-addon position-absolute"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                                style={{
                                  cursor: "pointer",
                                  right: "0px",
                                  zIndex: "11",
                                  position: "absolute",
                                }}>
                                <i
                                  className={
                                    showNewPassword
                                      ? "fa fa-eye-slash"
                                      : "fa fa-eye"
                                  }></i>
                              </span>
                              <input
                                type={showNewPassword ? "text" : "password"}
                                required
                                style={{ marginRight: "0px" }}
                                className="form-control position-relative "
                                onChange={handleChange}
                                id="new_password"
                                name="new_password"
                                autoComplete="false"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group ">
                            <label htmlFor="confirm_password">
                              Confirm New Password
                            </label>
                            <div className="input-group d-flex align-items-center">
                              <span
                                className="input-group-addon position-absolute"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                style={{
                                  cursor: "pointer",
                                  right: "0px",
                                  zIndex: "11",
                                  position: "absolute",
                                }}>
                                <i
                                  className={
                                    showConfirmPassword
                                      ? "fa fa-eye-slash"
                                      : "fa fa-eye"
                                  }></i>
                              </span>
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                style={{ marginRight: "0px" }}
                                className="form-control position-relative "
                                onChange={handleChange}
                                id="confirm_password"
                                name="confirm_password"
                                autoComplete="false"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 m-b10">
                          <button className="site-button">
                            Update Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default EmployeeChangepasswordpage;
