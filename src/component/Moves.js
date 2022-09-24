import styled from "styled-components";
import { MEDIA_QUERY_LG, MEDIA_QUERY_MD, MEDIA_QUERY_SM } from "../breakpoints";

const MoveContainer = styled.ol`
  margin-right: 20px;
  height: 540px;
  overflow: scroll;

  ${MEDIA_QUERY_LG} {
    padding-left: 23px;
    height: 470px;
    margin-right: 18px;
  }

  ${MEDIA_QUERY_MD} {
    display: flex;
    height: 90px;
    margin: 46px 50px 30px 50px;
    flex-wrap: wrap;
  }

  ${MEDIA_QUERY_SM} {
    margin: 50px 15px 30px 15px;
    height: 75px;
  }

  li {
    font-size: 18px;
    margin-top: 10px;
    color: silver;

    ${MEDIA_QUERY_LG} {
      font-size: 14px;
    }

    ${MEDIA_QUERY_MD} {
      margin: 4px 20px;
    }

    ${MEDIA_QUERY_SM} {
      font-size: 13px;
    }
  }
`;

const Move = styled.button`
  background: none;
  color: IndianRed;
  border: 4px double silver;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  height: 40px;
  width: 125px;
  margin-top: 8px;
  cursor: pointer;

  ${MEDIA_QUERY_LG} {
    font-size: 15px;
    width: 106px;
  }

  ${MEDIA_QUERY_MD} {
    margin-top: 5px;
  }

  ${MEDIA_QUERY_SM} {
    height: 35px;
    width: 100px;
    font-size: 13px;
    border: 3px double silver;
    margin-top: 3px;
  }

  :hover {
    border-color: IndianRed;
  }

  ${(props) =>
    props.$active &&
    `
    border: 4px solid grey;

    :hover {
      border: 4px solid grey;
    }
  `}
`;

export default function Moves({
  history,
  currentStep,
  handleJumpToStep,
  scrollIntoViewRef,
}) {
  return (
    <MoveContainer>
      {history.map(
        (history) =>
          history.step !== 0 && (
            <li key={history.step}>
              <Move
                $active={history.step === currentStep}
                ref={history.step === currentStep ? scrollIntoViewRef : null}
                onClick={() => handleJumpToStep(history.step)}
              >{`${history.step % 2 === 0 ? "白棋" : "黑棋"} [${
                history.move[0] + 1
              }, ${history.move[1] + 1}]`}</Move>
            </li>
          )
      )}
    </MoveContainer>
  );
}
