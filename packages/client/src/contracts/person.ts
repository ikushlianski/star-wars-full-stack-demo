export interface Person {
  id: string;
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  species: string;
}

export interface RawPerson extends Person {
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
  homeworld: string;
  films: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}
