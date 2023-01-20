import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

export interface IExerciseCard {
  exercise: {
    id: string;
    giftUrl: string;
    bodyPart: string;
    target: string;
    name: string;
  };
}

const ExerciseCard = (props: IExerciseCard) => {
  return (
    <Link className="exercise-card" to={`/exercise/${props.exercise.id}`}>
      <img
        src={props.exercise.giftUrl}
        alt={props.exercise.bodyPart}
        loading="lazy"
      />
      <Stack direction="row">
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#ffa9a9",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {props.exercise.bodyPart}
        </Button>
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#fcc757",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {props.exercise.target}
        </Button>
      </Stack>
      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        mt="11px"
        pb="10px"
        textTransform="capitalize"
        fontSize="24px"
      >
        {props.exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
