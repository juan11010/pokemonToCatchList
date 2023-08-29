import axios from "axios";

const PokeApi = (function () {
  const API_URL = "https://pokeapi.co/api/v2/";
  const getPokemon = async (pokemon) => {
    try {
      const { data } = await axios.get(`${API_URL}pokemon/${pokemon}`);
      return { success: true, data };
    } catch (err) {
      console.dir(err);
      return { success: false };
    }
  };

  return { getPokemon };
})();

export default PokeApi;
