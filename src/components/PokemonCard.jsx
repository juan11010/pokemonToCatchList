import { Card, Image, Text, Group } from "@mantine/core";

function PokemonCard({ pokemonData }) {
  return (
    <Card shadow="lg" padding="lg" radius="md" withBorder my="md">
      <Card.Section>
        <Image
          src={pokemonData.sprites.front_default}
          height={160}
          alt={pokemonData.name}
        />
      </Card.Section>

      <Group position="center" mt="md" mb="xs">
        <Text weight={500}>{pokemonData.name}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        height: {pokemonData.height}
        weight: {pokemonData.weight}
      </Text>
    </Card>
  );
}

export default PokemonCard;
