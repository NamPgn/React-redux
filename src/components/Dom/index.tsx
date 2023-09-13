import { useState } from "react";
export const handelChangeAuthOptions = () => {
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState(value => !value);
  }
  return {
    state,
    handleClick
  }
}
