interface ZipCode {
  name: string;
}

export interface City {
  zips: [ZipCode];
}
