import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import { Form, Button } from "react-bootstrap";
import { FaX } from "react-icons/fa6";
import TextEditor from "../Element/Editor";
import AddSkills from "../Element/AddSkills";
import AddScreening from "../Element/AddScreening";
import { FaCircleQuestion } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  setPostAJobData,
  setSelctedScreeningQuestionGet,
  setSkillsData,
} from "../../store/reducers/postAJobSlice";
import ReactQuill from "react-quill";
import QualificationSetting from "../Element/qualificationSettingsEditor";
import axios from "axios";
import { useEffect } from "react";
import CompanySideBar from "../Layout/companySideBar";
function EmployeeComponypostjobs() {
  const postAJobData = useSelector((state) => state.postAJobSlice.postAJobData);
  const postAJobSkills = useSelector((state) => state.postAJobSlice.skillsData);
  const [description, setDescription] = useState(false);
  const selelctedQuestions = useSelector(
    (state) =>
      state.postAJobSlice.selectedScreeningQuestions.screen_question_keywords
  );
  const [suggestions, setSuggestions] = useState(true);
  const [showAiButton, setShowAiButton] = useState(true);
  const handleSuggestions = () => {
    setSuggestions(false);
  };

  function renderSection(text) {
    const htmlText = text
      .split("\n\n")
      .map((paragraph) => {
        if (paragraph.startsWith("**")) {
          const parts = paragraph.replace(/\*\*/g, "").split(":");
          const title = parts[0].trim();
          const content = parts.slice(1).join(":").trim();
          return `<h2>${title}</h2><p>${content}</p>`;
        } else if (paragraph.startsWith("*")) {
          const items = paragraph
            .split("\n")
            .map((item) => `<li>${item.replace("*", "").trim()}</li>`);
          return `<ul>${items.join("")}</ul>`;
        }
        return `<p>${paragraph.trim()}</p>`;
      })
      .join("");
    dispatch(
      setPostAJobData({
        ...postAJobData,

        description: htmlText,
      })
    );
    setDescription(false);
  }

  // const renderSection = (section) => {
  //   if (section.startsWith("**")) {
  //     if (section.includes(":")) {
  //       const [title, content] = section
  //         .split(":")
  //         .map((part) => part.trim().replace(/\*\*/g, ""));
  //       return (
  //         <div>
  //           <h2>{title}</h2>
  //           <p>{content}</p>
  //         </div>
  //       );
  //     }
  //     return <h2>{section.replace(/\*\*/g, "").trim()}</h2>;
  //   } else if (section.startsWith("*")) {
  //     const listItems = section
  //       .split("\n")
  //       .map((item) => item.replace("*", "").trim());
  //     return (
  //       <ul>
  //         {listItems.map((item) => (
  //           <li key={item}>{item}</li>
  //         ))}
  //       </ul>
  //     );
  //   }
  //   dispatch(
  //     setPostAJobData({
  //       ...postAJobData,

  //       description: `<p>${section.trim()}</p>`,
  //     })
  //   );
  // };

  const [countries, setCountries] = useState([
    {
      id: 0,
      name: "",
    },
  ]);
  const [states, setStates] = useState([
    {
      id: 0,
      name: "",
    },
  ]);
  const [cities, setCities] = useState([
    {
      id: 0,
      name: "",
    },
  ]);
  const token = localStorage.getItem("employeeLoginToken");
  const [jobType, setJobType] = useState([]);
  const [workplaceType, setWorkplaceType] = useState([]);
  const { id } = useParams();

  const getJob = async () => {
    await axios({
      url: `https://jobsbooklet.in/api/employeer/job-lists/${id}`,
      method: "get",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data.screen_questions, "jijadsjklkadslj");
        dispatch(
          setPostAJobData({
            ...postAJobData,
            jobTitle: res.data.data.job_detail.job_title,
            company: res.data.data.job_detail.companies.company_name,
            workplaceType: res.data.data.job_detail.workplace_type_id,
            jobType: res.data.data.job_detail.job_type_id,
            description: res.data.data.job_detail.job_description,
            selectedCity: res.data.data.job_detail.city_id,
            selectedState: res.data.data.job_detail.state_id,
            selectedCountry: res.data.data.job_detail.country_id,
            job_title: res.data.data.job_detail.job_title,
          })
        );
        dispatch(setSkillsData(res.data.data.job_detail.skills_arr));
        if (res.data.data.screen_questions.screen_question_keywords !== null) {
          dispatch(
            setSelctedScreeningQuestionGet(res.data.data.screen_questions)
          );
        }
      })
      .catch((err) => {
        console.log(err, "joy");
      });
  };

  const aiJobDescription = async () => {
    setDescription(true);
    await axios({
      url: `https://jobsbooklet.in/api/employeer/ai-job-description`,
      method: "post",
      headers: {
        Authorization: token,
      },
      data: {
        keyword: postAJobData.jobTitle,
        title: postAJobData.jobTitle,
        workplace_type: postAJobData.workplaceType,
        job_type: postAJobData.jobType,
        company: postAJobData.company,
      },
    }).then((res) => {
      console.log(res.data.data.description);
      renderSection(res.data.data.description);
    });
  };

  const postCompleted = async () => {
    await axios({
      url: `https://jobsbooklet.in/api/employeer/job-post/${id}`,
      method: "PUT",
      headers: {
        Authorization: token,
      },
      data: {
        job_title: postAJobData.jobTitle,
        job_description: postAJobData.description,
        workplace_type_id: Number(postAJobData.workplaceType),
        country_id: Number(postAJobData.selectedCountry),
        state_id: Number(postAJobData.selectedState),
        city_id: Number(postAJobData.selectedCity),
        is_publish: 1,
        screen_questions: {
          screen_question_keywords: selelctedQuestions,
        },
        skills: postAJobSkills,
      },
    }).then((res) => {
      console.log(res);
    });
  };

  const getJobTyes = async () => {
    await axios({
      url: "https://jobsbooklet.in/api/employeer/job-types",

      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setJobType(res.data.data);
      })
      .catch((err) => {
        console.log(err, "joy");
      });
  };

  const getWorkplaceType = async () => {
    await axios({
      url: "https://jobsbooklet.in/api/employeer/workplace-types",

      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setWorkplaceType(res.data.data);
      })
      .catch((err) => {
        console.log(err, "joy");
      });
  };

  const getCountry = async () => {
    await axios({
      method: "get",
      url: "https://jobsbooklet.in/api/employeer/countries",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setCountries(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        setCities([]);
      });
  };

  const getState = async () => {
    await axios({
      method: "get",
      url: `https://jobsbooklet.in/api/employeer/stats/${postAJobData.selectedCountry}`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.data.data) {
          setStates([]);

          setCities([]);
          return;
        }
        setStates(res.data.data);
        console.log(res.data.data);
      })

      .catch((error) => {
        console.log(error);
        setStates([]);
        setCities([]);
      });
  };
  const getCities = async () => {
    await axios({
      method: "get",
      url: `https://jobsbooklet.in/api/employeer/cities/${postAJobData.selectedState}`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.data.data) {
          setStates([]);

          setCities([]);
          return;
        }
        setCities(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        setCities([]);
        console.log(error);
      });
  };

  useEffect(() => {
    getJob();
    getJobTyes();
    getWorkplaceType();
    getCountry();
  }, []);

  useEffect(() => {
    // console.log(selectedCountry);
    dispatch(
      setPostAJobData({
        ...postAJobData,
        selectedCity: 0,
        selectedState: 0,
      })
    );

    getState();
  }, [postAJobData.selectedCountry]);

  useEffect(() => {
    dispatch(
      setPostAJobData({
        ...postAJobData,
        selectedCity: 0,
      })
    );
    getCities();
  }, [postAJobData.selectedState]);

  useEffect(() => {
    if (postAJobData.jobTitle !== "") {
      setShowAiButton(false);
    }
  }, [postAJobData]);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(setPostAJobData({ ...postAJobData, [name]: value }));

    if (name === "jobTitle") {
      // Validate  allow only characters
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrors({ ...errors, jobTitle: "Please add only characters." });
      } else {
        setErrors({ ...errors, jobTitle: "" });
      }
    } else if (name === "company") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrors({ ...errors, company: "Please add only characters." });
      } else {
        setErrors({ ...errors, company: "" });
      }
    }

    dispatch(setPostAJobData({ ...postAJobData, [name]: value }));
  };
  const [errors, setErrors] = useState({
    jobTitle: "",
    company: "",
  });
  console.log(countries, "ciosda");
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <CompanySideBar active="postJob" />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Post A Job
                      </h5>
                      <Link
                        to={"/employee/company-profile"}
                        className="site-button right-arrow button-sm float-right">
                        Back
                      </Link>
                    </div>
                    <form>
                      <div className="row">
                        <div className="col-12 ">
                          <div className="form-group">
                            <label htmlFor="jobTitle">Job Title</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Job Title"
                              id="jobTitle"
                              name="jobTitle"
                              value={postAJobData.jobTitle}
                              onChange={handleChange}
                            />
                          </div>
                          {errors.jobTitle && (
                            <p className="text-danger">{errors.jobTitle}</p>
                          )}
                        </div>
                        <div className="col-12 ">
                          <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Conscious foundation"
                              id="company"
                              name="company"
                              value={postAJobData.company}
                            />
                          </div>
                          {errors.company && (
                            <p className="text-danger">{errors.company}</p>
                          )}
                        </div>
                        {/* <div className="col-12">
                          <div className="form-group">
                            <label>Your email</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="info@gmail.com"
                            />
                          </div>
                        </div> */}
                        {/* <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Job Tags</label>
                            <input
                              type="text"
                              className="form-control tags_input"
                            />
                          </div>
                        </div> */}
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="workplaceType">
                              Workplace type
                            </label>
                            {workplaceType ? (
                              <Form.Control
                                as="select"
                                custom
                                className="custom-select"
                                onChange={handleChange}
                                name="workplaceType"
                                id="workplaceType"
                                value={postAJobData.workplaceType}>
                                {workplaceType.map(
                                  (item) => (
                                    console.log(item),
                                    (
                                      <option value={item.id}>
                                        {item.name}
                                      </option>
                                    )
                                  )
                                )}
                              </Form.Control>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Country</label>
                            {countries ? (
                              <Form.Control
                                as="select"
                                custom
                                className="custom-select"
                                name="selectedCountry"
                                value={postAJobData.selectedCountry}
                                onChange={handleChange}>
                                {countries.map((item) => (
                                  <option value={item.id}>{item.name}</option>
                                ))}
                              </Form.Control>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>State</label>
                            {states ? (
                              <Form.Control
                                as="select"
                                custom
                                className="custom-select"
                                name="selectedState"
                                value={postAJobData.selectedState}
                                onChange={handleChange}>
                                {/* <option value=""></option> */}
                                {states.map((item) => (
                                  <option value={item.id}>{item.name}</option>
                                ))}
                              </Form.Control>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>City</label>
                            {cities ? (
                              <Form.Control
                                as="select"
                                custom
                                name="selectedCity"
                                className="custom-select"
                                value={postAJobData.selectedCity}
                                onChange={handleChange}>
                                {/* <option value=""></option> */}

                                {cities.map((item) => (
                                  <option value={item.id}>{item.name}</option>
                                ))}
                              </Form.Control>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="jobType">Job Type</label>
                            {jobType ? (
                              <Form.Control
                                as="select"
                                custom
                                className="custom-select"
                                name="jobType"
                                id="jobType"
                                value={postAJobData.jobType}
                                onChange={handleChange}>
                                {jobType.map(
                                  (item) => (
                                    console.log(item),
                                    (
                                      <option value={item.id}>
                                        {item.name}
                                      </option>
                                    )
                                  )
                                )}
                              </Form.Control>
                            ) : null}
                          </div>
                        </div>
                        {/* <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Experience</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                            >
                              <option>1 Years</option>
                              <option>2 Years</option>
                              <option>3 Years</option>
                              <option>4 Years</option>
                              <option>5 Years</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Minimum Salary ($):</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="e.g. 10000"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Maximum Salary ($):</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. 20000"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Region</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                            >
                              <option>New York</option>
                              <option>London</option>
                              <option>Los Angeles</option>
                            </Form.Control>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Upload File</label>
                            <div className="custom-file">
                              <p className="m-a0">
                                <i className="fa fa-upload"></i>
                                Upload File
                              </p>
                              <input
                                type="file"
                                className="site-button form-control"
                                id="customFile"
                              />
                            </div>
                          </div>
                        </div> */}
                      </div>
                      {/* <button type="button" className="site-button m-b30">
                        Upload
                      </button> */}
                    </form>
                    {suggestions === false ? null : (
                      <div
                        className="d-flex flex-column  flex-row  p-4"
                        style={{
                          backgroundColor: "#edf3f8",
                          borderRadius: "7px",
                        }}>
                        <div className="d-flex justify-content-end ">
                          <FaX
                            className="outline-none p-0 border-0 f"
                            onClick={handleSuggestions}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <p>
                          987 members with titles similar to Business
                          Development Specialist are actively seeking jobs in
                          Jaipur.
                        </p>
                      </div>
                    )}
                    {showAiButton ? null : (
                      <div>
                        <div className="d-flex my-3 flex-column gap-3 ">
                          <Button
                            onClick={() => {
                              aiJobDescription();
                            }}
                            className="py-3 "
                            style={{ borderRadius: "50px", fontWeight: "600" }}>
                            Write With AI
                          </Button>
                        </div>
                        <p className="text-center ">
                          If You want help with your job description, we will
                          use the information above and AI to suggest One.{" "}
                          <br />{" "}
                          <span style={{ color: "#0a66c2", fontWeight: "600" }}>
                            Learn More
                          </span>
                        </p>
                        <p className="text-center ">
                          Limits may apply to free job posts.
                          <span style={{ color: "#0a66c2", fontWeight: "600" }}>
                            View Our Policy
                          </span>
                        </p>
                      </div>
                    )}
                    <div>
                      <h4>Description</h4>
                      {description ? (
                        <div>
                          <Skeleton width={718} />
                          <Skeleton width={726} />
                          <Skeleton width={732} />
                          <Skeleton width={740} />
                        </div>
                      ) : (
                        <TextEditor value={postAJobData.description} />
                      )}
                    </div>
                    <div>
                      <h4>Skills</h4>
                      <p className="mb-2">
                        Add Skill Keywords (max 10) to make your job more
                        visible to the right candidates.
                      </p>
                      <AddSkills />
                    </div>
                    <div className="mt-4">
                      <h4>Screening Questions</h4>
                      <AddScreening />
                    </div>
                    <div className="mt-4">
                      <h4>Qualification setting</h4>
                      <div className="d-flex justify-content-start align-items-center">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            id="check1"
                            class="custom-control-input selectAllCheckBox"
                            name="example1"
                          />
                          <label
                            class="custom-control-label"
                            for="check1"></label>
                        </div>
                        <div style={{ color: "#9d9d9d" }}>
                          Filter out and send rejections to applicants who don't
                          meet any must-have qualifications.{" "}
                          <FaCircleQuestion />
                        </div>
                      </div>
                      <p className="mb-0 mt-2">Preview*</p>
                      <QualificationSetting />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                      }}>
                      <button
                        onClick={postCompleted}
                        className="site-button d-flex justify-content-center align-items-center">
                        Pending
                      </button>
                      <button
                        // onClick={handleAddSkill}
                        className="site-button d-flex justify-content-center align-items-center">
                        Pending
                      </button>
                    </div>
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
export default EmployeeComponypostjobs;
