``` typescript
// 模板模式例子
namespace Template {
  // 回合制游戏通用模板
  abstract class Game {
    // 玩家数量
    private playersCount!: number;

    // 初始化游戏
    abstract initializeGame(): void;

    // 切换玩家回合
    abstract makePlay(player: number): void;

    // 尝试结束游戏，同时返回状态
    abstract endOfGame(): boolean;

    // 打印胜者
    abstract printWinner(): void;

    // 开始一局游戏
    // 不应当被重写，但ts中不支持const关键字
    playOneGame(playersCount: number): void {
      this.playersCount = playersCount;
      this.initializeGame();
      let j = 0;
      while (!this.endOfGame()) {
        this.makePlay(j);
        j = (j + 1) % playersCount;
      }
      this.printWinner();
    }
  }

  // 大富翁
  class Monopoly extends Game {
    initializeGame() {
      // ...
    }

    makePlay(player: number) {
      // ...
    }

    endOfGame() {
      // ...
      return true;
    }

    printWinner() {
      // ...
    }

    /* Specific declarations for the Monopoly game. */

    // ...
  }

  // 象棋
  class Chess extends Game {
    /* Implementation of necessary concrete methods */

    initializeGame() {
      // ...
    }

    makePlay(player: number) {
      // ...
    }

    endOfGame() {
      return true;
    }

    printWinner() {
      // ...
    }
  }

  class Player {
    static main() {
      const chessGame = new Chess();
      chessGame.initializeGame();
      chessGame.playOneGame(2); // 两人开始下棋
    }
  }

  Player.main();
}
```