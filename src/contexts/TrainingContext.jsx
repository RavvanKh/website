"use client";

import { getGraduates } from "@/lib/utils/api/graduates";
import { getTrainingData } from "@/lib/utils/api/training";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";

const TrainingContext = createContext();

export const TrainingProvider = ({ children, trainingKey }) => {
  const [training, setTraining] = useState({
    advantages: [],
    description: "",
    durationInWeeks: 0,
    faq: [],
    graduatesWorkplaces: [],
    graduates:[],
    hoursPerSession: 0,
    icon: null,
    id: "",
    instructors: [],
    level: "",
    name: "",
    searchKeys: [],
    sessionsPerWeek: 0,
    syllabus: [],
    tags: [],
    upcomingSessions: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTraining = useCallback(async () => {
    setLoading(true);
    const [trainingResult,graduatesResult] = await Promise.allSettled([
      getTrainingData(trainingKey),
      getGraduates(trainingKey, 0, 100),
    ]);
    if (trainingResult.status === "fulfilled") {
      setTraining(trainingResult.value);
    } else {
      setError(trainingResult.reason);
    }
    
    if(graduatesResult.status === "fulfilled") {
      setTraining((prevTraining) => ({
        ...prevTraining,
        graduates: graduatesResult.value.content,
      }));
    }
    else {
      setError(graduatesResult.reason);
    }
    setLoading(false);
  }, [trainingKey]);

  useEffect(() => {
    fetchTraining();
  }, [fetchTraining, trainingKey]);

  return (
    <TrainingContext.Provider value={{ training, loading, error }}>
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error("useTraining must be used within a TrainingProvider");
  }
  return context;
};
