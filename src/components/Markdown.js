import React from "react";
import marked from "marked";
import styled from "styled-components";

marked.setOptions({
  gfm: true
});

const MarkdownContainer = styled.div`
  margin-bottom: 26px;
  font-size: 21px;
  font-weight: 300;
  letter-spacing: -0.5px;
  line-height: 28px;
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;

  a {
    color: #736ced;
    padding: 4px;
    border-radius: 8px;
    text-decoration: none;

    &:hover,
    &:focus {
      background: #e7f0ff;
    }
  }

  & * {
    margin: 14px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ul {
    padding: 0 24px;
  }
`;

const Markdown = ({ children }) => {
  return (
    <MarkdownContainer dangerouslySetInnerHTML={{ __html: marked(children) }} />
  );
};

export default Markdown;
