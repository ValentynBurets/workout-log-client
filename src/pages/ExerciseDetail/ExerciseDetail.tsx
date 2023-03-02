import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { fetchData } from "../../utils/fetchData";
import Detail from "../../components/Detail";
import ExerciseVideos from "../../components/ExerciseVideos";
import SimilarExercises from "../../components/SimilarExercises";

import ConnectionConfig from "../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { ExerciseType } from "../../types/ExerciseType";
import { ExerciseVideoType } from "../../types/ExerciseVideoType";

const ExerciseDetail = () => {
  const exerciseTypeInitialState = {
    id: "",
    gifUrl: "",
    bodyPart: "",
    target: "",
    name: "",
    equipment: "",
  };

  const [exerciseDetail, setExerciseDetail] = useState<ExerciseType>(
    exerciseTypeInitialState
  );
  const [exerciseVideos, setExerciseVideos] = useState<ExerciseVideoType[]>([]);
  const [tartgetMuscleExercises, setTartgetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const params: { id: string } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDetailData = (await fetchData(
        `${ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetById + "?ExerciseId=" + params.id}`
      )) as ExerciseType;

      setExerciseDetail(exerciseDetailData);
      
      const exerciseVideoData = await fetchData(
        `${ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Video.Search + "?name=" + exerciseDetail.name}`
      );
      setExerciseVideos(exerciseVideoData.contents);

      const tartgetMuscleExercisesData = await fetchData(
        `${ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetByTarget + "?name=" + exerciseDetailData.target}`
      );
      setTartgetMuscleExercises(tartgetMuscleExercisesData);

      const equipmentExercisesData = await fetchData(
        `${ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetByEquipment + "?name=" + exerciseDetailData.equipment}`
      );
      setEquipmentExercises(equipmentExercisesData);
    };

    fetchExercisesData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        tartgetMuscleExercises={tartgetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
