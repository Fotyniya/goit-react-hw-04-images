import { GlobalStyle } from "../components/GlobalStyle";
import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from "../components/ImageGallery/ImageGallery";
import { Searchbar } from "../components/Searchbar/Searchbar"

export const App = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (query) => {
    setQuery(query);
  };
  
    return (
      <div>
       <Toaster/>
       <Searchbar onSearch = { handleSubmit }/>
       <ImageGallery query = { query } />
       <GlobalStyle />
      </div>
    ); 
};
