import React from "react";
import ReactMarkdown from "react-markdown";
import {BASE_URL} from "../api/api";


export default function MarkDown({children}) {
    if (!children) {children=""}
    let markdown = children.replaceAll && children.replaceAll("(/uploads/", "("+ BASE_URL + "uploads/");
    const renderer =  {
        image: ({alt, src, title,
        }) => {
            const width = Number(alt.split("=")[1]?.split("x")[0]);
            const height = Number(alt.split("=")[1]?.split("x")[1]);
            const smallSrc = src.replaceAll("/uploads/", "/uploads/small_") + " 640w"
           return (
                <img
                    alt={alt.split("=")[0]}
                    srcSet = {smallSrc}
                    src={src}
                    title={title}
                    style={{ maxWidth: "100%",width:width,
                        height:height}}  />
            )
        }
    };
    return(
        <ReactMarkdown  renderers={renderer} allowDangerousHtml>
            {markdown}
        </ReactMarkdown>
    )
}