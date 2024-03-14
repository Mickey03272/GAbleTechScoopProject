import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import APIServices from "./services/APIServices";
import { userContext } from "./util/userContext";
import { authContext } from "./util/authContext";
import ProtectedRoute from "./routes/protected-routes/ProtectedRoute";
import Test from "./routes/Test";
//Style
import "./App.css";
import LoadingIndicator from "./routes/LoadingIndicator";

//Route Components - Lazy Loaded
const RootLayout = lazy(() => import("./components/layout/RootLayout"));
const NotFoundPage = lazy(() => import("./routes/error/NotFoundPage"));
const ErrorPage = lazy(() => import("./routes/error/ErrorPage"));
// User
const MainPage = lazy(() => import("./routes/role-based-routes/user/MainPage"));
const MyCert = lazy(() => import("./routes/role-based-routes/user/MyCerts"));
const AllCert = lazy(() => import("./routes/role-based-routes/user/AllCert"));
const AddCert = lazy(() => import("./routes/role-based-routes/user/AddCert"));
const CertDetail = lazy(() => import("./routes/role-based-routes/user/CertDetail"));
const ViewCert = lazy(() => import("./routes/role-based-routes/user/ViewCert"));
// HR
const EditCert = lazy(() => import("./routes/role-based-routes/hr/EditCert"));
const CreateCert = lazy(() => import("./routes/role-based-routes/hr/CreateCert"));
const ManageCert = lazy(() => import("./routes/role-based-routes/hr/ManageCert"));
const ViewAllCert = lazy(() => import("./routes/role-based-routes/hr/ViewAllCert"));
const Statistic = lazy(() => import("./routes/role-based-routes/hr/statistic/Statistic"));
const CreateReport = lazy(() => import("./routes/role-based-routes/hr/CreateReport"));
// Manager
const Report = lazy(() => import("./routes/role-based-routes/hr/report/Report"));
const ApproveCert = lazy(() => import("./routes/role-based-routes/manager/ApproveCert"));
const VerifyCerts = lazy(() => import("./routes/role-based-routes/manager/VerifyCerts"));
// HR-Manager
const ApproveIncentive = lazy(() => import("./routes/role-based-routes/hr-manager/ApproveIncentive"));
// Admin
const Import = lazy(() => import("./routes/role-based-routes/admin/Import"));
// External route
const LoginPage = lazy(() => import("./routes/LoginPage"));

