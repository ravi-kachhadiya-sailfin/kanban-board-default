import React from 'react';
import classes from "./Task.module.css"

export default function TaskCard({ data, onDragStart }) {
    return (
        <div className={`${classes.taskText} task-card`} draggable="true" id={[data.taskId]}
            onDragStart={onDragStart}
        >
            <p className="m-0 p-0 fw-bold">#{data.taskId} {data.taskText}</p>
            <p className="m-0 p-0">City: {data.city}</p>
        </div >
    )
};