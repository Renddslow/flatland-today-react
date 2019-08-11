import React from "react";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: 32px;
`;

const Logo = () => (
  <IconWrapper>
    <svg viewBox="0 0 52 52">
      <g id="logo-glyph">
        <rect fill="#808080" width="51.499" height="16.333" />
        <rect y="17.5" fill="#808080" width="51.499" height="16.333" />
        <rect y="35" fill="#808080" width="16.332" height="16.332" />
        <rect x="17.583" y="35" fill="#ACC35B" width="33.916" height="16.332" />
      </g>
    </svg>
  </IconWrapper>
);

export default Logo;
