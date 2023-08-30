import { Box, Title, Flex, Grid } from "@mantine/core";
import NewForm from "./components/NewForm";
import PokemonCard from "./components/PokemonCard";
import PokeApi from "./infrastructure/PokeApi";
import { useState } from "react";

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
      <Grid mt="lg">
        <Grid.Col span={4}>
          <Title order={2} align="center" my="lg">
            List
          </Title>
          <Flex
            mih={50}
            gap="xs"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            {pokemons.length === 0 && "No pokemons"}
            {pokemons.map((pokemon) => {
              return <PokemonCard pokemonData={pokemon} key={pokemon.id} />;
            })}
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          <Title order={2} align="center">
            Hola
          </Title>
        </Grid.Col>
        <Grid.Col span={4}>
          <Title order={2} align="center">
            Mundo
          </Title>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default App;
