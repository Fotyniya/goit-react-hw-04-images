import { useState } from 'react';
//import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal'
import {Image} from '../ImageGalleryItem/ImageGalleryItem.styled'

export const ImageGalleryItem = ({item}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen( true);
        window.addEventListener( 'keydown' , (event) => {
            if (event.code === "Escape"){ setIsModalOpen( false)}})
    };
    
    const closeModal = () => {
        setIsModalOpen( false)
             }  
        
        return <>
            <Image src={item.webformatURL} alt={item.tags} onClick = {openModal} />
            {isModalOpen && <Modal onClose = {closeModal} content = {item} />}
        </>   
    } 

// ImageGalleryItem.propTypes = {
//     item: PropTypes.shape({
//         webformatURL: PropTypes.string.isRequired,
//         tags: PropTypes.string.isRequired,
//     }).isRequired,
// }