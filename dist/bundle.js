/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/***/ (() => {

eval("document.addEventListener(\"DOMContentLoaded\", initApp);\r\n\r\n// Variabile per memorizzare l'ultima chiave del libro selezionato\r\nlet lastSelectedBookKey = null;\r\n\r\nfunction initApp() {\r\n    // Inizializza l'applicazione, ad esempio mostra un messaggio di benvenuto\r\n    displayWelcomeMessage();\r\n}\r\n\r\nfunction displayWelcomeMessage() {\r\n    const bookListSection = document.getElementById(\"bookList\");\r\n    bookListSection.innerHTML = \"<p>Benvenuto! Utilizza la casella di ricerca per trovare libri nella tua categoria preferita.</p>\";\r\n}\r\n\r\nfunction searchBooks() {\r\n    const categoryInput = document.getElementById(\"categoryInput\").value;\r\n    const apiUrl = `https://openlibrary.org/subjects/${categoryInput}.json`;\r\n\r\n    // Mostra il loader\r\n    const loader = document.getElementById(\"loader\");\r\n    loader.style.display = \"block\";\r\n\r\n    fetch(apiUrl)\r\n        .then(response => {\r\n            // Nascondi il loader quando la risposta è ricevuta\r\n            loader.style.display = \"none\";\r\n\r\n            if (!response.ok) {\r\n                throw new Error(`Errore nella richiesta: ${response.status}`);\r\n            }\r\n            return response.json();\r\n        })\r\n        .then(data => {\r\n            const books = data.works ? data.works : [];\r\n            displayBooks(books);\r\n        })\r\n        .catch(error => {\r\n            // Nascondi il loader in caso di errore\r\n            loader.style.display = \"none\";\r\n\r\n            console.error('Errore durante la ricerca dei libri:', error);\r\n            displayError();\r\n        });\r\n}\r\n\r\nfunction displayBooks(books) {\r\n    const bookListSection = document.getElementById(\"bookList\");\r\n    bookListSection.innerHTML = \"\";\r\n\r\n    books.forEach(book => {\r\n        const bookElement = document.createElement(\"div\");\r\n        bookElement.classList.add(\"book\");\r\n        const authors = book.authors ? book.authors.map(author => author.name).join(', ') : 'Autore non disponibile';\r\n        bookElement.innerHTML = `<p class=\"book-title\" data-key=\"${book.key}\">${book.title} - ${authors}</p>`;\r\n        bookListSection.appendChild(bookElement);\r\n    });\r\n\r\n    // Aggiungi event listener per la descrizione\r\n    const bookTitles = document.querySelectorAll(\".book-title\");\r\n    bookTitles.forEach(title => {\r\n        title.addEventListener(\"click\", () => {\r\n            const key = title.dataset.key;\r\n            showBookDescription(key);\r\n        });\r\n    });\r\n}\r\n\r\nfunction showBookDescription(key) {\r\n    // Controllo se la chiave del libro cliccato è uguale all'ultima chiave memorizzata\r\n    if (lastSelectedBookKey === key) {\r\n        console.log('La descrizione di questo libro è già stata caricata.');\r\n        return;\r\n    }\r\n\r\n    const descriptionUrl = `https://openlibrary.org${key}.json`;\r\n\r\n    fetch(descriptionUrl)\r\n        .then(response => {\r\n            if (!response.ok) {\r\n                throw new Error(`Errore nella richiesta: ${response.status}`);\r\n            }\r\n            return response.json();\r\n        })\r\n        .then(data => {\r\n            const bookDescriptionSection = document.getElementById(\"bookDescription\");\r\n            const description = extractDescription(data.description);\r\n            bookDescriptionSection.innerHTML = `<h3>${data.title}</h3><p>${description || 'Descrizione non disponibile'}</p>`;\r\n            \r\n            // Aggiorna l'ultima chiave del libro selezionato\r\n            lastSelectedBookKey = key;\r\n        })\r\n        .catch(error => {\r\n            console.error('Errore durante il recupero della descrizione del libro:', error);\r\n            displayError();\r\n        });\r\n}\r\n\r\nfunction extractDescription(description) {\r\n    if (!description) {\r\n        return ''; // Restituisce una stringa vuota se la descrizione non è presente\r\n    }\r\n\r\n    // Se la descrizione è una stringa, la restituisci direttamente\r\n    if (typeof description === 'string') {\r\n        return description.trim();\r\n    }\r\n\r\n    // Se la descrizione è un oggetto con un attributo \"value\", estrai la descrizione\r\n    if (typeof description === 'object' && description.value) {\r\n        return description.value.trim();\r\n    }\r\n\r\n    // Se la descrizione è un array di oggetti, cerca un campo \"value\"\r\n    if (Array.isArray(description)) {\r\n        const textValue = description.find(part => part.value)?.value;\r\n        if (textValue) {\r\n            return textValue.trim();\r\n        }\r\n    }\r\n\r\n    return ''; // Restituisce una stringa vuota se non è possibile estrarre la descrizione\r\n}\r\n\r\nfunction displayError() {\r\n    const bookListSection = document.getElementById(\"bookList\");\r\n    bookListSection.innerHTML = \"<p>Errore durante la ricerca dei libri. Si prega di inserire un genere valido.</p>\";\r\n}\r\n\n\n//# sourceURL=webpack://progettojavascriptadvanceddithomastinelli/./assets/js/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/js/app.js"]();
/******/ 	
/******/ })()
;
