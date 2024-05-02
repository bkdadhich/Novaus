import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const postBlog = [
  {
    image: require("./../../images/logo/icon1.png"),
  },
  {
    image: require("./../../images/logo/icon1.png"),
  },
  {
    image: require("./../../images/logo/icon1.png"),
  },
  {
    image: require("./../../images/logo/icon1.png"),
  },
  {
    image: require("./../../images/logo/icon1.png"),
  },
  {
    image: require("./../../images/logo/icon1.png"),
  },
];

function Jobsection() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("employeeLoginToken");
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://novajobs.us/api/employeer/job-seekers?page_size=10",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data, "job seekers data");
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="section-full bg-white content-inner-2">
      <div className="container">
        <div className="d-flex job-title-bx section-head">
          <div className="mr-auto">
            <h2 className="m-b5">Candidates</h2>
          </div>
          <div className="align-self-end">
            <Link
              to={"/employee/browse-candidates"}
              className="site-button button-sm"
            >
              Browse All Candidates <i className="fa fa-long-arrow-right"></i>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <ul className="post-job-bx browse-job">
              {data.map((item, index) => (
                <li
                  key={index}
                  onClick={() =>
                    navigate(`profilepage/${item?.jobskkers_detail?.id}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="post-bx">
                    <div className="d-flex m-b30">
                      <div className="job-post-company">
                        <span>
                          <img
                            alt="profile"
                            src={item?.jobskkers_detail?.photo}
                          />
                        </span>
                      </div>
                      <div className="job-post-info">
                        <h4>
                          {item?.jobskkers_detail?.first_name}{" "}
                          {item?.jobskkers_detail?.last_name}
                        </h4>
                        <ul>
                          <li>{item?.jobskkers_detail?.email}</li>
                        </ul>
                        <ul>
                          <li>
                            <i className="fa fa-map-marker"></i>
                            {item?.jobskkers_detail?.cities?.name}{" "}
                            {item?.jobskkers_detail?.states?.name}{" "}
                            {item?.jobskkers_detail?.countries?.name}
                          </li>

                          <li>
                            <i className="fa fa-clock-o"></i>{" "}
                            {moment(
                              item?.jobskkers_detail?.created_at
                            ).fromNow()}
                          </li>
                        </ul>
                        {item.jobskkers_detail.resume_score_percentage ? (
                          <ul>
                            <li>
                              Resume Percentage :{" "}
                              {item?.jobskkers_detail?.resume_score_percentage}
                            </li>
                          </ul>
                        ) : null}
                        {item.jobskkers_detail.skills_arr ? (
                          <div
                            className="job-time d-flex flex-column my-2 "
                            style={{ gap: "12px" }}
                          >
                            <ul>
                              <li>Skills :</li>
                            </ul>
                            <div className="row" style={{ gap: "7px" }}>
                              {item.jobskkers_detail.skills_arr.map(
                                (item, index) => {
                                  return (
                                    <ul key={index} className="job-time">
                                      <Link to={"#"}>
                                        <span>{item}</span>
                                      </Link>
                                    </ul>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="job-time mr-auto d-flex">
                        <ul>
                          <li>Experience :</li>
                        </ul>
                        <Link to={"#"}>
                          <span>
                            {item?.jobskkers_detail?.experience_in_month}
                          </span>
                        </Link>
                      </div>
                      <div
                        className="d-flex align-items-center "
                        style={{ gap: "7px" }}
                      >
                        <div className="salary-bx">
                          <span>{item?.jobskkers_detail?.expected_salary}</span>
                        </div>
                      </div>
                    </div>
                    <label className="like-btn">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <div className="m-t30">
              <div className="d-flex">
                <Link className="site-button button-sm mr-auto" to={""}>
                  <i className="ti-arrow-left"></i> Prev
                </Link>
                <Link className="site-button button-sm" to={""}>
                  Next <i className="ti-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="sticky-top">
              <div className="candidates-are-sys m-b30">
                <div className="candidates-bx">
                  <div className="testimonial-pic radius">
                    <img
                      src={require("./../../images/testimonials/pic3.jpg")}
                      alt=""
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="testimonial-text">
                    <p>
                      I just got a job that I applied for via careerfy! I used
                      the site all the time during my job hunt.
                    </p>
                  </div>
                  <div className="testimonial-detail">
                    {" "}
                    <strong className="testimonial-name">
                      Richard Anderson
                    </strong>{" "}
                    <span className="testimonial-position">Nevada, USA</span>{" "}
                  </div>
                </div>
              </div>
              <div className="quote-bx">
                <div className="quote-info">
                  <h4>Make a Difference with Your Online Resume!</h4>
                  <p>
                    Your resume in minutes with JobBoard resume assistant is
                    ready!
                  </p>
                  <Link to={"/employee/register"} className="site-button">
                    Create an Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Jobsection;
