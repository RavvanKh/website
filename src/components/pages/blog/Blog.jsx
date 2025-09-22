'use client'
import BlogContainer from "@/components/ui/blog/blog-container/BlogContainer";

import { blogs } from "../blogs/Blogs";

const BlogDetail = ({ id }) => {
  const blog = blogs.find((b) => b.id === parseInt(id));

  return (
    <div>
      <BlogContainer blog={blog} />
    </div>
  );
};

export default BlogDetail;
