import { Route, Routes } from "react-router-dom";

import LoginPage from "../views/LoginPage";

const Router = () => {
  return (
    <Routes>
      {/* <Route element={<Layouthome />}>
        <Route path="/login" element={<Home />} />
      </Route> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<LoginPage />} />
    </Routes>
  );
};

export default Router;
