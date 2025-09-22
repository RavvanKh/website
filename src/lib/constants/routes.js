export const routes = {
  home: "/",
  instructors: "/instructors",
  about: "/about",
  career: "/career",
  trainings: "/trainings",
  scholarships: "/scholarships",
  pdf: "/pdf",
  trainingApplication: "/training-application",
  certificatePreview: "/preview",
  blogs: "/blogs",
  events:process.env.NEXT_PUBLIC_EVENT_BASE_URL
};

export const hiddenHeaderAndFooter = [routes.pdf, routes.certificatePreview];
