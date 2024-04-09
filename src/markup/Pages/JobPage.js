// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Header from "./../Layout/Header";
// import Footer from "./../Layout/Footer";
// import { FaTimes } from "react-icons/fa";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { Tab, Nav } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import FixedHeader from "../../employeeMarkup/Layout/fixedHeader";
// import { setJobApplicationData } from "../../store/reducers/jobApplicationSlice";
// import moment from "moment";
// function JobPage() {
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [show, setShow] = useState(false);
// const dispatch = useDispatch()

//   const handlClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [jobData, setJobData] = useState([
//     {
//       id: 1,
//       title: "Software Engineer",
//       company: "ABC Corp",
//       location: "New York",
//       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     },
//     {
//       id: 2,
//       title: "Web Developer",
//       company: "XYZ Inc",
//       location: "San Francisco",
//       description:
//         "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
//     },
//     {
//       id: 3,
//       title: "Data Scientist",
//       company: "DataTech",
//       location: "Seattle",
//       description: "Aenean euismod bibendum laoreet.",
//     },
//     {
//       id: 4,
//       title: "UI/UX Designer",
//       company: "DesignCo",
//       location: "Chicago",
//       description:
//         "Fusce interdum velit eu urna vehicula, nec pulvinar nulla dignissim.",
//     },
//     {
//       id: 5,
//       title: "Marketing Manager",
//       company: "MarketingPro",
//       location: "Los Angeles",
//       description:
//         "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
//     },
//     {
//       id: 6,
//       title: "Financial Analyst",
//       company: "FinanceCorp",
//       location: "Boston",
//       description:
//         "Suspendisse vel mauris id mi pulvinar ultrices nec sit amet quam.",
//     },
//     {
//       id: 7,
//       title: "HR Specialist",
//       company: "HR Solutions",
//       location: "Houston",
//       description: "Sed eget eros fringilla, vehicula urna nec, dictum libero.",
//     },
//     {
//       id: 8,
//       title: "Sales Representative",
//       company: "SalesGenius",
//       location: "Atlanta",
//       description:
//         "Nulla facilisi. Duis sit amet lacus at ligula tincidunt vestibulum.",
//     },
//     {
//       id: 9,
//       title: "Customer Support",
//       company: "SupportPro",
//       location: "Miami",
//       description: "Nam eget est quis mi mattis accumsan.",
//     },
//     {
//       id: 10,
//       title: "Product Manager",
//       company: "ProductVision",
//       location: "Austin",
//       description:
//         "Integer aliquam velit non libero lobortis, nec fermentum ligula sodales.",
//     },
//   ]);

//   useEffect(() => {
//     setSelectedJob(jobData[0]);
//   }, []);

//   const handleSelectJob = (job) => {
//     setSelectedJob(job);
//   };

//   const handleClose = () => {
//     const index = jobData.findIndex((job) => job.id === selectedJob.id);
//     if (index !== -1) {
//       setJobData((prevData) => prevData.filter((_, i) => i !== index));
//       setSelectedJob(null);
//     }
//   };

//   const [activeTab, setActiveTab] = useState("contact-info"); // Initial active tab

//   const handleNext = () => {
//     // Update activeTab state based on the current active tab
//     if (activeTab === "contact-info") {
//       setActiveTab("additional-info");
//     } else if (activeTab === "additional-info") {
//       setActiveTab("resume-info");
//     } else if (activeTab === "resume-info") {
//       setActiveTab("immediate-info");
//     }
//   };

//   const handlePrev = () => {
//     // Update activeTab state based on the current active tab
//     if (activeTab === "immediate-info") {
//       setActiveTab("resume-info");
//     } else if (activeTab === "resume-info") {
//       setActiveTab("additional-info");
//     } else if (activeTab === "additional-info") {
//       setActiveTab("contact-info");
//     }
//   };

