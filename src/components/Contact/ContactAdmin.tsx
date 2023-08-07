import { FacebookOutlined, SafetyCertificateFilled, YoutubeOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
const ContactAdmin = () => {
  return (
    <div className='admin_contact'>
      <div className="mt-5 lg:flex hidden justify-center " style={{ color: "#fff" }}>
        <div className="lg:w-7/12 ">
          <div className="card p-3">
            <div className="card-body">
              <div className="img_contact ">
                <div className='d-flex justify-center'>
                  <img src="https://firebasestorage.googleapis.com/v0/b/mystorage-265d8.appspot.com/o/image%2Fdau-pha-thuong-khung-ova-3-hen-uoc-3-nam-856.jpg?alt=media&token=dca80d37-bb85-41a0-9fd5-c6e949e1db54" alt="" className="avatar-md rounded-circle img-thumbnail" />
                </div>
                <div className="flex-1 ">
                  <h5 className="font-size-16 mb-1 mt-1"><Link to="#" className="text-light">Admin Contact</Link></h5>
                  <span className="badge badge-soft-success mb-0">Web Developer</span>
                </div>
              </div>
              <div className="mt-3 pt-1 iconContact">
                <p className="mb-0">
                <FacebookOutlined />
                  <Link to="https://www.facebook.com/profile.php?id=100040511214253">Facebook</Link>
                </p>
                <p className="mb-0 mt-2">
                <SafetyCertificateFilled />
                  <Link to="https://www.tiktok.com/@tieu_loli">Tiktok</Link>
                </p>
                <p className="mb-0 mt-2">
                <YoutubeOutlined />
                  <Link to="https://www.youtube.com/channel/UCMRhIr6pa_Xs7MEPAquDBQQ">Youtube</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactAdmin