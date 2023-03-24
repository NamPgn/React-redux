import React from 'react'

const ContactAdmin = () => {
  return (
    <div className='admin_contact'>
      <div className="network d-flex justify-content-center" style={{ color: "#fff" }}>
        <div className="col-xl-8 col-sm-8 ">
          <div className="card ">
            <div className="card-body">
              <div className="dropdown float-end">
                <a className="text-muted dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i className="bx bx-dots-horizontal-rounded"></i></a>
                <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Edit</a><a className="dropdown-item" href="#">Action</a><a className="dropdown-item" href="#">Remove</a></div>
              </div>
              <div className="img_contact ">
                <div className='d-flex justify-content-center'><img src="https://i.pinimg.com/564x/60/36/41/6036415c3560662af8404a82676baa09.jpg" alt="" className="avatar-md rounded-circle img-thumbnail" /></div>
                <div className="flex-1 ">
                  <h5 className="font-size-16 mb-1 mt-1"><a href="#" className="text-light">Admin Contact</a></h5>
                  <span className="badge badge-soft-success mb-0">Web Developer</span>
                </div>
              </div>
              <div className="mt-3 pt-1 iconContact">
                <p className="mb-0">
                  <i className="fa-brands fa-facebook "></i>
                  <a href="https://www.facebook.com/profile.php?id=100040511214253">Facebook</a>
                </p>
                <p className="mb-0 mt-2">
                  <i className="fa-regular fa-user"></i>
                  <a href="https://www.tiktok.com/@tieu_loli">Tiktok</a>
                </p>
                <p className="mb-0 mt-2">
                  <i className="fa-brands fa-youtube"></i>
                  <a href="https://www.youtube.com/channel/UCMRhIr6pa_Xs7MEPAquDBQQ">Youtube</a>
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