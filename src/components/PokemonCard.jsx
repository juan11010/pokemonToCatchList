import {
  Badge,
  Card,
  Checkbox,
  Group,
  Image,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import NewButton from "./NewButton";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

function PokemonCard({
  id,
  name,
  height,
  weight,
  sprites,
  caught,
  important,
  deletePokemon,
  renamePokemon,
  updateCaughtState,
  toggleImportant,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [newName, setNewName] = useState("");

  function handleRename(e) {
    e.preventDefault();
    if (newName === "") return;
    const newNameLowerCase = newName.toLowerCase();
    renamePokemon(id, newNameLowerCase);
    setNewName("");
  }

  return (
    <Card shadow="lg" padding="lg" radius="md" withBorder my="md">
      <Card.Section>
        <Image src={sprites.front_default} height={160} alt={name} />
      </Card.Section>

      <Text weight={500} align="center">
        {name.toUpperCase()}
      </Text>
      <Group position="center" mt="md" mb="xs">
        <Checkbox
          label="Caught"
          checked={caught}
          onChange={(e) => updateCaughtState(id, e.target.checked)}
        />
        <Badge color="red" variant="light" size="lg">
          <Checkbox
            label="Important"
            checked={important}
            onChange={(e) => toggleImportant(id, e.target.checked)}
          />
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        Height: {height * 10}cm Weight: {weight}
      </Text>

      <Modal opened={opened} onClose={close} title="Rename Pokemon">
        <form onSubmit={handleRename}>
          <TextInput
            label="Type the new name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <NewButton variant="filled" type="submit" mt="md" onClick={close}>
            Rename
          </NewButton>
        </form>
      </Modal>

      <Group position="center" mt="sm" mb="xs">
        <NewButton onClick={open} disabled={!caught}>
          Rename
        </NewButton>
        <NewButton color="red" onClick={() => deletePokemon(id)}>
          Delete
        </NewButton>
      </Group>
    </Card>
  );
}

export default PokemonCard;
