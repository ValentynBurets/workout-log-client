import React from "react";
import { Typography, Stack, Button } from "@mui/material";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";
import { ExerciseType } from "../types/ExerciseType";

export interface IDetail {
  exerciseDetail: ExerciseType;
}

const Detail = (props: IDetail) => {
  const extraDetail = [
    {
      icon: BodyPartImage,
      name: props.exerciseDetail.bodyPart,
    },
    {
      icon: TargetImage,
      name: props.exerciseDetail.target,
    },
    {
      icon: EquipmentImage,
      name: props.exerciseDetail.equipment,
    },
  ];

  return (
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}
    >
      <img
        src={props.exerciseDetail.gifUrl}
        alt={props.exerciseDetail.name}
        loading="lazy"
        className="detail-image"
      />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography variant="h3">{props.exerciseDetail.name}</Typography>
        <Typography variant="h6">
          Exercises keep you strong. {props.exerciseDetail.name} {` `}
          is one of the best exercises to target your{" "}
          {props.exerciseDetail.target}. it will help you improve your mood and
          gain energy.
        </Typography>
        {extraDetail.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            <Button
              sx={{
                background: "#fff2db",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
              }}
            >
              <img
                src={item.icon}
                alt={props.exerciseDetail.bodyPart}
                style={{ width: "50px", height: "50px" }}
              />
            </Button>
            <Typography textTransform="capitalize" variant="h5">
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;
