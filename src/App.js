import styled, { keyframes } from "styled-components";
import React, { useEffect, useRef } from "react";
import Board from "./component/Board";
import Moves from "./component/Moves";
import useGame from "./useGame";
import { MEDIA_QUERY_LG, MEDIA_QUERY_MD, MEDIA_QUERY_SM } from "./breakpoints";

const Container = styled.div`
  margin: 0 auto;
  width: 992px;
  padding: 10px 0px 30px 0px;
  position: relative;

  ${MEDIA_QUERY_LG} {
    width: 768px;
  }

  ${MEDIA_QUERY_MD} {
    width: 576px;
    padding: 10px 0px 25px 0px;
  }

  ${MEDIA_QUERY_SM} {
    width: 360px;
    padding: 8px 0px 30px 0px;
  }
`;

const Title = styled.div`
  margin: 0 auto;
  text-align: center;
  color: IndianRed;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 2px;
  padding: 20px 0px;

  ${MEDIA_QUERY_MD} {
    font-size: 30px;
    padding: 15px 0px 8px 0px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 23px;
    letter-spacing: 1.5px;
  }
`;

const Game = styled.div`
  display: flex;
  margin: 0 auto;

  ${MEDIA_QUERY_MD} {
    flex-direction: column;
  }
`;

const GameInfo = styled.div`
  margin-left: 10px;

  ${MEDIA_QUERY_LG} {
    margin-left: 0px;
  }
`;

const NextPlayer = styled.div`
  display: flex;
  width: 110px;
  height: 60px;
  border: 5px double grey;
  padding: 0px 13px;
  justify-content: space-between;
  align-items: center;
  background: tan;
  margin-left: 25px;

  ${MEDIA_QUERY_LG} {
    width: 100px;
    margin: 0px 15px 0px 6px;
    padding: 0px 9px;
  }

  ${MEDIA_QUERY_MD} {
    position: absolute;
    right: 40px;
    top: 22px;
    height: 45px;
    width: 85px;
    padding: 0px 7px;
    margin: 0;
    border: 4px double grey;
  }

  ${MEDIA_QUERY_SM} {
    height: 30px;
    width: 52px;
    right: 16px;
    top: 21px;
    padding: 0px 5px;
  }
`;

const Player = styled.div`
  background: ${(props) => props.$color};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 1px 1px 1px 1px grey;

  ${MEDIA_QUERY_LG} {
    width: 38px;
    height: 38px;
  }

  ${MEDIA_QUERY_MD} {
    width: 32px;
    height: 32px;
  }

  ${MEDIA_QUERY_SM} {
    width: 20px;
    height: 20px;
  }

  ${(props) =>
    props.$active &&
    `
    border: 4px solid gold;

    ${MEDIA_QUERY_LG} {
      border: 3.5px solid gold;
    }
  
    ${MEDIA_QUERY_SM} {
      border: 3px solid gold;
    }
  `}
`;

const Restart = styled.div`
  margin: 0px auto;
  text-align: center;

  button {
    color: IndianRed;
    background: none;
    font-size: 20px;
    font-weight: bold;
    border: 4px double silver;
    width: 120px;
    height: 45px;
    border-radius: 5px;
    cursor: pointer;
    letter-spacing: 1.5px;

    ${MEDIA_QUERY_SM} {
      font-size: 15px;
      width: 110px;
      height: 40px;
      letter-spacing: 1px;
    }

    :hover {
      border-color: IndianRed;
    }
  }
`;

const jumpingWords = keyframes`
  0%   {transform: rotate(0deg)}
  25%  {transform: rotate(5deg)}
  75%  {transform: rotate(-5deg)}
  100% {transform: rotate(0deg)}
`;

const Winner = styled.div`
  color: gold;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  padding: 0px 0px 5px 20px;
  animation-name: ${jumpingWords};
  animation-iteration-count: infinite;
  animation-duration: 1s;

  ${(props) =>
    !props.$winner &&
    `
    visibility: hidden;
  `}

  ${MEDIA_QUERY_LG} {
    font-size: 25px;
    padding: 0px 0px 5px 8px;
  }

  ${MEDIA_QUERY_MD} {
    position: absolute;
    left: 40%;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 20px;
    padding: 15px 0px 5px 8px;
    left: 35%;
  }
`;

function App() {
  const {
    history,
    currentStep,
    nextPlayerBlack,
    winningLine,
    handleRestartClick,
    handleJumpToStep,
    handleSquareClick,
  } = useGame();

  const scrollIntoViewRef = useRef();

  useEffect(() => {
    if (scrollIntoViewRef.current) {
      scrollIntoViewRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [currentStep, scrollIntoViewRef]);

  return (
    <Container>
      <Title>- 五子棋對戰 -</Title>
      <Game>
        <Board
          currentStep={currentStep}
          handleSquareClick={handleSquareClick}
          history={history}
          winningLine={winningLine}
        />
        <GameInfo>
          <Winner $winner={winningLine}>{`${
            nextPlayerBlack ? "黑棋" : "白棋"
          } 獲勝！`}</Winner>
          <NextPlayer>
            <Player $color={"black"} $active={nextPlayerBlack}></Player>
            <Player $color={"white"} $active={!nextPlayerBlack}></Player>
          </NextPlayer>
          <Moves
            history={history}
            handleJumpToStep={handleJumpToStep}
            currentStep={currentStep}
            scrollIntoViewRef={scrollIntoViewRef}
          />
        </GameInfo>
      </Game>
      <Restart>
        <button onClick={handleRestartClick}>重新開始</button>
      </Restart>
    </Container>
  );
}

export default App;
