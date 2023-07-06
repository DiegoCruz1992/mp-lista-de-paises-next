interface Country {
  name: {
    common: string;
  };

  translations: {
    por: {
      common: string;
    }
  };

  flags: {
    svg: string;
    alt: string;
  };

  capital?: string;
  region: string;
  subregion?: string;
  population: number;
  languages?: {
    [key: string]: string;
  };

  borders?: string[];
  cca3: string;
}

interface countryCard {
  name: string;
  ptName: string;
  flag: string;
  flagAlt: string;
}

