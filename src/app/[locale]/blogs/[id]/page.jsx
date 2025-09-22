import BlogDetail from "@/components/pages/blog/Blog";
import { notFound } from "next/navigation";

const BlogDetailPage = async ({ params }) => {
  const { id } = await params;
  // return <BlogDetail id={id} />;
  return notFound()
};

export default BlogDetailPage;
