import { Container, Flex } from "@mantine/core";
import PokemonCard from "./PokemonCard";

function PokemonList({
  pokemons,
  deletePokemon,
  renamePokemon,
  updateCaughtState,
  toggleImportant,
}) {
  return (
    <Container px="lg">
      <Flex
        mih={50}
        gap="xs"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        bg="dark"
      >
        {pokemons.length === 0 && "No pokemons"}
        {pokemons.map((pokemon) => {
          return (
            <PokemonCard
              {...pokemon}
              deletePokemon={deletePokemon}
              renamePokemon={renamePokemon}
              updateCaughtState={updateCaughtState}
              toggleImportant={toggleImportant}
              key={crypto.randomUUID()}
            />
          );
        })}
      </Flex>
    </Container>
  );
}

export default PokemonList;
