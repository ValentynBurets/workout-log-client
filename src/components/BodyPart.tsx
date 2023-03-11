import React from "react";
import { Stack, Typography } from "@mui/material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import Icon from "../assets/icons/gym.png";
import { ExerciseType } from "../types/ExerciseType";

export interface IBodyPart {
  item: ExerciseType;
  bodyPart: ExerciseType;
  setBodyPart: (arg: ExerciseType) => void;
}

const BodyPart = (props: IBodyPart) => {
  console.log(props);
  return (
    <Stack
      //type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={
        props.bodyPart === props.item
          ? {
              borderTop: "4px solid #FF2625",
              background: "#fff",
              borderBottomLeftRadius: "20px",
              width: "270px",
              height: "282px",
              cursor: "pointer",
              gap: "47px",
            }
          : {
              background: "#fff",
              borderBottomLeftRadius: "20px",
              width: "270px",
              height: "282px",
              cursor: "pointer",
              gap: "47px",
            }
      }
      onClick={() => {
        props.setBodyPart(props.item);
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      }}
    >
      <img
        src={props.item.gifUrl}
        alt="dumbbell"
        style={{ width: "90%", height: "80%" }}
      />
      <Typography
        fontSize="24px"
        fontWeight="bold"
        fontFamily="Alegreya"
        color="#3A1212"
        textTransform="capitalize"
      >
        {" "}
        {props.item.name}
      </Typography>
    </Stack>
  );
};

export default BodyPart;