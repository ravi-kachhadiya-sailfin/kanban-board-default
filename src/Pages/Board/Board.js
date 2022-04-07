import React, { useState } from "react";

import List from "./components/List";
import RightSideBar from './components/RightSideBar';

// import FakeData from "../../FakeData/Data.json";
import classes from "./Board.module.css"

const Board = () => {

    const [data, setData] = useState(JSON.parse(localStorage.getItem("kanbanData")));
    const [isOpen, setIsOpen] = useState(false);

    console.log(data);

    // const addNewCard = (title) => {
    //     const newCardDefaultData = {
    //         title: title,
    //         id: 3,
    //         tasks: [data[0].tasks.map(x => [])]
    //     }

    //     let updatedData = [...data];
    //     updatedData.push(newCardDefaultData);

    //     setData(updatedData);
    //     localStorage.setItem('kanbanData', JSON.stringify(updatedData));
    // }

    const onDragStart = (e, fromList) => {
        console.log("grag start", fromList);
        const dragInfo = {
            taskId: e.currentTarget.id,
            fromList: fromList
        }

        localStorage.setItem('dragInfo', JSON.stringify(dragInfo));
    }

    const onDragOver = (e) => {
        e.preventDefault();
        // console.log(e);
    }

    const onDrop = (e, listNum) => {

        const droppedTask = JSON.parse(localStorage.getItem('dragInfo'));
        let updatedData = { ...data };

        if (listNum === -1) {
            return;
        }

        if (Number(droppedTask.fromList) === -1) {
            const tasks = updatedData.newTask;
            const indexOfTask = tasks.findIndex(task => Number(task.taskId) === Number(droppedTask.taskId));
            const taskCard = tasks[indexOfTask];
            updatedData.newTask.splice(indexOfTask, 1)
            updatedData.ongoingTask[listNum].tasks[e.currentTarget.id].push({ ...taskCard, listNumber: parseInt(listNum) })
        }
        else {
            const tasks = updatedData.ongoingTask[droppedTask.fromList].tasks;
            const indexOfCard = tasks.map(x => x.find(task => Number(task.taskId) === Number(droppedTask.taskId))).findIndex(x => x !== undefined)
            const indexOfTask = tasks[indexOfCard].findIndex(task => Number(task.taskId) === Number(droppedTask.taskId));
            const taskCard = tasks[indexOfCard][indexOfTask];

            updatedData.ongoingTask[droppedTask.fromList].tasks[indexOfCard].splice(indexOfTask, 1)
            updatedData.ongoingTask[listNum].tasks[e.currentTarget.id].push({ ...taskCard, listNumber: parseInt(listNum) })
        }

        // const tasks = updatedData[droppedTask.fromList].tasks;
        // const indexOfCard = tasks.map(x => x.find(task => Number(task.taskId) == Number(droppedTask.taskId))).findIndex(x => x !== undefined)
        // const indexOfTask = tasks[indexOfCard].findIndex(task => Number(task.taskId) == Number(droppedTask.taskId));
        // const taskCard = tasks[indexOfCard][indexOfTask];

        // updatedData[droppedTask.fromList].tasks[indexOfCard].splice(indexOfTask, 1)
        // updatedData[listNum].tasks[e.currentTarget.id].push({ ...taskCard, listNumber: parseInt(listNum) })

        setData(updatedData);
        localStorage.setItem('kanbanData', JSON.stringify(updatedData));
    }

    const toggleRightSideBar = () => {
        setIsOpen(!isOpen);
    }

    // debugger
    return (
        <div className={`${classes.board} d-flex justify-content-around`}>
            <div className={`${classes.addNewCardModule} d-flex`}>
                <i onClick={toggleRightSideBar} className={`${classes.leftArrow} fa ${isOpen ? "fa-angle-double-right" : "fa-angle-double-left"} fa-2x`} ></i>
                <RightSideBar
                    isOpen={isOpen}
                    data={data.newTask}
                    onDragStart={(e) => onDragStart(e, -1)}
                    onDragOver={(e) => onDragOver(e)}
                    onDrop={(e) => { onDrop(e, -1) }} />
            </div>
            {data && data.ongoingTask && data.ongoingTask.length > 0 &&
                data.ongoingTask.map((x, i) => {
                    console.log(x)
                    return (<List key={i} data={x}
                        onDragStart={(e) => onDragStart(e, `${x.id}`)}
                        onDragOver={(e) => onDragOver(e)}
                        onDrop={(e) => { onDrop(e, `${x.id}`) }} />)
                }
                )}
        </div>
    )
}

export default Board;