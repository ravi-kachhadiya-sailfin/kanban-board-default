import React from "react";
import { CardTitle, } from 'reactstrap';

import Task from "./../Task/Task";
import classes from "./List.module.css"
const List = ({ data, onDragStart, onDragOver, onDrop }) => {
    // console.log(data);
    return (
        <div className={classes.card}>
            <div style={{ height: "90%" }}>
                <CardTitle tag="h5" className={`${classes.title} p-2 text-center`}>{data.title}</CardTitle>
                {data.tasks.map((tasks, i) =>
                    // console.log(tasks);
                    <div key={i} id={i} className={`${classes.firstPartition} ${(i % 2 === 0) && classes.oddBackground}`}
                        onDragOver={onDragOver}
                        onDrop={onDrop}>
                        {tasks && tasks.length ?
                            tasks.map((x, i) =>
                                <Task key={i}
                                    data={x}
                                    onDragStart={onDragStart}
                                />
                            ) :
                            <div className="text-center mt-4">No Task</div>}
                    </div>
                )}
            </div>
        </div >
    )
}

export default List;
