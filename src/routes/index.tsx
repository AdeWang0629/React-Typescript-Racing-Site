import async from "../components/Async";
import { IRoute } from "../types/RouteType";

const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));

const HomePage = async(()=>import("../pages/HomePage"));
const RankingPage = async(()=>import("../pages/RankingPage"));
const ExpectedBattlePage = async(()=>import("../pages/ExpectedBattlePage"));
const TrainingGamePage = async(()=>import("../pages/TrainingGamePage"));
const RaceManagementPage = async(()=>import("../pages/RaceManagementPage"));
const GradeManagementPage = async(()=>import("../pages/GradeManagementPage"));
const UserInformationPage = async(()=>import("../pages/UserInformationPage"));

export const routes: Array<IRoute> = [


  //------------------User Management------------------
  {
    key: "home-page-route",
    title: "ホームページ",
    path: "/",
    enabled: true,
    permission: 0,
    component: HomePage,
  },
  {
    key: "ranking-page-route",
    title: "ランキングページ",
    path: "/ranking",
    enabled: true,
    permission: 0,
    component: RankingPage,
  },
  {
    key: "expected-battle-page-route",
    title: "予想バトルページ",
    path: "/expected-battle",
    enabled: true,
    permission: 0,
    component: ExpectedBattlePage,
  },
  {
    key: "training-game-page-route",
    title: "育成ゲームページ",
    path: "/training-game",
    enabled: true,
    permission: 0,
    component: TrainingGamePage,
  },
  {
    key: "race-management-page-route",
    title: "レース管理ページ",
    path: "/race-management",
    enabled: true,
    permission: 1,
    component: RaceManagementPage,
  },
  {
    key: "grade-management-page-route",
    title: "成績管理ページ",
    path: "/grade-management",
    enabled: true,
    permission: 2,
    component: GradeManagementPage,
  },
  {
    key: "user-information-page-route",
    title: "ユーザー情報ページ",
    path: "/user-information",
    enabled: true,
    permission: 2,
    component: UserInformationPage,
  },
];

export const authRoutes: Array<IRoute> = [
  //-------------Security Authentication-------------
  {
    key: "signin-route",
    title: "SignIn",
    path: "/signin",
    enabled: true,
    component: SignIn,
  },
  {
      key: 'signup-route',
      title: 'SignUp',
      path: '/signup',
      enabled: true,
      component: SignUp
  },
  // {
  //   key: "forgetpassword-route",
  //   title: "ForgetPassword",
  //   path: "auth/forgetpassword",
  //   enabled: true,
  //   component: ForgetPassword,
  // },
  // {
  //   key: "page404-route",
  //   title: "Page404",
  //   path: "*",
  //   enabled: true,
  //   component: Page404,
  // },
];
