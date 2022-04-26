import Team from "views/pages/Team.js";
import UfcTeams from "views/pages/ufc/ufcTeams";
import Teams from "views/pages/Teams";
import Events from "views/pages/Events.js";
import Sales from "views/pages/Sales.js";
import Wallet from "views/pages/Wallet.js";
import Stake from "views/pages/Stake.js";
import Calculator from "views/pages/Calculator.js";
import Rewards from "views/pages/Rewards";
import Predict from "views/pages/Predict";

const routes = [
  {
    icon: "tim-icons icon-trophy",
    path: "/events",
    name: "Events",
    rtlMini: "E",
    rtlName: "Events",
    mini: "E",
    component: Sales,
    layout: "/",
  },
  {
    icon: "tim-icons icon-trophy",
    path: "/prediction",
    name: "How to Predict",
    rtlMini: "P",
    rtlName: "Predict",
    mini: "P",
    component: Predict,
    layout: "/",
  },

  // {
  //   icon: "tim-icons icon-bag-16",
  //   path: "/sales",
  //   name: "Sales",
  //   rtlName: "Sales",
  //   rtlMini: "S",
  //   component: Sales,
  //   layout: "/",
  // },

  {
    icon: "tim-icons icon-wallet-43",
    path: "/wallet",
    name: "Wallet",
    rtlName: "Wallet",
    mini: "W",
    rtlMini: "W",
    component: Wallet,
    layout: "/",
  },
  {
    icon: "tim-icons icon-money-coins",
    path: "/stake",
    name: "Stake",
    rtlName: "Stake",
    mini: "S",
    rtlMini: "S",
    component: Stake,
    layout: "/",
  },
  {
    icon: "tim-icons icon-coins",
    path: "/calculator",
    name: "Prize Calculator",
    rtlName: "Prize Calculator",
    mini: "P",
    rtlMini: "P",
    component: Calculator,
    layout: "/",
  },
  {
    icon: "tim-icons icon-gift-2",
    path: "/reward",
    name: "Reward",
    rtlName: "Reward",
    mini: "R",
    rtlMini: "R",
    component: Rewards,
    layout: "/",
  },
  {
    // icon: "tim-icons icon-image-02",
    path: "/team/:id",
    // name: "Team",

    component: Team,
    layout: "/",
  },
  {
    // icon: "tim-icons icon-image-02",
    path: "/teams/:id",
    component: Teams,
    layout: "/",
  },
  {
    // icon: "tim-icons icon-image-02",
    path: "/ufc/teams/:id",
    component: UfcTeams,
    layout: "/",
  },
  {
    // icon: "tim-icons icon-trophy",
    path: "/",

    component: Sales,
    layout: "/",
  },
];

export default routes;
