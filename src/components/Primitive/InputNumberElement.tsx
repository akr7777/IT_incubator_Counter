import React, {ChangeEvent, useState} from 'react';
import s from './inputElement.module.css';

type InputElementPropsType = {
    id: string,
    title: string,
    isError: boolean,
    onChangeHandler: (id: string, title: string) => void,
}
const InputNumberElement = ({id, title, isError, onChangeHandler}: InputElementPropsType) => {

    function onInputValueChange(e: ChangeEvent<HTMLInputElement>) {
        onChangeHandler(id, e.currentTarget.value);
    }

    return <>
        <input
            className={isError ? s.input_css_error : s.input_css}
            type='text'
            value={title}
            onChange={(e) => onInputValueChange(e)}
        />
        {/*<label className={s.error_label}> {errorMessage} </label>*/}
    </>
}

export default InputNumberElement;