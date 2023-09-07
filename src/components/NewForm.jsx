import { TextInput } from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import NewButton from "./NewButton";
import schema from "../schema";

function NewForm({ onSubmit }) {
  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      pokemon: "",
    },
  });

  function handleSubmit(values) {
    const pokemonLowerCase = values.pokemon.toLowerCase();
    onSubmit(pokemonLowerCase);
    form.setFieldValue("pokemon", "");
  }

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Add Pokemon"
          placeholder="Example: Pikachu"
          {...form.getInputProps("pokemon")}
        />
        <NewButton variant="filled" type="submit" mt="md">
          Search
        </NewButton>
      </form>
    </>
  );
}

export default NewForm;
