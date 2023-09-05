import { Box, Grid, Title } from "@mantine/core";
import NewForm from "./components/NewForm";
import PokeApi from "./infrastructure/PokeApi";
import { useState } from "react";
import PokemonList from "./components/PokemonList";

function App() {
  const [pokemons, setPokemons] = useState([]);

  async function addPokemon(pokemon) {
    try {
      const newPokemon = await PokeApi.getPokemon(pokemon);
      if (!newPokemon.success) return;
      newPokemon.data.caught = false;
      setPokemons((prev) => {
        console.log(newPokemon.data);
        return [...prev, newPokemon.data];
      });
    } catch (error) {
      console.dir(error);
    }
  }

  function deletePokemon(id) {
    setPokemons((currentPokemon) => {
      return currentPokemon.filter((pokemon) => pokemon.id !== id);
    });
  }

  function renamePokemon(id, newName) {
    setPokemons((currentPokemon) => {
      return currentPokemon.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, name: newName } : pokemon,
      );
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
      <div>
        <Grid>
          <Grid.Col span={4}>
            <Title order={2} align="center" my="lg">
              Pokemon List
            </Title>
            <PokemonList pokemons={pokemons} deletePokemon={deletePokemon} renamePokemon={renamePokemon}/>
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={2} align="center" my="lg">
              Pokemon Urgent
            </Title>
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={2} align="center" my="lg">
              Pokemon Caught
            </Title>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}

export default App;
