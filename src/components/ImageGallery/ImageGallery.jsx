import { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';

import { Loader } from  '../Loader'
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Gallery } from '../ImageGallery/ImageGallery.styled';


const API_KEY = '32817596-3735423159e4b61dcdcaf4a45';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 12;

export const ImageGallery = ({ query }) => {
    const [isLoading, setIsLoading] = useState('false');
    const [error, setError] = useState('null');
    const [gallery, setGallery] = useState([]);
    const [totalHits, setTotalHits] = useState(0);
    const [page, setPage] = useState(1);
    let queryRef = useRef('');
    let pageRef = useRef(1);

useEffect(() => {
    
    if (!query) {
        setIsLoading(false);
        return
    };

    async function fetchData(page){
        
        setIsLoading(true);
        try {
            const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
            const response = await axios.get(url);
            setGallery(prevState => [...prevState, ...response.data.hits])
            setTotalHits(response.data.totalHits);
        } catch(error) {
            setError(error)
            console.log (error)
        } finally {
            setIsLoading(false); 
        }
    };
    if (queryRef.current !== query) {
        setGallery([]);
        pageRef.current = 1;
        fetchData(pageRef.current);
    } else {
        fetchData(pageRef.current); 
    }
}, [error, query, page]);

const loadMore = () => {
    setPage(prevPage => prevPage + 1 );
    pageRef.current += 1;
    queryRef.current = query;
  };

    return (
        <>
        {isLoading && <Loader />}
        <Gallery>
            {gallery && gallery.map(item => 
                <li key = {item.id}>
                <ImageGalleryItem item = {item} />  
                </li>
            )}
        </Gallery>
        {((gallery)&&(page < totalHits/perPage)) && <Button onClick = { loadMore } />}
        </>
    );
};

ImageGallery.propTypes = {
    query: PropTypes.string.isRequired,
};