import { SetStateAction, useState } from "react";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import style from "./ExercisesCarouselStyle.module.sass";
import { ExerciseType } from "../../types/ExerciseType";
import ExerciseCard from "../ExerciseCard/ExerciseCard";

interface IExercisesCarouselProps {
  exercisesArrray: ExerciseType[];
  selectExercise: (arg: ExerciseType) => void;
}

function ExercisesCarousel(props: IExercisesCarouselProps) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: SetStateAction<number>, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={style.CardImageStyle}>
      <Carousel
        indicators={true}
        interval={1000}
        slide={true}
        touch={true}
        activeIndex={index}
        onSelect={handleSelect}
        pause="hover"
      >
        {props?.exercisesArrray?.map((exercise, id) => {
          return (
            <Carousel.Item key={id} className={style.card_image_style_3}>
              <div className={style.card_image_div_style}>
                <div>
                <ExerciseCard exercise={exercise} />
                </div>
                <Button
                  variant="info"
                  onClick={() => {
                    props.selectExercise(exercise);
                  }}
                  >
                  Select
                </Button>
                {/* <div className={style.card_select_button}>
                </div> */}
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ExercisesCarousel;
