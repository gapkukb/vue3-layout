import Tabs from '@/helper/tabs/Tabs';
import BetTab from './BetTab';

export default class BetTabs extends Tabs {
  private all = new BetTab(-1, 'All');
  private player = new BetTab(10086, 'Player');
  private popular = new BetTab(0, 'Popular');
  private fulltime = new BetTab(1, 'Fulltime');
  private half = new BetTab(2, 'Half');
  private quarter = new BetTab(8, 'Quarter');
  private endingGame = new BetTab(41, 'EndingGame');

  #mapper = {
    0: this.popular,
    1: this.fulltime,
    2: this.half,
    8: this.quarter,
    41: this.endingGame,
  };

  constructor(gameMaps: any, playerBetMark: boolean) {
    super();
    this.endingGame.hide();

    this.player.toggle(playerBetMark);
    this.add(this.all, this.player, this.endingGame);

    let BetTab: BetTab | null = null;

    for (const gameMap of gameMaps) {
      if (gameMap in this.#mapper) {
        BetTab = this.#mapper[gameMap];
        BetTab!.show();
      } else if (gameMap > 10 && gameMap < 41) {
        BetTab = new BetTab(gameMap, `Map ${gameMap - 10}`);
        this.#mapper[gameMap] = BetTab!;
      }

      BetTab && this.add(BetTab);
    }

    console.log(this.#mapper);
  }

  public getTab(id: string | number): BetTab | undefined {
    if (id === -1) return this.all;
    if (id === 10086) return this.player;
    return this.#mapper[id];
  }

  public compute(gameMaps: any, playerBetMark: boolean): BetTab[] {
    this.player.toggle(playerBetMark);
    const tabs = gameMaps.map((item: any) => this.#mapper[item]);
    return [...this.rawTabs.slice(0, 2), ...tabs].sort((a, b) => a.sort - b.sort);
  }
}
