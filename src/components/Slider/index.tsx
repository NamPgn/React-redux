// import React from 'react'
// import Slider from "react-slick";
// import styled from 'styled-components';

// const ImageStyle = styled.img`
// width:100%;
// object-fit: cover;
// `
// const SliderComponent = () => {
//   const Image = [
//     {
//       url: "https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/341701046_1416028485874400_9162123583548865899_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=gApiTewdmQoAX9Lj2ad&_nc_ht=scontent.fhan5-2.fna&oh=00_AfC7oZPNFWL78DZQyPUK-9VkydF8bOmr_BPQ2g7fNY2ykw&oe=6442896D",
//       link: ""
//     },
//     {
//       url: "https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/341469009_575922110994970_3376048305317945799_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=O-fjDHm3HssAX--j1ug&_nc_ht=scontent.fhan5-9.fna&oh=00_AfDDyNOwZurZ1EseHJZzZlk5E4Ebd-CyY3m_jduB99sucA&oe=64429593",
//       link: ""
//     },
//     {
//       url: "https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/341278588_555241223366653_6112016264222262270_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=ZWs8LH9nTcEAX9-FvN7&_nc_ht=scontent.fhan5-11.fna&oh=00_AfAzsRT4yNuRXpEjhlTTgBZ0jPObrkJfYQdQwJWHIGS7HA&oe=64427CEF",
//       link: ""
//     },
//   ]
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };
//   return (
//     <Slider {...settings}>
//       {Image.map((item, index) => (
//         <ImageStyle key={index} src={item.url} />
//       ))}
//     </Slider>
//   )
// }

// export default SliderComponent