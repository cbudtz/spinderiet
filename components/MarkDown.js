import React from "react";
import ReactMarkdown from "react-markdown";
import { BASE_URL } from "../api/api";

export default function MarkDown({ children }) {
  if (!children) {
    children = "";
  }
  let markdown =
    children.replaceAll &&
    children.replaceAll("(/uploads/", "(" + BASE_URL + "uploads/");
  // if (markdown) {
  //     markdown = markdown.replaceAll("\n\n", "{x}");
  //     markdown = markdown.replaceAll("\n", "\xa0\xa0\n");
  //     markdown = markdown.replaceAll("{x}", "\n\n");
  //     console.log(markdown);
  // }
  const renderer = {
    image: ({ alt, src, title }) => {
      const width = Number(alt.split("=")[1]?.split("x")[0]);
      const height = Number(alt.split("=")[1]?.split("x")[1]);
      return (
        <div style={{ margin: "0 -15px 0px -15px" }}>
          <img
            alt={alt.split("=")[0]}
            src={src}
            title={title}
            style={{
              maxWidth: "100%",
              width: width,
              height: height,
            }}
          />
        </div>
      );
    },
  };
  return (
    <ReactMarkdown renderers={renderer} allowDangerousHtml>
      {markdown}
    </ReactMarkdown>
  );
}
