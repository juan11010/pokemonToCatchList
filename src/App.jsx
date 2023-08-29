import { Box, Title } from "@mantine/core";
import NewForm from "./components/NewForm";
import NewButton from "./components/NewButton";
import PokeApi from "./infrastructure/PokeApi";

function App() {

  const handleClickTest = async () => {
    try {
      const charmander = await PokeApi.getPokemon("charmander");
      console.log(charmander);
      
    } catch (error) {
      console.dir(error);
    }
  };

  return (
    <>
      <div>
        <Title order={1} align="center" my="lg">
          Pokemon To Catch List
        </Title>
        <Box maw={300} mx="auto">
          <NewForm />
        </Box>
      </div>
      <Title order={2} align="center" my="lg">
        List
      </Title>
      <NewButton onClick={handleClickTest}>Test</NewButton>
    </>
  );
}

export default App;
