import { Box, Grid, Title } from "@mantine/core";
import NewForm from "./components/NewForm";
import PokeApi from "./infrastructure/PokeApi";
import { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [caughtPokemons, setCaughtPokemons] = useState([]);
  const [importantPokemons, setImportantPokemons] = useState([]);

  async function addPokemon(pokemon) {
    try {
      const newPokemon = await PokeApi.getPokemon(pokemon);
      if (!newPokemon.success) return;
      newPokemon.data.caught = false;
      newPokemon.data.important = false;
      newPokemon.data.id = crypto.randomUUID();
      setPokemons((prev) => {
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

  function updateCaughtState(id, caught) {
    setPokemons((currentPokemons) => {
      return currentPokemons.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, caught } : pokemon,
      );
    });
  }

  function toggleImportant(id, important) {
    setPokemons((currentPokemons) => {
      return currentPokemons.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, important } : pokemon,
      );
    });
  }

  useEffect(() => {
    const caught = pokemons.filter((pokemon) => pokemon.caught);
    const important = pokemons.filter((pokemon) => pokemon.important);
    setCaughtPokemons(caught);
    setImportantPokemons(important);
  }, [pokemons]);

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
            <PokemonList
              pokemons={pokemons}
              deletePokemon={deletePokemon}
              renamePokemon={renamePokemon}
              updateCaughtState={updateCaughtState}
              toggleImportant={toggleImportant}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={2} align="center" my="lg">
              Important to catch
            </Title>
            <PokemonList
              pokemons={importantPokemons}
              deletePokemon={deletePokemon}
              renamePokemon={renamePokemon}
              updateCaughtState={updateCaughtState}
              toggleImportant={toggleImportant}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={2} align="center" my="lg">
              Pokemon Caught
            </Title>
            <PokemonList
              pokemons={caughtPokemons}
              deletePokemon={deletePokemon}
              renamePokemon={renamePokemon}
              updateCaughtState={updateCaughtState}
              toggleImportant={toggleImportant}
            />
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}

export default App;
