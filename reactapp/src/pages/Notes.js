import "./Notes.css"
import "./Weather.css"
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Notes(){
    const [curNotes,setCurNotes] = useState([]);
    const [isDone,setIsDone] = useState(false);
    const [addNewNote,setAdd] = useState(false);
    const [titleInput,setTitle] = useState("");
    const [contentInput,setContent] = useState("");
    const [displayDate,setDiplayDate] = useState(new Date());
    var chosenDate = new Date();
    const handleChangeDate = async (e) => {
        setDiplayDate(e);
        chosenDate = e;
        getCurrentNotes(chosenDate);
    }
    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleContent = (e) => {
        setContent(e.target.value);
    }   
    const handleAdd = () =>{
        setAdd(!addNewNote);
    }
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    const handleAddNote = async () => {
        setAdd(false);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                content: contentInput,
                title: titleInput , 
                date: displayDate.toISOString()
            }),
        };
        const response = await fetch(
            "http://localhost:5098/api/Notes",
            requestOptions
            );
            getCurrentNotes(displayDate);
            if(response.status =="200"){
            }
    }
    const getCurrentNotes = async (date) =>{
        setIsDone(false);
        const requestOptions = {
            method:"GET"
        }
        const response = await fetch("http://localhost:5098/api/Notes/getByDate/"+date.toLocaleDateString('en-CA'),requestOptions);
        await response.json().then(function(data){
            curNotes.length = 0;
            data.forEach(element => {
                curNotes.push(element);
                setIsDone(false);
            })
        })
        setIsDone(true);
        setAdd(false);
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
                    <DatePicker className="date-picker" selected={displayDate} onChange={(date)=>{handleChangeDate(date);setIsDone(false)}}/>
                    </div>
                </div>
                <div className="notes-panel" id="np">
                    {isDone? (<div>
                        <br/>
                    <button className="add-button" onClick={handleAdd}><AiOutlinePlus/></button>
                    {addNewNote?(<div>
                        <div className="divider"></div>
                            <div className="note-element"><br/>
                                <label className="text-title">Enter title:</label>
                                <input className="text-title-input" type="text" onChange={handleTitle}/>
                                <label className="text">Enter note:</label>
                                <input className="text-input" type="text" onChange={handleContent}/> <br/>
                                <button className="button-confirm" onClick={handleAddNote}>Add Note</button>
                            </div>
                        </div>):(<div></div>)}
                        {listItems} 
                    
                    </div>):(<div>Update notes!</div>)}
                </div>
            </div>
        </div>
    )
}
export default Notes;