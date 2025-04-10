declare namespace model.app {
  interface Configuration {
    VISITOR_LOGIN_SWITCH: string;
    GLIFE_VIEW_SWITCH: GlifeViewSwitch[];
    NEWS_ARENAPLUS_JSON: string;
    peryagame_google_clientId: string;
    NEWS_ARENAPLUS_APL_JSON: string;
    gameOnlineUsers: GameOnlineUser[];
    GAME_JSON: string;
    GAMEPLUS_GAME_JSON: string;
    PROMO_GAMEPLUS_JSON: string;
    gameLimitSwitch: boolean;
    NEWS_JSON: string;
    sport_facebook_client_id: string;
    peryagame_facebook_clientId: string;
    p_c_s: string;
    MARGIN_SWITCH: string;
    GAMEPLUS_HOME_MARQUEE: GameplusHomeMarquee[];
    b_c_s: string;
    google_client_id: string;
    AP_GAME_BALANCE_SECURITY_AMOUNT: string;
    PHONE_BIND_SWITCH: string;
    isRoomMode: boolean;
    isOtpSwitch: boolean;
    appsfly_relation: AppsflyRelation[];
    'C66#APL_BANNER_30_S_H5_JSON': string;
    s_w_c_s: string;
    GLIFE_REDIRECT_SWITCH: FullSwitchRegister[];
    PRE_POPUB_BOX: Box[];
    appinstall_switch: SwitchRegister[];
    ATMOSPHERE_CONFIGURATION: string;
    randNews: RandNew[];
    POPUB_BOX: Box[];
    MAINTENANCE_IMG: MaintenanceImg[];
    g_h_c_s: string;
    completeRegis: boolean;
    b_n_c_s: string;
    onlineCsUrl: string;
    'C66#APL_BANNER_30_S_APP_JSON': string;
    S_POPUP_BOX: Box[];
    HOME_MARQUEE: HomeMarquee[];
    NEW_ATMOSPHERE_CONFIGURATION: { [key: string]: NewAtmosphereConfiguration[] };
    facebook_client_id: string;
    isSiteMaintenance: boolean;
    FULL_SWITCH_REGISTER: FullSwitchRegister[];
    site_game_display_list: string;
    SWITCH_REGISTER: SwitchRegister[];
    GLIFE_APPLETS_SWITCH: FullSwitchRegister[];
    gameOnlineUsersV2: GameOnlineUser[];
    g_c_s: string;
    PROMO_ARENAPLUS_JSON: string;
    AP_DEPOSIT_BALANCE_SECURITY_AMOUNT: string;
    refactor: boolean;
    STATEMENT_SWITCH: string;
    GOOGLE_RECAPTCHER_FLAG: string;
    PROMO_JSON: string;
    BANNER_JSON: string;
    PROMOMAIN_JSON: string;
    PROMO_INTEGRAL_JSON: string;
    GOOGLE_RECAPTCHER_SITE_KEY: string;
    PROMO_GRAYSCALE_JSON: string;
    moreExcitingGames: boolean;
    clientIp: string;
    HOT_GAME_JSON: string;
  }

  export interface FullSwitchRegister {
    productModule: string;
    productType: string;
    switch: number;
  }

  export interface GameplusHomeMarquee {
    text: string;
    id: string;
  }

  export interface GlifeViewSwitch {
    oline_num_multiple: string;
    id: string;
    view_switch: string;
  }

  export interface HomeMarquee {
    text: string;
    id: string;
    title: string;
    release_time: Date;
  }

  export interface MaintenanceImg {
    img: string;
    mc: string;
    id: string;
  }

  export interface NewAtmosphereConfiguration {
    tabTextColor: TabTextColor;
    tabImage: string;
    tabSort: number;
    tabText: string;
    tabType: number;
    id: number;
    tabUrl: string;
  }

  export enum TabTextColor {
    Empty = '',
    The000000 = '#000000',
  }

  export interface Box {
    notice_title: string;
    start_time: Date;
    herf_url: string;
    notice_content: string;
    mc: string;
    totalTimes: string;
    end_time: Date;
    banner: string;
    dailyTimes?: string;
    id: string;
    lx: string;
    is_login: string;
    'daily Times'?: string;
  }

  export interface SwitchRegister {
    id: string;
    switch: string;
  }

  export interface AppsflyRelation {
    parent: string;
    enable: string;
    Android_link_name: string;
    palcode: string;
    IOS_short_link: string;
    Android_short_link: string;
    id: string;
    IOS_link_name: string;
  }

  export interface GameOnlineUser {
    jsonConfig: string;
    gameKindName: string;
    gameKindId: number;
    onlineNum: string;
    logoUrl: string;
  }

  export interface RandNew {
    postType: number;
    introduce: string;
    publishDate: Date;
    updateTime: Date;
    title: string;
    type: number;
    updateName: string;
    content: string;
    contentAddr: string;
    pin: number;
    createTime: Date;
    extData: string;
    sortOrder: Date;
    auditStatus: number;
    id: number;
    postTypeStr: string;
    targetUser: string;
    createName: string;
    titleUrl: string;
  }
}
