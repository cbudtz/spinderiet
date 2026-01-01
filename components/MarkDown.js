import React from "react";
import ReactMarkdown from "react-markdown";
import { BASE_URL } from "../api/api";

export default function MarkDown({ children }) {
  if (!children) {
    children = "";
  }
  // Ensure markdown is always a string to avoid hydration issues
  let markdown = String(children);
  // Replace <br> tags with line breaks (two spaces + newline for markdown line breaks)
  // This handles both <br> and <br/> tags, case-insensitive
  markdown = markdown.replace(/<br\s*\/?>/gi, "  \n");
  
  if (typeof markdown.replaceAll === "function") {
    markdown = markdown.replaceAll("(/uploads/", "(" + BASE_URL + "uploads/");
  } else {
    // Fallback for environments without replaceAll (older Node.js)
    markdown = markdown.replace(/\(\/uploads\//g, "(" + BASE_URL + "uploads/");
  }
  // if (markdown) {
  //     markdown = markdown.replaceAll("\n\n", "{x}");
  //     markdown = markdown.replaceAll("\n", "\xa0\xa0\n");
  //     markdown = markdown.replaceAll("{x}", "\n\n");
  //     console.log(markdown);
  // }
  const components = {
    img: ({ alt, src, title }) => {
      // Parse dimensions from alt text format: "alt text=widthxheight"
      const altParts = alt?.split("=") || [];
      const altText = altParts[0] || alt || "";
      const dimensions = altParts[1]?.split("x") || [];
      const width = dimensions[0] ? Number(dimensions[0]) : NaN;
      const height = dimensions[1] ? Number(dimensions[1]) : NaN;
      
      // Only use width/height if they are valid numbers
      const hasValidWidth = !isNaN(width) && width > 0;
      const hasValidHeight = !isNaN(height) && height > 0;
      const isLargeImage = hasValidWidth && width > 500;
      
      const imgStyle = {
        height: "auto",
      };
      
      // Use maxWidth to set preferred size, but allow scaling down if container is smaller
      // Don't set width directly - let maxWidth handle both scaling up and down
      if (hasValidWidth) {
        imgStyle.maxWidth = `${Math.min(width, 100)}%`; // Use percentage, but cap at container size
        // Also set a pixel max-width as fallback
        imgStyle.width = "100%";
        imgStyle.maxWidth = `${width}px`;
      } else {
        imgStyle.maxWidth = "100%";
      }
      
      if (hasValidHeight && !hasValidWidth) {
        // Only set height if width wasn't set, to maintain aspect ratio
        imgStyle.height = `${height}px`;
      }
      
      // For large images, use block display
      // Use span with display: block instead of div to avoid nesting issues in <p> tags
      if (isLargeImage) {
        return (
          <span style={{ display: "block" }}>
            <img
              alt={altText}
              src={src}
              title={title}
              style={imgStyle}
            />
          </span>
        );
      }
      
      // For smaller images, use inline span
      return (
        <span style={{ display: "inline-block" }}>
          <img
            alt={altText}
            src={src}
            title={title}
            style={imgStyle}
          />
        </span>
      );
    },
  };
  return (
    <ReactMarkdown components={components}>
      {markdown}
    </ReactMarkdown>
  );
}
