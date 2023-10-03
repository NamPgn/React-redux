import React from "react";

const Footer = () => {
  return (
    <>
      <React.Fragment>
        <div className="ft text-white">
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
            integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA="
            crossOrigin="anonymous"
          />
          <footer className="footer">
            <div className="footer-bottom footer-border-top light py-3">
              <div className="text-center">
                <p className="m-0">
                  © 2023 copyright{" "}
                  <a href="#" className="text-reset">
                    | nampg
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </React.Fragment>
    </>
  );
};
export default Footer;
