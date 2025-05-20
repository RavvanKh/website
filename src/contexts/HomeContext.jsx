"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { getHomeData } from "@/lib/utils/api/home";
import { getComments } from "@/lib/utils/api/comments";
import { courseTypesEnum } from "@/lib/constants/courseTypes";
import { filterByCategory } from "@/lib/utils/helpers/filters/filterByCategory";

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasFetched = useRef(false);

  const [data, setData] = useState({
    instructors: [],
    courses: [],
    categories: [],
    customers:[],
    filteredCourses: [],
    comments: {},
    totalCourses: 0,
    totalInstructors: 0,
  });

  const [loading, setLoading] = useState({
    home: false,
    comments: false,
  });

  const [error, setError] = useState({
    home: null,
    comments: null,
  });

  const [selectedCategoryForExplore, setSelectedCategoryForExplore] = useState(
    {}
  );

  const urlType = searchParams.get("type") || courseTypesEnum.startingSoon;
  const urlCategory =
    searchParams.get("category") || data.categories[0]?.id || "";

  const [filter, setFilter] = useState({
    type: urlType,
    category: urlCategory,
  });

  useEffect(() => {
    setFilter({
      type: urlType,
      category: urlCategory,
    });
  }, [urlType, urlCategory]);

  const updateFilter = useCallback(
    (key, value) => {
      const updatedFilter = { ...filter, [key]: value };

      const params = new URLSearchParams(searchParams.toString());

      if (key === "type") {
        value ? params.set("type", value) : params.delete("type");
      }

      if (key === "category") {
        value ? params.set("category", value) : params.delete("category");
      }

      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });

      setFilter(updatedFilter);
    },
    [filter, pathname, router, searchParams]
  );

  const filteredExploreCourses = useMemo(() => {
    let filtered = [...data.courses];

    filtered = filterByCategory(filtered, selectedCategoryForExplore.id);

    return filtered;
  }, [data.courses, selectedCategoryForExplore.id]);

  const fetchAllData = useCallback(async () => {
    setLoading({ home: true, comments: true });

    const [homeResult, commentsResult] = await Promise.allSettled([
      getHomeData(),
      getComments(),
    ]);

    if (homeResult.status === "fulfilled") {
      const homeData = homeResult.value;
      setData((prevData) => ({
        ...prevData,
        ...homeData,
        totalCourses: homeData.courses?.length || 0,
        totalInstructors: homeData.instructors?.length || 0,
      }));

      if (!filter.category) {
        setFilter((prev) => ({
          ...prev,
          category: homeData.categories[0]?.id || "",
        }));
      }
      setSelectedCategoryForExplore(homeData.categories[0] || {});

      hasFetched.current = true;
      setError((prev) => ({ ...prev, home: null }));
    } else {
      setError((prev) => ({ ...prev, home: homeResult.reason.message }));
    }

    if (commentsResult.status === "fulfilled") {
      setData((prevData) => ({
        ...prevData,
        comments: commentsResult.value,
      }));
      setError((prev) => ({ ...prev, comments: null }));
    } else {
      setError((prev) => ({
        ...prev,
        comments: commentsResult.reason.message,
      }));
    }

    setLoading({ home: false, comments: false });
  }, []);

  const refreshData = useCallback(() => {
    if (hasFetched.current) {
      fetchAllData();
    }
  }, [fetchAllData, hasFetched]);

  const filteredCourses = useMemo(() => {
    if (!data.courses.length) return [];

    const { type, category } = filter;

    let filtered = [...data.courses];

    filtered = filterByCategory(filtered, category);

    return filtered;
  }, [data.courses, filter.type, filter.category]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      filteredCourses,
    }));
  }, [filteredCourses]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      filteredExploreCourses,
    }));
  }, [filteredExploreCourses]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);


  useEffect(() =>{
    
  },[searchParams])
  const contextValue = useMemo(
    () => ({
      data,
      loading,
      error,
      filter,
      updateFilter,
      refreshData,
      fetchAllData,
      filteredExploreCourses,
      setSelectedCategoryForExplore,
      selectedCategoryForExplore,
    }),
    [data, loading, error, filter, updateFilter, refreshData, fetchAllData]
  );

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) throw new Error("useHome must be used within HomeProvider");
  return context;
};
