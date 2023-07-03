import "./Notes.css"
import "./Weather.css"
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Notes(){
    const [chosenDate,setDate] = useState(new Date());
    const [curNotes,setCurNotes] = useState([]);
    const [isDone,setIsDone] = useState(false);
    const getCurrentNotes = async () =>{
        setIsDone(false);
        const requestOptions = {
            method:"GET"
        }
        const response = await fetch("http://localhost:5098/api/Notes/getByDate/"+chosenDate.toLocaleDateString('en-CA'),requestOptions);
        await response.json().then(function(data){
            curNotes.length = 0;
            data.forEach(element => {
                curNotes.push(element);
                setIsDone(false);
            })
        })
            setIsDone(true);
    }
    const handleAdd = () =>{
    }
    const listItems = curNotes.map((item)=>{
        return(
            <div>
                <div className="divider"></div>
                <div className="note-element">
                    <label className="text-title">{item.title}</label>
                    <label className="text">{item.content}</label>
                </div>
            </div>
        )
    })
    return(
        <div className="main">
            <div className="sub-main-notes">
                <div className="user-date">
                    <div className="date-selection-panel">
                    <label className="text-title">Select date:</label>
                    <DatePicker className="date-picker" selected={chosenDate} onChange={(date)=>{setDate(date);setIsDone(false)}}/>
                    <button className="button-confirm" onClick={getCurrentNotes}>Update notes</button>
                    </div>
                </div>
                <div className="notes-panel" id="np">
                    {isDone? (<div>{listItems} 
                    <br/>
                    <button className="add-button" onClick={handleAdd}><AiOutlinePlus/></button></div>):(<div>Update notes!</div>)}
                </div>
            </div>
        </div>
    )
}
export default Notes;