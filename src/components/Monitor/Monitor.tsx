import React from 'react';
import s from "./monitor.module.css";

type MonitorPropsType = {
    count: number;
    maxValue: number
}

export const Monitor = ({count, maxValue}: MonitorPropsType) => {
    return (
        <div className={ count >= maxValue ? s.display_monitor_maxValue : s.display_monitor}>
            {count}
        </div>
    );
}