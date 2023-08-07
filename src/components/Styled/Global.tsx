import { createGlobalStyle } from 'styled-components';
import ImageHomePage from '/img/FB_IMG_1674382115803.jpg';
const I = 'https://firebasestorage.googleapis.com/v0/b/mystorage-265d8.appspot.com/o/background%2F344349264_1189664538382178_6361259618366921556_n.jpg?alt=media&token=b4695431-6769-4d62-9fce-0f952e599de8';

export const GlobalStyle = createGlobalStyle`
:root{
  textarea {
    outline: none;
  }

  

  img {
    width: 100%;
    object-fit: cover;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #fff;
  }
  
  body {
    background-color: #23232a;
  }
  
  
  main {
    position: relative;
  }
  
  .containers {
    padding-top: 6.5% !important;
  }
  
  .d-flex {
    display: block !important;
  }
  
  .searchHeader,
  .network {
    display: none;
  }
  
  .nav-masthead {
    padding: 10px;
  }
  
  .card-body {
    text-align: center;
  }
  
  .img_contact div img {
    width: 70px;
    height: 70px;
  }
  

  .ft {
    background: #00000063;
    display: block;
  }
  
  .menu_mobile {
    display: block !important;
  }
  
  .admin_contact {
    display: none;
  }
  
  .group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    width: 100%;
  }
  
  
  .icon {
    position: absolute;
    left: 1rem;
    fill: #9e9ea7;
    width: 1rem;
    height: 1rem;
  }

  .slick-arrow {
    display:none !important;
  }
  
  .navbar_mb {
    display: block;
  }
  
  .inner {
    display: none;
    z-index:1 !important;
  }
  
  .acountImage {
    width: 40px;
    height: 40px;
  }
  
  .acountImage img {
    cursor: pointer;
    border: 2px solid #fff;
    border-radius: 100%;
  }
  
  .index{
    width: 83%;
  }

  .acountImageContent div {
    font-weight: 500;
    padding: 5px 15px;
    font-size: 13px;
  }
  
  .acountImageContent .hv_:hover {
    color: #fff;
    cursor: pointer;
    background-color: #0071e2;
  }
  
  .bgNav {
    background-color: rgb(0 0 0 / 19%);
  }
  
  .card {
    background-color: rgb(28 28 30 / 22%);
  }

  .container-fluid{
    display: flex;
    justify-content: space-between;
  }

  .pl{
    display: none;
  }

  .acountImageContent::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    left: 85%;
    border-radius: 3px;
    top: -9px;
    border-left: 10px solid transparent;
    border-right: 11px solid transparent;
    border-bottom: 15px solid #fff;
  }

  

  @media(min-width:768px){
    font-size:14px;
    .pl{
      display: block;
    }
  }


  @media(min-width:1024px) {

    .acountImageContent::before {
      content: "";
      left: 43% ;
    }

    font-size:16px;
  
    .navbar_mb {
      display: none;
    }
  
    #navbarToggleExternalContent2 {
      display: none;
    }
  
    main::before {
      content: " ";
      background: url(${I ? I : ImageHomePage});
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: .2;
      /* background-repeat: no-repeat; */
      background-position: center;
      -ms-background-size: cover;
      -o-background-size: cover;
      -moz-background-size: cover;
      -webkit-background-size: cover;
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
  
    .page404 {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .d-flex {
      display: flex !important;
    }
  
    .navbar {
      display: none;
    }
  
    .searchHeader {
      display: block;
    }
  
    .inner {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #00000038;
    }
  
    .ft {
      background: #00000063;
      display: block;
    }
  
    .navCate {
      background-color: #000000;
      box-shadow: 0px 2px 2px #23232a;
      border-radius: 10px;
    }
  
    .navCate a {
      font-size: 14px;
      font-weight: 500;
    }
  
    .des h5 {
      margin: 10px 0;
    }
  
    .des p {
      font-size: 14px;
      color: #999 !important;
    }
    
    .cateTitle p {
      margin-top: 7px;
      font-size: 14px;
      font-weight: 500;
    }
  
    .btn_remove {
      margin: 0 10px;
      border: 2px solid #24b4fb;
      background-color: #24b4fb;
      border-radius: 30px;
      padding: 0.2em 0.8em 0.2em 0.8em;
      transition: all ease-in-out 0.2s;
      font-size: 14px;
    }
  
    .btn_remove span {
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 600;
    }
  
    .btn_remove:hover {
      background-color: #0071e2;
    }
  
    .network {
      margin: 20px 10px;
      display: block;
    }
  
    .card {
      position: relative;
      display: flex;
      justify-content: center;
      min-width: 0;
      word-wrap: break-word;
      background-color: rgb(28 28 30 / 22%);
      box-shadow: 0 0 1px #000;
      background-clip: border-box;
      border-radius: 1rem;
    }
  
    .avatar-md {
      height: 4rem;
      width: 4rem;
    }
  
    .rounded-circle {
      border-radius: 50% !important;
    }
  
    .img-thumbnail {
      padding: 0.1rem;
      background-color: #f1f3f7;
      border: 1px solid #eff0f2;
      border-radius: 0.75rem;
    }

    .badge-soft-success {
      color: #63ad6f !important;
      background-color: rgba(99, 173, 111, .1);
    }
  
    .mb-0 {
      margin-bottom: 0 !important;
    }
  
    .badge {
      display: inline-block;
      padding: 0.25em 0.6em;
      font-size: 75%;
      font-weight: 500;
      line-height: 1;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.75rem;
    }
  
    .img_contact img {
      object-fit: cover;
    }
  
    .iconContact p {
      display: flex;
      align-items: center;
      gap: 0 10px;
      justify-content: center;
    }
    
    /* //check */
    .left {
      top: 50%;
      left: -2%;
      transform: translateY(-50%);
    }
  
    .right {
      top: 50%;
      transform: translateY(-50%);
      right: -2%;
    }
  
    .left i,
    .right i {
      font-size: 23px;
      opacity: .2;
      transition: all .2s linear;
    }
  
    .__:hover {
      opacity: 1;
      cursor: pointer;
    }
  
    .group {
      display: flex;
      line-height: 28px;
      align-items: center;
      position: relative;
      margin: 15px 0;
    }
  
    .input2 {
      width: 100%;
      height: 45px;
      line-height: 28px;
      padding: 0 1rem;
      padding-left: 2.5rem;
      border: 2px solid transparent;
      border-radius: 8px;
      outline: none;
      background-color: #fff;
      color: #0d0c22;
      transition: .3s ease;
    }
  
    .input2::placeholder {
      color: #9e9ea7;
    }
  
  
    .icon {
      position: absolute;
      left: 1rem;
      fill: #9e9ea7;
      width: 1rem;
      height: 1rem;
    }
  
    .containers {
      padding-top: 6.5% !important;
    }

    .nav-masthead {
      padding: 10px;
    }
  
    .card-body {
      text-align: center;
    }
  
    .img_contact div img {
      width: 70px;
      height: 70px;
    }
  
    .menu_mobile {
      display: none;
    }
  
    .admin_contact {
      display: block;
    }
  
    .searchContent {
      overflow-y: scroll;
    }
  
    .searhValue {
      display: flex;
      gap: 0 15px;
      align-items: start;
    }
  
    .searhValue a {
      color: #fff;
    }
  
    .searchValueImg {
      width: 180px;
      height: 180px;
    }
  
    .searchValueImg img {
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
  
    .searchContent {
      background-color: #fff;
      border-radius: 1px;
    }
  
    .acountImage {
      width: 40px;
      height: 40px;
    }
  
    .detailProduct {
      border-radius: 5px;
    }
  
    .acountImage img {
      cursor: pointer;
      border: 2px solid #fff;
      border-radius: 100%;
    }
  

    .acountImageContent div {
      font-weight: 500;
      padding: 5px 15px;
      font-size: 13px;
    }
  
    .acountImageContent .hv_:hover {
      color: #fff;
      cursor: pointer;
      background-color: #0071e2;
    }
  
    .signleAs {
      text-align: center;
    }
  
    .auth a {
      color: #000;
    }
  
  
  
    .comment {
      height: 100%;
      white-space: nowrap;
      height: 200px;
    }
  
    .comment::-webkit-scrollbar-thumb {
      background-color: #999;
    }
  
    .comment::-webkit-scrollbar {
      width: 5px;
    }
  
    .commentContent {
      border-radius: 5px;
      margin: 10px 0;
    }
  }
  @media(min-width:1280px){
    .containers{
      padding-top: 6.5% !important;
    }
  }
}

`