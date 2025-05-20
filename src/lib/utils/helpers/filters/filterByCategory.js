export const filterByCategory = (courses, category) => {
  if (!category) return courses;
  return courses.filter((course) =>
    course.tags?.some((tag) => tag.includes(`category:${category}`))
  );
};