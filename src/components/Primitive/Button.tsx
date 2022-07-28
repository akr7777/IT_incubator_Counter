import React, {FC} from 'react';
import s from "./button.module.css";

type ButtonPropsType = {
    isDisabled?: boolean,
    onClickHandler: () => void,
    title: string,
}
//const Button:FC<ButtonPropsType> = (props) => {}
const Button: FC<ButtonPropsType> = ({
     isDisabled,
     onClickHandler,
     title
}) => {
    return (
        <button disabled={isDisabled} // or count >= 5
                onClick={onClickHandler}
                className={s.bnt}>
            {title}
        </button>
    );
};

export default Button;