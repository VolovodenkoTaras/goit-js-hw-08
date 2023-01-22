// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryRef = document.querySelector(".gallery");

const markup = galleryItems
    .map(({ preview, original, description }) => {
        return `<a class="gallery__item" href="${original}"><img class="gallery__image" src="${preview}" alt=${description}/></a>`;
    })
    .join("");

galleryRef.innerHTML = markup;

new SimpleLightbox(".gallery a", {
    captionsData: 'alt',
    loop: true,
    captionDelay: 250,
    animationSpeed: 300,
    animationSlide: true,
});