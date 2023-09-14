import { Box, Grid, Title } from "@mantine/core";
import NewForm from "./components/NewForm";
import PokeApi from "./infrastructure/PokeApi";
import { useEffect, useMemo, useState } from "react";
import PokemonList from "./components/PokemonList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [caughtPokemons, setCaughtPokemons] = useState([]);
  const [importantPokemons, setImportantPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const notify = () => toast.error("Pokemon not found");

  async function addPokemon(pokemon) {
    try {
      setIsLoading(true);
      const newPokemon = await PokeApi.getPokemon(pokemon);
      if (!newPokemon.success) {
        notify();
        return;
      }
      newPokemon.data.caught = false;
      newPokemon.data.important = false;
      newPokemon.data.id = crypto.randomUUID();
      setPokemons((prev) => {
        return [...prev, newPokemon.data];
      });
    } catch (error) {
      console.dir(error);
    } finally {
      setIsLoading(false);
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

  // useMemo(() => first, [second])

  useEffect(() => {
    const caught = pokemons.filter((pokemon) => pokemon.caught);
    const important = pokemons.filter(
      (pokemon) => pokemon.important && !pokemon.caught,
    );
    setCaughtPokemons(caught);
    setImportantPokemons(important);
  }, [pokemons]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <div>
        <Title order={1} align="center" my="lg">
          Pokemon To Catch List
        </Title>
        <Box maw={300} mx="auto">
          <NewForm onSubmit={addPokemon} isLoading={isLoading} />
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
