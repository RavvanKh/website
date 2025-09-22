"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { useGlobalData } from "@/contexts/GlobalDataContext";
import { filterOptions } from "@/lib/constants/filterOptions";

import GlobalDataWrapper from "@/components/shared/global-data-wrapper/GlobalDataWrapper";

const Filters = dynamic(
  () => import("@/components/ui/trainings/filters/Filters"),
  { ssr: false, loading: () => null }
);

const BlogList = dynamic(
  () => import("@/components/shared/blog-list/BlogList"),
  { ssr: false, loading: () => null }
);

import styles from "./blogs.module.css";

export const blogs = [
  {
    id: 1,
    title: "Getting Started with Next.js 15",
    description:
      "Learn the fundamentals of building modern web apps with Next.js.",
    author: "Jane Doe",
    date: "2025-09-01",
    categories: [
      { id: "database-administration", name: "Database Administration" },
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>Introduction</h2>
      <p>Next.js 15 brings powerful new features like server actions, improved routing, and faster build times. This guide walks you through getting started.</p>
      <img src="https://nextjs.org/static/twitter-cards/home.jpg" alt="Next.js" width="100%"/>
      <h3>Key Features</h3>
      <ul>
        <li>Server Actions</li>
        <li>Improved Caching</li>
        <li>Enhanced Routing</li>
      </ul>
    `,
  },
  {
    id: 2,
    title: "Mastering React Performance",
    description: "Tips and tricks to optimize your React apps for speed.",
    author: "John Smith",
    date: "2025-08-20",
    categories: [{ id: "for-kids", name: "For Kids" }],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>Why Performance Matters</h2>
      <p>Users expect apps to be fast. Optimizing your React app ensures better UX and SEO rankings.</p>
      <h3>Optimization Tips</h3>
      <ul>
        <li>Use React.memo</li>
        <li>Lazy load components</li>
        <li>Minimize re-renders</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: "Understanding Docker for Developers",
    description: "A beginner-friendly guide to containerization with Docker.",
    author: "Emily Johnson",
    date: "2025-07-15",
    categories: [{ id: "it-business-analysis", name: "IT Business Analyst" }],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>What is Docker?</h2>
      <p>Docker allows developers to package applications into containers—standardized units of software that include everything needed to run.</p>
      <h3>Benefits</h3>
      <ul>
        <li>Consistency across environments</li>
        <li>Scalability</li>
        <li>Isolation</li>
      </ul>
    `,
  },
  {
    id: 4,
    title: "GraphQL vs REST: Which Should You Choose?",
    description: "Compare GraphQL and REST APIs with practical use cases.",
    author: "Michael Lee",
    date: "2025-07-10",
    categories: [{ id: "it-business-analysis", name: "IT Business Analyst" }],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>Introduction</h2>
      <p>Both GraphQL and REST are widely used API architectures. Choosing between them depends on your project needs.</p>
      <h3>GraphQL Advantages</h3>
      <ul>
        <li>Single endpoint</li>
        <li>Efficient data fetching</li>
      </ul>
      <h3>REST Advantages</h3>
      <ul>
        <li>Simple and well-established</li>
        <li>Cache-friendly</li>
      </ul>
    `,
  },
  {
    id: 5,
    title: "TypeScript Best Practices",
    description: "How to write clean, scalable, and safe TypeScript code.",
    author: "Sarah Connor",
    date: "2025-06-25",
    categories: [
      { id: "database-administration", name: "Database Administration" },
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>Introduction</h2>
      <p>TypeScript enhances JavaScript with static typing. Following best practices ensures code quality and scalability.</p>
      <h3>Tips</h3>
      <ul>
        <li>Always use strict mode</li>
        <li>Prefer interfaces over types for contracts</li>
        <li>Use generics wisely</li>
      </ul>
    `,
  },
  {
    id: 6,
    title: "Demystifying Kubernetes",
    description: "Understand how Kubernetes orchestrates containers at scale.",
    author: "Daniel Kim",
    date: "2025-06-01",
    categories: [
      { id: "database-administration", name: "Database Administration" },
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>What is Kubernetes?</h2>
      <p>Kubernetes (K8s) is an open-source system for automating deployment, scaling, and management of containerized apps.</p>
      <h3>Core Concepts</h3>
      <ul>
        <li>Pods</li>
        <li>Services</li>
        <li>Deployments</li>
      </ul>
    `,
  },
  {
    id: 7,
    title: "Serverless with AWS Lambda",
    description: "Build and deploy serverless apps using AWS Lambda functions.",
    author: "Laura Chen",
    date: "2025-05-18",
    categories: [{ id: "for-kids", name: "For Kids" }],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>Introduction</h2>
      <p>AWS Lambda lets you run code without provisioning servers. It’s event-driven and scales automatically.</p>
      <h3>Use Cases</h3>
      <ul>
        <li>API backends</li>
        <li>Data processing</li>
        <li>Scheduled tasks</li>
      </ul>
    `,
  },
  {
    id: 8,
    title: "Top 10 VS Code Extensions for Developers",
    description:
      "Boost your productivity with these essential VS Code plugins.",
    author: "Alex Brown",
    date: "2025-05-05",
    categories: [
      { id: "database-administration", name: "Database Administration" },
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>Must-Have Extensions</h2>
      <ul>
        <li>ESLint</li>
        <li>Prettier</li>
        <li>GitLens</li>
        <li>Path Intellisense</li>
      </ul>
    `,
  },
  {
    id: 9,
    title: "CI/CD Explained",
    description: "A beginner’s guide to continuous integration and delivery.",
    author: "Nina Patel",
    date: "2025-04-22",
    categories: [
      { id: "database-administration", name: "Database Administration" },
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>What is CI/CD?</h2>
      <p>Continuous Integration and Continuous Delivery streamline software releases.</p>
      <h3>Benefits</h3>
      <ul>
        <li>Faster releases</li>
        <li>Automated testing</li>
        <li>Improved collaboration</li>
      </ul>
    `,
  },
  {
    id: 10,
    title: "Authentication in Next.js",
    description:
      "Different strategies for implementing secure auth in Next.js apps.",
    author: "David Clark",
    date: "2025-04-12",
    categories: [
      { id: "database-administration", name: "Database Administration" },
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>Approaches</h2>
      <p>Next.js supports multiple auth strategies, including JWT, OAuth, and third-party providers.</p>
      <ul>
        <li>NextAuth.js</li>
        <li>Custom JWT</li>
        <li>Auth0 integration</li>
      </ul>
    `,
  },
  {
    id: 11,
    title: "Intro to Microservices Architecture",
    description:
      "Learn the basics of designing scalable microservices systems.",
    author: "Olivia Garcia",
    date: "2025-03-30",
    categories: [{ id: "it-business-analysis", name: "IT Business Analyst" }],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>What are Microservices?</h2>
      <p>Microservices architecture breaks apps into small, independent services.</p>
      <h3>Advantages</h3>
      <ul>
        <li>Scalability</li>
        <li>Independent deployments</li>
        <li>Resilience</li>
      </ul>
    `,
  },
  {
    id: 12,
    title: "Building a Design System in React",
    description: "Step-by-step guide to creating a reusable design system.",
    author: "Chris Martin",
    date: "2025-03-12",
    categories: [{ id: "for-kids", name: "For Kids" }],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>Why a Design System?</h2>
      <p>A design system ensures consistency across apps and speeds up development.</p>
      <h3>Steps</h3>
      <ul>
        <li>Define tokens (colors, typography)</li>
        <li>Build components</li>
        <li>Document usage</li>
      </ul>
    `,
  },
  {
    id: 13,
    title: "AI in Web Development",
    description:
      "How artificial intelligence is shaping the future of web apps.",
    author: "Sophia Wilson",
    date: "2025-02-28",
    categories: [{ id: "it-business-analysis", name: "IT Business Analyst" }],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>AI in Practice</h2>
      <p>From chatbots to code generation, AI is transforming how developers build apps.</p>
      <h3>Examples</h3>
      <ul>
        <li>Code completion (Copilot)</li>
        <li>Chatbots</li>
        <li>Image generation</li>
      </ul>
    `,
  },
  {
    id: 14,
    title: "SEO Tips for Next.js Websites",
    description: "Optimize your Next.js website for better search rankings.",
    author: "Mark Evans",
    date: "2025-02-10",
    categories: [{ id: "for-kids", name: "For Kids" }],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>SEO Basics</h2>
      <p>SEO is essential for visibility. Next.js makes it easier with SSR and metadata control.</p>
      <h3>Tips</h3>
      <ul>
        <li>Use metadata with next/head</li>
        <li>Generate sitemaps</li>
        <li>Optimize images</li>
      </ul>
    `,
  },
  {
    id: 15,
    title: "State Management: Redux vs Context API",
    description: "Compare Redux and Context API for state management in React.",
    author: "Hannah White",
    date: "2025-01-22",
    categories: [{ id: "it-business-analysis", name: "IT Business Analyst" }],
    image:
      "https://firebasestorage.googleapis.com/v0/b/ingress-group.appspot.com/o/26fdbab1-3274-4475-8a3d-9c5fc9be5173.jpeg?alt=media",
    content: `
      <h2>Redux vs Context API</h2>
      <p>Both Redux and Context API are popular choices. Redux offers more control, while Context API is simpler.</p>
      <h3>When to Use?</h3>
      <ul>
        <li>Redux: Large, complex apps</li>
        <li>Context API: Small to medium apps</li>
      </ul>
    `,
  },
];

const Blogs = () => {
  const {
    data: { categories },
    loading,
    error,
  } = useGlobalData();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(
    filterOptions.filter((f) => f.key === "category")
  );

  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const useUrlParams = (searchParams) => {
    return useMemo(() => ({
      category: searchParams.getAll("category") || [],
    }));
  };

  const urlParams = useUrlParams(searchParams);

  const [filter, setFilter] = useState({ category: urlParams.category });

  const updateFilter = (_, value) => {
    const updatedFilter = { category: value };

    const params = new URLSearchParams();

    if (
      Array.isArray(updatedFilter.category) &&
      updatedFilter.category.length > 0
    ) {
      updatedFilter.category.forEach((val) => {
        params.append("category", val);
      });
    }

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.push(newUrl, { scroll: false });
    setFilter(updatedFilter);
  };

  useEffect(() => {
    const filteredData = blogs.filter((blog) => {
      const matchesCategory =
        filter.category.length === 0 ||
        filter.category.some((category) =>
          blog.categories.some((c) => c?.id === category)
        );

      return matchesCategory;
    });

    setFilteredBlogs(filteredData);
  }, [filter.category]);

  useEffect(() => {
    setFilters([
      {
        key: "category",
        options: categories.map((category) => ({
          id: category.id,
          key: category.name,
        })),
      },
    ]);
  }, [categories]);

  return (
    <GlobalDataWrapper error={error?.home} loading={loading?.home}>
      <section className={styles.blogs}>
        <Filters
          label="allBlogs"
          loading={false}
          activeFilter={filter}
          filters={filters}
          trainings={filteredBlogs}
          onClick={updateFilter}
        />
        <BlogList blogs={filteredBlogs} />
      </section>
    </GlobalDataWrapper>
  );
};

export default Blogs;
