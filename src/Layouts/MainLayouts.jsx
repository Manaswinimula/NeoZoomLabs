import React, { Children } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function MainLayouts({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}

export default MainLayouts;
