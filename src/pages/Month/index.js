import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import { useSelector } from "react-redux";
import _ from "lodash";

const Month = () => {
  const [visible, setVisible] = useState(false);
  const [billYear, setBillYear] = useState(dayjs().year());
  const [billMonth, setBillMonth] = useState(dayjs().month() + 1);

  // 按月做数据的分组
  const billList = useSelector((state) => state.bill.billList);
  const monthGroup = useMemo(() => {
    // return出去计算之后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  console.log(monthGroup);
  // 选择月份
  const onConfirm = (val) => {
    setBillMonth(dayjs(val).month() + 1);
    setBillYear(dayjs(val).year());
    // 其他逻辑
  };
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span
              className="text"
              onClick={() => {
                setVisible(true);
              }}
            >
              {billYear} | {billMonth}月账单
            </span>
            <span className={classNames("arrow", { expand: visible })}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            onClose={() => {
              setVisible(false);
            }}
            onConfirm={(val) => {
              onConfirm(val);
            }}
            precision="month"
            visible={visible}
            max={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default Month;
