import styled from "styled-components";
import { hFlex, vFlex } from "../../../elements/helpers";

export const ContentEl = styled.div`
  ${hFlex}
  width: 100%;
  justify-content: flex-start;
  height: 100%;
`;

export const CanvasEl = styled.div`
  width: 75%;
  height: 100%;
`;

export const SidebarEl = styled.div`
  ${vFlex}
  width: 25%;
  height: 100%;
  justify-content: flex-start;
`;

export const GraphOptionsEl = styled.div``;

export const GraphPropertiesEl = styled.div``;
