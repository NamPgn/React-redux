import React, { useContext } from "react";
import { MyButton } from "../../../components/MV/Button";
import { MyContext } from "../../../context";
import MVTable from "../../../components/MV/Table";
import { columnsBackground } from "../../../constant";
import MVLink from "../../../components/Location/Link";

const Background = () => {
  const { background } = useContext(MyContext) || {};
  const data = {
    key: background.data._id,
    url: background ? background.data.url : "",
    action: (
      <span>
        <MVLink
          to={`/dashboard/background/edit/${
            background ? background.data._id : ""
          }`}
        >
          <MyButton type="primary" style={{ background: "#1677ff" }}>
            Edit
          </MyButton>
        </MVLink>
      </span>
    ),
  };
  return (
    <>
      <MVTable columns={columnsBackground} dataSource={[data]} />
    </>
  );
};

export default Background;
