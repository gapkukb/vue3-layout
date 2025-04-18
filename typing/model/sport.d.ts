declare namespace model.sport {
  export interface Match {
    matchId: string;
    leagueId: string;
    homeId: number;
    awayId: number;
    leagueName: string;
    homeName: string;
    homeLogo: string;
    awayName: string;
    awayLogo: string;
    leagueLogo: string;
    eventStatus: TStatus;
    runningStatus: string;
    liveHomeScore: number;
    liveAwayScore: number;
    globalShowTime: Date;
    namiId: string;
    sabaStreamViewFlag: string;
    sportraderStreamViewFlag: string;
    cignalStreamViewFlag: string;
    namiStreamViewFlag: string;
    sportTypeId: string;
    sportTypeName: string;
    matchDate: Date;
    matchTime: string;
    inPlayTime: string;
    leagueSort: number;
    livePeriod: number;
    inPlayTime2: string;
    inPlayTime3: string;
    totalBetTypeNumber: number;
    gameSession: number;
    leagueAliasFlag: number;
    leagueDefineLogo: string;
    delayLive: boolean;
    isHT: boolean;
    sessionTime: number;
    overTime: number;
    isCountDownTimer: boolean;
    liveTimer: Date;
    pausePeriod: number;
    namiOtherStreamViewFlag: string;
    cignalSort: number;
    sportraderSort: number;
    namiSort: number;
    namiOtherSort: number;
    sabaSort: number;
    markets: Market[];
    basketBallLiveScore: { [key: string]: number };
    updateTime: Date;
    streamingOption: number;
    channelCode: string;
    cardPic: string;
    detailPic: string;
    leagueAlias: string;
    playerBetMark: boolean;
    hasPlayerBet: boolean;
  }

  export enum TStatus {
    Running = 'running',
    Suspend = 'suspend',
  }

  export interface Market {
    betType: number;
    gameMap: number;
    betTypeName: string;
    betSelectionGroupNames: string[] | null;
    betSelectionGroupNumber: number;
    marketDataList: MarketDataList[];
    expandFlag: boolean;
    picksCount: number;
    dataIndex?: number;
  }

  export interface MarketDataList {
    matchId: number;
    betType: number;
    marketId: number;
    marketStatus: TStatus;
    gameMap: null;
    gameRound: null;
    resourceid: null | string;
    oddTypeCount: number;
    category: number;
    showCategory: string;
    sort: number;
    combo: number;
    selections: Selection[];
    selections2: Selection[];
  }

  export interface Selection {
    price: string;
    allPrice: AllPrice | null;
    oddRange: number;
    key: string;
    keyEn: null | string;
    point: number | null;
    point2: null;
    decimalPrice: null;
    hongKongPrice: null;
  }

  export interface AllPrice {
    oddRange: number;
    decimalPrice: number;
    hongKongPrice: number;
  }
}
