"use client";

import styled from "styled-components";

export default function ScrollableText({
  text,
  width = "auto",
  height = "auto",
  ...props
}) {
  return (
    <Text style={{ width: width, height: height }} {...props}>
      {text}
    </Text>
  );
}

const Text = styled.div`
  height: ${(props) => props.height};
  overflow-y: auto;
  padding-right: 10px;
`;
