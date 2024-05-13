import React from "react";
import { DivStyledText, DivStyledTitle } from "../style";
import MVLink from "../../../components/Location/Link";

const MVTypeDisplay = ({ data, children, ...rest }) => {
  return (
    <React.Fragment>
      <DivStyledText>
        <MVLink to={"/"}>Trang chủ</MVLink> - {data && data.name}
      </DivStyledText>
      <DivStyledTitle className="text-white">
        {data && data.name}
      </DivStyledTitle>
      <DivStyledText className="mt-3 mb-5">
        Tuyển chọn Phim hay nhất chất lượng cao, Phim Chiếu Rạp 2024 chọn lọc có
        thuyết minh và việt sub.
      </DivStyledText>
      {children}
    </React.Fragment>
  );
};

export default MVTypeDisplay;
