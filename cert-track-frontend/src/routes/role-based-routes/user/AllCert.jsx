import React, { useState, useEffect } from "react";
import Select from "react-select";
import { NavLink } from "react-router-dom";
import axios from "axios";

//API
import APIServices from "../../../services/APIServices";

//Style
import { GoSearch } from "react-icons/go";
import "../../../style/AllCert.css";

export default function AllCert() {
  const [certsData, setCertsData] = useState([]);
  const [certIssuers, setCertIssuers] = useState([]);
  const [certStatus, setCertStatus] = useState(true);
  const [certSelectIssuer, setCertSelectIssuer] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [issuerInSelectOption, setIssuerInSelectOption] = useState([]);
  const [currentApiUrl, setCurrentApiUrl] = useState("certificate");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const data = await APIServices.get(`certificate/search?partialName=${searchInput}`);
        const data = await APIServices.getCertsByPartialName(searchInput);
        console.log(data);
        //console.log(data2.data);
        setCertsData(data);
        uniqueIssuer(data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchData();
  }, [currentApiUrl]);

  function uniqueIssuer(certsData) {
    let arrayOfIssuers = [];
    //console.log(certsData);
    certsData.map((certData) => {
      arrayOfIssuers.push(certData.issuer.name);
      //console.log(arrayOfIssuers);
      const uniqueIssuers = [...new Set(arrayOfIssuers)];
      setCertIssuers(uniqueIssuers);
      console.log(uniqueIssuers);
      IssuerInSelectOption(uniqueIssuers);
    });
  }

  // For switch status (Active/Inactive)
  function onChangeStatus(event) {
    const newStatus = event === "true"; // Convert the string value to boolean
    console.log(newStatus); // Check the new status
    setCertStatus(newStatus); // Update the status state
  }

  // For select issuer
  function onChangeIssuerSelection(selectedOption) {
    const newSelection = selectedOption.value;
    console.log(newSelection);
    setCertSelectIssuer(newSelection);
  }

  function IssuerInSelectOption(certIssuers) {
    let IssuerInSelectOption = [];
    console.log(certIssuers);
    if (certIssuers) {
      certIssuers.map((certIssuer) => {
        console.log(certIssuer);
        let selectIssuer = {
          value: certIssuer,
          label: certIssuer,
        };
        IssuerInSelectOption.push(selectIssuer);
      });
      console.log(IssuerInSelectOption);
      setIssuerInSelectOption(IssuerInSelectOption);
    }
  }

  function resetIssuerInSelectOption() {
    setCertSelectIssuer("All");
  }

  // For search by name
  function handleSearchInputChange(event) {
    console.log(event.target.value);
    setSearchInput(event.target.value);
    setCurrentApiUrl("certificate/search?partialName=" + event.target.value);
  }

  return (
    <div className="allcert">
      <div className="content">
        <div className="container">
          <h2 id="HeaderPage">Main Page</h2>

          {/* Search */}
          <div id="SearchInput" className="d-flex flex-row ps-3">
            <i className="position-absolute p-1 ps-3">
              <GoSearch />
            </i>
            <input
              type="search"
              className="form-control ps-5 w-25 "
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="container px-2 pt-4">
            {/* Select Issuer */}
            <div className="checkbox-group">
              <div className="container px-2">
                <span className="status-label mt-3 me-2">
                  Issuer :
                  <Select
                    options={issuerInSelectOption}
                    value={issuerInSelectOption.find(
                      (option) => option.value === certSelectIssuer
                    )}
                    onChange={onChangeIssuerSelection}
                  />
                </span>
                <button
                  className="clear-button right-"
                  onClick={resetIssuerInSelectOption}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Select Status */}
            <div className="select-status d-flex">
              <span className="status-label mt-3 me-2 ms-2">Status :</span>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mt-3 p-2"
                  type="radio"
                  value="true"
                  id="flexRadioActive"
                  name="status"
                  checked={certStatus === true}
                  onChange={(event) => {
                    onChangeStatus(event.target.value);
                  }}
                />
                <label
                  className="form-check-label pt-2"
                  htmlFor="flexRadioActive"
                >
                  Active
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mt-3 p-2  "
                  type="radio"
                  value="false"
                  id="flexRadioInactive"
                  name="status"
                  checked={certStatus === false}
                  onChange={(event) => {
                    onChangeStatus(event.target.value);
                  }}
                />
                <label
                  className="form-check-label pt-2"
                  htmlFor="flexRadioInactive"
                >
                  Inactive
                </label>
              </div>
            </div>

            {/* Display Certificates */}
            <div className="mycert">
              <div className="content bg-warning">
                <div className="container col-12  ">
                  {certIssuers.map((uniqueIssuer, index) => {
                    index = index + 500;
                    const filteredCerts = certsData.filter(
                      (certData) =>
                        certData.issuer.name === uniqueIssuer &&
                        certData.isActive === certStatus
                    );
                    console.log(filteredCerts);

                    if (filteredCerts.length === 0) {
                      return (
                        <div className="container px-2" key={index}>
                          <h1>{uniqueIssuer}</h1>
                          <div className="row mt-5 d-flex flex-wrap justify-content-start">
                            <div className="col-12">
                              <p>You have no certificates with this issuer.</p>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="container px-2" key={index}>
                        <h1>{uniqueIssuer}</h1>
                        <div className="row mt-5 d-flex flex-wrap justify-content-start">
                          {filteredCerts.map((certData, index) => {
                            index++;
                            if (certSelectIssuer === "All") {
                              if (certData.issuer.name === uniqueIssuer) {
                                return (
                                  <div
                                    className="col-3 flex-wrap justify-content-center"
                                    key={index}
                                  >
                                    <div
                                      className="card mb-1 me-2"
                                      key="certImg"
                                    >
                                      <div className="border text-center mx-auto">
                                        <NavLink to="/certdetail">
                                          <img
                                            src={"/" + certData.logo}
                                            className="card-img-top"
                                            alt="certImg"
                                          />
                                        </NavLink>
                                        <div className="card-body">
                                          <div className="card-text fs-4 fw-bold mb-2">
                                            {certData.name}{" "}
                                          </div>
                                          <div className="card-text fs-5 fw-normal text-black-50">
                                            {certData.proposed !== 0
                                              ? "Incentive : " +
                                                certData.proposed +
                                                " Baht"
                                              : ""}{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                console.log("found cert");
                                return "";
                              }
                            } else {
                              if (
                                certData.issuer.name === uniqueIssuer &&
                                certData.isActive === certStatus &&
                                certData.issuer.name === certSelectIssuer
                              ) {
                                console.log(certData);
                                return (
                                  <div
                                    className="col-3 flex-wrap justify-content-center"
                                    key={index}
                                  >
                                    <div
                                      className="card mb-1 me-2"
                                      key="certImg"
                                    >
                                      <div className="border text-center mx-auto">
                                        <NavLink to="/certdetail">
                                          <img
                                            src={"/" + certData.logo}
                                            className="card-img-top"
                                            alt="certImg"
                                          />
                                        </NavLink>
                                        <div className="card-body">
                                          <div className="card-text fs-4 fw-bold mb-2">
                                            {certData.name}{" "}
                                          </div>
                                          <div className="card-text fs-5 fw-normal text-black-50">
                                            {certData.proposed !== 0
                                              ? "Incentive : " +
                                                certData.proposed +
                                                " Baht"
                                              : ""}{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                console.log("fail");
                                return (
                                  <div className="row mt-5 d-flex flex-wrap justify-content-start">
                                    <div className="col-12">
                                      <p>
                                        You have no certificates with this
                                        issuer.
                                      </p>
                                    </div>
                                  </div>
                                );
                              }
                            }
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
