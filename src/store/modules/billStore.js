import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    // 设置账单数据
    setBillList(state, actions) {
      state.billList = actions.payload;
    },
    // 添加账单数据
    addBillList(state, actions) {
      state.billList.push(actions.payload);
    },
  },
});

// 结构出actions
const { setBillList, addBillList } = billStore.actions;
console.log(setBillList());
// setBillList() 为{type: 'bill/setBillList', payload: 'xxx'}这种模板，供dispatch触发用。
// 编写异步函数
const getBillList = () => {
  return async (dispatch) => {
    let res = await axios.get("http://localhost:8888/ka");
    dispatch(setBillList(res.data));
  };
};
// 添加账单列表
const addBill = (data) => {
  return async (dispatch) => {
    try {
      let res = await axios.post("http://localhost:8888/ka", data);
      console.log(res);
      dispatch(addBillList(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};
// 导出这个store（reducer）用于index.js组合用
const billReducer = billStore.reducer;
export { setBillList, getBillList, addBill };
export default billReducer;
