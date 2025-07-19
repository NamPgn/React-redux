import React, { memo, useContext } from "react";
import styled from "styled-components";

const Video = styled.video``;
const VideoContainer = styled.div`
  padding-bottom: 60%;
  @media (min-width: 768px) {
    padding-bottom: 50%;
  }
  @media (min-width: 1024px) {
    padding-bottom: 45%;
  }
`;
const ConfigHomePage = memo(() => {

  return (
    <div >
      {/* <div className="d-flex">
        <div className="lg:w-9/12 md:w-12/12 sm:w-full">
          <div className="h-full">
            <VideoContainer className="relative md:mx-2">
              <Video
                className="h-full absolute bg-black rounded"
                width="100%"
                loop
                muted
                autoPlay
                controls
                src={trailer?.url}
              />
            </VideoContainer>
          </div>
        </div>
        <CategoryProductSidebar />
      </div>
      <WeekComponent />
      <LazyLoadOtherComponents>
        <CategoryHomePage />
      </LazyLoadOtherComponents> */}
    </div>
  );
});

export default ConfigHomePage;
