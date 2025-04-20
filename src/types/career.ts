export type CareerFilterItem = 'ellen' | 'd.dive' | 'supertree';

export type CareerProject = {
  id: number;
  title: string;
  period: string;
  description: string;
};

export type CareerCompany = {
  id: CareerFilterItem;
  name: string;
  period: string;
  isWorking: boolean;
  slogan?: string;
  role: string;
  tags?: string[];
  logoUrl?: string;
  imageSize?: {
    width: number;
    height: number;
  };
  projects: CareerProject[];
};
