import Tabs from '@/helper/tabs/Tabs';
import MatchTab from './MatchTab';

export default class TestTabs extends Tabs<MatchTab> {
  bet = new MatchTab('0', 'Bet', 'aaaaa', undefined, 1);
  chat = new MatchTab('1', 'Chat', 'aaaaa', 300001);
  picks = new MatchTab('2', 'Picks', 'aaaaa', 'aaa');
  standing = new MatchTab('3', 'Standing', 'aaaaa', 'aaa', 78);
  analysis = new MatchTab('4', 'Analysis', 'aaaaa', 'aaa', 79);
  lineup = new MatchTab('5', 'LineUp', 'aaaaa', 'aaa');
  private readonly lineUpIds = new Set([1, 2, 3, 4, 104910]);

  constructor() {
    super();
    this.picks.visible = false;
    this.standing.visible = false;
    this.analysis.visible = false;
    this.lineup.visible = false;
    this.add(this.bet).add(this.chat).add(this.picks).add(this.analysis).add(this.standing).add(this.lineup);
  }

  public compute(m: any): MatchTab[] {
    if (m.markets.some((i) => i.picksCount > 0)) {
      this.picks.visible = true;
    }

    if (m.namiId && m.namiId !== '0') {
      this.standing.visible = true;
      this.analysis.visible = true;
      if (this.#showLineUp(+m.leagueId)) {
        this.lineup.visible = true;
      }
    }

    if (m.ongoing) {
      const sort1 = this.analysis.sort;
      const sort2 = this.standing.sort;
      const sort3 = this.lineup.sort;

      this.standing.sort = sort1;
      this.lineup.sort = sort2;
      this.analysis.sort = sort3;
    }

    return super.compute();
  }

  monitor(id: any, match: model.sport.Match) {
    const tab = this.getTab(id)!;
    if (tab.featureId) {
      // 曝光埋点
    } else if (tab.statisticsType) {
      // 统计埋点
    }
    // 神策埋点
    const payload = {
      match_id: match.matchId,
      home_name: match.homeName,
      away_name: match.awayName,
      league_id: match.leagueId,
      league_name: match.leagueName,
      tab_name: tab.name,
    };

    console.log(payload);

    // sensorsTrack('matchDetailPageTabclick', payload);
  }

  #showLineUp(leagueId: number): boolean {
    return this.lineUpIds.has(leagueId);
  }
}
