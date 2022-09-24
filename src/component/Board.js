import styled from "styled-components";
import { newArray } from "../constance";
import { MEDIA_QUERY_LG, MEDIA_QUERY_MD, MEDIA_QUERY_SM } from "../breakpoints";

const BoardContainer = styled.div`
  margin: 20px;
  position: relative;
  height: 660px;
  width: 660px;

  ${MEDIA_QUERY_LG} {
    margin: 17px;
    height: 600px;
    width: 600px;
  }

  ${MEDIA_QUERY_MD} {
    height: 525px;
    width: 525px;
    margin: 13px 13px 10px 20px;
  }

  ${MEDIA_QUERY_SM} {
    height: 340px;
    width: 340px;
    margin: 7px 9px 4px 10px;
  }
`;

const Coordinates = styled.div`
  position: absolute;
  margin-left: 37px;
  display: flex;

  ${MEDIA_QUERY_LG} {
    margin-left: 35px;
  }

  ${MEDIA_QUERY_MD} {
    margin-left: 30px;
  }

  ${MEDIA_QUERY_SM} {
    margin-left: 12px;
  }

  ${(props) =>
    props.$direction === "col" &&
    `
    flex-direction: column;
    margin: 41px 0 0 -5px;

    ${MEDIA_QUERY_LG} {
      margin: 37px 0 0 -5px;
    }
  
    ${MEDIA_QUERY_MD} {
      margin: 32px 0 0 -5px;
    }
  
    ${MEDIA_QUERY_SM} {
      margin: 22px 0 0 -7px;
    }
  `};
`;

const Coordinate = styled.div`
  height: 31.9px;
  width: 32px;
  text-align: center;
  color: silver;

  ${MEDIA_QUERY_LG} {
    height: 28.3px;
    width: 28.3px;
    font-size: 15px;
  }

  ${MEDIA_QUERY_MD} {
    height: 25.7px;
    width: 25.7px;
    font-size: 14px;
  }

  ${MEDIA_QUERY_SM} {
    height: 16.8px;
    width: 17px;
    font-size: 12px;
  }
`;

const Squares = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 25px;
  margin-top: 20px;
  padding: 13px;
  background: tan;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  ${MEDIA_QUERY_LG} {
    margin-left: 23px;
    padding: 10px;
  }

  ${MEDIA_QUERY_MD} {
    margin-left: 23px;
    padding: 4px;
  }

  ${MEDIA_QUERY_SM} {
    margin: 16px 2px 0px 11px;
    padding: 2px;
  }
`;

const Lines = styled(Squares)`
  background: transparent;
  position: absolute;
  top: 16px;
  left: 16px;
  pointer-events: none;
  box-shadow: none;

  ${MEDIA_QUERY_LG} {
    top: 14px;
    left: 14px;
  }

  ${MEDIA_QUERY_MD} {
    top: 13px;
    left: 13px;
  }

  ${MEDIA_QUERY_SM} {
    top: 9px;
    left: 9px;
  }
`;

const Square = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid tan;
  background: tan;
  display: flex;
  align-items: center;
  justify-content: center;

  ${MEDIA_QUERY_LG} {
    height: 26.5px;
    width: 26.5px;
  }

  ${MEDIA_QUERY_MD} {
    height: 24px;
    width: 24px;
  }

  ${MEDIA_QUERY_SM} {
    height: 15px;
    width: 15px;
  }
`;

const Line = styled(Square)`
  border-color: black;
  background: transparent;
`;

const Frame = styled.div`
  border: 2px solid black;
  background: transparent;
  pointer-events: none;
  height: 573px;
  width: 573px;
  position: absolute;
  top: 49px;
  left: 54px;

  ${MEDIA_QUERY_LG} {
    height: 510px;
    width: 510px;
    top: 43px;
    left: 46px;
  }

  ${MEDIA_QUERY_MD} {
    height: 465px;
    width: 465px;
    top: 37px;
    left: 40px;
  }

  ${MEDIA_QUERY_SM} {
    height: 303px;
    width: 303px;
    top: 26px;
    left: 22px;
  }
`;

const Piece = styled.div`
  background: black;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  z-index: 3;

  ${MEDIA_QUERY_LG} {
    height: 25px;
    width: 25px;
  }

  ${MEDIA_QUERY_MD} {
    height: 22px;
    width: 22px;
  }

  ${MEDIA_QUERY_SM} {
    height: 14px;
    width: 14px;
  }

  ${(props) =>
    props.value === "white" &&
    `
    background: white;
  `}

  ${(props) =>
    props.$win &&
    `
    border: 2px solid gold;
    transform: scale(1.2);
  `}
`;

const squaresRow = newArray(0, 19);
const squaresColumn = newArray(0, 19);
const coordinates = newArray(1, 19);
const boardRow = newArray(0, 18);
const boardColumn = newArray(0, 18);

export default function Board({
  currentStep,
  history,
  winningLine,
  handleSquareClick,
}) {
  return (
    <BoardContainer>
      <Coordinates $direction="row">
        {coordinates.map((coordinate) => (
          <Coordinate key={coordinate}>{coordinate}</Coordinate>
        ))}
      </Coordinates>
      <Coordinates $direction="col">
        {coordinates.map((coordinate) => (
          <Coordinate key={coordinate}>{coordinate}</Coordinate>
        ))}
      </Coordinates>
      <Squares>
        {squaresRow.map((row) =>
          squaresColumn.map((column) => (
            <Square
              key={`${row}, ${column}`}
              onClick={() => handleSquareClick(row, column)}
            >
              {history[currentStep].board[row][column] && (
                <Piece
                  value={history[currentStep].board[row][column]}
                  $win={
                    winningLine &&
                    winningLine.some(
                      (square) => square[0] === row && square[1] === column
                    )
                  }
                />
              )}
            </Square>
          ))
        )}
      </Squares>
      <Lines>
        {boardRow.map((row) =>
          boardColumn.map((column) => <Line key={`${row}, ${column}`} />)
        )}
      </Lines>
      <Frame />
    </BoardContainer>
  );
}
