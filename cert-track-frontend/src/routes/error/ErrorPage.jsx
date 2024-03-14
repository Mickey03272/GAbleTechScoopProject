import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="display-4">Oops!</h1>
          <h2 className="display-5">Something went wrong.</h2>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
