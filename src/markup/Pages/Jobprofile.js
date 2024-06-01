import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import Footer from "./../Layout/Footer";
import Profilesidebar from "./../Element/Profilesidebar";
import FixedHeader from "../Layout/fixedHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  setJobProfileValues,
  setProfileImageValue,
} from "../../store/reducers/jobProfileSlice";
import { useEffect } from "react";
import { FaImage } from "react-icons/fa";
import Resizer from "react-image-file-resizer";

function Jobprofile() {
  const [basicdetails, setBasicDetails] = useState(false);
  const jobProfileValues = useSelector(
    (state) => state.jobProfileSlice.jobProfileValues
  );

  const profileImageValue = useSelector(
    (state) => state.jobProfileSlice.profileImageValue
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setJobProfileValues({ ...jobProfileValues, [name]: value }));

    if (name === "professional_title") {
      // Validate professional title: allow only characters
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrors({
          ...errors,
          professional_title: "Please add only characters.",
        });
      } else {
        setErrors({ ...errors, professional_title: "" });
      }
    } else if (name === "phone") {
      // Validate phone: allow only numeric characters and maximum length of 10
      if (!/^\d{0,10}$/.test(value)) {
        setErrors({
          ...errors,
          phone: "Please add only numeric value and max length is 10.",
        });
      } else {
        setErrors({ ...errors, phone: "" });
      }
    } else if (name === "email") {
      // Validate email: check for @ symbol
      if (!value.includes("@")) {
        setErrors({ ...errors, email: "Please add a valid email address." });
      } else {
        setErrors({ ...errors, email: "" });
      }
    } else if (name === "first_name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrors({ ...errors, first_name: "Please add only characters." });
      } else {
        setErrors({ ...errors, first_name: "" });
      }
    } else if (name === "last_name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrors({ ...errors, last_name: "Please add only characters." });
      } else {
        setErrors({ ...errors, last_name: "" });
      }
    } else if (name === "languages") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrors({ ...errors, languages: "Please add only characters." });
      } else {
        setErrors({ ...errors, languages: "" });
      }
    } else if (name === "age") {
      // Validate age: allow only numeric characters and maximum length of 10
      if (!/^\d{0,10}$/.test(value)) {
        setErrors({
          ...errors,
          age: "Please add only numeric value and max length is 10.",
        });
      } else {
        setErrors({ ...errors, age: "" });
      }
    } else if (name === "current_salary") {
      // Validate current_salary: allow only numeric characters and maximum length of 10
      if (!/^\d{0,10}$/.test(value)) {
        setErrors({
          ...errors,
          current_salary: "Please add only numeric value.",
        });
      } else {
        setErrors({ ...errors, current_salary: "" });
      }
    } else if (name === "expected_salary") {
      // Validate expected_salary: allow only numeric characters and maximum length of 10
      if (!/^\d{0,10}$/.test(value)) {
        setErrors({
          ...errors,
          expected_salary: "Please add only numeric value.",
        });
      } else {
        setErrors({ ...errors, expected_salary: "" });
      }
    }
  };
  const [errors, setErrors] = useState({
    professional_title: "",
    phone: "",
    email: "",
    first_name: "",
    last_name: "",
    languages: "",
    age: "",
    current_salary: "",
    expected_salary: "",
  });
  const token = localStorage.getItem("jobSeekerLoginToken");

  const getReq = () => {
    axios({
      method: "GET",
      url: "https://novajobs.us/api/jobseeker/user-profile",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log(response, "all data");
        let data = response.data.data;
        dispatch(
          setJobProfileValues({
            first_name: data.first_name,
            last_name: data.last_name,
            professional_title: data.proffesional_title,
            languages: data.languages,
            age: data.age,
            current_salary: data.current_salary,
            expected_salary: data.expected_salary,
            description: data.description,
            phone: data.phone,
            email: data.email,
            country_id: data.country_id,
            city_id: data.city_id,
            state_id: data.state_id,
            photo: data.photo,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };
  useEffect(() => {
    getReq();
  }, []);

  const handleSubmit = (e) => {
    const formData = new FormData();

    formData.append("first_name", jobProfileValues.first_name);
    formData.append("last_name", jobProfileValues.last_name);
    formData.append("professional_title", jobProfileValues.professional_title);
    formData.append("languages", jobProfileValues.languages);
    formData.append("age", jobProfileValues.age);
    formData.append("current_salary", jobProfileValues.current_salary);
    formData.append("expected_salary", jobProfileValues.expected_salary);
    formData.append("description", jobProfileValues.description);
    formData.append("phone", jobProfileValues.phone);
    formData.append("email", jobProfileValues.email);
    formData.append("country_id", Number(jobProfileValues.country_id));
    formData.append("city_id", Number(jobProfileValues.city_id));
    formData.append("state_id", Number(jobProfileValues.state_id));
    formData.append("photo", profileImageValue);

    e.preventDefault();
    axios({
      method: "PUT",
      url: "https://novajobs.us/api/jobseeker/user-profile",
      headers: {
        Authorization: token,
      },
      data: formData,
    })
      .then((response) => {
        console.log(response);
        getReq();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };
  const [countries, setCountries] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [states, setStates] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  const [cities, setCities] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const getCountry = () => {
    axios({
      method: "GET",
      url: "https://novajobs.us/api/jobseeker/countries",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        let country = response.data.data;
        setCountries(country);
      })
      .catch((err) => {
        console.log(err);
        setCities([]);
      });
  };

  const getState = () => {
    axios({
      method: "GET",
      url: `https://novajobs.us/api/jobseeker/stats/${jobProfileValues.country_id}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setStates(response.data.data);
      })
      .catch((err) => {
        console.log(err, "STATE");
        setStates([]);
        setCities([]);
      });
  };

  const getCities = () => {
    axios({
      method: "GET",
      url: `https://novajobs.us/api/jobseeker/cities/${jobProfileValues.state_id}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setCities(response.data.data);
      })
      .catch((err) => {
        console.log(err, "CITY");
        setCities([]);
      });
  };

  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    dispatch(
      setJobProfileValues({
        ...jobProfileValues,
        state_id: 0,
        city_id: 0,
      })
    );
    getState();
  }, [jobProfileValues.country_id]);

  useEffect(() => {
    dispatch(
      setJobProfileValues({
        ...jobProfileValues,
        city_id: 0,
      })
    );
    getCities();
  }, [jobProfileValues.state_id]);

  const resizeFile = (file) => {
    Resizer.imageFileResizer(
      file,
      400,
      400,
      "JPEG",
      200,
      0,
      (uri) => {
        console.log(uri);
        dispatch(setProfileImageValue(uri));
      },
      "file"
    );
  };
  return (
    <>
      <Header2 />
      <FixedHeader />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar data={"profile"} />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Basic Information
                      </h5>
                      <Link
                        to={"./"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form>
                      <div className="row m-b30 ">
                        <div className="col-12 ">
                          <div className="form-group ">
                            <label htmlFor="changeImage">
                              Change Your Image
                            </label>
                            <div
                              className="position-relative form-control"
                              style={{ cursor: "pointer" }}
                            >
                              <div
                                style={{
                                  backgroundImage: "cover",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "7px",
                                  zIndex: "2",
                                }}
                              >
                                <FaImage />
                                <span>Change Image</span>
                              </div>
                              <label htmlFor="changeImage">
                                {profileImageValue
                                  ? profileImageValue.name
                                  : "Change Your Image"}
                              </label>

                              <input
                                type="file"
                                name="changeImage"
                                id="changeImage"
                                onChange={(e) => {
                                  resizeFile(e.target.files[0]);
                                }}
                                style={{
                                  backgroundImage: "cover",
                                  position: "absolute",
                                  top: "0px",
                                  left: "0px",
                                  zIndex: "5",
                                  width: "100%",
                                  height: "100%",
                                  cursor: "pointer",
                                  opacity: "0",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="first_name">First Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="first_name"
                              id="first_name"
                              onChange={handleChange}
                              value={jobProfileValues.first_name}
                              // placeholder="Alexander Weir"
                            />
                          </div>
                          {errors.first_name && (
                            <p className="text-danger">{errors.first_name}</p>
                          )}
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="last_name">Last Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="last_name"
                              name="last_name"
                              onChange={handleChange}
                              value={jobProfileValues.last_name}
                              // placeholder="Alexander Weir"
                            />
                          </div>
                          {errors.last_name && (
                            <p className="text-danger">{errors.last_name}</p>
                          )}
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="professional_title">
                              Professional title:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              // placeholder="Web Designer"
                              onChange={handleChange}
                              id="professional_title"
                              name="professional_title"
                              value={jobProfileValues.professional_title}
                            />
                          </div>
                          {errors.professional_title && (
                            <p className="text-danger">
                              {errors.professional_title}
                            </p>
                          )}
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="languages">Languages:</label>
                            <input
                              type="text"
                              className="form-control"
                              // placeholder="English"
                              id="languages"
                              name="languages"
                              onChange={handleChange}
                              value={jobProfileValues.languages}
                            />
                          </div>
                          {errors.languages && (
                            <p className="text-danger">{errors.languages}</p>
                          )}
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="age">Age:</label>
                            <input
                              type="text"
                              className="form-control"
                              // placeholder="32 Year"
                              id="age"
                              name="age"
                              onChange={handleChange}
                              value={jobProfileValues.age}
                            />
                          </div>
                          {errors.age && (
                            <p className="text-danger">{errors.age}</p>
                          )}
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="current_salary">
                              Current Salary($):
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              // placeholder="2000$"
                              id="current_salary"
                              name="current_salary"
                              onChange={handleChange}
                              value={jobProfileValues.current_salary}
                            />
                          </div>
                          {errors.current_salary && (
                            <p className="text-danger">
                              {errors.current_salary}
                            </p>
                          )}
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="expected_salary">
                              Expected Salary:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              // placeholder="2500$"
                              id="expected_salary"
                              name="expected_salary"
                              onChange={handleChange}
                              value={jobProfileValues.expected_salary}
                            />
                          </div>
                          {errors.expected_salary && (
                            <p className="text-danger">
                              {errors.expected_salary}
                            </p>
                          )}
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                              id="description"
                              name="description"
                              onChange={handleChange}
                              value={jobProfileValues.description}
                              className="form-control"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Contact Information
                        </h5>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input
                              type="text"
                              className="form-control"
                              // placeholder="+1 123 456 7890"
                              name="phone"
                              id="phone"
                              onChange={handleChange}
                              value={jobProfileValues.phone}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-danger">{errors.phone}</p>
                          )}
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="email">Email Address:</label>
                            <input
                              type="text"
                              className="form-control"
                              // placeholder="info@example.com"
                              name="email"
                              id="email"
                              onChange={handleChange}
                              value={jobProfileValues.email}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-danger">{errors.email}</p>
                          )}
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="country_id">Country:</label>
                            <select
                              type="text"
                              className="form-control"
                              // placeholder="Country Name"
                              id="country_id"
                              name="country_id"
                              onChange={handleChange}
                              value={jobProfileValues.country_id}
                            >
                              {countries.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        {/* <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Postcode:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="112233"
                            />
                          </div>
                        </div> */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="state_id">State:</label>
                            {states ? (
                              <select
                                type="text"
                                className="form-control"
                                // placeholder="New york City"
                                id="state_id"
                                name="state_id"
                                onChange={handleChange}
                                value={jobProfileValues.state_id}
                              >
                                {states.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="city_id">City:</label>
                            {cities ? (
                              <select
                                type="text"
                                className="form-control"
                                // placeholder="London"
                                id="city_id"
                                name="city_id"
                                onChange={handleChange}
                                value={jobProfileValues.city_id}
                              >
                                {cities.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleSubmit}
                        className="site-button m-b30"
                      >
                        Save Setting
                      </button>
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
export default Jobprofile;
