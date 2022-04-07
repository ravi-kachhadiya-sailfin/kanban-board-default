import React from 'react';

import classes from './RightSideBar.module.css';
import Task from "./../Task/Task";

import { CardTitle, } from 'reactstrap';

const RightSideBar = ({ data, onDragOver, onDragStart, onDrop, isOpen }) => {
    console.log(data);
    return (
        <div className={`${isOpen ? classes.rightSideBarLayout : classes.rightSideBarLayoutClose}`}>
            <CardTitle tag="h5" className={`${classes.title} p-2 text-center`}>New Task</CardTitle>
            <div className={`${classes.firstPartition}`}
                onDragOver={onDragOver}
                onDrop={onDrop}>
                {data && data.length ?
                    data.map((x, i) =>
                        <Task key={i}
                            data={x}
                            onDragStart={onDragStart}
                        />
                    ) :
                    <div className="text-center mt-4">No Task</div>}
            </div>
        </div>
    );
}

export default RightSideBar;