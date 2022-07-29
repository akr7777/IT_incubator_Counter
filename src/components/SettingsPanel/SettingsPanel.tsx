import React, {useState} from 'react';
import s from './settingsPanel.module.css';
import Button from "../Primitive/Button";
import InputNumberElement from "../Primitive/InputNumberElement";

const id_max = "Input_maxValue";
const id_min = "Input_minValue";

type ErrorMassagesType = {
    minValueNotNumber: string,
    maxValueNotNumber: string,
    maxLessMin: string,
    minNegative: string,
    maxNegative: string,
}
const errorMessageInitState:ErrorMassagesType = {
    minValueNotNumber: '',
    maxValueNotNumber: '',
    maxLessMin: '',
    minNegative: '',
    maxNegative: '',
}

type SettingsPanelPropsType = {
    minValue: number,
    maxValue: number,
    isCounterButtonAvailable: boolean,
    setNewSettings: (minValue: number, maxValue: number) => void,
    showCounterPanel: () => void,
}

const SettingsPanel = (props: SettingsPanelPropsType) => {

    function _isNumeric(value: string) {
        return /^-?\d+$/.test(value);
    }
    function _checkError(min: string, max: string) {
        if (!_isNumeric(min)) {
            setError(true);
            setErrorMessage({...errorMessage, minValueNotNumber: 'Not a number'});
        } else if (!_isNumeric(max)) {
            setError(true);
            setErrorMessage({...errorMessage, maxValueNotNumber: 'Not a number'});
        } else if (Number(min) < 0) {
            setError(true);
            setErrorMessage({...errorMessage, minNegative: "Can't be negative", minValueNotNumber: ""});
        } else if (Number(max) < 0) {
            setError(true);
            setErrorMessage({...errorMessage, maxNegative: "Can't be negative", maxValueNotNumber: ""});
        } else if (Number(max) <= Number(min)) {
            setError(true);
            setErrorMessage({...errorMessage, maxLessMin: "Max can't be less or equal than Min"});
        } else {
            setError(false);
            setErrorMessage(errorMessageInitState);
        }
    }

    const [minValue, setMinValue] = useState<string>(String(props.minValue));
    const [maxValue, setMaxValue] = useState<string>(String(props.maxValue));

    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState(errorMessageInitState);

    const setOnClickHandler = () => {
        _checkError(minValue, maxValue);
        if (!error) props.setNewSettings(Number(minValue), Number(maxValue));
    }

    const resetOnClickHandler = () => {
        setMinValue(String(props.minValue));
        setMaxValue(String(props.maxValue));
        setError(false);
        setErrorMessage(errorMessageInitState);
    }

    const inputOnChangeHandler = (id: string, value: string) => {
        if (id === id_min) {
            _checkError(value, maxValue);
            setMinValue(value);
        }
        if (id === id_max) {
            _checkError(minValue, value);
            setMaxValue(value);
        }
    }

    return (
        <div className={s.settings_wrapping}>
            <div className={s.title}>Settings panel</div>
            <div className={s.settings_monitor}>
                <div className={s.small_div}>
                    <label>Maximum:</label>
                    <InputNumberElement id={id_max}
                                        title={maxValue}
                                        isError={error}
                                        onChangeHandler={(id: string, value: string) => inputOnChangeHandler(id, value)}
                    />
                    {/*      errors labels      */}
                    <label className={s.error_label}>{errorMessage.maxNegative}</label>
                    <label className={s.error_label}>{errorMessage.maxValueNotNumber}</label>
                    {/*      /errors labels      */}

                </div>
                <div className={s.small_div}>
                    <label>Minimum:</label>
                    <InputNumberElement id={id_min}
                                        title={minValue}
                                        isError={error}
                                        onChangeHandler={(id: string, value: string) => inputOnChangeHandler(id, value)}
                    />
                    {/*      errors labels      */}
                    <label className={s.error_label}>{errorMessage.minNegative}</label>
                    <label className={s.error_label}>{errorMessage.minValueNotNumber}</label>
                    {/*      /errors labels      */}
                </div>
                 {/*      error label        */}
                <label className={s.error_label}>{errorMessage.maxLessMin}</label>
                {/*      /error label        */}
            </div>
            <div className={s.settings_btn_divs}>
                <Button
                    title='SET'
                    onClickHandler={setOnClickHandler}
                    isDisabled={error || (Number(minValue)===props.minValue && Number(maxValue)===props.maxValue)}/>
                <Button title='RESET' onClickHandler={resetOnClickHandler}/>
                {
                    props.isCounterButtonAvailable && <Button title='COUNTER' onClickHandler={props.showCounterPanel}/>
                }
            </div>
        </div>
    );
}

export default SettingsPanel;