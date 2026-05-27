import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Homepage from "./components/Homepage";
import ProjectDetail from "./components/ProjectDetail";
import CaseStudyPage from "./components/CaseStudyPage";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Homepage },
      { path: "case-study/:id", Component: CaseStudyPage },
      { path: "project/:projectId", Component: ProjectDetail },
      { path: "*", Component: NotFound },
    ],
  },
]);