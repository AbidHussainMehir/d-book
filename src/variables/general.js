import eventDota2 from "../assets/img/app/eventDota2.jpg";
import csgoi from "../assets/img/app/csgo.png";
import nbaeast1 from "../assets/img/app/nbaeast.png";
import nbawest1 from "../assets/img/app/nbawest.png";
import T20Logo from "../assets/img/app/t20.png";
import ufc267 from "../assets/img/app/ufc267.png";
import f1 from "../assets/img/f1/f1.jpeg";
import { nbaEAST } from "./nbaEAST";
import { t10 } from "./t10data";
import { ashes } from "./ashesh";
import { nbawest } from "./nbawest";
import { csgo } from "./csgo";
import ashes1 from "../assets/img/futureEvents/ashes.png";
import nations from "../assets/img/app/6nations.jpg";
import MLBImg from "../assets/img/app/MLB.png";
import MarchMadness from "../assets/img/app/MarchMadness.jpg";
import aflImg from "../assets/img/afl/afl.png";
import NFLPlayoffs from "../assets/img/futureEvents/NFLPlayoffs.jpg";
import AustraliaOpen from "../assets/img/futureEvents/AustraliaOpen.jpg";
import UEFAChampionsLeague from "../assets/img/futureEvents/UEFAChampionsLeague.png";
import { ucl } from "./ucl";
import { t20 } from "./t20";
import { nation } from "./6nations";
import { f11 } from "./f1";
import { nfl } from "./nflPlayoff";
import { ausOpen } from "./ausOpen";
import { f1Bahrain } from "./f1Bahrain";
import { afl } from "./afl";
import { afl2 } from "./afl2";
import { mmTeams } from "./MarchMadnesTeams";
import { blachowicz_VS_Teixeira } from "./ufc/Blachowicz_VS_Teixeira";
import { ufc2671 } from "./ufc/ufc267";
import { mlb2022 } from './mlb2022'
var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = today.getDate();

const events = [
  {
    id: 1,
    title: "English Premier League",
    allDay: true,
    start: new Date(y, m, 1),
    end: new Date(y, m, 1),
  },
  {
    id: 2,
    title: "Demo",
    allDay: true,
    start: new Date(y, m, 1),
    end: new Date(y, m, 1),
  },
];
const eventsPastTeams = [...t20, ...t10, ...ashes];
const eventsPast = [
  {
    id: 3,
    title: "The International 10 (Dota2)",
    code: "TI10",
    allDay: true,
    start: new Date(y, m, 1),
    end: new Date(y, m, 1),
    img: eventDota2,
    sports: "esports",
  },
  {
    id: 6,
    title: "ICC T20 World Cup",
    allDay: true,
    code: "T20",
    start: new Date(y, m, 1),
    end: new Date(y, m, 1),
    img: T20Logo,
    icon: "img",
    redirect: "sale",
    sports: "cricket",
  },
  {
    id: 92,
    title: "F1 Final",
    sports: "esports",
    img: f1,
    code: "F1Final",
  },
  {
    id: 91,
    title: "The Ashes",
    sports: "cricket",
    img: ashes1,
    code: "Ashes",
  },
  {
    id: 93,
    title: "NFL Playoffs - Super Bowl",
    sports: "rugby",
    //rugby
    img: NFLPlayoffs,
    code: "NFLPlayoffs",
  },
  {
    id: 61,
    title: "6 Nations ",
    sports: "rugby",
    //rugby
    img: nations,
    code: "6nations",
  },
];
const eventTeams = [
  {
    id: 1,
    pId: 1,
    title: "Manchester United",
    allDay: true,
    start: new Date(y, m, 1),
    end: new Date(y, m, 1),
  },
  {
    id: 2,
    pId: 1,
    title: "Manchester City",
    start: new Date(y, m, d - 1, 10, 30),
    end: new Date(y, m, d - 1, 11, 30),
    allDay: false,
    color: "green",
  },
  {
    id: 3,
    pId: 1,
    title: "Tottenham Hotspurs",
    start: new Date(y, m, d + 7, 12, 0),
    end: new Date(y, m, d + 7, 14, 0),
    allDay: false,
    color: "red",
  },
  {
    id: 4,
    title: "Liverpool FC",
    start: new Date(y, m, d - 2),
    end: new Date(y, m, d - 2),
    allDay: true,
    color: "azure",
    pId: 1,
  },
  {
    id: 5,
    title: "Chelsea FC",
    start: new Date(y, m, d - 2),
    end: new Date(y, m, d - 2),
    allDay: true,
    pId: 1,
    color: "azure",
  },
  {
    id: 6,
    title: "Demo",
    start: new Date(y, m, d - 2),
    end: new Date(y, m, d - 2),
    allDay: true,
    pId: 2,
    color: "azure",
  },
];

