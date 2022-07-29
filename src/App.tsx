import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import s from './App.module.css';
import {Counter} from "./components/Counter/Counter";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";

/*const SHOW_COUNTER = 'APP/SHOW_COUNTER';
const SHOW_SETTINGS = 'APP/SHOW_SETTINGS';*/
const INITIAL_MIN_VALUE = 0;
const INITIAL_MAX_VALUE = 5;
const LOCAL_STORAGE_MIN = 'CounterAPP_localStorageMin';
const LOCAL_STORAGE_MAX = 'CounterAPP_localStorageMax';

function App() {
    const [minValue, setMinValue] = useState<number>(INITIAL_MIN_VALUE);
    const [maxValue, setMaxValue] = useState<number>(INITIAL_MAX_VALUE);
    const [showSettings, setShowSettings] = useState<boolean>(false);

    //local storage inicialization
    let myLocalStorage = window.localStorage;
    function storageInitialization() {
        if ( myLocalStorage.getItem(LOCAL_STORAGE_MIN) && myLocalStorage.getItem(LOCAL_STORAGE_MAX) ) {
            if (minValue !== Number(myLocalStorage.getItem(LOCAL_STORAGE_MIN))
                && maxValue !== Number(myLocalStorage.getItem(LOCAL_STORAGE_MAX))) {
                setMinValue( Number(myLocalStorage.getItem(LOCAL_STORAGE_MIN)) );
                setMaxValue( Number(myLocalStorage.getItem(LOCAL_STORAGE_MAX)) );
            }
        }
    }
    storageInitialization();

    function changePanels() {
        setShowSettings(!showSettings);
    }

    function setNewSettings(min:number, max:number) {
        setMinValue(min);
        setMaxValue(max);
        //Puching data to the localStorage:
        myLocalStorage.setItem(LOCAL_STORAGE_MIN, String(min))
        myLocalStorage.setItem(LOCAL_STORAGE_MAX, String(max))
    }

    debugger
    return (
        <div className={s.App}>
            <div>
                <h3 className={s.titleLabel}>Simple counter:</h3>
                <Counter
                    isSettingsAvalable={false}
                    minValue={minValue}
                    maxValue={maxValue}
                    showSettings={changePanels}
                />
            </div>

            <div>
                <h3 className={s.titleLabel}>Counter and Setting separatly:</h3>
                <div className={s.counter_settings_sep_div}>
                    <Counter
                        isSettingsAvalable={false}
                        minValue={minValue}
                        maxValue={maxValue}
                        showSettings={changePanels}
                    />
                    <SettingsPanel
                        minValue={minValue}
                        maxValue={maxValue}
                        setNewSettings={(min:number, max: number) => setNewSettings(min,max)}
                        isCounterButtonAvailable={false}
                        showCounterPanel={changePanels}
                    />
                </div>
            </div>

            <div>
                <h3 className={s.titleLabel}>Counter and Setting both in one:</h3>
                {
                    showSettings
                        ? <SettingsPanel
                            minValue={minValue}
                            maxValue={maxValue}
                            setNewSettings={(min:number, max: number) => setNewSettings(min,max)}
                            isCounterButtonAvailable={true}
                            showCounterPanel={changePanels}
                        />
                        : <Counter
                            isSettingsAvalable={true}
                            minValue={minValue}
                            maxValue={maxValue}
                            showSettings={changePanels}
                        />
                }
            </div>

        </div>
    );
}

export default App;
