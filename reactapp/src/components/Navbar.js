import React, { Component } from "react";
import { AiFillBank} from "react-icons/ai"
import { MenuData } from "./MenuData";

import "./NavbarStyles.css"

class Navbar extends Component {
    render(){
        return(
            <nav className="NavbarItems">
                <h1 className="logo">TestApp <AiFillBank className="icon"/></h1>
                <ul className="nobullets">
                    {MenuData.map((item,index)=>{
                        return(                           
                            <li key={index}>
                            <a className="nav-links" href={item.url}><i>{item.icon}</i>
                            {item.title}
                            </a>
                        </li>
                        )
                    })}
                   
                </ul>
            </nav>
        );
    }
}

export default Navbar;