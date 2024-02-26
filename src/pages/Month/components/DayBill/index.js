import classNames from "classnames";
import "./index.scss";

const DailyBill = ({ dayList }) => {
  if (dayList) {
    console.log(dayList);
    const items = Object.keys(dayList).map((item) => {
      return (
        <div className={classNames("dailyBill")} key={item}>
          <div className="header">
            <div className="dateIcon">
              <span className="date">{item}</span>
              <span className={classNames("arrow")}></span>
            </div>
            {dayList[item].map((item) => {
              return (
                <div className="oneLineOverview" key={item.id}>
                  <div className="pay">
                    <span className="type">支出</span>
                    <span className="money">{100}</span>
                  </div>
                  <div className="income">
                    <span className="type">收入</span>
                    <span className="money">{200}</span>
                  </div>
                  <div className="balance">
                    <span className="money">{100}</span>
                    <span className="type">结余</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
    return <div>{items}</div>;
  }
};
export default DailyBill;
