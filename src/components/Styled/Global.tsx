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
    height: 100%;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #fff;
  }
  
  .release_date {
    color: #fff;
    font-size: 12px;
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
  
  // main::before {
  //   content: " ";
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   width: 100%;
  //   height: 100%;
  //   z-index: -1;
  //   opacity: .2;
  //   background-position: center;
  //   -ms-background-size: cover;
  //   -o-background-size: cover;
  //   -moz-background-size: cover;
  //   -webkit-background-size: cover;
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //   background-attachment: fixed;
  // }
  
  .d-flex {
    display: block !important;
  }
  
  .searchHeader,
  .network {
    display: none;
  }
  
  .des p {
    color: #ffffffe7;
    /* display: none; */
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
  
  .navCate {
    display: none;
  }
  
  .cateConten a img {
    width: 100% !important;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .categoryMovie {
    gap: 10px 15px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  
  .product_seri_item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  
  .data_img {
    width: 40%;
    height: 40%;
  }
  
  .data_img img {
    object-fit: cover;
  }
  
  .ft {
    background: #00000063;
    display: block;
  }
  
  .masthead-brand-img {
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
  
  .inputSearch {
    width: 100%;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border: 2px solid transparent;
    outline: none;
    border-bottom-left-radius: 5px;
    background-color: #f3f3f4;
    color: #0d0c22;
    transition: .3s ease;
    border-top-left-radius: 5px;
    margin-left: 5px;
  }
  
  .inputSearch::placeholder {
    color: #9e9ea7;
  }
  
  .inputSearch:focus,
  .inputSearch:hover {
    outline: none;
    border-color: rgba(234, 76, 137, 0.4);
    background-color: #fff;
    box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
  }
  
  .icon {
    position: absolute;
    left: 1rem;
    fill: #9e9ea7;
    width: 1rem;
    height: 1rem;
  }

  .slick-next{
    right:0;
  }
  .slick-prev{
    z-index:9
  }
  .btnSearch {
    border-radius: .25rem;
    text-transform: uppercase;
    font-style: normal;
    font-weight: 400;
    padding-left: 25px;
    padding-right: 25px;
    color: #fff;
    -webkit-clip-path: polygon(0 0, 0 0, 100% 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 100%);
    clip-path: polygon(0 0, 0 0, 100% 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 100%);
    height: 40px;
    font-size: 0.7rem;
    line-height: 14px;
    letter-spacing: 1.2px;
    transition: .2s .1s;
    background-image: linear-gradient(90deg, #717171, #fb2071);
    border: 0 solid;
    overflow: hidden;
  }
  
  .btnSearch:hover {
    cursor: pointer;
    transition: all .3s ease-in;
    padding-right: 30px;
    padding-left: 30px;
  }
  
  
 
  
  .navbar_mb {
    display: block;
  }
  
  .inner {
    display: none;
    z-index:1 !important;
  }
  
  .product_seri_item_deltail {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
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
  
  .acountImageContent {
    color: rgb(29 29 29);
    width: 150px;
    background: #fff;
    border-radius: 5px;
    right: 0%;
    margin-top: 30%;
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
  
  .img_category_Mb {
    display: flex;
    justify-content: center;
  }
  
  .mb_img_lg {
    width: 20%;
  }
  
  .lgmb_content {
    display: flex;
  }
  
  
  
  .formContainer {
    display: flex;
    justify-content: center;
  }
  
  .input {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-weight: 500;
    font-size: 13px;
    color: #fff;
    background-color: rgb(28, 28, 30);
    box-shadow: 0 0 .4vw rgba(0, 0, 0, 0.5), 0 0 0 .15vw transparent;
    border-radius: 0.4vw;
    border: none;
    outline: none;
    padding: 0.4vw;
    transition: .4s;
    width: 500px;
    margin: 20px 0;
    padding: 15px;
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

  
  @media(min-width:768px){
    font-size:14px;
    .pl{
      display: block;
    }
  }


  @media(min-width:1024px) {
   
    font-size:16px;

    :where(.css-dev-only-do-not-override-1s3dcof).ant-btn-primary{
      background-color: #0071e2 !important;
    }
  
    .navbar_mb {
      display: none;
    }
  
    .img_category_Mb {
      display: block;
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
  
    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
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
  
    
  
    .masthead-brand {
      display: block;
    }
  
    .inner {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #00000038;
      transition: all .2s ease-in-out;
    }
  
    .ft {
      background: #00000063;
      display: block;
    }
  
    .navCate {
      padding: 15px 10px;
      background-color: #000000;
      box-shadow: 0px 2px 2px #23232a;
      border-radius: 10px;
      margin: 10px 0;
    }
  
    .navCate a {
      font-size: 14px;
      font-weight: 500;
    }
  
    .categoryContent {
      gap: 0 18px;
      padding: 10px;
      background: rgb(28, 28, 30);
      border-radius: 10px;
      margin: 5px 0;
    }
  
    .detail_video {
      gap: 0 20px;
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
  
    .input {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      font-weight: 500;
      font-size: .8vw;
      color: #fff;
      background-color: rgb(28, 28, 30);
      box-shadow: 0 0 .4vw rgba(0, 0, 0, 0.5), 0 0 0 .15vw transparent;
      border-radius: 0.4vw;
      border: none;
      outline: none;
      padding: 0.4vw;
      transition: .4s;
      width: 500px;
      margin: 20px 0;
      padding: 15px;
    }
  
    
  
    .formContainer {
      display: flex;
      justify-content: center;
    }
  
    .network {
      margin: 20px 10px;
      display: block;
    }
  
  
  
    .footer .footer-socila-icon a {
      width: 30px;
      height: 30px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #F84E77;
      color: #ffffff;
      border-radius: 50%;
      margin-right: 8px;
      font-size: 15px;
    }
  
    .footer .footer-socila-icon a:hover {
      background: #1baaa0;
    }
  
    .footer .footer-links {
      margin: 0;
    }
  
    .footer .footer-links li+li {
      padding-top: 10px;
    }
  
    .footer .footer-links li a {
      position: relative;
    }
  
    .footer .footer-links li a:after {
      content: "";
      position: absolute;
      width: 0px;
      left: auto;
      right: 0;
      bottom: 0;
      height: 1px;
      transition: ease all 0.35s;
      background: #F84E77;
    }
  
    .footer .footer-links li a:hover:after {
      width: 100%;
      left: 0;
      right: auto;
    }
  
    .footer .footer-top {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
  
    .footer .footer-top h5,
    .footer .footer-top .h5 {
      position: relative;
      font-size: 1.2rem;
      text-transform: uppercase;
    }
  
    @media (min-width: 768px) {
      .footer .footer-top {
        padding-top: 2rem;
        padding-bottom: 1rem;
      }
    }
  
    @media (min-width: 992px) {
      .footer .footer-top {
        padding-top: 3rem;
        padding-bottom: 2rem;
      }
    }
  
    .footer .footer-border-top {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  
    .footer .footer-border-top.dark {
      border-top: 1px solid rgba(16, 16, 16, 0.1);
    }
  
    .footer .footer-border-bottom {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  
    .footer .footer-border-bottom.dark {
      border-bottom: 1px solid rgba(16, 16, 16, 0.1);
    }
  
    .bg-dark-gradient {
      background: linear-gradient(180deg, #101010 50%, black 100%) repeat-x !important;
    }
  
    .white-link a {
      color: rgba(255, 255, 255, 0.65);
    }
  
    a {
      text-decoration: none
    }
  
    .avatar-lg img {
      width: 90px;
      height: 90px;
    }
  
    .card {
      margin-bottom: 24px;
      text-align: center;
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
  
    .avatar-title {
      align-items: center;
      background-color: #3b76e1;
      color: #fff;
      display: flex;
      font-weight: 500;
      height: 100%;
      justify-content: center;
      width: 100%;
    }
  
    .bg-soft-primary {
      background-color: rgba(59, 118, 225, .25) !important;
    }
  
    a {
      text-decoration: none !important;
    }
  
    .badge-soft-danger {
      color: #f56e6e !important;
      background-color: rgba(245, 110, 110, .1);
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
  
    .categoryMovie {
      gap:25px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }
  
    .movie_css {
      border-radius: 6px;
    }
  
    .movie-item {
      margin-bottom: 20px;
      padding: 10px;
      background-color: #f2f2f2;
      border-radius: 10px;
    }
  
    .movie-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    .movie-description {
      font-size: 16px;
      margin-bottom: 10px;
    }
  
    .movie-release-date {
      font-size: 14px;
      font-style: italic;
      color: #999;
    }
  
    .release_date {
      color: #fff;
      font-size: 12px;
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
  
    .postImg {
      width: 40px;
      height: 40px;
  
    }
  
    .postImg img {
      width: 100%;
      border-radius: 100%;
      object-fit: cover;
    }
  
    .postTitle {
      font-size: 13px;
      color: #000;
    }
  
    .postConten {
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 0 2px #999;
      margin: 20px 0;
    }
  
    .widthPost {
      width: 45%;
    }
  
    .postName {
      font-weight: 500;
    }
  
    .postImage {
      text-align: center;
      margin: 20px 2px;
    }
  
    /* button {
      border: 2px solid #24b4fb;
      background-color: #24b4fb;
      border-radius: 0.9em;
      padding: 0.8em 1.2em 0.8em 1em;
      transition: all ease-in-out 0.2s;
      font-size: 16px;
    }
  
    button span {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 600;
    } */
  
  
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
  
  
    .loading {
     
    }
  
    .des {
      display: block;
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
  
    .navCate {
      display: block;
    }
  
    .cateConten a img {
      object-fit: cover;
      border-radius: 5px;
    }
  
    .categoryMovie {
      text-align: start;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }
  
  
    footer {
      display: block;
    }
  
    .product_seri_item {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 10px;
    }
  
    .product_seri_item div {
      border-radius: 5px;
    }
  
    .masthead-brand-img {
      display: block;
      width: 4%;
      opacity: 0;
    }
  
    .masthead-brand-img img {
      width: 100%;
    }
  
    .product_seri_item_deltail {
      display: grid;
      grid-template-columns: repeat(11, 1fr);
    }
  
    .data_img {
      width: 20%;
    }
  
    .data_img img {
      object-fit: cover;
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
  
    .searhValue {
      color: #000;
      width: 100%;
      font-weight: 500;
      padding: 5px;
      font-size: 17px;
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
  
    .acountImageContent {
      color: rgb(29 29 29);
      width: 150px;
      background: #fff;
      border-radius: 5px;
      left: 51%;
      transform: translateX(-50%);
      margin-top: 30%;
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
  
    .acountImageContent::before {
      content: "";
      position: absolute;
      width: 0;
      /* transform: translateX(50%); */
      height: 0;
      left: 43%;
      border-radius: 3px;
      top: -9px;
      border-left: 10px solid transparent;
      border-right: 11px solid transparent;
      border-bottom: 15px solid #fff;
    }
  
    /* .commentProducts {
      height: 200px;
      overflow-y: scroll;
    } */
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

