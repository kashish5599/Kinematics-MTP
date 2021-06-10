import styled from "styled-components";
import { grayBorder } from "../../../elements/colorSchema";
import { hFlex } from "../../../elements/helpers";

export const NavbarEl = styled.div`
  ${hFlex}
  box-sizing: border-box;
  padding: 1em;
  width: 100%;
  justify-content: flex-start;
  border-bottom: 1px solid ${grayBorder};
`;
