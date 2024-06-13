import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { showToastSuccess, showToastError } from "../../utils/toastify";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImageValue } from "../../store/reducers/jobProfileSlice";
import { setFixedHeaderValues } from "../../store/reducers/fixedHeaderSlice";
import axios from "axios";
import SimpleLoadingSkeleton from "../skeleton/simpleLoadingSkeleton";
import processVid from "../../gif process.mp4";
import { connect } from "react-redux";
import { DNA, InfinitySpin, MutatingDots } from "react-loader-spinner";

var bnr = require("./../../images/banner/bnr1.jpg");

const FixedHeader = () => {
  const fileInputRef = useRef(null);
  const [runAiButton, setRunAiButton] = useState("Run AI");

  const [file, setFile] = useState();
  const [AiBtn, setAiBtn] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [showPercentage, setShowPercentage] = useState(false);
  const [percentage, setPercentage] = useState(() => {
    // Retrieve percentage from localStorage if available
    const storedPercentage = localStorage.getItem('resumePercentage');
    return storedPercentage ? JSON.parse(storedPercentage) : null;
  });
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [basicdetails, setBasicDetails] = useState(false);
  const [imgData, setImgData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [resumeId, setResumeId] = useState(0); // New state for resume ID

  const profileImageValue = useSelector(
    (state) => state.jobProfileSlice.profileImageValue
  );
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    dispatch(setProfileImageValue(file));
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImgData(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const fixedHeaderValues = useSelector(
    (state) => state.fixedHeaderSlice.fixedHeaderValues
  );
  const jobProfileValues = useSelector(
    (state) => state.jobProfileSlice.jobProfileValues
  );

  useEffect(() => {
    // Save percentage to localStorage whenever it changes
    if (percentage !== null) {
      localStorage.setItem('resumePercentage', JSON.stringify(percentage));
    }
  }, [percentage]);
  
  const token = localStorage.getItem("jobSeekerLoginToken");
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://novajobs.us/api/jobseeker/user-profile",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        let data = response.data.data;
        dispatch(
          setFixedHeaderValues({
            first_name: data.first_name,
            last_name: data.last_name,
            professional_title: data.proffesional_title,
            email: data.email,
            country_id: data.country_id,
            state_id: data.state_id,
            phone: data.phone,
            photo: data.photo,
            n_profile_strength: data.n_profile_strength,
          })
        );
        setResumeId(data.job_seeker_resumes?.id || 0); // Set resume ID
        setShowSkeleton(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  }, [jobProfileValues]);

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
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };

  const getState = () => {
    axios({
      method: "GET",
      url: `https://novajobs.us/api/jobseeker/stats/${fixedHeaderValues.country_id}`,
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
      });
  };
  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    dispatch(
      setFixedHeaderValues({
        ...fixedHeaderValues,
        state_id: 0,
      })
    );
    getState();
  }, [fixedHeaderValues.country_id]);

  const getSingleCountry = (countryId) => {
    return countries.find((country) => country.id === countryId)?.name || "";
  };

  const getSingleState = (stateId) => {
    return states.find((state) => state.id === stateId)?.name || "";
  };

  const imagePath = fixedHeaderValues.photo;

  // Define the base URL
  const baseUrl = "https://novajobs.us";

  // Create the full URL
  const fullImageUrl = baseUrl + imagePath;

  console.log(fullImageUrl);

  function handleChange(event) {
    setFile(event.target.files[0]);
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
        console.log(error.response.data.message);
        showToastError(error?.response?.data?.message);
      });
  }

  const dispatch = useDispatch();

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
          `Your AI Resume score is ${res.data.data.content_acuracy_percentage}`
        );
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };

  return (
    <div
      className="overlay-black-dark profile-edit p-t50 p-b20"
      style={{ backgroundImage: "url(" + bnr + ")" }}
    >
      <ToastContainer />
      <div className="container">
        <div className="d-flex justify-content-around">
          <div className="m-">
          <div className="candidate-info">
            {showSkeleton === true ? (
              <SimpleLoadingSkeleton />
            ) : (
              <div className="d-flex">
                <div className="candidate-detail">
                  <div className="canditate-des text-center">
                    <Link to={"#"}>
                      {fixedHeaderValues.photo ? (
                        <img
                          src={fullImageUrl}
                          style={{
                            height: "100px",
                          }}
                        />
                      ) : (
                        <img
                          alt=""
                          src={require("./../../images/team/pic1.jpg")}
                        />
                      )}
                    </Link>
                  </div>
                  <div className="text-white browse-job text-left">
                    {fixedHeaderValues.first_name ||
                    fixedHeaderValues.last_name ? (
                      <h4 className="m-b0">
                        {fixedHeaderValues.first_name}{" "}
                        {fixedHeaderValues.last_name}
                        <Link
                          to={"#"}
                          onClick={() => setBasicDetails(true)}
                          className="m-l15 font-16 text-white"
                        ></Link>
                      </h4>
                    ) : null}
                    {fixedHeaderValues.professional_title ? (
                      <p className="m-b15">
                        {fixedHeaderValues.professional_title}
                      </p>
                    ) : null}

                    <ul className="clearfix">
                      {fixedHeaderValues.email ? (
                        <li>
                          <i className="ti-email"></i>
                          {fixedHeaderValues.email}
                        </li>
                      ) : null}
                      {fixedHeaderValues.phone ? (
                        <li>
                          <i className="ti-mobile"></i>
                          {fixedHeaderValues.phone}
                        </li>
                      ) : null}
                      {fixedHeaderValues.country_id ? (
                        <li>
                          <i className="ti-location-pin"></i>
                          {getSingleCountry(fixedHeaderValues.country_id)}{" "}
                          {fixedHeaderValues.state_id ? (
                            <>{`, ${getSingleState(fixedHeaderValues.state_id)}`}</>
                          ) : (
                            ""
                          )}
                        </li>
                      ) : null}
                    </ul>

                    <div className="progress-bx mb-5">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${fixedHeaderValues.n_profile_strength}%`,
                          }}
                          aria-valuenow={fixedHeaderValues.n_profile_strength}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="font-12 m-b0">Profile Strength</p>
                    </div>

                    

                   

                   
                  </div>
                </div>
                
              </div>
            )}
          </div>
          </div>

          <div className="ms-5 float-end">
          {resumeId === 0 ? (
                      <div>
                        <div className="d-flex ml-5 pl-5">
                  <div
                    style={{
                      borderRight: "1px solid white",
                      marginRight: "8px",
                      height: "180px",
                    }}
                  ></div>
                  <div>
                    
                    {
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
                                <p className="text-white">{percentage}</p>
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
                    }
                  </div>
                </div>
                {console.log(percentage)}
                      </div>
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
                                <p className="text-white">{percentage}</p>
                                <button
                                  className="site-button dz-xs-flex m-r5"
                                  onClick={(e) => {
                                    navigate("/");
                                  }}
                                >
                                  Go To Dashboard
                                </button>
                              </div>
                            ) : ( <div>
                            <p className="text-white">{percentage}</p>
                                <button
                                  className="site-button dz-xs-flex m-r5"
                                  onClick={(e) => {
                                    navigate("/");
                                  }}
                                >
                                  Go To Dashboard
                                </button>
                              
                               </div>
                            )}
                      </div>
                    )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedHeader;
