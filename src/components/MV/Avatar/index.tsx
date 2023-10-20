import React, { memo } from "react";
import { Avatar } from "@nextui-org/react";
const MVAvatar = memo(({ title, src, size, ...rest }: any) => {
  return (
    <div title={title} style={{ cursor: "pointer" }}>
      <Avatar isBordered size={size} color="default" src={src} {...rest} />
    </div>
  );
});

export default MVAvatar;
