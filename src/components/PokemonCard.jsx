import { Card, Checkbox, Group, Image, Text, Tooltip } from "@mantine/core";
import NewButton from "./NewButton";

function PokemonCard({ id, name, height, weight, sprites, deletePokemon }) {
  return (
    <Card shadow="lg" padding="lg" radius="md" withBorder my="md">
      <Card.Section>
        <Image src={sprites.front_default} height={160} alt={name} />
      </Card.Section>

      <Group position="center" mt="md" mb="xs">
        <Text weight={500}>{name.toUpperCase()}</Text>
        <Checkbox label="Caught" />
      </Group>

      <Text size="sm" color="dimmed">
        Height: {height} cm Weight: {weight}
      </Text>

      <Group position="center" mt="sm" mb="xs">
        <Tooltip label="Caught needs to be checked">
          <NewButton disabled>Rename</NewButton>
        </Tooltip>
        <NewButton color="red" onClick={() => deletePokemon(id)}>Delete</NewButton>
      </Group>
    </Card>
  );
}

export default PokemonCard;
