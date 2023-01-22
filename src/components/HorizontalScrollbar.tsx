import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import BodyPart from "./BodyPart";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";
import { ExerciseType } from "../types/ExerciseType";
import ExerciseCard from "./ExerciseCard";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="left-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

export interface IHorizontalScrollbar {
  data: ExerciseType[];
  dataNames: string[];
  bodyPart: ExerciseType;
  setBodyPart: (arg: any) => void;
  isBodyParts: any;
}

const HorizontalScrollbar = (props: IHorizontalScrollbar) => {
  return (
    <div> test</div>
    // <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
    //   {props.isBodyParts
    //     ? props.dataNames.map((item: string) => (
    //         <Box
    //           //key={item.id}
    //           //itemId={item.id}
    //           //title={item.name}
    //           m="0 40px"
    //         >
    //           {
    //             <BodyPart
    //               item={item}
    //               bodyPart={props.bodyPart}
    //               setBodyPart={props.setBodyPart}
    //             />
    //           }
    //         </Box>
    //       ))
    //     : props.data.map((item) => (
    //         <Box
    //           key={item.id}
    //           //itemId={item.id}
    //           title={item.name}
    //           m="0 40px"
    //         >
    //           {
    //             <BodyPart
    //               item={item}
    //               bodyPart={props.bodyPart}
    //               setBodyPart={props.setBodyPart}
    //             />
    //           }
    //         </Box>
    //       ))}
    // </ScrollMenu>
  );
};

export default HorizontalScrollbar;

// {
//   props.dataNames.map((item) => (
//   <Box
//     //key={item.id}
//     //itemId={item.id}
//     //title={item.name}
//     m="0 40px"
//   >
//     {
//       <BodyPart
//         item={item}
//         bodyPart={props.bodyPart}
//         setBodyPart={props.setBodyPart}
//       />
//     }
//   </Box>
// ))}
