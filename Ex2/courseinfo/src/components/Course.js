import React from 'react';

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}

const Content = ({parts}) => {
    return(
        <>
        {parts.map(part => 
            <Part
                key={part.exercises}
                part={part.name}
                exercise={part.exercises}
            />
        )}
        </>    
        )
}

const Total = ({parts}) => {
    const total = parts.map(part => part.exercises).reduce(
        (a,b) => a + b, 0)
        
    return(
        <b>Course total: {total} exercises</b>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercise}
        </p>
    )
}

export default Course