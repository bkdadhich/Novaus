import React from "react";
import { Link } from "react-router-dom";

function Profilesidebar() {
  return (
    <div className="col-xl-3 col-lg-4 m-b30">
      <div className="sticky-top">
        <div className="candidate-info">
          <ul>
            <li>
              <Link to={"/user/jobs-profile"} className="active">
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/jobs-my-resume"}>
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                <span>My Resume</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/jobs-saved-jobs"}>
                <i className="fa fa-heart-o" aria-hidden="true"></i>
                <span>Saved Jobs</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/jobs-applied-job"}>
                <i className="fa fa-briefcase" aria-hidden="true"></i>
                <span>Applied Jobs</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/jobs-alerts"}>
                <i className="fa fa-bell-o" aria-hidden="true"></i>
                <span>Job Alerts</span>
              </Link>
            </li>
            {/* <li>
              <Link to={"/user/jobs-cv-manager"}>
                <i className="fa fa-id-card-o" aria-hidden="true"></i>
                <span>CV Manager</span>
              </Link>
            </li> */}
            <li>
              <Link to={"/user/skill-test"}>
                <i className="fa fa-id-card-o" aria-hidden="true"></i>
                <span>Skill Test</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/jobs-change-password"}>
                <i className="fa fa-key" aria-hidden="true"></i>
                <span>Change Password</span>
              </Link>
            </li>
            <li>
              <Link to={"./"}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                <span>Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Profilesidebar;
