import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-900 text-white py-4">
        <link
          rel="stylesheet"
          integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA="
          crossOrigin="anonymous"
        />
        <footer className="footer">
          <div className="footer-bottom border-t border-gray-700 py-3">
            <div className="text-center">
              <p className="m-0 text-sm text-gray-400">
                © 2023 | Developed by{" "}
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-500 underline"
                >
                  PH ANG
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Footer;
