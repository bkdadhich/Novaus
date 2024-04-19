import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setItSkillsData,
  setItSkillsValue,
} from "../../store/reducers/jobsMyResumeSlice";
import { FaEdit } from "react-icons/fa";

const ITSkillsComponent = () => {
  const [itskills, setItSkills] = useState(false);
  const dispatch = useDispatch();
  const itSkillsData = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.itSkillsData
  );
  const itSkillsValue = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.itSkillsValue
  );

  const [editIndex, setEditIndex] = useState(-1);

  const updateItem = () => {
    if (editIndex === -1) return;

    const updatedFormData = [...itSkillsData];
    updatedFormData[editIndex] = {
      ...updatedFormData[editIndex],
      ...itSkillsValue,
    };
    dispatch(setItSkillsData(updatedFormData));
    setItSkills(false);
    setEditIndex(-1);
  };

  const editItem = (index) => {
    const item = itSkillsData[index];
    const editData = {
      skills: item.skills,
      version: item.version,
      lastUsed: item.lastUsed,
      experience: item.experience,
    };
    dispatch(setItSkillsValue(editData));
    setEditIndex(index);
    setItSkills(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setItSkillsValue({ ...itSkillsValue, [name]: value }));
  };
  return (
    <div>
      {" "}
      <div className="d-flex">
        <h5 className="m-b15">IT Skills</h5>
      </div>
      <p>
        Mention your employment details including your current and previous
        company work experience
      </p>
      <table>
        <thead>
          <tr>
            <th>Skills</th>
            <th>Version</th>
            <th>Last Used</th>
            <th>Experience</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itSkillsData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.skills}</td>
                <td>{item.version}</td>
                <td>{item.lastUsed}</td>
                <td>{item.experience}</td>
                <td>
                  <button
                    onClick={() => editItem(index)}
                    to={"#"}
                    className="m-l15 font-14 border-0 "
                    style={{ cursor: "pointer" }}
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        className="modal fade modal-bx-info editor"
        show={itskills}
        onHide={setItSkills}
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">IT Skills</h5>
              <button
                type="button"
                className="close"
                onClick={() => setItSkills(false)}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="skills">IT Skills</label>
                      <input
                        type="text"
                        name="skills"
                        id="skills"
                        onChange={handleChange}
                        value={itSkillsValue.skills}
                        className="form-control"
                        placeholder="Enter IT Skills"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label htmlFor="version">Version</label>
                      <input
                        type="text"
                        name="version"
                        id="version"
                        onChange={handleChange}
                        value={itSkillsValue.version}
                        className="form-control"
                        placeholder="Enter Version"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastUsed">Last Used</label>
                      <Form.Control
                        as="select"
                        name="lastUsed"
                        id="lastUsed"
                        onChange={handleChange}
                        value={itSkillsValue.lastUsed}
                      >
                        <option>2018</option>
                        <option>2017</option>
                        <option>2016</option>
                        <option>2015</option>
                        <option>2014</option>
                        <option>2013</option>
                        <option>2012</option>
                        <option>2011</option>
                        <option>2010</option>
                        <option>2009</option>
                        <option>2008</option>
                        <option>2007</option>
                        <option>2006</option>
                        <option>2005</option>
                        <option>2004</option>
                        <option>2003</option>
                        <option>2002</option>
                        <option>2001</option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="form-group d-flex flex-column ">
                      <label htmlFor="experience">Experience</label>
                      <input
                        type="text"
                        name="experience"
                        id="experience"
                        onChange={handleChange}
                        value={itSkillsValue.experience}
                        className="form-control"
                      />
                      {/* <div className="row">
                        <div className="col-lg-12 col-12">
                            <label htmlFo></label>
                          <Form.Control as="select">
                            <option>2018</option>
                            <option>2017</option>
                            <option>2016</option>
                            <option>2015</option>
                            <option>2014</option>
                            <option>2013</option>
                            <option>2012</option>
                            <option>2011</option>
                            <option>2010</option>
                            <option>2009</option>
                            <option>2008</option>
                            <option>2007</option>
                            <option>2006</option>
                            <option>2005</option>
                            <option>2004</option>
                            <option>2003</option>
                            <option>2002</option>
                            <option>2001</option>
                          </Form.Control>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <Form.Control as="select">
                            <option>january</option>
                            <option>february</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>Jun</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                          </Form.Control>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="site-button"
                onClick={() => setItSkills(false)}
              >
                Cancel
              </button>
              <button
                onClick={updateItem}
                type="button"
                className="site-button"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ITSkillsComponent;
