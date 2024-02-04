import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList(state, actions) {
      state.billList = actions.payload;
    },
  },
});

// 结构出actions函数
const { setBillList } = billStore.actions;

// 编写异步函数
const getBillList = () => {
  return async (dispatch) => {
    let res = await axios.get("http://localhost:8888/ka");
    dispatch(setBillList(res.data));
  };
};

// 导出这个store（reducer）用于index.js组合用
const billReducer = billStore.reducer;
export { setBillList, getBillList };
export default billReducer;
