import React from "react";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const Markdown = ({ children, className }: { children: string; className?: string }) =>
  React.createElement("markdown", {
    className,
    dangerouslySetInnerHTML: {
      __html: unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeSanitize)
        .use(rehypeExternalLinks, { target: "_blank", rel: ["noreferrer"] })
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .processSync(children).value,
    },
  });

export default React.memo(Markdown);
