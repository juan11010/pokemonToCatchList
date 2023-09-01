import { Box, Title, Flex, Grid } from "@mantine/core";
import NewForm from "./components/NewForm";
import PokemonCard from "./components/PokemonCard";
import PokeApi from "./infrastructure/PokeApi";
import { useState } from "react";
import PokemonList from "./components/PokemonList";

function App() {
  const [pokemons, setPokemons] = useState([]);

  async function addPokemon(pokemon) {
    try {
      const newPokemon = await PokeApi.getPokemon(pokemon);
      if (!newPokemon.success) return;
      setPokemons((prev) => {
        return [...prev, newPokemon.data];
      });
    } catch (error) {
      console.dir(error);
    }
  }

  function deletePokemon(id) {
    setPokemons((prev) => {
      return prev.filter((pokemon) => pokemon.id !== id);
    });
  }

  return (
    <>
      <div>
        <Title order={1} align="center" my="lg">
          Pokemon To Catch List
        </Title>
        <Box maw={300} mx="auto">
          <NewForm onSubmit={addPokemon} />
        </Box>
      </div>
      <div></div>
      <Title order={2} align="center" my="lg">
        List
      </Title>
      <PokemonList pokemons={pokemons} deletePokemon={deletePokemon} />
    </>
  );
}

export default App;
