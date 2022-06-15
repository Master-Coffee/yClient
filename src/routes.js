import DashboardLayout from "./layouts/Dashboard";
import Blank from "./pages/pages/Blank";
import ApexCharts from "./pages/charts/ApexCharts";


const routes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Blank />,
      }
    ]
  },
  {
    path: "charts",
    element: <DashboardLayout />,
    children: [
      {
        path: "apexcharts",
        element: <ApexCharts />,
      },
    ],
  },


];

export default routes;