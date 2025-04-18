import Tab from '@/helper/tabs/Tab';

export default class MatchTab extends Tab {
  featureId?: number;
  statisticsType?: number;

  constructor(id: string | number, name: string, icon: string, featureId?: number, statisticsType?: number) {
    super(id, name, icon);
    this.featureId = featureId;
    this.statisticsType = statisticsType;
  }
}