const App = (props) => {
  const [authenticated, setAuthenticated] = useState(true); // set to true for development
  const [userRoles, setUserRoles] = useState([
    "ROLE_USER",
    "ROLE_HR",
    "ROLE_MANAGER",
    "ROLE_HRMANAGER",
    "ROLE_ADMIN"
  ]);
  const ROLES = {
    user: "ROLE_USER",
    hr: "ROLE_HR",
    manager: "ROLE_MANAGER",
    hrManager: "ROLE_MANAGER",
    admin: "ROLE_ADMIN",
  };

  const [currentUser, setCurrentUser] = useState({
    // mock user data.
    id: 4,
    username: "usernamemanager",
    email: "examplemanager@example.com",
    password: "example_password",
    roles: [
      {
        id: 1,
        name: "ROLE_USER",
      },
      {
        id: 2,
        name: "ROLE_HR",
      },
      {
        id: 3,
        name: "ROLE_MANAGER",
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  // const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    loadCurrentlyLoggedInUser();
    return () => {
      console.log("cleanup");
    };
  }, []);

  const loadCurrentlyLoggedInUser = async () => {
    setLoading(true);
    try {
      let response = await getCurrentUser();
      setCurrentUser(response);
      setUserRoles(response.roles.map((role) => role.name));
      setAuthenticated(true);
      setLoading(false);
    } catch (error) {
      APIServices.removeCurrentUser();
      setLoading(false);
    }
  };

  const handleLogout = (params) => {
    // localStorage.removeItem(ACCESS_TOKEN);
    APIServices.removeCurrentUser();
    setAuthenticated(false);
    setCurrentUser(null);
    setUserRoles(null);
    // <Navigate to="/login" replace={true} />
    // window.history.pushState({}, undefined, "/login");
  };

  if (authenticated) {
    const userCtx = {
      currentUser,
      doLogout: handleLogout,
      // sidebarData: APIServices.getMenu(currentUser),
    };

    const authCtx = { userRoles, authenticated, doLogout: handleLogout };

    return (
      <Router>
        <authContext.Provider value={authCtx}>
          <userContext.Provider value={userCtx}>
            <Suspense fallback={<LoadingIndicator authenticated={authenticated} />}>
              <Routes>
                <Route path="/" element={<ProtectedRoute allowedRoles={[ROLES.user]} />}>
                  <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
                    <Route path="/certificates" element={<Outlet />}>
                      <Route index element={<MainPage />}/>
                      <Route path="detail/:certName" element={<CertDetail />} />
                    </Route>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="my-certificates" element={<Outlet />}>
                      <Route index element={<MyCert />}/>
                      <Route path="detail/:certName/:id" element={<ViewCert />} />
                      <Route path="add-certificate" element={<AddCert />} />
                    </Route>
                    <Route path="admin" element={<ProtectedRoute allowedRoles={[ROLES.admin]} />}>
                      <Route path="import" element={<Import />} />
                    </Route>
                    <Route path="hr" element={<ProtectedRoute allowedRoles={[ROLES.hr]} />}>
                      <Route path="create-report" element={<CreateReport />} />
                      <Route path="manage-certificates" element={<Outlet />}>
                        <Route index element={<ManageCert />} />
                        <Route path="create" element={<CreateCert />} />
                        <Route path="edit/:id" element={<EditCert />} />
                        <Route path=":id" element={<ViewAllCert />} />
                      </Route>
                    </Route>
                    <Route path="manager" element={<ProtectedRoute allowedRoles={[ROLES.manager]} />}>
                      <Route path="verify-certificates" element={<Outlet />} >
                        <Route index element={<VerifyCerts />} />
                        <Route path="approval/:id" element={<ApproveCert />} />
                      </Route>
                    </Route>
                    <Route path="hr-manager" element={<ProtectedRoute allowedRoles={[ROLES.hrManager]} />}>
                      <Route path="approve-incentive" element={<ApproveIncentive />} />
                    </Route>
                    <Route path="statistic" element={<ProtectedRoute allowedRoles={[ROLES.hr, ROLES.manager, ROLES.hrManager]} />}>
                      <Route index element={<Statistic />} />
                    </Route>
                    <Route path="report" element={<ProtectedRoute allowedRoles={[ROLES.manager, ROLES.hrManager]}/>}>
                      <Route index element={<Report />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage authenticated={authenticated} 
                      isAllowedRole={userRoles?.find((role) => role === ROLES.user)} />} 
                    />
                  </Route>
                  <Route path="report" element={<Report />} />
                  <Route path="hr-manager" element={<ProtectedRoute allowedRoles={[ROLES.hrManager]} />}>
                    <Route path="report" element={<Report />} />
                    <Route path="approve-incentive" element={<ApproveIncentive />} />
                  </Route>
                  <Route path="test" element={<Test/>}/>
                  <Route path="*" element={<NotFoundPage authenticated={authenticated} 
                    isAllowedRole={userRoles?.find((role) => role === ROLES.user)} />} 
                  />
                </Route>
              </Routes>
            </Suspense>
          </userContext.Provider>
        </authContext.Provider>
      </Router>
    );
  } else {
    return (
      <Router>
        <Suspense fallback={<LoadingIndicator authenticated={authenticated} />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage authenticated={authenticated} />}
            />
          </Routes>
        </Suspense>
      </Router>
    );
  }
};

export default App;
