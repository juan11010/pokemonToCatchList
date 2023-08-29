import { TextInput } from "@mantine/core";
import NewButton from "./NewButton";
import { useState } from "react";

function NewForm() {
  const [newPokemon, setNewPokemon] = useState("");

  return (
    <>
      <form>
        <TextInput
          label="Search Pokemon"
          placeholder="Example: Pikachu"
          value={newPokemon}
          onChange={(e) => setNewPokemon(e.target.value)}
        />
        <NewButton variant="filled" mt="md">
          Search
        </NewButton>
      </form>
    </>
  );
}

export default NewForm;
