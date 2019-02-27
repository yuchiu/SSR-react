import LandingPage from "./LandingPage";
import AboutPage from "./AboutPage";
import PopularRepoPage from "./PopularRepoPage";
import { fetchPopularRepos } from "../services/api";

const routes = [
  {
    path: "/",
    exact: true,
    component: LandingPage
  },
  {
    path: "/about",
    exact: true,
    component: AboutPage
  },
  {
    path: "/popular/:id",
    component: PopularRepoPage,
    fetchInitialData: (path = "") => fetchPopularRepos(path.split("/").pop())
  }
];

export default routes;
