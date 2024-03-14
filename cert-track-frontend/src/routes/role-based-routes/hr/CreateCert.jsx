import React, { useState, useEffect, useRef } from "react";
import "../../../style/CreateCert.css";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIServices from "../../../services/APIServices";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const CreateCert = () => {

  const navigate = useNavigate();
  const [vendorData, setvendorData] = useState([]);
  const [issuerData, setissuerData] = useState([]);
  const [AllcertData, setAllcertData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIServices.get("vendor");
        const data1 = await APIServices.get("issuer");
        const AllCert = await APIServices.get("certificate");
        setvendorData(data);
        setissuerData(data1);
        setAllcertData(AllCert);
        //console.log(data);
        //console.log(data1);
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
    AllCert.push(AllcertData[index].name);
  }

  //uncheck json form for store data
  const [certDetail, setcertDetail] = useState({
    name: "",
    issuer_id: "",
    vendor_id: "",
    demand: "",
    level: "",
    certDemand: "",
    incentivetype: "",
    proposed: "",
    logo: "",
    note: "",
  });

  //add value to certDetail
  const handleChange = (fieldName, value) => {
    setcertDetail((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  //show img file && check file size
  const [selectedImage, setSelectedImage] = useState(null);
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

  const [selectedOptionVendor, setSelectedOptionVendor] = useState(null);
  const [selectedOptionIssuer, setSelectedOptionIssuer] = useState(null);
  const [selectedOptionCerLevel, setSelectedOptionCerLevel] = useState(null);
  const [selectedOptionDemandLevel, setSelectedOptionDemandLevel] =
    useState(null);
  const [selectedOptionIncentiveType, setSelectedOptionIncentiveType] =
    useState(null);
  const [selectedOptionCerDemand, setSelectedOptionCerDemand] = useState(null);

  const vendorChange = (selectedOption) => {
    setSelectedOptionVendor(selectedOption);
    handleChange("vendor_id", selectedOption.value);
  };
  const IssuerChange = (selectedOption) => {
    setSelectedOptionIssuer(selectedOption);
    handleChange("issuer_id", selectedOption.value);
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
    handleChange("incentivetype", selectedOption.value);
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

  ////check value form
  const validForm = () => {
    if (certDetail.vendor_id == "") {
      toast.error("Please select Product Vendor");
      vendorRef.current.focus();
      return;
    } else if (certDetail.name == "") {
      toast.error("Please fill Name of Certificate");
      nameRef.current.focus();
      return;
    } else if (AllCert.includes(certDetail.name)) {
      toast.error("Duplicate Name of Certificate, Please change Name");
      nameRef.current.focus();
      return;
    } else if (certDetail.issuer_id == "") {
      toast.error("Please select Issuer ");
      issuerRef.current.focus();
      return;
    } else if (certDetail.level == "") {
      toast.error("Please select Certificate Level");
      levelRef.current.focus();
      return;
    } else if (certDetail.certDemand == "") {
      toast.error("Please select Certificate Demand");
      certDemandRef.current.focus();
      return;
    } else if (certDetail.demand == "") {
      toast.error("Please select Demand Level");
      demandRef.current.focus();
      return;
    } else if (certDetail.incentivetype == "") {
      toast.error("Please select Incentive Type");
      incentivetypeRef.current.focus();
      return;
    } else {
      return true;
    }
  };

  //handle submit (post)
  const handleSubmit = (event) => {
    event.preventDefault(); //not to refresh page
    const isValid = validForm();
    //console.log(isValid);
    if (isValid) {
      //console.log(certDetail);
      //new json form,ready for post
      const bodyPost = {
        status: 0, //default status
        isActive: false, //default is_active in type bit(1)
        isOfficial: false, //default is_official
        isPaid: false, //default is_paid
        name: certDetail.name,
        issuer: { id: parseInt(certDetail.issuer_id) },
        vendor: { id: parseInt(certDetail.vendor_id) },
        demand: certDetail.demand,
        level: certDetail.level,
        certDemand: certDetail.certDemand,
        incentiveType: certDetail.incentivetype,
        proposed: parseInt(certDetail.proposed),
        logo: certDetail.logo || null,
        note: certDetail.note || "",
      };

      //submit (post)
      //console.log(bodyPost);
      const postData = async () => {
        try {
          const response = await APIServices.post("certificate", bodyPost);
          toast.success("successfully create certificate!");
          setTimeout(() => {
            navigate("/hr/manage-certificates/");
          }, 2000); 
        } catch (error) {
          toast.error("Something went wrong.Please try again");
        }
      };
      postData();
    }
  };

  const handleBack = () => {
    navigate("/hr/manage-certificates/");
  }

  return (
    <div className="content">
      <Container>
        <h2 id="HeaderPage">Create New Certificate</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
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
                value={selectedOptionVendor}
              />
            </Grid>
            <Grid item xs={8}>
              <label htmlFor="CerName">Name of Certificate *</label>
              <input
                ref={nameRef}
                className="form-control"
                type="text"
                id="CerName"
                name="CerName"
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={4}>
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
                value={selectedOptionIssuer}
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
                value={selectedOptionCerLevel}
              />
            </Grid>
            <Grid item xs={5}>
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
                value={selectedOptionCerDemand}
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
                value={selectedOptionDemandLevel}
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
                value={selectedOptionIncentiveType}
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
                accept="image/jpeg"
                className="img-fluid form-control"
                id="imgLogo"
                name="imgLogo"
                onChange={(e) => {
                  ImgChange(e);
                }}
              />
            </Grid>
            <Grid item xs={7}>
              {selectedImage && (
                <div>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="img-fluid imgSize"
                  />
                </div>
              )}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <label htmlFor="Note">Note</label>
            <textarea
              className="form-control"
              name="Note"
              id="Note"
              rows="3"
              onChange={(e) => handleChange("note", e.target.value)}
            ></textarea>
          </Grid>
          <div id="groupBtn">
            <Button variant="contained" color="success" type="submit" value="Save">Save</Button>
            <Button variant="outlined" onClick={handleBack}>Back</Button>
          </div>
          
        </form>
      </Container>
    </div>
  );
};

export default CreateCert;
