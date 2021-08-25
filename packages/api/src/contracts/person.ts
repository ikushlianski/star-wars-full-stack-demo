export interface Person {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

export interface RawPerson extends Person {
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}
