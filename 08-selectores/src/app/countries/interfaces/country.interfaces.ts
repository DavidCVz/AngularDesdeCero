export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export interface SmallCountry {
  name: string;
  cca3: string;
  borders: string[];
}

export interface Country {
    name:         Name;
    cca3:         string;
    status:       Status;
    unMember:     boolean;
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    region:       string;
    subregion:    Subregion;
    languages:    Languages;
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    area:         number;
    demonyms:     Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    fifa?:        string;
    car:          Car;
    timezones:    string[];
    continents:   string[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  StartOfWeek;
    capitalInfo:  CapitalInfo;
    postalCode?:  PostalCode;
    cioc?:        string;
    borders?:     string[];
    gini?:        { [key: string]: number };
}

export interface CapitalInfo {
    latlng: number[];
}

export interface Car {
    signs: string[];
    side:  Side;
}

export enum Side {
    Left = "left",
    Right = "right",
}

export interface CoatOfArms {
    png?: string;
    svg?: string;
}

export interface Currencies {
    DKK?: All;
    FOK?: All;
    EUR?: All;
    MDL?: All;
    CZK?: All;
    GBP?: All;
    GGP?: All;
    CHF?: All;
    BGN?: All;
    ALL?: All;
    JEP?: All;
    RUB?: All;
    BYN?: All;
    UAH?: All;
    MKD?: All;
    SEK?: All;
    NOK?: All;
    IMP?: All;
    BAM?: BAM;
    PLN?: All;
    RSD?: All;
    RON?: All;
    HUF?: All;
    GIP?: All;
    ISK?: All;
}

export interface All {
    name:   string;
    symbol: string;
}

export interface BAM {
    name: string;
}

export interface Demonyms {
    eng:  Eng;
    fra?: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Flags {
    png:  string;
    svg:  string;
    alt?: string;
}

export interface Idd {
    root:     string;
    suffixes: string[];
}

export interface Languages {
    dan?: string;
    fao?: string;
    de?:  string;
    ron?: string;
    fra?: string;
    fin?: string;
    swe?: string;
    ces?: string;
    slk?: string;
    deu?: string;
    ltz?: string;
    ell?: string;
    eng?: string;
    nfr?: string;
    tur?: string;
    bul?: string;
    cnr?: string;
    lit?: string;
    sqi?: string;
    nrf?: string;
    spa?: string;
    ita?: string;
    rus?: string;
    bel?: string;
    ukr?: string;
    hrv?: string;
    mkd?: string;
    gsw?: string;
    roh?: string;
    nld?: string;
    lav?: string;
    nor?: string;
    glv?: string;
    bos?: string;
    srp?: string;
    nno?: string;
    nob?: string;
    smi?: string;
    mlt?: string;
    pol?: string;
    hun?: string;
    slv?: string;
    por?: string;
    gle?: string;
    cat?: string;
    isl?: string;
    est?: string;
    lat?: string;
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: Translation };
}

export interface Translation {
    official: string;
    common:   string;
}

export interface PostalCode {
    format: string;
    regex:  string;
}

export enum StartOfWeek {
    Monday = "monday",
}

export enum Status {
    OfficiallyAssigned = "officially-assigned",
    UserAssigned = "user-assigned",
}

export enum Subregion {
    CentralEurope = "Central Europe",
    EasternEurope = "Eastern Europe",
    NorthernEurope = "Northern Europe",
    SoutheastEurope = "Southeast Europe",
    SouthernEurope = "Southern Europe",
    WesternEurope = "Western Europe",
}
