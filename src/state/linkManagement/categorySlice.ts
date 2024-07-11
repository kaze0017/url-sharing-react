import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryType } from "../../lib/interfaces/categoryType";
import { postCreateCategory } from "../../api/posts/postCreateCategory";

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (_,{ getState }) => {
    const state = getState() as { category: categoryState , auth: { token: string }};
    const response = await postCreateCategory({
      token: state.auth.token,
      data: state.category.selectedCategory,
    });
    return response?.data;
  }
);

interface categoryState {
  categoryMode: "edit" | "create";
  selectedCategory: CategoryType;
  selectedCategories: CategoryType[];
  userCategories: CategoryType[];
  categoriesToDisplay: CategoryType[];
  query: string;
}

const initialState: categoryState = {
  categoryMode: "create",
  selectedCategory: {
    category_id: 0,
    title: "",
    tags: [],
    owner: "add",
  },
  selectedCategories: [],
  userCategories: [],
  categoriesToDisplay: [],
  query: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryMode: (state, action: PayloadAction<"edit" | "create">) => {
      state.categoryMode = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<CategoryType>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedCategoryTags: (state, action: PayloadAction<string[]>) => {
      state.selectedCategory.tags = action.payload;
    },
    setSelectedCategoryThumbnail: (state, action: PayloadAction<string>) => {
      state.selectedCategory.thumbnail = action.payload;
    },
    setSelectedCategories: (state, action: PayloadAction<CategoryType[]>) => {
      state.selectedCategories = action.payload;
    },
    setUserCategories: (state, action: PayloadAction<CategoryType[]>) => {
      state.userCategories = action.payload;
    },
    setCategoriesToDisplay: (state, action: PayloadAction<CategoryType[]>) => {
      state.categoriesToDisplay = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createCategory.fulfilled, (state, action) => {
      console.log(action.payload);
      return initialState;
    });
  },
});

export const {
  setCategoryMode,
  setSelectedCategory,
  setSelectedCategoryTags,
  setSelectedCategoryThumbnail,
  setSelectedCategories,
  setUserCategories,
  setCategoriesToDisplay,
  setQuery,
} = categorySlice.actions;

export default categorySlice.reducer;
