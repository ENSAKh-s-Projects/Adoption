import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              //images={pet.images}
              city={pet.city}
              idPhoto1={pet.idPhoto1}
              idPhoto2={pet.idPhoto1}
              idPhoto3={pet.idPhoto1}
              id={pet.id}
              userEmail={pet.userEmail}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
