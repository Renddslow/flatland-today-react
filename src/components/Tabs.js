import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import qs from "qs";

const TabHeader = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: scroll;
  display: flex;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const Tab = styled.button`
  padding: 12px 24px;
  scroll-snap-align: start;
  font-size: 18px;
  color: ${props => (props.active ? "#221E3B" : "#BDBBC4")};
  position: relative;
  appearance: none;
  background: transparent;
  border: 0;
  outline: none;
  cursor: pointer;

  &::after {
    content: "";
    width: 6px;
    height: 6px;
    background: ${props => (props.active ? "#446df6" : "transparent")};
    display: block;
    border-radius: 50%;
    left: calc(50% - 3px);
    position: absolute;
    bottom: 0;
  }
`;

const TabBody = styled.div`
  padding: 24px;
  box-sizing: border-box;
  height: 100%;
`;

const Tabs = props => {
  const activeTab = props.activeId
    ? props.children.find(({ id }) => id === props.activeId)
    : props.children[0];

  const activeRef = useRef();
  const headerRef = useRef();

  useEffect(() => {
    const { left } = activeRef.current.getBoundingClientRect();
    headerRef.current.scrollTo({
      left,
      behavior: "smooth"
    });

    const params = qs.parse(window.location.search.replace("?", ""));
    const url = `${window.location.pathname}?${qs.stringify({
      ...params,
      tab: activeTab.id
    })}`;

    window.history.pushState({}, "", url);
  }, [activeTab]);

  const body = React.cloneElement(activeTab.body, {
    data: props.data,
    week: props.week
  });

  return (
    <div>
      <TabHeader ref={headerRef}>
        {props.children.map(tab => (
          <Tab
            key={tab.id}
            active={activeTab.id === tab.id}
            onClick={() => props.onChange(tab.id)}
            ref={activeTab.id === tab.id ? activeRef : undefined}
          >
            {tab.title}
          </Tab>
        ))}
      </TabHeader>
      <TabBody>{body}</TabBody>
    </div>
  );
};

export default Tabs;
