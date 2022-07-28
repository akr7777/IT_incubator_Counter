import ReactDOM from 'react-dom'
import App from './App';
import './index.css'
import {Counter} from "./components/Counter/Counter";
/*
const Son = (props: any) => {
    return <div>
        I am son. My name is {props.name}
    </div>
}
const Father = (props: any) => {
    return <div>
        I am father. My name is {props.name}
        <Son name={props.sonName} />
    </div>
}
const Granny = (props: any) => {
    return <div>
        I am granny. My name is {props.name}
        <Father name={props.fatherName} sonName={props.sonName} />
    </div>
}*/
export const App1 = () => {
    return <div>
        <App />
        {/*<Counter isSetAvalable={false}/>*/}
    </div>
}

ReactDOM.render(<App1/>,
    document.getElementById('root')
)