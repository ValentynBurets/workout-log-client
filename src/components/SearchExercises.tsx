import React, { useState, useEffect } from "react";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Trans } from "react-i18next";
import { fetchData } from "../utils/fetchData";
import { ExerciseType } from "../types/ExerciseType";
import HorizontalScrollbar from "./HorizontalScrollbar";

import ConnectionConfig from "../assets/jsonData/ConnectionConfig/ConnectionConfig.json"

export interface ISearchExercisesProps {
  setExercises: (arg: ExerciseType[]) => void;
  bodyPart: any;
  setBodyPart: (arg: any) => void;
}

export const SearchExercises = (props: ISearchExercisesProps) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState<string[]>([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetBodyParts);
      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exerciseData = await fetchData(ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Exercises.GetAll);

      console.log(exerciseData);

      const searchedExercises: ExerciseType[] = exerciseData.filter(
        (exercise: ExerciseType) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );

      setSearch("");
      props.setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" mt="p" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "1170px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "10px",
            border: "none",
          }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#FF2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={() => {
            handleSearch();
          }}
        >
          <Trans i18nKey="EnterLatitude">Search</Trans>
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        {/* <HorizontalScrollbar
          data={[]}
          dataNames={bodyParts}
          bodyPart={props.bodyPart}
          setBodyPart={props.setBodyPart}
          isBodyParts={true}
        /> */}
      </Box>
    </Stack>
  );
};
