import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getBillList } from "@store/modules/billStore";
import { TabBar } from "antd-mobile";
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
} from "antd-mobile-icons";
import "./index.scss";
const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  const tabs = [
    {
      key: "/month",
      title: "月度账单",
      icon: <BillOutline />,
    },
    {
      key: "/new",
      title: "记账",
      icon: <AddCircleOutline />,
    },
    {
      key: "/year",
      title: "年度账单",
      icon: <CalculatorOutline />,
    },
  ];
  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};
export default Layout;
