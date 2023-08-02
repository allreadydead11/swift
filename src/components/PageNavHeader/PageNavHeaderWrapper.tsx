import styled from "styled-components";
import { COLORS } from "@constants/colors";

type pagenavheaderProps = {
  backgroundColor: string;
};

const PageNavHeaderWrapper = styled.div<pagenavheaderProps>`
  color: ${COLORS.black};
  padding: 25px 0px 20px 29px;
  background-color: ${(props) => props.backgroundColor};

  div {
    gap: 18px;
    display: flex;
    align-items: center;

    .heading {
      font-size: 16px;
      font-weight: 500;
    }
  }
`;
export default PageNavHeaderWrapper;
