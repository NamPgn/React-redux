import React, { useContext, useEffect, useState } from "react";
import { addCartSlice } from "../../../redux/slice/cart/thunk/cart";
import { useAppDispatch } from "../../../hook";
import { MyContext } from "../../../context";
import { LikeOutlined } from "@ant-design/icons";
import { MyButton } from "../../MV/Button";
import { MVError, MVSuccess, MVWarning } from "../../Message";
import MVTitle from "../../MV/Title";
import MVLink from "../../Location/Link";

interface Istate {
  user: string;
  product: string;
}
const CartAddContent = ({ item, id }) => {
  const dispatch = useAppDispatch();
  const { Auth, user, isLoggedInState } = useContext(MyContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const state: Istate = {
    user: Auth ? Auth.user._id : "",
    product: id,
  };
  useEffect(() => {
    const favoriteItem = user?.cart?.find((item) => item.product._id === id);
    setIsFavorited(favoriteItem?.product?._id === id);
  }, [user.cart, id]); //2 thằng này thay đổi rerender
  const handleAddCart = () => {
    if (!Auth && isLoggedInState == false) {
      // Nếu người dùng chưa đăng nhập, hiển thị tin nhắn đăng nhập
      MVError("Bạn cần đăng nhập!");
    } else {
      // Nếu người dùng đã đăng nhập, kiểm tra sản phẩm trong cart
      if (isFavorited) {
        // Nếu phim đã có trong giỏ hàng, hiển thị tin nhắn trùng lặp
        MVWarning("Đã tồn tại trong yêu thích!");
      } else {
        // Nếu phim chưa có trong giỏ hàng, thêm vào giỏ hàng
        dispatch(addCartSlice(state));
        setIsFavorited(true);
        MVSuccess("Thêm vào danh sách yêu thích thành công!");
      }
    }
  };

  return (
    <div className="lg:flex md:flex-row items-center @screen md:justify-between flex flex-col">
      <MVLink to={`/q/` + item?.category?._id} className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
        <MVTitle level={4} style={{ color: "#fff" }} className="uppercase">
          {item.name}
        </MVTitle>
      </MVLink>
      <MyButton
        style={{ color: "#fff" }}
        icon={<LikeOutlined />}
        disabled={isFavorited}
        className="flex items-center justify-center"
        onClick={() => handleAddCart()}
      >
        {isFavorited ? "Đã yêu thích" : "Thêm vào yêu thích"}
      </MyButton>
    </div>
  );
};

export default CartAddContent;
