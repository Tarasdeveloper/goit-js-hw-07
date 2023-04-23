//  Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
//  Реализация делегирования на ul.gallery и получение url большого изображения.
//  Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
//  Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
//  Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.

import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");
let instance = "";

const galleryMarkup = galleryItems
  .map((item) => {
    return `<li class="gallery__item">
                <a class="gallery__link" href="${item.original}">
                    <img
                        class="gallery__image"
                        data-source="${item.original}"
                        src="${item.preview}" 
                        alt="${item.description}"
                    >
                </a>
            </li>`;
  })
  .join("");
galleryList.innerHTML = galleryMarkup;

galleryList.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
});

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  window.addEventListener("keydown", onCloseModal);

  instance = basicLightbox.create(`
   <img src="${event.target.dataset.source}">
   `);
  instance.show();
}

galleryList.addEventListener("click", onOpenModal);

function onCloseModal(event) {
  window.addEventListener("keydown", onCloseModal);
  if (event.code === "Escape") {
    instance.close();
    window.removeEventListener("keydown", onCloseModal);
  }
}