//   // redux value
//   const jobApplicationData = useSelector(
//     (state) => state.jobApplicationSlice.jobApplicationData
//   );
//   const token = localStorage.getItem("jobSeekerLoginToken");
//   useEffect(() => {
//     const fetchJobApplicationData = async () => {
//       await axios({
//         method: "GET",
//         url: "http://93.188.167.106:3001/api/jobseeker/job-lists",
//         headers: {
//           Authorization: token,
//         },
//       })
//         .then((response) => {
//           console.log(response.data.data);
//           dispatch(setJobApplicationData(response.data.data))
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     };
//     fetchJobApplicationData();
//   }, []);
//   return (
//     <>
//       <Header />
//       <FixedHeader />

//       <div className="page-content bg-white">
//         <div className="content-block">
//           <div className="section-full bg-white p-t50 p-b20">
//             <div className="container">
//               <div className="row">
//                 <div className="col-xl-4 col-lg-5 m-b30">
//                   <div className="sticky-top">
//                     <div className="candidate-info company-info">
//                       <div className="candidate-detail text-center">
//                         <div className="candidate-title">
//                           <h4 className="m-b5">
//                             <Link to={"#"}>Job List</Link>
//                           </h4>
//                         </div>
//                       </div>
//                       <ul
//                         className="job-list-container"
//                         style={{
//                           maxHeight: "calc(100vh - 200px)",
//                           overflowY: "auto",
//                         }}
//                       >
//                          {jobApplicationData.map((job) => {
                      
//                       const formattedCreatedDate =
//                         moment(job.job_detail.created_at).format("YYYY-MM-DD");
//                       return (
//                         <li key={job.s_no}>
//                           <Link
//                             to={"#"}
//                             onClick={() => handleSelectJob(job.s_no)}>
//                             <h6 className="mb-0 d-flex justify-content-between align-items-center">
                            
//                               {/* <div>
//                                 {job?.jobskkers_detail?.photo ? (
//                                   <img
//                                     src={job?.jobskkers_detail?.photo}
//                                     alt="image"
//                                     style={{
//                                       width: "70px",
//                                       height: "70px",
//                                     }}
//                                   />
//                                 ) : null}
//                               </div> */}
// <p className="m-0 ">
//                               {job.s_no}
//                             </p>
//                               <span>
//                                 {" "}
//                                 <FaTimes
//                                   className="close-btn"
//                                   onClick={handleClose}
//                                 />
//                               </span>
//                             </h6>
                            
//                             {job.job_detail.job_title  ? (
//                               <p
//                                 className="mb-0"
//                                 style={{ color: "#1c2957" }}>
//                                 {job.job_detail.job_title}{" "}
//                               </p>
//                             ) : null}
//                             {job.job_detail.job_description ? (
//                               <p
//                                 className="mb-0"
//                                 style={{ color: "#1c2957" }}>
//                                 {job.job_detail.job_description}
//                               </p>
//                             ) : null}
//                             <div className="d-flex flex-row mb-0 " style={{gap:"7px"}}>

// {job.job_detail.skills_arr.map((item,index)=>{
// return (
// <p className="mb-0 " key={index}>{item}</p>
// )
// })}
// </div>
// <div className="d-flex flex-row gap-2 align-items-center " style={{gap: "7px"}}>
// {job.job_category ?
// <p>{job.job_category.name}</p>
// : null} {" "}
// {job.job_type ?
// <p>{job.job_type.name}</p> 
// : null} {" "}
// {job.job_workplace_types.name ?
// <p>{job.job_workplace_types.name}</p> 
// : null} {" "}
// </div> 

//                             {/* {job?.jobskkers_detail?.email ? (
//                               <p
//                                 className="mb-2"
//                                 style={{ color: "#1c2957" }}>
//                                 {" "}
//                                 {job?.jobskkers_detail?.email}
//                               </p>
//                             ) : null} */}
//                             {formattedCreatedDate ? (
//                               <p>Posted {formattedCreatedDate} ago</p>
//                             ) : null}
//                           </Link>
//                         </li>
//                       );
//                     })}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-xl-8 col-lg-7 m-b30">
                


