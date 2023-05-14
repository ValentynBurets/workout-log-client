import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material/";

import { fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard/ExerciseCard";
import { ExerciseType } from "../types/ExerciseType";
import ConnectionConfig from "../assets/jsonData/ConnectionConfig/ConnectionConfig.json"

export interface IExersisesProps {
  setExercises: (arg: ExerciseType[]) => void;
  bodyPart: string;
  exercises: ExerciseType[];
}

export const Exercises = (props: IExersisesProps) => {
  console.log(props.exercises);

  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (props.bodyPart === 'all') {
        exercisesData = await fetchData(ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetAll);
      } else {
        exercisesData = await fetchData(ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetByBodyPart);
      }

      props.setExercises(exercisesData);
    };

    fetchExercisesData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.bodyPart]);

    // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises : ExerciseType[] = props.exercises.slice(indexOfFirstExercise, indexOfLastExercise)

  const paginate = (e: any, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth'})
  }

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h4" mb="46px">
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise: ExerciseType, index: any) => (
          <ExerciseCard key={index} exercise={exercise}/>
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {props.exercises.length > 9 && (
          <Pagination 
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(props.exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};
