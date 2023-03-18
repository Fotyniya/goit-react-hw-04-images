import { useState, useEffect } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

import { Loader } from  '../Loader'
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Gallery } from '../ImageGallery/ImageGallery.styled';

const API_KEY = '32817596-3735423159e4b61dcdcaf4a45';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 12;

export const ImageGallery = ({ query }) => {
    const [isLoading, setIsLoading] = useState('false');
    //const [error, setError] = useState('null');
    const [gallery, setGallery] = useState([]);
    const [totalHits, setTotalHits] = useState(0);
    const [page, setPage] = useState(1);

useEffect(() => {
    setPage(1);
    setGallery([]);
},[query]);

useEffect(() => {
        setIsLoading(true);

        axios.get(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
            .then((response) => {
                console.log(response)
                if (response.data.totalHits === 0) {
                    //setError ("Error! Try again!");
                    return toast.error("Error! Try again!");
                }
                    setGallery([...gallery, response.data.hits])
                    setTotalHits(response.data.totalHits);
            })
            .catch(error => {
                //setError(error);
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false)
            });
}, [page, query]);

const loadMore = () => {
    setPage(prevPage => prevPage + 1 )
  };

    return (
        <>
        {isLoading && <Loader />}
        <Gallery>
            {query && gallery.map(item => 
                <li key = {item.id}>
                <ImageGalleryItem item = {item} />  
                </li>
            )}
        </Gallery>
        {(query&&(page < totalHits/perPage)) && <Button onClick = { loadMore } />}
        </>
    );
};

