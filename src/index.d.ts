import * as React from 'react';

export default class Slider extends React.Component<SliderProps, {}>{}

export interface SliderProps {
    min?: number,
    max?: number,
    step?: number,
    value?: number,
    orientation?: string,
    tooltip?: boolean,
    reverse?: boolean,
    labels?: object,
    handleLabel?: string,
    format?: Function,
    onChangeStart?: Function,
    onChange?: Function,
    onChangeComplete?: Function
}