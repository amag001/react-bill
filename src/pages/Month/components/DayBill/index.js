import classNames from "classnames";
import "./index.scss";
import { useEffect, useState } from "react";
import Icon from "../Icon/index";
const DailyBill = ({ dayList }) => {
  const [arrowState, setArrowState] = useState([]);
  useEffect(() => {
    setArrowState([]);
  }, [dayList]);
  if (dayList) {
    console.log(dayList);
    const items = Object.keys(dayList).map((item, index) => {
      return (
        <div className={classNames("dailyBill")} key={item}>
          <div className="header">
            <div
              className="dateIcon"
              onClick={() => {
                if (arrowState.includes(index)) {
                  setArrowState(arrowState.filter((item) => item != index));
                } else {
                  setArrowState([...arrowState, index]);
                }
              }}
            >
              <span className="date">{item}</span>
              <span
                className={classNames(
                  "arrow",
                  arrowState.includes(index) && "expand"
                )}
              ></span>
            </div>

            <div className="oneLineOverview" key={item.id}>
              <div className="pay">
                <span className="type">支出</span>
                <span className="money">
                  {dayList[item]
                    .filter((item) => item.type === "pay")
                    .reduce((accumulator, currentValue) => {
                      // accumulator累加值(初始值为自己设置的，不设置为数组第一项)，currentValue数组循环的当前项。
                      return accumulator + currentValue.money;
                    }, 0)}
                </span>
              </div>
              <div className="income">
                <span className="type">收入</span>
                <span className="money">
                  {dayList[item]
                    .filter((item) => item.type === "income")
                    .reduce((accumulator, currentValue) => {
                      // accumulator累加值(初始值为自己设置的，不设置为数组第一项)，currentValue数组循环的当前项。
                      return accumulator + currentValue.money;
                    }, 0)}
                </span>
              </div>
              <div className="balance">
                <span className="money">
                  {dayList[item].reduce((accumulator, currentValue) => {
                    // accumulator累加值(初始值为自己设置的，不设置为数组第一项)，currentValue数组循环的当前项。
                    return accumulator + currentValue.money;
                  }, 0)}
                </span>
                <span className="type">结余</span>
              </div>
            </div>
          </div>
          {arrowState.includes(index) && (
            <div className="billList">
              {dayList[item].map((item) => {
                return (
                  <div className="bill" key={item.id}>
                    <Icon type={item.useFor}></Icon>
                    <div className="detail">
                      <div className="billType">{item.useFor}</div>
                    </div>
                    <div className={classNames("money", item.type)}>
                      {item.money.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    });
    return <div>{items}</div>;
  }
};
export default DailyBill;
