import React, { useState } from "react";
import { Box } from "@mui/material";
import { HeroBanner } from "../components/HeroBanner/HeroBanner";
import { SearchExercises } from "../components/SearchExercises";
import { Exercises } from "../components/Exercises";
import { ExerciseType } from "../types/ExerciseType";

const Home = () => {
  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const [bodyPart, setBodyPart] = useState<string>("all");

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        exercises={exercises}
      />
    </Box>
  );
};

export default Home;
