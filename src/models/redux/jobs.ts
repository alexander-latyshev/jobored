export interface IRequestJobs {
  objects: IVacancy[];
  total: number;
  more: boolean;
  subscription_id: number;
  subscription_active: boolean;
}

export interface IVacancy {
  canEdit: boolean
  is_closed: boolean
  id: number
  id_client: number
  payment_from: number
  payment_to: number
  date_pub_to: number
  date_archived: number
  date_published: number
  address?: string
  profession: string
  work: any;
  compensation: any;
  candidat: string;
  metro: IMetro[];
  currency: string;
  vacancyRichText: string;
  covid_vaccination_requirement: ICovidVaccinationRequirement;
  moveable: boolean;
  agreement: boolean;
  anonymous: boolean;
  is_archive: boolean;
  is_storage: boolean;
  type_of_work: ITypeOfWork;
  place_of_work: IPlaceOfWork;
  education: IEducation;
  experience: IExperience;
  maritalstatus: IMaritalstatus;
  children: IChildren;
  client: IClient;
  languages: any[];
  driving_licence: any[];
  catalogues: ICatalogue[];
  agency: IAgency;
  town: ITown2;
  already_sent_on_vacancy: boolean;
  rejected: boolean;
  response_info: any[];
  phone: string;
  phones: IPhone[];
  fax: any;
  faxes: any;
  favorite?: boolean;
  client_logo: string;
  highlight: boolean;
  age_from: number;
  age_to: number;
  gender: IGender;
  firm_name: string;
  firm_activity: string;
  link: string;
  latitude?: number;
  longitude?: number;
  video?: IVideo;
}

export interface IMetro {
  id: number;
  title: string;
  id_metro_line: number;
}

export interface ICovidVaccinationRequirement {
  id: number;
  title: string;
}

export interface ITypeOfWork {
  id: number;
  title: string;
}

export interface IPlaceOfWork {
  id: number;
  title: string;
}

export interface IEducation {
  id: number;
  title: string;
}

export interface IExperience {
  id: number;
  title: string;
}

export interface IMaritalstatus {
  id: number;
  title: string;
}

export interface IChildren {
  id: number;
  title: string;
}

export interface IClient {
  id: number;
  title: string;
  link: string;
  industry: any[];
  description: string;
  vacancy_count: number;
  staff_count: string;
  client_logo: string;
  address?: string;
  addresses: IAddress[];
  url: string;
  short_reg: boolean;
  is_blocked: boolean;
  registered_date: number;
  town: ITown;
}

export interface IAddress {
  addressString: string;
  latitude: number;
  longitude: number;
  phones: any[];
}

export interface ITown {
  id: number;
  title: string;
  declension: string;
  hasMetro: boolean;
  genitive: string;
}

export interface ICatalogue {
  id: number;
  title: string;
  key: number;
  positions: IPosition[];
}

export interface IPosition {
  id: number;
  title: string;
  key: number;
}

export interface IAgency {
  id: number;
  title: string;
}

export interface ITown2 {
  id: number;
  title: string;
  declension: string;
  hasMetro: boolean;
  genitive: string;
}

export interface IPhone {
  number: string;
  additionalNumber: any;
}

export interface IGender {
  id: number;
  title: string;
}

export interface IVideo {
  id: string;
  url: string;
  type: string;
}
