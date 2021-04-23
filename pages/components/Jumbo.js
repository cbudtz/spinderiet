import {Jumbotron} from "react-bootstrap";
import React, {useState} from "react";
import MarkDown from "./MarkDown";
import {getStrapiMedia} from "../api/api";
import {resolveImage, useWindow} from "../api/window";


export default function Jumbo({images, text}){
    const  [windowWidth, setWindowWidth] = useState(2000)
    useWindow(setWindowWidth);
    let image =""
    if (images && images[0]) {
         image = resolveImage(windowWidth, images[0]);
    } else {
        return <></>
    }
    return(
        <div style={{width:"100%"}}>
            <Jumbotron fluid style={{
                width:"100%", paddingBottom:"60%",
                backgroundImage: "url('"+ getStrapiMedia(image)+ "')",
                backgroundRepeat: "space",
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}/>
        </div>

    )
}