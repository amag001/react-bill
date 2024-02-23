import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import { useSelector } from "react-redux";
import _ from "lodash";

const Month = () => {
  const [visible, setVisible] = useState(false);
  const [billYear, setBillYear] = useState(dayjs().year());
  const [billMonth, setBillMonth] = useState(dayjs().month() + 1);

  // 所有的数据
  const billList = useSelector((state) => state.bill.billList);

  // 按月做数据的分组
  const monthGroup = useMemo(() => {
    console.log(222);
    // return出去计算之后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-M"));
  }, [billList]);
  console.log(monthGroup);
  // 页面初始化时显示当前日期的账单数据
  // useEffect(() => {}, []);
  /**
   * 1,根据所选日期获得当前日期的账单。
   * 2,当日账单数据发生变化时，使用useMemo返回页面所需数据{pay:'xxx',inCome:'xxx',total:'xxx'}
   */
  // 使用useEemo,类似计算属性，年和月变换时返回当前年月的账单。
  const overview = useMemo(() => {
    console.log(billMonth, billYear);
    const currentMonthList = monthGroup[billYear + "-" + (billMonth + 1)];
    if (!currentMonthList) return { income: 0, pay: 0, total: 0 };
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((accumulator, currentValue) => {
        // accumulator累加值(初始值为自己设置的，不设置为数组第一项)，currentValue数组循环的当前项。
        return accumulator + currentValue.money;
      }, 0);
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((accumulator, currentValue) => {
        // accumulator累加值(初始值为自己设置的，不设置为数组第一项)，currentValue数组循环的当前项。
        return accumulator + currentValue.money;
      }, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [monthGroup, billYear, billMonth]);
  // 选择月份
  const onConfirm = (val) => {
    setBillMonth(dayjs(val).month() + 1);
    setBillYear(dayjs(val).year());
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
              <span className="money">{overview.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{overview.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{overview.total}</span>
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
