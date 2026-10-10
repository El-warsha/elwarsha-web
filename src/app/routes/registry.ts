import { applyRoute } from "@features/apply";
import { assignmentsRoute } from "@features/tasks";
import { cohortsRoute } from "@features/cohorts";
import { faqRoute } from "@features/faq";
import { homeRoute } from "@features/home";
import { initiativeRoute } from "@features/initiative";
import { participationRoute } from "@features/participation";
import { dashboardRoute } from "@features/portal-dashboard";
import { productsRoute } from "@features/products";
import { reviewsRoute } from "@features/reviews";
import { roadmapRoute } from "@features/roadmap";
import { submissionsRoute } from "@features/submissions";

export const publicRoutes = [
  homeRoute,
  initiativeRoute,
  roadmapRoute,
  participationRoute,
  faqRoute,
  applyRoute,
];

export const portalRoutes = [
  dashboardRoute,
  productsRoute,
  cohortsRoute,
  assignmentsRoute,
  submissionsRoute,
  reviewsRoute,
];
