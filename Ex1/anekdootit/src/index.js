import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Header = (props) => (
    <h1>{props.text}</h1>
)

const Anecdote = (props) => (
    <div>
        <i>"{props.text}"</i>
        <br />
        Has <b>{props.votes}</b> votes
    </div>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0))

    const handleSelection = () => setSelected(Math.floor(Math.random() * props.anecdotes.length))
    const handleVote = (voteIdx) => {
        const newPoints = points.concat()
        newPoints[voteIdx]++
        return (
           setPoints(newPoints)
        )
    }
    const mostPointsIdx = points.indexOf(Math.max(...points))
    return (
    <div>
        <Header text="Anecdote of the day"/>
        <Anecdote text={props.anecdotes[selected]} votes={points[selected]}/>
        <br/>
        <Button text="vote this anecdote" handleClick={() => handleVote(selected)}/>
        <Button text="next anecdote" handleClick={() => handleSelection()}/>
        <Header text="Anecdote with the most votes"/>
        <Anecdote text={props.anecdotes[mostPointsIdx]} votes={points[mostPointsIdx]}/>
    </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)