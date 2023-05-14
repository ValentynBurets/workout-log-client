import React, { useState, useEffect } from "react";
import { ExerciseType } from "../../../../../types/ExerciseType";
import { fetchData } from "../../../../../utils/fetchData";
import ConnectionConfig from "../../../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { SimpleTrainingPlan } from "../../../../../types/TrainingPlan/SimpleTrainingPlan/SimpleTrainingPlan";
import { SimpleTrainingPlanModel } from "../../../../../types/TrainingPlan/SimpleTrainingPlan/SimpleTrainingPlanModel";
import ExercisesCarousel from "../../../../../components/ExercisesCarousel/ExercisesCarousel";
import style from "./SimpleTrainingPlanForm.module.sass";
import ExerciseList from "../../../../../components/ExerciseCard/ForList/ExerciseList";
import TrainingPlanForm from "./TrainingPlanForm/TrainingPlanForm";
import PostService from "../../../../../components/Services/PostService";
import { GoodRequest, BadRequest, requestDefaultState } from "../../../../../components/Message/RequestMessage";
import { RequestResult } from "../../../../../types/RequestResult";

interface ISimpleTrainingPlanProps {}

function SimpleTrainingPlanPage(props: ISimpleTrainingPlanProps) {
  const [exercises, setExercices] = useState<ExerciseType[]>([]);
  const SimpleTrainingPlanModelInitialValue: SimpleTrainingPlanModel = {
    name: "Simple training plan",
    isNoDate: true,
    startDate: new Date(),
    endDate: new Date(),
    planExercises: [],
  };

  const [request, setRequest] = useState<RequestResult>(requestDefaultState);

  const [trainingPlanModel, setTrainingPlanModel] =
    useState<SimpleTrainingPlanModel>(SimpleTrainingPlanModelInitialValue);

  const addExerciceToTrainingPlan = (item: ExerciseType) => {
    if (!trainingPlanModel.planExercises.includes(item)) {
      setTrainingPlanModel(
        (prev) =>
          prev && { ...prev, planExercises: [...prev.planExercises, item] }
      );
    }
  };

  const deleteExerciceToTrainingPlan = (id: string) => {
    setTrainingPlanModel(
      (prev) =>
        prev && {
          ...prev,
          planExercises: prev.planExercises.filter((item) => item.id !== id),
        }
    );
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      exercisesData = await fetchData(
        ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetAll
      );

      setExercices(exercisesData);
    };
    fetchExercisesData();
  }, []);

  const handleCreateTrainingPlan = async (
    name: string,
    newStartDate: Date,
    newEndDate: Date
  ) => {
    setTrainingPlanModel(
      (prev) =>
        prev && {
          ...prev,
          isNoDate: false,
          startDate: newStartDate,
          endDate: newEndDate,
          name: name,
        }
    );

    let exerciseIds: string[] = [];
    trainingPlanModel.planExercises.forEach((exercise) =>
      exerciseIds.push(exercise.id)
    );

    let createTrainingPlan: SimpleTrainingPlan = {
      name: trainingPlanModel.name,
      startDate: trainingPlanModel.startDate,
      endDate: trainingPlanModel.endDate,
      isNoDate: trainingPlanModel.isNoDate,
      planExerciseIds: exerciseIds,
    };

    let data = await PostService(
      ConnectionConfig.Routes.TrainingPlan.Create.SimpleTrainingPlan,
      createTrainingPlan
    );

    if (data) {
      setRequest(
        (prev) =>
          prev && {
            ...prev,
            good: { show: true, message: "training plan is created" },
          }
      );
    } else {
      setRequest(
        (prev) =>
          prev && {
            ...prev,
            bad: { show: true, message: "training plan isn't created" },
          }
      );
    }

    setTimeout(resetRequest, 3000);
  };

  const resetRequest = () => {
    setRequest(requestDefaultState);
  };

  return (
    <div>
      <GoodRequest show={request.good.show} text={request.good.message} />
      <BadRequest show={request.bad.show} text={request.bad.message} />
      <ExerciseList
        exercises={trainingPlanModel?.planExercises}
        onDelete={(id: string) => {
          deleteExerciceToTrainingPlan(id);
        }}
      />
      <TrainingPlanForm onCreate={handleCreateTrainingPlan} />

      {trainingPlanModel.startDate && trainingPlanModel.endDate && (
        <div className="training-plan-summary">
          <h2>
            Training Plan:{" "}
            {trainingPlanModel.startDate.toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            -{" "}
            {trainingPlanModel.endDate.toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h2>
        </div>
      )}
      <ExercisesCarousel
        exercisesArrray={exercises}
        selectExercise={(arg: ExerciseType) => addExerciceToTrainingPlan(arg)}
      />
    </div>
  );
}

export default SimpleTrainingPlanPage;
