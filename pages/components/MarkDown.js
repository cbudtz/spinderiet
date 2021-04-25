import React from "react";
import ReactMarkdown from "react-markdown";
import {BASE_URL} from "../api/api";


export default function MarkDown({children}) {
    if (!children) {children=""}
    const markdown = children.replaceAll && children.replaceAll("(/uploads/", "("+ BASE_URL + "uploads/");
    const renderer =  {
        image: ({alt, src, title,
        }) => {
            const width = Number(alt.split("=")[1]?.split("x")[0]);
            const height = Number(alt.split("=")[1]?.split("x")[1]);
           return (
                <img
                    alt={alt.split("=")[0]}
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