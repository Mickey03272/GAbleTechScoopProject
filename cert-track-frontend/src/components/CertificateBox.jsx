import React from "react";
import { Link } from "react-router-dom";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Card,
} from "@mui/material";
import { useContext } from "react";
import { userContext } from "../util/userContext";

const CertificateBox = ({ cert, isOwnCert }) => {
  const { currentUser } = useContext(userContext);
  const imgFixedSize = {
    //display: 'block',
    maxHeight: "100%",
    maxWight: "100%",
  };

  const cardStyle = {
    border: "0.5px solid lightGray",
    // bgcolor: "#eeeeee",
  };

  const ownCertContent = () => {
    return (
      <div key={cert.id}>
        <Card sx={cardStyle}>
          <CardActionArea>
            <Link
              to={`/my-certificates/detail/${cert.cert.name}/${cert.id}`}
              style={{ textDecoration: "none" }}
            >
              <CardMedia
                component="img"
                sx={imgFixedSize}
                image={
                  // cert.cerificate.logo
                  "https://miro.medium.com/v2/resize:fit:496/1*AkJOmHEzL_SysPBXmatQvw.png"
                }
                alt="certImg"
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {cert.cert.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Product-vendor: {cert.cert.vendorName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Expiration Date: {cert.expireDate}
                </Typography>
                {
                  cert.cert.isPaid ? 
                  <Typography variant="body2" color="infoMain" component="p">
                  Incentive Type: {cert.cert.incentiveType}
                  </Typography> : null
                }
                {
                  !(cert.isActive) ?
                  <Typography variant="body2" color="error.main" component="h5">
                    Certificate: Inactive
                  </Typography> : null
                }
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </div>
    );
  };

  const certContent = () => {
    return (
      <div key={cert.id}>
        <Card sx={cardStyle}>
          <CardActionArea>
            <Link
              to={`/certificates/detail/${cert.name}`}
              style={{ textDecoration: "none" }}
            >
              <CardMedia
                component="img"
                sx={imgFixedSize}
                image={
                  "https://miro.medium.com/v2/resize:fit:496/1*AkJOmHEzL_SysPBXmatQvw.png"
                }
                alt="certImg"
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {cert.name}
                </Typography>
                {
                  cert.isPaid ? 
                  <Typography variant="body2" color="info.main" component="p">
                  Incentive Type: {cert.incentiveType}
                  </Typography> : null
                }
                {
                  !(cert.isActive) ?
                  <Typography variant="body2" color="error.main" component="h5">
                    Certificate: Inactive
                  </Typography> : null
                }
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </div>
    );
  };

  return <div>{isOwnCert ? ownCertContent() : certContent()}</div>;
};

export default CertificateBox;
