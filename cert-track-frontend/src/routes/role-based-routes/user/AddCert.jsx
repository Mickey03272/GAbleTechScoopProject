import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";
import Select from "react-select";
// import "../../../style/AddCert.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { userContext } from "../../../util/userContext";
import APIServices from "../../../services/APIServices";
import { Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const AddCert = () => {
  const getcreateDate = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const currentDay = currentDate.getDate();
    const currentDateText = `${currentYear}-${currentMonth}-${currentDay}`;
    return currentDateText;
  };

  // const history = useHistory();
  const { currentUser } = useContext(userContext);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);
  const [popState, setPopState] = useState(false);
  const [data, setData] = useState({
    expireDate: "",
    isActive: true,
    issueDate: "",
    createDate: "",
    picture: "",
    status: 0,
    cert: {
      id: "",
    },
    employee: {
      // id: currentUser.id,
      id: currentUser.id,
    },
    incentiveDetails: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await APIServices.get("certificate");
        const extractedOptions = res.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setOptions(extractedOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setData((prev) => ({
        ...prev,
        cert: {
          id: selectedOption.value,
        },
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const size = file.size;

    if (size <= 2 * 1024 * 1024) {
      const reader = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          setData((prev) => ({
            ...prev,
            picture: reader.result,
          }));
        };

        const arrayBufferReader = new FileReader();
        arrayBufferReader.readAsArrayBuffer(file);
        arrayBufferReader.onloadend = () => {
          const arrayBuffer = arrayBufferReader.result;
          const byteArray = new Uint8Array(arrayBuffer);
          const jsonArray = Array.from(byteArray);
          const jsonString = JSON.stringify(jsonArray);
          setData((prev) => ({
            ...prev,
            picture: jsonString,
          }));
        };
      }
    } else {
      e.target.value = null;
      setData((prev) => ({
        ...prev,
        picture: null,
      }));
      toast.error("Image size must not more than 2 MB!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePopShow();
    if (!data.cert.id || !data.expireDate || !data.issueDate || !data.picture) {
      setError(true);
      toast.error("Please fill in all fields.");
    } else {
      const response = APIServices.post("own-cert", data);
      console.log(response);
      toast.success("Certificate added successfully!");
    }
  };

  const handlePopClose = () => {
    setPopState(false);
    // history.push("/my-certificates");
  };
  const handlePopShow = () => setPopState(true);

  return (
    <div className="content">
      <div className="container">
        <h2 id="HeaderPage">Add New Certificate</h2>
        <form action="">
          <div className="row">
            <div className="col-12">
              <label className="form-label">Certificate Name</label>
              <Select
                options={options}
                name="cert"
                value={options.find((option) => option.value === data.cert.id)}
                onChange={handleSelectChange}
                required
              />
              {error && !data.cert.id ? (
                <label>*Please select a certificate.</label>
              ) : (
                ""
              )}
              <br />
              <div className="row">
                <div className="col-6">
                  <div className="container">
                    <div className="row align-items-start">
                      <label className="form-label">Issue date</label>
                      <input
                        type="date"
                        name="issueDate"
                        value={data.issueDate}
                        max={getcreateDate()}
                        onChange={handleInputChange}
                        required
                      />
                      {error && !data.issueDate ? (
                        <label>
                          *Please assign an issue date for this certificate.
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="container">
                    <div className="row align-items-start">
                      <label className="form-label">Expiration date</label>
                      <input
                        type="date"
                        name="expireDate"
                        min={getcreateDate()}
                        value={data.expireDate}
                        onChange={handleInputChange}
                        required
                      />
                      {error && !data.expireDate ? (
                        <label>
                          *Please assign an expiration date for this
                          certificate.
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-6">
                  <div data-mdb-input-init className="form-outline">
                    <label className="form-label">IMAGE CERTIFICATION</label>
                    <input
                      type="file"
                      accept="image/jpeg"
                      className="img-fluid form-control"
                      id="imgLogo"
                      name="picture"
                      onChange={handleImageChange}
                      required
                    />
                    {error && !data.picture ? (
                      <label>
                        *Please assign a picture for this certificate.
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <br />
            </div>
          </div>
          {/* <Button className="btn btn-primary btn-success" variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button> */}
          <Button
            variant="outlined"
            onClick={handleSubmit}
            sx={{
              color: "green",
              borderColor: "green",
              "&:hover": {
                backgroundColor: "green",
                color: "white",
                borderColor: "green",
              },
            }}
          >
            Submit
          </Button>

          <Modal
            open={popState}
            onClose={handlePopClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            {error ? (
              <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">Failured</h2>
                <p id="parent-modal-description">
                  Please complete all field in this section.
                </p>
                <Button onClick={handlePopClose}>Close</Button>
              </Box>
            ) : (
              <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">Successed</h2>
                <p id="parent-modal-description">
                  Your certificate has been added successfully.
                </p>
                <Button onClick={handlePopClose}>Close</Button>
              </Box>
            )}
          </Modal>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCert;
