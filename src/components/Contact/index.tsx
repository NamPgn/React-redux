import {
  FacebookOutlined,
  SafetyCertificateFilled,
  YoutubeOutlined,
} from "@ant-design/icons";
import React from "react";
import MVLink from "../Location/Link";
import { handleImage } from "../../lib/handleImage";
const ContactAdmin = () => {
  return (
    <div className="md:mt-[50px] lg:mt-[50px] lg:flex hidden justify-center text-white ">
      <div className="w-full">
        <div
          className="card p-3 "
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <div className="card-body">
            <div>
              <div className="d-flex justify-center">
                <img
                  src={handleImage(
                    80,
                    "https://res.cloudinary.com/daz3lejjo/image/upload/v1721825684/category/category_1689076028777-a6e7592292d5428b1bc4.jpg.jpg"
                  )}
                  alt="Đấu phá thương khung phần 5"
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
