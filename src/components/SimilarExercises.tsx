import React from "react";

import { Box, Stack, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";

import Loader from "./Loader";
import { ExerciseType } from "../types/ExerciseType";

export interface ISimilarExercises {
  tartgetMuscleExercises: any[];
  equipmentExercises: any[];
}

const SimilarExercises = (props: ISimilarExercises) => {
  return (
    <Box sx={{ mt: { lg: "100px", xs: "0" } }}>
      <Typography variant="h3" mb={5}>
        Exercises that target the same muscle group
      </Typography>
      <Stack direction="row" sx={{ p: "2", position: "relative" }}>
        {props.tartgetMuscleExercises.length ? (
          <HorizontalScrollbar
            data={props.tartgetMuscleExercises}
            dataNames={[]}
            bodyPart={{} as ExerciseType}
            setBodyPart={(arg) => null}
            isBodyParts={false}
          />
          ) : (
          <Loader />
        )}
      </Stack>

      <Typography variant="h3" mb={5}>
        Exercises that target the same equipment
      </Typography>
      <Stack direction="row" sx={{ p: "2", position: "relative" }}>
        {props.equipmentExercises.length ? (
          <HorizontalScrollbar
            data={props.equipmentExercises}
            dataNames={[]}
            bodyPart={{} as ExerciseType}
            setBodyPart={(arg) => null}
            isBodyParts={false}
          />
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  );
};

export default SimilarExercises;
