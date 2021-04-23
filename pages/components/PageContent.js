import Jumbo from "./Jumbo";
import React from "react";
import Cols2 from "./Cols2";
import Fullwidth from "./Fullwidth";

export default function PageContent({contents: array}){
    if (!array?.map) {
        console.log("Couldnt render this:")
        console.log(array)
        ; return <></>}
    return(
        <>
            {array?.map((element,key)=>{
                const componentType = element.__component.split(".")[1]
                if (componentType==="jumbo"){
                    //return <p>{JSON.stringify(element)}</p>
                    return <Jumbo key={key} images={element.images} text={element.text}/>
                } else if (componentType==="col2"){
                    return <Cols2 key={key} element={element}/>}
                else if (componentType==="fullwidth"){
                    return <Fullwidth key={key} element={element}/>
                } else {
                    return <p>test</p>
                }
            })}
        </>
    )

}