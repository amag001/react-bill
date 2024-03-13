import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
// import Layout from "@pages/Layout/index";
// import New from "../pages/New";
// import Month from "../pages/Month";
// import Year from "../pages/Year";

// 路由懒加载
/**
 * 1，使用lazy函数对组件进行导入
 * 2，对组件使用Suspense包裹,fallback属性为组件未加载出来的展示。
 */
const Layout = lazy(() => import("@pages/Layout/index"));
const New = lazy(() => import("@pages/New"));
const Month = lazy(() => import("@pages/Month"));
const Year = lazy(() => import("@pages/Year"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={"Loading..."}>
        <Layout></Layout>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Month></Month>
          </Suspense>
        ),
      },
      {
        path: "/month",
        element: (
          <Suspense>
            <Month></Month>
          </Suspense>
        ),
      },
      {
        path: "/year",
        element: (
          <Suspense>
            <Year></Year>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/new",
    element: <New></New>,
  },
]);
export default router;
