import { useState } from "react";
//import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { BsSearch } from 'react-icons/bs';
import { SearchContainer, SearchFormButton, SearchForm, SearchFormInput, SearchFormLabel } from "../Searchbar/Searchbar.styled"

export const Searchbar = ({onSearch}) => {
    const [value, setValue] = useState('');

    const handleChange = event => {
        setValue(event.currentTarget.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!value.trim()){
          return toast.error('This is an error! Enter a search query!');
        }
        onSearch(value);
        setValue('')
    };

        return(
        <SearchContainer>
            <SearchForm onSubmit = {handleSubmit} >
            <SearchFormButton type="submit" >
                <BsSearch />
            <SearchFormLabel >Search</SearchFormLabel>
            </SearchFormButton>

            <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value = {value}
            onChange = {handleChange}
            />
            </SearchForm>
        </SearchContainer>
        )
    }


// Searchbar.propTypes = {
//     onSearch: PropTypes.func.isRequired,
// }
