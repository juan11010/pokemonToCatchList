import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
};

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    addPokemons: (state, action) => {
      const PokemonData = action.payload;
      state.pokemons.push(PokemonData);
    },

    deletePokemon: (state, action) => {
      state.pokemons = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.payload,
      );
    },

    // renamePokemon: (state, action) => {
    //   const { id, newName } = action.payload
    //
    // },
  },
});

// Action creators are generated for each case reducer function
export const { addPokemons, deletePokemon } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