const sellTeams = [
  ...nbaEAST,
  ...nbawest,
  ...nfl,
  ...afl,
  // ...csgo,
  //  ...blachowicz_VS_Teixeira,
  ...t20,
  //  ...ufc2671,
  ...ucl,
  ...t10,
  ...ashes,
  ...f11,
  ...ausOpen,
  ...mlb2022,
  ...nation,
  ...f1Bahrain,
  ...afl2,
  

  ...mmTeams,
];
//latest event is 1005
const sells = [
  {
    id: 1005,
    title: "Major League Baseball",
    sports: "esports",
    img: MLBImg,
    code: "MLB2022",
  },
  {
    id: 1004,
    title: "AFL Live 2022",
    sports: "esports",
    img: aflImg,
    code: "AFLLive2022",
  },
  {
    id: 1003,
    title: "March Madness",
    sports: "basketball",
    img: MarchMadness,
    code: "MarchMadness",
  },

  // {
  //   id: 61,
  //   title: "6 Nations ",
  //   sports: "rugby",
  //   //rugby
  //   img: nations,
  //   code: "6nations",
  // },

  // {
  //   id: 902,
  //   title: "Australian Open",
  //   sports: "tennis",
  //   img: AustraliaOpen,
  //   code: "AusOpen",
  // },
  {
    id: 99,
    title: "UEFA Champions League",
    sports: "football",
    img: UEFAChampionsLeague,
    code: "UCL2022",
  },
  {
    id: 1001,
    title: "F1 - Bahrain",
    sports: "esports",
    img: f1,
    code: "Bahrain",
  },
  {
    id: 1002,
    title: "AFL",
    sports: "esports",
    img: aflImg,
    code: "AFL2022",
  },
  // {
  //   id: 92,
  //   title: "F1 Final",
  //   sports: "esports",
  //   img: f1,
  //   code: "F1Final",
  // },
  // {
  //   id: 1,
  //   title: "NBA Eastern Conference",
  //   allDay: true,
  //   code: "NBAEAST",
  //   start: new Date(y, m, 2),
  //   end: new Date(y, m, 4),
  //   img: nbaeast1,
  //   icon: "img",
  //   redirect: "sale",
  //   sports: "basketball",
  // },
  // {
  //   id: 2,
  //   title: "NBA Western Conference",
  //   allDay: true,
  //   code: "NBAWEST",
  //   start: new Date(y, m, 10),
  //   end: new Date(y, m, 20),
  //   img: nbawest1,
  //   icon: "img",
  //   redirect: "sale",
  //   sports: "basketball",
  // },
  // {
  //   id: 4,
  //   title: "CSGO Major - Stockholm 2021",
  //   allDay: true,
  //   code: "CSGOMajor",
  //   start: new Date(y, m, 1),
  //   end: new Date(y, m, 1),
  //   img: csgoi,
  //   icon: "img",
  //   redirect:"sale"

  // },
  // {
  //   id: 5,
  //   title: "Blachowicz VS. Teixeira",
  //   allDay: true,
  //   code: "Blachowicz_VS_Teixeira",
  //   start: new Date(y, m, 1),
  //   end: new Date(y, m, 1),
  //   img: ufc267,
  //   icon: "svg",
  //   redirect:"ufc"
  // },
  // {
  //   id: 2,
  //   title: "Demo",
  //   allDay: true,
  //   start: new Date(y, m, 1),
  //   end: new Date(y, m, 1),
  // },
  // {
  //   id: 3,
  //   title: "The International 10 (Dota2)",
  //   code: "TI10",
  //   allDay: true,
  //   start: new Date(y, m, 1),
  //   end: new Date(y, m, 1),
  //   img: eventDota2,
  // },
  // {
  //   id: 6,
  //   title: "ICC T20 World Cup",
  //   allDay: true,
  //   code: "T20",
  //   start: new Date(y, m, 1),
  //   end: new Date(y, m, 1),
  //   img: T20Logo,
  //   icon: "img",
  //   redirect: "sale",
  //   sports: "cricket",
  // },
  //   {
  //   id: 7,
  //   title: "UFC 267",
  //   allDay: true,
  //   code: "UFC267",
  //   start: new Date(y, m, 1),
  //   end: new Date(y, m, 1),
  //   img: ufc267,
  //   icon: "img",
  //   redirect:"sale"
  // },
];

const rewardList = [
  // {
  //   id: 3,
  //   title: "The International 10 (Dota2)",
  //   code: "TI10",
  //   allDay: true,
  //   start: new Date(y, m, 1),
  //   end: new Date(y, m, 1),
  //   img: eventDota2,
  //   sports: "esports",
  // },
  // {
  //   id: 6,
  //   title: "ICC T20 World Cup",
  //   allDay: true,
  //   code: "T20",
  //   start: new Date(y, m, 1),
  //   end: new Date(y, m, 1),
  //   img: T20Logo,
  //   icon: "img",
  //   redirect: "sale",
  //   sports: "cricket",
  // },
  // {
  //   id: 92,
  //   title: "F1 Final",
  //   sports: "esports",
  //   img: f1,
  //   code: "F1Final",
  // },
  // {
  //   id: 91,
  //   title: "The Ashes",
  //   sports: "cricket",
  //   img: ashes1,
  //   code: "Ashes",
  // },

  {
    id: 93,
    title: "NFL Playoffs - Super Bowl",
    sports: "rugby",
    //rugby
    img: NFLPlayoffs,
    code: "NFLPlayoffs",
  },
  {
      id: 61,
      title: "6 Nations ",
      sports: "rugby",
      //rugby
      img: nations,
      code: "6nations",
    },
];

export {
  rewardList,
  events,
  eventsPastTeams,
  eventsPast,
  sells,
  eventTeams,
  sellTeams,
};
