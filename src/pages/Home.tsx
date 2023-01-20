import React, { useState } from "react";
import { Box } from "@mui/material";
import { HeroBanner } from "../components/HeroBanner/HeroBanner";
import { SearchExercises } from "../components/SearchExercises";
import { Exersises } from "../components/Exersises";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exersises
        setExercises={setExercises}
        bodyPart={bodyPart}
        exercises={exercises}
      />
    </Box>
  );
};

export default Home;
