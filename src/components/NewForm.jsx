import { TextInput } from "@mantine/core";
import { useState } from "react";
import NewButton from "./NewButton";

function NewForm({ onSubmit }) {
  const [newPokemon, setNewPokemon] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newPokemon === "") return;
    const pokemonLowerCase = newPokemon.toLowerCase();
    onSubmit(pokemonLowerCase);
    setNewPokemon("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Search Pokemon"
          placeholder="Example: Pikachu"
          value={newPokemon}
          onChange={(e) => setNewPokemon(e.target.value)}
        />
        <NewButton variant="filled" type="submit" mt="md">
          Search
        </NewButton>
      </form>
    </>
  );
}

export default NewForm;