//                   {selectedJob && (
//                     <div>
//                         {jobApplicationData.map((item, index) => {
//                        const formattedCreatedDate =
//                        moment(item.job_detail.created_at).format("YYYY-MM-DD");
//                       return (
//                         <div key={index}>
                        

//                           <div className="candidate-title">
//                             {item.s_no ||
//                             item?.job_detail?.job_title ? (
//                               <Link to={"#"}>
//                                 <h3 className="mb-1">
//                                   {item.s_no}
//                                   {". "}
//                                   {item?.job_detail?.job_title}
//                                 </h3>
//                               </Link>
//                             ) : null}
//                             {item?.job_detail?.job_description ? (
//                               <p className="mb-1">
//                                 {item?.job_detail?.job_description}
//                               </p>
//                             ) : null}
                        
                        
//                           </div>
//                           <div className="job-details-content">
//                             {item?.job_workplace_types?.name ||
//                             item?.job_type?.name ||
//                             item?.job_category?.name ? (
//                               <p className="mb-0">
//                                 {item?.job_workplace_types?.name}
//                                 {" | "}
//                                 {item?.job_type?.name} {" | "}{" "}
//                                 {item?.job_category?.name}
//                               </p>
//                             ) : null}
//                                 <div className="d-flex" style={{gap:"7px"}}>
//                               {item.job_detail.skills_arr.map((item,index)=>{
//                                 return <p key={index} className="mb-5">{item}</p>
//                               })}
//                             </div>
//                             {/* <p>
//                               10,001+ employees · Business Consulting and
//                               Services
//                             </p> */}
//                             {item?.job_detail?.skills ? (
//                               <p>Skills: {item?.job_detail?.skills}</p>
//                             ) : null}
//                              {formattedCreatedDate ? (
//                                   <p>Posted {formattedCreatedDate} ago</p>
//                                 ) : null}
//                           </div>
//                           <div className="d-flex justify-content-start align-items-center">
//                         <button
//                           className="radius-xl site-button"
//                           onClick={handleShow}
//                         >
//                           Apply
//                         </button>
//                         <Modal
//                           show={show}
//                           onHide={handlClose}
//                           backdrop="static"
//                           keyboard={false}
//                         >
//                           <Modal.Header
//                             closeButton
//                             style={{ backgroundColor: "#ffff" }}
//                             className="mt-4"
//                           >
//                             <Modal.Title style={{ color: "#000" }}>
//                               <p> Apply to {selectedJob.company}</p>
//                             </Modal.Title>
//                           </Modal.Header>
//                           <Modal.Body>
//                             <Tab.Container
//                               id="tabs-example"
//                               activeKey={activeTab}
//                             >
//                               <Tab.Content>
//                                 <Tab.Pane eventKey="contact-info">
//                                   <form className="col-12 p-a0">
//                                     <h6 className="font-weight-600">
//                                       Contact info
//                                     </h6>
//                                     <div>
//                                       <h6 className="mb-0">
//                                         <span>
//                                           {" "}
//                                           <i
//                                             className="fa fa-user-o"
//                                             aria-hidden="true"
//                                           ></i>{" "}
//                                           Abc name
//                                         </span>
//                                       </h6>
//                                       <p className="mb-0 ml-2">
//                                         Jaipur, Rajasthan, India
//                                       </p>
//                                     </div>
//                                     <div class="form-group mt-4">
//                                       <label>E-Mail Address*</label>
//                                       <div class="input-group">
//                                         <input
//                                           type="email"
//                                           class="form-control"
//                                           placeholder="Type Your Email Address"
//                                           value="demo@example.com"
//                                         />
//                                       </div>
//                                     </div>
//                                     <div class="form-group">
//                                       <label>Password *</label>
//                                       <div class="input-group">
//                                         <input
//                                           type="password"
//                                           class="form-control"
//                                           placeholder="Type Your Password"
//                                           value="123456"
//                                         />
//                                       </div>
//                                     </div>
//                                     <div class="form-group">
//                                       <label>Phone No.</label>
//                                       <div class="input-group">
//                                         <input
//                                           type="Phonenumber"
//                                           class="form-control"
//                                           placeholder="Type Your Phone number"
//                                         />
//                                       </div>
//                                     </div>
//                                     <p>
//                                       Submitting this application won’t change
//                                       your LinkedIn profile. Application powered
//                                       by LinkedIn | Help Center
//                                     </p>
//                                   </form>
//                                 </Tab.Pane>
//                                 <Tab.Pane eventKey="additional-info">
//                                   {/* Additional Info Form */}
//                                   <form className="col-12 p-a0">
//                                     <h6 className="font-weight-600">
//                                       Additional info
//                                     </h6>
//                                     <div class="form-group">
//                                       <label for="englishProficiency">
//                                         What is your level of proficiency in
//                                         English?
//                                       </label>
//                                       <select
//                                         class="form-control"
//                                         id="englishProficiency"
//                                         required
//                                       >
//                                         <option value="">
//                                           Select an option
//                                         </option>
//                                         <option>Beginner</option>
//                                         <option>Intermediate</option>
//                                         <option>Advanced</option>
//                                         <option>Fluent</option>
//                                       </select>
//                                     </div>
//                                     <div class="form-group">
//                                       <label for="salaryRange">
//                                         Are you okay with the salary range
//                                         between 30k - 35K?
//                                       </label>
//                                       <select
//                                         class="form-control"
//                                         id="salaryRange"
//                                         required
//                                       >
//                                         <option value="">
//                                           Select an option
//                                         </option>
//                                         <option>Yes</option>
//                                         <option>No</option>
//                                       </select>
//                                     </div>
//                                     <div class="form-group">
//                                       <label for="customerServiceExperience">
//                                         How many years of Customer Service
//                                         experience do you currently have?
//                                       </label>
//                                       <input
//                                         type="number"
//                                         class="form-control"
//                                         id="customerServiceExperience"
//                                         placeholder="Enter years of experience"
//                                         min="0"
//                                         max="99"
//                                         required
//                                       />
//                                     </div>
//                                     <div class="form-group">
//                                       <label for="workLocation">
//                                         Are you comfortable to work on both
//                                         Gurgaon and Delhi branches?
//                                       </label>
//                                       <select
//                                         class="form-control"
//                                         id="workLocation"
//                                         required
//                                       >
//                                         <option value="">
//                                           Select an option
//                                         </option>
//                                         <option>Yes</option>
//                                         <option>No</option>
//                                       </select>
//                                     </div>
//                                   </form>
//                                 </Tab.Pane>
//                                 <Tab.Pane eventKey="resume-info">
//                                   {/* Additional Info Form */}
//                                   <form className="col-12 p-a0">
//                                     <h6 className="font-weight-600">
//                                       Resume info
//                                     </h6>
//                                     <div class="form-group">
//                                       <label for="resume">
//                                         Upload resume (DOC, DOCX, PDF, up to 2
//                                         MB)
//                                       </label>
//                                       <input
//                                         type="file"
//                                         class="form-control-file"
//                                         id="resume"
//                                         name="resume"
//                                         accept=".doc, .docx, .pdf"
//                                         required
//                                       />
//                                       <small class="form-text text-muted">
//                                         Accepted file types: DOC, DOCX, PDF.
//                                         Maximum file size: 2 MB.
//                                       </small>
//                                     </div>
//                                   </form>
//                                 </Tab.Pane>
//                                 <Tab.Pane eventKey="immediate-info">
//                                   <form className="col-12 p-a0">
//                                     <h6 className="font-weight-600">
//                                       immediate info
//                                     </h6>

