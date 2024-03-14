import React, { useState, useEffect, useRef } from "react";
import "../../../style/CreateCert.css";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIServices from "../../../services/APIServices";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const EditCert = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //load product vendor
  //load issuer
  const [vendorData, setvendorData] = useState([]);
  const [issuerData, setissuerData] = useState([]);
  const [certDetail, setcertDetail] = useState([]);
  const [AllcertData, setAllcertData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIServices.get("vendor");
        const data1 = await APIServices.get("issuer");
        //load data from certificate table by id
        const AllCert = await APIServices.get("certificate");
        const certData = await APIServices.get("certificate", id);
        setvendorData(data);
        setissuerData(data1);
        setcertDetail(certData);
        setSelectedImage(certData.logo);
        setAllcertData(AllCert);
        //console.log(data);
        //console.log(data1);
        //console.log(certData);
        //console.log(AllCert);

        console.log("Fetched data successfully!");
      } catch (error) {
        console.error("Error fetching certificates data:", error);
      }
    };
    fetchData();

    // Cleanup function
    return () => {
      console.log("Component unmounted");
      // Cancel the request on component unmount
    };
  }, []);

  //AllCertName unique
  let AllCert = [];
  for (let index = 0; index < AllcertData.length; index++) {
    if (certDetail.name != AllcertData[index].name) {
      AllCert.push(AllcertData[index].name);
    }
  }

  //add value to certDetail
  const handleChange = (fieldName, value) => {
    if (fieldName == "vendor" || fieldName == "issuer") {
      setcertDetail((prevState) => ({
        ...prevState,
        [fieldName]: { id: value },
      }));
    } else {
      setcertDetail((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
  };

  //show img file && check file size
  const ImgChange = (e) => {
    const file = e.target.files[0];
    const size = file.size; //show in byte
    const valueImgInput = document.getElementById("imgLogo");

    if (size <= 2 * 1024 * 1024) {
      const reader = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          setSelectedImage(reader.result);
        };

        const arrayBufferReader = new FileReader();
        arrayBufferReader.readAsArrayBuffer(file);
        arrayBufferReader.onloadend = () => {
          const arrayBuffer = arrayBufferReader.result;
          const byteArray = new Uint8Array(arrayBuffer);
          const jsonArray = Array.from(byteArray);
          const jsonString = JSON.stringify(jsonArray);
          //console.log(jsonString.length);
          handleChange("logo", jsonString);
        };
      }

      toast.success("add image file success!");
    } else {
      valueImgInput.value = null;
      setSelectedImage(null);
      toast.error("Image size must not more than 2 MB!");
    }
  };

  //choose incentive type -> show incentive proposed
  const changeProposed = (value) => {
    let type = document.getElementById("IncentiveType").value;
    type = value;
    let proposed = document.getElementById("IncentiveProposed");
    if (type == "Critical") {
      proposed.value = "4500";
    } else if (type == "High") {
      proposed.value = "3000";
    } else if (type == "Medium") {
      proposed.value = "1500";
    } else if (type == "None") {
      proposed.value = "0";
    }
    handleChange("proposed", proposed.value);
  };

  //options
  //map options from vendor,issuer
  //options in vendor
  const VendorOptions = vendorData.map((vendor) => ({
    value: vendor.id,
    label: vendor.name,
  }));
  //options in issuer
  const IssuerOptions = issuerData.map((Issuer) => ({
    value: Issuer.id,
    label: Issuer.name,
  }));

  //options in certlevel
  const CerLevelOptions = [
    { value: "Basic", label: "Basic" },
    { value: "Foundation", label: "Foundation" },
    { value: "Advanced", label: "Advanced" },
    { value: "Professional", label: "Professional" },
    { value: "Associate", label: "Associate" },
    { value: "Expert", label: "Expert" },
  ];
  //options in demand level
  const DemandLevelOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
    { value: "Require", label: "Require from G-Able Partner" },
  ];
  //options in Incentive Type
  const IncentiveTypeOptions = [
    { value: "None", label: "None" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
    { value: "Critical", label: "Critical" },
  ];
  //options in CerDemand
  const CerDemandOptions = [
    { value: "Create_Business", label: "Create Business Opportunity" },
    {
      value: "Impact_Strategic",
      label: "Impact to strategic & focused partner level retention",
    },
    { value: "High_Usage", label: "High usage volume per G-Able portfolio" },
  ];

  //defaultOption from certDetail
  let defaultOptionCerDemand = CerDemandOptions.findIndex(
    (option) => option.value === certDetail.certDemand
  );
  let defaultOptionDemandLevel = DemandLevelOptions.findIndex(
    (option) => option.value === certDetail.demand
  );
  let defaultOptionCerLevel = CerLevelOptions.findIndex(
    (option) => option.value === certDetail.level
  );
  let defaultOptionIncentiveType = IncentiveTypeOptions.findIndex(
    (option) => option.value === certDetail.incentiveType
  );
  let defaultOptionVendor = VendorOptions.findIndex(
    (option) => option.value === certDetail.vendor.id
  );
  let defaultOptionIssuer = IssuerOptions.findIndex(
    (option) => option.value === certDetail.issuer.id
  );

  let fileName = certDetail.logo;

  const [selectedOptionVendor, setSelectedOptionVendor] = useState(null);
  const [selectedOptionIssuer, setSelectedOptionIssuer] = useState(null);
  const [selectedOptionCerLevel, setSelectedOptionCerLevel] = useState(null);
  const [selectedOptionDemandLevel, setSelectedOptionDemandLevel] =
    useState(null);
  const [selectedOptionIncentiveType, setSelectedOptionIncentiveType] =
    useState(null);
  const [selectedOptionCerDemand, setSelectedOptionCerDemand] = useState(null);

  //console.log("Selected option:", selectedOptionCerDemand);

  const vendorChange = (selectedOption) => {
    setSelectedOptionVendor(selectedOption);
    handleChange("vendor", selectedOption.value);
  };
  const IssuerChange = (selectedOption) => {
    setSelectedOptionIssuer(selectedOption);
    handleChange("issuer", selectedOption.value);
  };
  const CerLevelChange = (selectedOption) => {
    setSelectedOptionCerLevel(selectedOption);
    handleChange("level", selectedOption.value);
  };
  const DemandLevelChange = (selectedOption) => {
    setSelectedOptionDemandLevel(selectedOption);
    handleChange("demand", selectedOption.value);
  };
  const IncentiveTypeChange = (selectedOption) => {
    setSelectedOptionIncentiveType(selectedOption);
    changeProposed(selectedOption.value);
    handleChange("incentiveType", selectedOption.value);
  };
  const CerDemandChange = (selectedOption) => {
    setSelectedOptionCerDemand(selectedOption);
    handleChange("certDemand", selectedOption.value);
  };

  //select dropdown style
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #ced4da",
      borderRadius: "4px",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #ced4da",
      },
    }),
    // dropdownIndicator: (provided) => ({
    //     ...provided,
    //     display: 'none' // Hide dropdown arrow
    // }),
    menu: (provided) => ({
      ...provided,
      overflowY: "hidden",
    }),
  };

  //use for ref the input
  const vendorRef = useRef(null);
  const nameRef = useRef(null);
  const issuerRef = useRef(null);
  const levelRef = useRef(null);
  const certDemandRef = useRef(null);
  const demandRef = useRef(null);
  const incentivetypeRef = useRef(null);

  //handle submit (put)
  const handleSubmit = (event) => {
    event.preventDefault(); //not to refresh page
    //json form,ready for put
    //console.log(certDetail);

    //submit (put)
    const putData = async () => {
      try {
        const response = await APIServices.put("certificate", certDetail, id);
        toast.success("successfully update certificate!");
        setTimeout(() => {
          navigate("/hr/manage-certificates/");
        }, 2000);
      } catch (error) {
        toast.error("Something went wrong.Please try again");
      }
    };
    putData();
  };

  const handleBack = () => {
    navigate("/hr/manage-certificates/");
  };

  return (
    <div className="content">
      <Container>
        <h2 id="HeaderPage">Edit Certificate</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <label htmlFor="ProductVendor">Product Vendor *</label>
              <Select
                ref={vendorRef}
                name="ProductVendor"
                id="ProductVendor"
                isSearchable
                placeholder="Select ProductVendor"
                options={VendorOptions}
                onChange={vendorChange}
                styles={customStyles}
                value={VendorOptions[defaultOptionVendor]}
              />
            </Grid>
            <Grid item xs={6}>
              <label htmlFor="CerName">Name of Certificate *</label>
              <input
                ref={nameRef}
                className="form-control"
                type="text"
                id="CerName"
                name="CerName"
                onChange={(e) => handleChange("name", e.target.value)}
                value={certDetail.name}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <label htmlFor="Issuer">Issuer *</label>
              <Select
                ref={issuerRef}
                name="Issuer"
                id="Issuer"
                isSearchable
                placeholder="Select Issuer"
                options={IssuerOptions}
                onChange={IssuerChange}
                styles={customStyles}
                value={IssuerOptions[defaultOptionIssuer]}
              />
            </Grid>
            <Grid item xs={3}>
              <label htmlFor="CerLevel">Certificate Level *</label>
              <Select
                ref={levelRef}
                name="CerLevel"
                id="CerLevel"
                isSearchable={false}
                placeholder="Select CerLevel"
                options={CerLevelOptions}
                onChange={CerLevelChange}
                styles={customStyles}
                value={CerLevelOptions[defaultOptionCerLevel]}
              />
            </Grid>
            <Grid item xs={3}>
              <label htmlFor="CerDemand">Certificate Demand *</label>
              <Select
                ref={certDemandRef}
                name="CerDemand"
                id="CerDemand"
                isSearchable={false}
                placeholder="Select CerDemand"
                options={CerDemandOptions}
                onChange={CerDemandChange}
                styles={customStyles}
                value={CerDemandOptions[defaultOptionCerDemand]}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <label htmlFor="DemandLevel">Demand Level *</label>
              <Select
                ref={demandRef}
                name="DemandLevel"
                id="DemandLevel"
                isSearchable={false}
                placeholder="Select DemandLevel"
                options={DemandLevelOptions}
                onChange={DemandLevelChange}
                styles={customStyles}
                value={DemandLevelOptions[defaultOptionDemandLevel]}
              />
            </Grid>
            <Grid item xs={4}>
              <label htmlFor="IncentiveType">Incentive Type *</label>
              <Select
                ref={incentivetypeRef}
                name="IncentiveType"
                id="IncentiveType"
                isSearchable={false}
                placeholder="Select IncentiveType"
                options={IncentiveTypeOptions}
                onChange={IncentiveTypeChange}
                styles={customStyles}
                value={IncentiveTypeOptions[defaultOptionIncentiveType]}
              />
            </Grid>
            <Grid item xs={4}>
              <label htmlFor="IncentiveProposed">Incentive Proposed</label>
              <input
                type="text"
                className="form-control"
                name="IncentiveProposed"
                id="IncentiveProposed"
                placeholder="Select Incentive Type"
                disabled
                value={certDetail.proposed}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <label htmlFor="imgLogo">Logo</label>
              <div>
                <span id="imgRequire">
                  Recommend file dimensions: 300x300 px, file size &lt;= 2 MB
                </span>
              </div>

              <input
                type="file"
                accept="image/*"
                className="img-fluid form-control"
                id="imgLogo"
                name="imgLogo"
                onChange={(e) => {
                  ImgChange(e), handleChange("logo", e.target.value);
                }}
              />

              <div className="mt-1">
                {/* Display file name if exist */}
                {/* {fileName && (
                                      <div>Selected file: {fileName}</div>
                                  )} */}
              </div>
            </Grid>
            <Grid item xs={7}>
              {selectedImage && (
                <div>
                  <img
                    src={"http://localhost:8080/api/logo/" + certDetail.logo}
                    alt="Selected"
                    className="img-fluid imgSize"
                  />
                </div>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label htmlFor="Note">Note</label>
              <textarea
                className="form-control"
                name="Note"
                id="Note"
                rows="3"
                onChange={(e) => handleChange("note", e.target.value)}
                value={certDetail.note}
              ></textarea>
            </Grid>
          </Grid>
          <div id="groupBtn">
            <Button
              variant="contained"
              color="success"
              type="submit"
              value="Save"
            >
              Save
            </Button>
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default EditCert;
