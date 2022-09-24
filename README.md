# 五子棋對戰

使用 React 實作的五子棋雙人對戰小遊戲。
[五子棋對戰連結](https://channy666.github.io/React_Practice_Gomoku/)

## 功能介紹

1. 棋盤大小為 19x19，棋子下在直線與橫線的交叉處。
2. 黑棋先下，接著換白棋，可經由右上方圖示確認當下要下的棋子顏色。
3. 黑白雙方輪流直到某一方的棋子連續五顆（或以上）連成一線即勝利，橫、縱、斜等四個方向皆可。
4. 每一步棋的顏色與位置將顯示於畫面上，點擊後即會顯示該步數時的棋盤狀態，若此時於棋盤上下棋，即會重新於該步數開始繼續下。
5. 當其中一方勝利，即無法再繼續下棋，可點擊最底下的重新開始按鈕清空棋盤，重新再來一局。

## 使用工具

- React: 以 function component + hooks 的方法實作。
- styled-components: React component 的樣式製作。