//                                     <div class="form-group">
//                                       <label for="immediateStart">
//                                         We must fill this position urgently. Can
//                                         you start immediately?
//                                       </label>
//                                       <select
//                                         class="form-control"
//                                         id="immediateStart"
//                                         required
//                                       >
//                                         <option value="">
//                                           Select an option
//                                         </option>
//                                         <option>Yes</option>
//                                         <option>No</option>
//                                       </select>
//                                     </div>
//                                   </form>
//                                 </Tab.Pane>
//                               </Tab.Content>
//                             </Tab.Container>
//                           </Modal.Body>

//                           <Modal.Footer>
//                             {activeTab !== "contact-info" && (
//                               <button
//                                 className="site-button mr-2"
//                                 onClick={handlePrev}
//                               >
//                                 Previous
//                               </button>
//                             )}
//                             {activeTab !== "immediate-info" && (
//                               <button
//                                 className="site-button"
//                                 onClick={handleNext}
//                               >
//                                 Next
//                               </button>
//                             )}
//                             {activeTab === "immediate-info" && (
//                               <button
//                                 className="site-button"
//                                 onClick={handlClose}
//                               >
//                                 Submit
//                               </button>
//                             )}
//                           </Modal.Footer>
//                         </Modal>

//                         <button
//                           className="radius-xl  ml-2"
//                           style={{
//                             padding: "8px 20px",
//                             margin: "5px",
//                             backgroundColor: "transparent",
//                             color: "#9d9d9d",
//                             border: "1px solid",
//                             borderColor: "#9d9d9d",
//                             cursor: "pointer",
//                             outline: "none",
//                           }}
//                         >
//                           Save
//                         </button>
//                       </div>
//                         </div>
//                       );
//                     })}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default JobPage;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { FaTimes } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Tab, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FixedHeader from "../../employeeMarkup/Layout/fixedHeader";
import { setJobApplicationData } from "../../store/reducers/jobApplicationSlice";
import moment from "moment";

function JobPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("contact-info"); // Initial active tab

  const dispatch = useDispatch();
  const jobApplicationData = useSelector(
    (state) => state.jobApplicationSlice.jobApplicationData
  );

  useEffect(() => {
    setSelectedJob(jobApplicationData[0]);
  }, [jobApplicationData]);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNext = () => {
    // Update activeTab state based on the current active tab
    if (activeTab === "contact-info") {
      setActiveTab("additional-info");
    } else if (activeTab === "additional-info") {
      setActiveTab("resume-info");
    } else if (activeTab === "resume-info") {
      setActiveTab("immediate-info");
    }
  };

  const handlePrev = () => {
    // Update activeTab state based on the current active tab
    if (activeTab === "immediate-info") {
      setActiveTab("resume-info");
    } else if (activeTab === "resume-info") {
      setActiveTab("additional-info");
    } else if (activeTab === "additional-info") {
      setActiveTab("contact-info");
    }
  };

  const token = localStorage.getItem("jobSeekerLoginToken");

  useEffect(() => {
    const fetchJobApplicationData = async () => {
      try {
        const response = await axios.get(
          "http://93.188.167.106:3001/api/jobseeker/job-lists",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(setJobApplicationData(response.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobApplicationData();
  }, [dispatch, token]);

  return (
    <>
      <Header />
      <FixedHeader />

      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 m-b30">
                  <div className="sticky-top">
                    <div className="candidate-info company-info">
                      <div className="candidate-detail text-center">
                        <div className="candidate-title">
                          <h4 className="m-b5">
                            <Link to="#">Job List</Link>
                          </h4>
                        </div>
                      </div>
                      <ul
                        className="job-list-container"
                        style={{
                          maxHeight: "calc(100vh - 200px)",
                          overflowY: "auto",
                        }}
                      >
                        {jobApplicationData.map((job) => (
                          <li key={job.s_no}>
                            <Link to="#" onClick={() => handleSelectJob(job)}>
                              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                <p className="m-0 ">{job.s_no}</p>
                                <span>
                                  <FaTimes
                                    className="close-btn"
                                    onClick={handleClose}
                                  />
                                </span>
                              </h6>
                              {job.job_detail.job_title && (
                                <p className="mb-0" style={{ color: "#1c2957" }}>
                                  {job.job_detail.job_title}
                                </p>
                              )}
                              {job.job_detail.job_description && (
                                <p className="mb-0" style={{ color: "#1c2957" }}>
                                  {job.job_detail.job_description}
                                </p>
                              )}
                              <div className="d-flex flex-row mb-0 " style={{gap:"7px"}}>
                                {job.job_detail.skills_arr.map((item,index)=>(
                                  <p className="mb-0 " key={index}>{item}</p>
                                ))}
                              </div>
                              <div className="d-flex flex-row gap-2 align-items-center " style={{gap: "7px"}}>
                                {job.job_category && <p>{job.job_category.name}</p>}
                                {job.job_type && <p>{job.job_type.name}</p>}
                                {job.job_workplace_types.name && <p>{job.job_workplace_types.name}</p>}
                              </div>
                              {job.job_detail.created_at && (
                                <p>
                                  Posted {moment(job.job_detail.created_at).format("YYYY-MM-DD")} ago
                                </p>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7 m-b30 job-bx ">
                  {selectedJob && (
                    <div>
                      <div className="candidate-title">
                        <Link to="#">
                          <h3 className="mb-1">
                            {selectedJob.s_no}. {selectedJob.job_detail.job_title}
                          </h3>
                        </Link>
                        {selectedJob.job_detail.job_description && (
                          <p className="mb-1">
                            {selectedJob.job_detail.job_description}
                          </p>
                        )}
                      </div>
                      <div className="job-details-content">
                        {selectedJob.job_workplace_types.name && selectedJob.job_type.name && selectedJob.job_category.name && (
                          <p className="mb-0">
                            {selectedJob.job_workplace_types.name} | {selectedJob.job_type.name} | {selectedJob.job_category.name}
                          </p>
                        )}
                        <div className="d-flex" style={{gap:"7px"}}>
                          {selectedJob.job_detail.skills_arr.map((item,index) => (
                            <p key={index} className="mb-5">{item}</p>
                          ))}
                        </div>
                        {selectedJob.job_detail.skills && (
                          <p>Skills: {selectedJob.job_detail.skills}</p>
                        )}
                        {selectedJob.job_detail.created_at && (
                          <p>Posted {moment(selectedJob.job_detail.created_at).format("YYYY-MM-DD")} ago</p>
                        )}
                      </div>
                      <div className="d-flex justify-content-start align-items-center">
                        <button className="radius-xl site-button" onClick={handleShow}>
                          Apply
                        </button>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton style={{ backgroundColor: "#ffff" }} className="mt-4">
                            <Modal.Title style={{ color: "#000" }}>
                              <p> Apply to {selectedJob.company}</p>
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Tab.Container id="tabs-example" activeKey={activeTab}>
                              {/* Tab Content */}
       
                               <Tab.Content>
                                 <Tab.Pane eventKey="contact-info">
                                   <form className="col-12 p-a0">
                                     <h6 className="font-weight-600">
                                       Contact info
                                     </h6>
                                     <div>
                                       <h6 className="mb-0">
                                         <span>
                                           {" "}
                                           <i
                                            className="fa fa-user-o"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          Abc name
                                        </span>
                                      </h6>
                                      <p className="mb-0 ml-2">
                                        Jaipur, Rajasthan, India
                                      </p>
                                    </div>
                                    <div class="form-group mt-4">
                                      <label>E-Mail Address*</label>
                                      <div class="input-group">
                                        <input
                                          type="email"
                                          class="form-control"
                                          placeholder="Type Your Email Address"
                                          value="demo@example.com"
                                        />
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label>Password *</label>
                                      <div class="input-group">
                                        <input
                                          type="password"
                                          class="form-control"
                                          placeholder="Type Your Password"
                                          value="123456"
                                        />
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label>Phone No.</label>
                                      <div class="input-group">
                                        <input
                                          type="Phonenumber"
                                          class="form-control"
                                          placeholder="Type Your Phone number"
                                        />
                                      </div>
                                    </div>
                                    <p>
                                      Submitting this application won’t change
                                      your LinkedIn profile. Application powered
                                      by LinkedIn | Help Center
                                    </p>
                                  </form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="additional-info">
                                  {/* Additional Info Form */}
                                  <form className="col-12 p-a0">
                                    <h6 className="font-weight-600">
                                      Additional info
                                    </h6>
                                    <div class="form-group">
                                      <label for="englishProficiency">
                                        What is your level of proficiency in
                                        English?
                                      </label>
                                      <select
                                        class="form-control"
                                        id="englishProficiency"
                                        required
                                      >
                                        <option value="">
                                          Select an option
                                        </option>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                        <option>Fluent</option>
                                      </select>
                                    </div>
                                    <div class="form-group">
                                      <label for="salaryRange">
                                        Are you okay with the salary range
                                        between 30k - 35K?
                                      </label>
                                      <select
                                        class="form-control"
                                        id="salaryRange"
                                        required
                                      >
                                        <option value="">
                                          Select an option
                                        </option>
                                        <option>Yes</option>
                                        <option>No</option>
                                      </select>
                                    </div>
                                    <div class="form-group">
                                      <label for="customerServiceExperience">
                                        How many years of Customer Service
                                        experience do you currently have?
                                      </label>
                                      <input
                                        type="number"
                                        class="form-control"
                                        id="customerServiceExperience"
                                        placeholder="Enter years of experience"
                                        min="0"
                                        max="99"
                                        required
                                      />
                                    </div>
                                    <div class="form-group">
                                      <label for="workLocation">
                                        Are you comfortable to work on both
                                        Gurgaon and Delhi branches?
                                      </label>
                                      <select
                                        class="form-control"
                                        id="workLocation"
                                        required
                                      >
                                        <option value="">
                                          Select an option
                                        </option>
                                        <option>Yes</option>
                                        <option>No</option>
                                      </select>
                                    </div>
                                  </form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="resume-info">
                                  {/* Additional Info Form */}
                                  <form className="col-12 p-a0">
                                    <h6 className="font-weight-600">
                                      Resume info
                                    </h6>
                                    <div class="form-group">
                                      <label for="resume">
                                        Upload resume (DOC, DOCX, PDF, up to 2
                                        MB)
                                      </label>
                                      <input
                                        type="file"
                                        class="form-control-file"
                                        id="resume"
                                        name="resume"
                                        accept=".doc, .docx, .pdf"
                                        required
                                      />
                                      <small class="form-text text-muted">
                                        Accepted file types: DOC, DOCX, PDF.
                                        Maximum file size: 2 MB.
                                      </small>
                                    </div>
                                  </form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="immediate-info">
                                  <form className="col-12 p-a0">
                                    <h6 className="font-weight-600">
                                      immediate info
                                    </h6>

                                    <div class="form-group">
                                      <label for="immediateStart">
                                        We must fill this position urgently. Can
                                        you start immediately?
                                      </label>
                                      <select
                                        class="form-control"
                                        id="immediateStart"
                                        required
                                      >
                                        <option value="">
                                          Select an option
                                        </option>
                                        <option>Yes</option>
                                        <option>No</option>
                                      </select>
                                    </div>
                                  </form>
                                </Tab.Pane>
                              </Tab.Content>

                            </Tab.Container>
                          </Modal.Body>
                          <Modal.Footer>
                            {activeTab !== "contact-info" && (
                              <button className="site-button mr-2" onClick={handlePrev}>
                                Previous
                              </button>
                            )}
                            {activeTab !== "immediate-info" && (
                              <button className="site-button" onClick={handleNext}>
                                Next
                              </button>
                            )}
                            {activeTab === "immediate-info" && (
                              <button className="site-button" onClick={handleClose}>
                                Submit
                              </button>
                            )}
                          </Modal.Footer>
                        </Modal>
                        <button
                          className="radius-xl ml-2"
                          style={{
                            padding: "8px 20px",
                            margin: "5px",
                            backgroundColor: "transparent",
                            color: "#9d9d9d",
                            border: "1px solid",
                            borderColor: "#9d9d9d",
                            cursor: "pointer",
                            outline: "none",
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}
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

export default JobPage;
