import React, { useContext } from "react";
import { MyButton } from "../../../components/MV/Button";
import { MyContext } from "../../../context";
import MVTable from "../../../components/MV/Table";
import { columnsBackground } from "../../../constant";
import MVLink from "../../../components/Location/Link";
import MVImage from "../../../components/MV/Image";
import { EditOutlined } from "@ant-design/icons";

const Background = () => {
  const { background } = useContext(MyContext) || {};
  const data = {
    key: background.data?._id,
    url: background.data?.url,
    image: <MVImage className="m-0" src={background.data?.url} />,
    action: (
      <span>
        <MVLink to={`/dashboard/background/edit/${background.data?._id}`}>
          <EditOutlined
            style={{
              color: "#ff0000",
            }}
            className="px-3"
          />
        </MVLink>
      </span>
    ),
  };
  return <MVTable columns={columnsBackground} dataSource={[data]} />;
};

export default Background;
