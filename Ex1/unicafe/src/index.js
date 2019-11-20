import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistic = (props) => (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
)

const Statistics = ({good,neutral,bad}) => {
    const all = good+neutral+bad
    if (all > 0) {
        const average = (good-bad)/all
        const positive = good/all*100
        return (
            <div>
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <Statistic text="good" value={good}/>
                        <Statistic text="neutral" value={neutral}/>
                        <Statistic text="bad" value={bad}/>
                        <Statistic text="all" value={all}/>
                        <Statistic text="average" value={average}/>
                        <Statistic text="positive-%" value={positive}/>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <table>
                <tbody>
                    <Statistic text="No feedback given"/>
                </tbody>
            </table>
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToValue = (setValue,value) => setValue(value)

    return (
        <div>
            <h1>UniCafe Feedbacker</h1>
            <Button text="good" handleClick={() => setToValue(setGood,good+1)}/>
            <Button text="neutral" handleClick={() => setToValue(setNeutral,neutral+1)}/>
            <Button text="bad" handleClick={() => setToValue(setBad,bad+1)}/>

            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));