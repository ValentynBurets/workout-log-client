import React, { useState } from "react";
import { Box } from '@mui/material'
import { HeroBanner } from "../components/HeroBanner/HeroBanner";
import { SearchExercises } from "../components/SearchExercises";
import { Exersises } from "../components/Exersises";

const Home = () => {
  return (
    <Box>
        <HeroBanner />
        <SearchExercises />
        <Exersises />
    </Box>
  )
};

export default Home;
