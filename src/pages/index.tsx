import React from "react";
import { useRoutes } from "react-router-dom";
import TripPlanner from "../views/TripPlanner";
import PageNotFound from "./pagenotfound";

const Home = () =>
  useRoutes([
    { path: "/", element: <TripPlanner /> },
    { path: "/:routeId", element: <TripPlanner /> },
    { path: "/:routeId/:directionId", element: <TripPlanner /> },
    { path: "/:routeId/:directionId/:placeCode", element: <TripPlanner /> },
    { path: "*", element: <PageNotFound /> },
  ]);
export default Home;
