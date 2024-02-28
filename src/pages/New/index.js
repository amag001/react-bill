import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "../Month/components/Icon/index";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/contants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addBill } from "@store/modules/billStore";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
const New = () => {
  const navigate = useNavigate();
  const [payType, setPayType] = useState("pay"); // 支出or收入
  const [money, setMoney] = useState(0);
  const [useFor, setUseFor] = useState(""); // 账单类型
  const [dateVisible, setDateVisible] = useState(false);
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  // 保存
  const saveBill = () => {
    // 收集表单数据 类型，金额，时间，事件
    const query = {
      type: payType,
      money: payType === "pay" ? -money : +money,
      date: date,
      useFor,
    };
    console.log(query);
    dispatch(addBill(query));
  };
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            onClick={() => {
              setPayType("pay");
            }}
            className={classNames(payType === "pay" && "selected")}
          >
            支出
          </Button>
          <Button
            className={classNames(payType === "income" && "selected")}
            onClick={() => {
              setPayType("income");
            }}
            shape="rounded"
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span
                className="text"
                onClick={() => {
                  setDateVisible(true);
                }}
              >
                {dayjs(date).format("YYYY-MM-DD")}
              </span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={(value) => {
                  setDateVisible(false);
                  setDate(value);
                }}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={(val) => {
                  setMoney(val);
                }}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[payType].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        setUseFor(item.type);
                      }}
                      className={classNames(
                        "item",
                        useFor === item.type && "selected"
                      )}
                      key={item.type}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;
