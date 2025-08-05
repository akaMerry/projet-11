import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/home.tsx", [
    index("routes/homepage.tsx"),
    route("/places/:id", "routes/place-details.tsx"),
    route("/about", "routes/about.tsx"),
    route("/error", "routes/error.tsx"),
  ]),
] satisfies RouteConfig;
