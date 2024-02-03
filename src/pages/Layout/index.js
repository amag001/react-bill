import { Button } from "antd-mobile";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Outlet></Outlet>
      <Button color="primary">111111112</Button>
      <div>我是Layout</div>
    </>
  );
};
export default Layout;
