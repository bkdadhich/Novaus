import React from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import FixedHeader from "../../employeeMarkup/Layout/fixedHeader";

function Changepasswordpage() {
  return (
    <>
      <Header2 />
    <FixedHeader />

      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 m-b30">
                  <div className="sticky-top">
                    <div className="candidate-info">
                
                      <ul>
                        <li>
                          <Link to={"/user/jobs-profile"}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/jobs-my-resume"}>
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>My Resume</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/jobs-saved-jobs"}>
                            <i className="fa fa-heart-o"></i>
                            <span>Saved Jobs</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/jobs-applied-job"}>
                            <i className="fa fa-briefcase"></i>
                            <span>Applied Jobs</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/jobs-alerts"}>
                            <i className="fa fa-bell-o"></i>
                            <span>Job Alerts</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/jobs-cv-manager"}>
                            <i className="fa fa-id-card-o"></i>
                            <span>CV Manager</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/jobs-change-password"}
                            className="active"
                          >
                            <i className="fa fa-key"></i>
                            <span>Change Password</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"./"}>
                            <i className="fa fa-sign-out"></i>
                            <span>Log Out</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Change Password
                      </h5>
                      <Link
                        to={"/user/jobs-cv-manager"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Old Password</label>
                            <input type="password" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>New Password </label>
                            <input type="password" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Confirm New Password</label>
                            <input type="password" className="form-control" />
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
export default Changepasswordpage;
