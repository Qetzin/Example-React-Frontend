import { BsFillBrightnessHighFill,BsFillCalendar2Fill } from "react-icons/bs";
import "./NavbarStyles.css"
export const MenuData = [
    {
        title: "Weather",
        url:"./",
        className:"nav-links",
        icon: <BsFillBrightnessHighFill/>
    },
    {
        title: "Notes",
        url:"./Notes",
        className:"nav-links",
        icon: <BsFillCalendar2Fill/>
    }
]