import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryType } from "../../lib/interfaces/categoryType";
import { ContentType } from "../../lib/interfaces/contentType";
import { postCreateCategory } from "../../api/posts/postCreateCategory";
import { getUserCategories } from "../../api/gets/getUserCategories";
import { postAddLinksToCategory } from "../../api/posts/postAddLinksToCategory";
import { SharedLinkType } from "../../lib/interfaces";
import { postDeleteCategory } from "../../api/posts/postDeleteCategory";
import Category from "../../components/linkManagement/Category";

export const addLinksToCategory = createAsyncThunk(
  "category/addLinksToCategory",
  async (_, { getState }) => {
    const state = getState() as {
      auth: { token: string };
      content: { selectedContents: ContentType[] };
      category: {
        selectedCategories: CategoryType[];
        selectedCategoriesIds: number[];
      };
      link: { selectedLinkIds: number[] };
    };

    const link_ids = state.link.selectedLinkIds;
    let category_id = 0;
    if (state.category.selectedCategoriesIds.length > 0) {
      category_id = state.category.selectedCategoriesIds[0];
    } else {
      category_id = state.category.selectedCategories[0].category_id;
    }
    const response = await postAddLinksToCategory({
      token: state.auth.token,
      category_id: category_id,
      link_ids: link_ids,
    });
    return response?.data;
  }
);

export const fetchUserCategories = createAsyncThunk(
  "category/fetchUserCategories",
  async (_, { getState }) => {
    const state = getState() as { auth: { token: string } };
    const response = await getUserCategories(state.auth.token);
    response.sort((a: CategoryType, b: CategoryType) => {
      const dateA = new Date(a.publication_date);
      const dateB = new Date(b.publication_date);
      return dateB.getTime() - dateA.getTime();
    });

    return response;
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (_, { getState }) => {
    const state = getState() as {
      category: categoryState;
      auth: { token: string };
    };
    const response = await postCreateCategory({
      token: state.auth.token,
      data: state.category.selectedCategory,
    });
    return response?.data;
  }
);

export const deleteSelectedCategories = createAsyncThunk(
  "category/deleteCategories",
  async (_, { getState }) => {
    const state = getState() as {
      category: categoryState;
      auth: { token: string };
    };
    console.log("selected categories", state.category.selectedCategories);
    state.category.selectedCategories.forEach((category) => {
      const response = postDeleteCategory({
        token: state.auth.token,
        id: category.category_id,
      });
      console.log("response", response);
    });

    return null;
  }
);

interface categoryState {
  categoryMode: "edit" | "create";
  selectedCategory: CategoryType;
  selectedCategories: CategoryType[];
  selectedCategoriesIds: number[];
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
    owner: {
      user_id: 0,
      email: "",
      first_name: "",
      last_name: "",
      tags: [],
    },
    publication_date: "",
    links: [],
    thumbnail: "/images/defaults/thumbnails/th1.jpg",
  },
  selectedCategories: [],
  userCategories: [],
  categoriesToDisplay: [],
  query: "",
  selectedCategoriesIds: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    initSelectedCategory: (state) => {
      state.selectedCategory = initialState.selectedCategory;
    },
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
    setSelectedCategoryContentDescription: (
      state,
      action: PayloadAction<string>
    ) => {
      state.selectedCategory.contentDescription = action.payload;
    },
    setSelectedCategoryTitle: (state, action: PayloadAction<string>) => {
      state.selectedCategory.title = action.payload;
    },
    setSelectedCategories: (state, action: PayloadAction<CategoryType[]>) => {
      state.selectedCategories = action.payload;
      console.log("selectedCategory", state.selectedCategory);
      state.selectedCategoriesIds = action.payload.map(
        (Category) => Category.category_id
      );
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
    setSelectedCategoriesIds: (state, action: PayloadAction<number[]>) => {
      state.selectedCategoriesIds = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createCategory.fulfilled, (state, action) => {
      return initialState;
    });
    builder.addCase(fetchUserCategories.fulfilled, (state, action) => {
      state.userCategories = action.payload;
      state.categoriesToDisplay = action.payload;
    });
  },
});

export const {
  initSelectedCategory,
  setCategoryMode,
  setSelectedCategory,
  setSelectedCategoryTitle,
  setSelectedCategoryTags,
  setSelectedCategoryThumbnail,
  setSelectedCategoryContentDescription,
  setSelectedCategories,
  setUserCategories,
  setCategoriesToDisplay,
  setQuery,
  setSelectedCategoriesIds,
} = categorySlice.actions;

export default categorySlice.reducer;
