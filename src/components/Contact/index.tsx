import {
  FacebookOutlined,
  SafetyCertificateFilled,
  YoutubeOutlined,
} from "@ant-design/icons";
import React from "react";
import MVLink from "../Location/Link";
const ContactAdmin = () => {
  return (
    <div className="md:mt-[50px] lg:mt-[50px] lg:flex hidden justify-center text-white ">
      <div className="w-full">
        <div
          className="card p-3 "
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <div className="card-body ">
            <div>
              <div className="d-flex justify-center">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mystorage-265d8.appspot.com/o/image%2Fdau-pha-thuong-khung-ova-3-hen-uoc-3-nam-856.jpg?alt=media&token=dca80d37-bb85-41a0-9fd5-c6e949e1db54"
                  alt=""
                  className="avatar-md rounded-circle img-thumbnail"
                />
              </div>
              <div className="flex-1">
                <h5 className="font-size-16 mb-1 mt-1">
                  <MVLink to="#" className="text-light">
                    Admin Contact
                  </MVLink>
                </h5>
                <span className="badge badge-soft-success mb-0">
                  Web Developer
                </span>
              </div>
            </div>
            <div className="mt-3 pt-1 iconContact">
              <p className="mb-0">
                <FacebookOutlined />
                <a href="https://www.facebook.com/profile.php?id=61556232330775">
                  Facebook
                </a>
              </p>
              <p className="mb-0 mt-2">
                <SafetyCertificateFilled />
                <a href="https://www.tiktok.com/@tieu_loli">Tiktok</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAdmin;
