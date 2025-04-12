import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

import axios from 'axios';

type PropsType = {
  activeCategory: number;
  filter?: string;
  searchValue?: string;
  currentPage: number;
};

type CompanyProps = {
  bs: string;
  catchPhrase: string;
  name: string;
};
type AddressProps = {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo: {lat: string; lng: string};

};

export type ItemType = {
  address: AddressProps;
  company: CompanyProps;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;

};

export type ItemTypePost = {
  userId: number;
  userData: ItemType | undefined;
  id: number;
  title: string;
  body: string;
};

export const fetchPosts = createAsyncThunk<{ data: any[]; pagesCount: number }, PropsType>(
  'users/fetchPosts',
  async (props) => {

    console.log("==========props ======",props)

    const users = await axios.get<ItemType[]>(
      `https://jsonplaceholder.typicode.com/users`,
    );

    const startPost = (props.currentPage - 1) * 5;

    let { data } = await axios.get<ItemTypePost[]>(
      `https://jsonplaceholder.typicode.com/posts`,
    );

    data.forEach(post=>{
      post.userData = users.data.find(user => user.id === post.userId);
    })

      let paginationLength = data.filter(post => { 
        return props.searchValue != "" && props.searchValue ? (post.userData?.name.toUpperCase().includes(props.searchValue.toUpperCase())
          || post.userData?.username.toUpperCase().includes(props.searchValue.toUpperCase())
          || post.userData?.website.toUpperCase().includes(props.searchValue.toUpperCase())
          || post.userData?.email.toUpperCase().includes(props.searchValue.toUpperCase())
          || post.userData?.phone.toUpperCase().includes(props.searchValue.toUpperCase())
          || (post.userData?.address && (post.userData?.address.city.toUpperCase().includes(props.searchValue.toUpperCase()) || post.userData?.address.street.toUpperCase().includes(props.searchValue.toUpperCase())))
          || (post.userData?.company && (post.userData?.company.bs.toUpperCase().includes(props.searchValue.toUpperCase()) || post.userData?.company.catchPhrase.toUpperCase().includes(props.searchValue.toUpperCase()) || post.userData?.company.name.toUpperCase().includes(props.searchValue.toUpperCase())))
        )
          : true;
      });
    
     data = paginationLength.slice(startPost, startPost + 5)
     const pagesCount = Math.ceil(paginationLength.length / 5);

    return { data, pagesCount };
  },
);

export const fetchItemById = createAsyncThunk('users/fetchPost', async (id: number) => {
  const { data } = await axios.get<any[]>(
    `https://jsonplaceholder.typicode.com/users?id=${id}`,
  );

  return data as any[];
});

enum status {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

interface PostsSliceState {
  items: ItemTypePost[];
  currentItem: ItemType;
  pagesCount: number;
  status: status;
}

const initialState: PostsSliceState = {
  items: [],
  currentItem: {} as ItemType,
  pagesCount: 0,
  status: status.LOADING,
};

export const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.items = [];
      state.pagesCount = 0;
      state.status = status.LOADING;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.pagesCount = action.payload.pagesCount;
      state.status = status.LOADED;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.items = [];
      state.pagesCount = 0;
      state.status = status.ERROR;
    });
    builder.addCase(fetchItemById.pending, (state, action) => {
      state.currentItem = {} as ItemType;
      state.status = status.LOADING;
    });
    builder.addCase(fetchItemById.fulfilled, (state, action) => {
      state.currentItem = action.payload[0];
      state.status = status.LOADED;
    });
    builder.addCase(fetchItemById.rejected, (state, action) => {
      state.currentItem = {} as ItemType;
      state.status = status.ERROR;
    });
  },
});

export const selectPost = (state: RootState) => state.post;
export default postsSlice.reducer;
