import React, {useEffect, useState} from "react";
import s from "./Counter.module.css";
import {Monitor} from "../Monitor/Monitor";
import Button from "../Primitive/Button";


type CounterPropsType = {
    isSettingsAvalable: boolean,
    minValue: number,
    maxValue: number,
    showSettings: () => void,
}

export const Counter = ({isSettingsAvalable, minValue, maxValue, showSettings}: CounterPropsType) => {

    const [count, setCount] = useState<number>(minValue);

    const incrementCount = (): void => {
        if (count < maxValue) setCount(count + 1);
    }
    const resetCount = (): void => {
        setCount(minValue);
    }

    useEffect( () => {
        setCount(minValue)
       /* return () => {
            //componentWillUnmount
       }*/
    }, [minValue])

    return (
        <div className={s.counter_wrapping}>
            <div className={s.title}>Counter</div>
            <div className={s.counter_monitor}>
                <Monitor count={count} maxValue={maxValue}/>
            </div>
            <div className={s.counter_btn_divs}>

                <Button title='++' isDisabled={count === maxValue} onClickHandler={incrementCount}/>
                <Button isDisabled={count === minValue} onClickHandler={resetCount} title='RESET'/>

                {
                    isSettingsAvalable && <Button title='SETTINGS' onClickHandler={showSettings}/>
                }

            </div>
        </div>
    );
}