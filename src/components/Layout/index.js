/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

 import * as React from "react";
 import PropTypes from "prop-types";
 import Helmet from "react-helmet";
 
 import Footer from "../Footer";
 import Header from "../Header";
 import "../../assets/scss/main.scss"
 
 const Layout = ({ children }) => {
 
   return (
     <>
       <Header />
       <div>
         <main>{children}</main>
         <Footer />
       </div>
       <Helmet>
          <script
              src="https://kit.fontawesome.com/87131fda1b.js"
              crossorigin="anonymous"
          >
          </script>
      </Helmet>
     </>
   )
 }
 
 Layout.propTypes = {
   children: PropTypes.node.isRequired,
 }
 
 export default Layout
 