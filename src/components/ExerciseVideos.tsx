import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { ExerciseVideoType } from "../types/ExerciseVideoType";

export interface IExerciseVideos {
  exerciseVideos: any;
  name: string;
}

const ExerciseVideos = (props: IExerciseVideos) => {
  if (!ExerciseVideos.length) return <div>"Loading..."</div>;

  return (
    <Box sx={{ marginTop: { lg: "200px", xs: "20px" } }} p="20px">
      <Typography variant="h4" mb="33px">
        Watch{" "}
        <span style={{ color: "#ff2625", textTransform: "capitalize" }}>
          {props.name}
        </span>{" "}
        exercise videos
      </Typography>
      <Stack
        justifyContent="flex-start"
        flexWrap="wrap"
        alignItems="center"
        sx={{ flexDirection: { lg: "row" }, gap: { lg: "110px", xs: "0" } }}
      >
        {props.exerciseVideos
          ?.slice(0, 3)
          .map((item: ExerciseVideoType, index: string) => (
            <a
              key={index}
              className="exercise-video"
              href={`https://www.youtube.com/watch?v=${item.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={item.url} alt={item.title} />
              <Box>
                <Typography variant="h5" color="#000">
                  {item.channelName}
                </Typography>
              </Box>
            </a>
          ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
