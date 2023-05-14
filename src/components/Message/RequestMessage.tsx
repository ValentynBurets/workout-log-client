import React from 'react'
import Alert from 'react-bootstrap/Alert'

import style from "./RequstStyle.module.sass"
import { RequestResult } from '../../types/RequestResult';

interface BadRequestProps{
    show: boolean;
    text: string;
}

export function BadRequest(props: BadRequestProps) {
    return (
        <Alert show={props.show} variant="danger" className={style.alert_style}>
            <Alert.Heading className="text-center">
                {props.text} 
            </Alert.Heading>
        </Alert >
    )
}

interface GoodRequestProps{
    show: boolean;
    text: string;
}

export function GoodRequest(props: GoodRequestProps) {
    return (
        <Alert show={props.show} variant="success" className={style.alert_style}>
            <Alert.Heading className="text-center">
                {props.text} 
            </Alert.Heading>
        </Alert >
    )
}

export const requestDefaultState: RequestResult = {
    good: {
      message: "",
      show: false,
    },
    bad: {
      message: "",
      show: false,
    },
  };