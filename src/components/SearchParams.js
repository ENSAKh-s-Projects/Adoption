import { useEffect, useState } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
import axios from 'axios';

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [city, setCity] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //runs only on the first render
  // async function requestPets() {
  //   const res = await fetch(
  //     `http://localhost:8080/pets?animal=${animal}&city=${city}&breed=${breed}`
  //   );
  //   const json = await res.json();

  //   setPets(json.pets);
  //   console.log(json.pets[0]);
  // }
  function requestPets() {
    axios.get(`http://localhost:8080/pets?animal=${animal}&city=${city}&breed=${breed}`)
      .then(res => {
        console.log(res);
        setPets(res.data);
      })
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          City
          <input
            id="city"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
