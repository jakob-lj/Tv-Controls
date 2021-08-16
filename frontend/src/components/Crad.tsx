import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const CardWrapper = styled.div`
  display: flex;
  margin: 2em;
  flex-direction: column;
  width: 200px;
  padding: 3em;
  padding-right: 3em;
  padding-left: 3em;
  background: #a4c5f9;
  border-radius: 9px;
  padding-right: 6em;
  padding-left: 6em;
  text-align: center;
  height: min-content;

  &:hover {
    background-color: #39486c;
    cursor: pointer;
  }
`;

const CardIcon = styled.img`
  margin: auto;
  width: 80px;
  height: 80px;
  margin-bottom: 1em;
`;

const CardTitle = styled.h3`
  width: max-content;
  margin: auto;
  margin-top: 1em;
`;

export { Wrapper, CardWrapper, CardIcon, CardTitle };
