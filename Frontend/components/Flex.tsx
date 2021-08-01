import React from "react";
export const Flex = (props: FlexProps): JSX.Element => (
  <div
    className={props.className}
    style={{
      display: "flex",
      justifyContent: props.justifyContent || "flex-start",
      flexDirection: props.flexDirection || "row",
      flexGrow: props.flexGrow || 0,
      flexBasis: props.flexBasis || "auto",
      flexShrink: props.flexShrink || 1,
      flexWrap: props.flexWrap || "nowrap",
      flex: props.flex || "0 1 auto",
      alignItems: props.alignItems || "stretch",
      margin: props.margin || "0",
      padding: props.padding || "0",
      width: props.width || "auto",
      height: props.height || "auto",
      maxWidth: props.maxWidth || "none",
    }}
  >
    {props.children}
  </div>
);

interface FlexProps {
  children?: any;
  className?: string;
  container?: boolean;
  flexDirection?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "initial"
    | "inherit";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  alignItems?:
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "baseline"
    | "initial"
    | "inherit";
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number;
  flex?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
}
