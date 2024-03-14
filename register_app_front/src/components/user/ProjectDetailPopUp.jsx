import React, { useState, useEffect } from "react";
import "../../StyleComponent/projectdetail.css";
import axios from "axios";
import { getCurrentUser } from "../../util/APIUtils";

export default function ProjectDetailPopUp(props) {
  const { showPopup, onClose, project } = props;
  const [statuses, setStatuses] = useState([]);
  const [lastStatusId, setLastStatusId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [reloadStatus, setReloadStatus] = useState(false);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        // Handle error fetching user data
        console.error("Error fetching current user:", error);
      }
    }
  
    fetchCurrentUser();
  }, []);
  
  
  useEffect(() => {
    axios.get('http://localhost:8080/api/status/')
    .then((response) => {
      setStatuses(response.data);
      const lastStatus = response.data[response.data.length - 1];
      setLastStatusId(lastStatus.id);
    })
      .catch((error) => console.error('Error fetching statuses: ', error));
    setProjectId((project.id));
  }, [reloadStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentUser)

    // const id = 0;
    const status = {
      "score": null,
      "userStatus": "Apply_Success",
    };
    try {
      await axios.post("http://localhost:8080/api/status/", status, {
        headers: { "Content-Type": "application/json" },
      })
      console.log("New status added");
      setReloadStatus((prev) => !prev);
      const userProject = {
        // id: id,
        user: {email: currentUser.email},
        project: {id: projectId},
        status: {id: lastStatusId + 1}
      };
      await axios.post("http://localhost:8080/api/userproject/", userProject, {
        headers: { "Content-Type": "application/json" },
      })
      console.log("New userProject added");
      
    } catch (error) {
      console.error("Error: ", error);
    }
    onClose();
  };

  return (
    <div className={`popup ${showPopup ? "open" : ""}`}>
      <div className="popup-content-detail">
        <button className="closebtn " onClick={onClose}>
          &times;
        </button>
        <div className="contentText">
          <h2>{project.projectName}</h2>
          <p>{project.projectDetail}</p>

          <table className="table table-secondary table-bordered table-responsive text-light">
            <tbody>
              <tr>
                <th>Position:</th>
                <td>{project.position}</td>
              </tr>
              <tr>
                <th>Salary:</th>
                <td>{project.salary}</td>
              </tr>
              <tr>
                <th>Amount:</th>
                <td>{project.amount}</td>
              </tr>
              <tr>
                <th>Education:</th>
                <td>{project.educationLevel}</td>
              </tr>
              <tr>
                <th>Application Starting Date:</th>
                <td>{project.startDate}</td>
              </tr>
              <tr>
                <th>Application Closing Date:</th>
                <td>{project.endDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-warning text-light d-flex justify-content-center link-dark"
          id="submitbtn"
        >
          Submit
        </button>
      </div>
    </div>
  );
}