import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getBillList } from "@store/modules/billStore";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  return (
    <>
      <Outlet></Outlet>

      <div>我是Layout</div>
    </>
  );
};
export default Layout;
