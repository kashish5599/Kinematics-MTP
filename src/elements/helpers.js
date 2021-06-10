import { css } from "styled-components";

export const square = (size) => css`
  height: ${size};
  width: ${size};
  min-height: ${size};
  min-width: ${size};
`;

export const vFlex = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const hFlex = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const center = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const vCenter = css`
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
`;

export const hCenter = css`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const background = (image, fit = "contain") => css`
  background: url(${image}) center center / ${fit} no-repeat;
`;

export const overlay = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const singleLineText = css`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const horizontalSplit = (parts, spacing) => css`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  & > * {
    width: ${(100 - spacing * (parts - 1) * 2) / parts}%;
    margin: 0 ${spacing}%;

    &:nth-child(${parts}n+1) {
      margin-left: 0;
    }

    &:nth-child(${parts}n) {
      margin-right: 0;
    }
  }
`;
