import { COLORS } from "@constants/colors";
import styled from "styled-components";

const WelcomeWrapper = styled.div`
  .slide-box {
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 25px 0;

    .slide-image {
      border: 3px solid #2b2b2b27;

      width: 300px;
      height: 300px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: center;
        object-position: center;
      }
    }

    .slide-header {
      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 25px;
      line-height: 30px;
      text-align: center;
      color: ${COLORS.black};
      width: 242px;
    }

    .slide-description {
      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 15px;
      line-height: 18px;
      text-align: center;
      color: ${COLORS.black};
      width: 80%;
    }
  }

  .create-account-btn {
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      padding: 12px;
      height: 50px;
      width: 300px;
      color: ${COLORS.white};
      border-radius: 12px;
      border: none;
      background: ${COLORS.blue};
      margin-top: 20px;
    }
  }

  .signin-btn {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    p {
      color: ${COLORS.black};
      font-weight: 600;

      a {
        text-decoration: none;
        padding-left: 5px;
        color: ${COLORS.blue};
      }
    }
  }
`;

export default WelcomeWrapper;
