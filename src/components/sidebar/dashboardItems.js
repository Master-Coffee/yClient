import {
  Sliders,
} from "react-feather";

const pagesSection = [
  {
    href: "/dashboard",
    icon: Sliders,
    title: "Dashboards",
    badge: "5",
    children: [
      {
        href: "/charts/apexcharts",
        title: "Default",
      },
      {
        href: "/dashboard/analytics",
        title: "Analytics",
      },
    ],
  },
];

const navItems = [
  {
    title: " ",
    pages: pagesSection,
  },

];

export default navItems;
