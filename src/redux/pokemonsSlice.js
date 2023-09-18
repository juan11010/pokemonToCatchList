import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
};

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    addpokemon: (state, action) => {
      const pokemon = {
        id: nanoid(),
        data: action.payload,
      };
      state.pokemons.push(pokemon);
    },

    deletePokemon: (state, action) => {
      state.pokemons = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.payload,
      );
    },

    renamePokemon: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addpokemon, deletePokemon } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
