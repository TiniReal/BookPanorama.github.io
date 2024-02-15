document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    // Inizializza l'applicazione, ad esempio mostra un messaggio di benvenuto
    displayWelcomeMessage();
}

function displayWelcomeMessage() {
    const bookListSection = document.getElementById("bookList");
    bookListSection.innerHTML = "<p>Benvenuto! Utilizza la casella di ricerca per trovare libri nella tua categoria preferita.</p>";
}

function searchBooks() {
    const categoryInput = document.getElementById("categoryInput").value;
    const apiUrl = `https://openlibrary.org/subjects/${categoryInput}.json`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore nella richiesta: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const books = data.works ? data.works : [];
            displayBooks(books);
        })
        .catch(error => {
            console.error('Errore durante la ricerca dei libri:', error);
            displayError();
        });
}

function displayBooks(books) {
    const bookListSection = document.getElementById("bookList");
    bookListSection.innerHTML = "";

    books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        const authors = book.authors ? book.authors.map(author => author.name).join(', ') : 'Autore non disponibile';
        bookElement.innerHTML = `<p class="book-title" data-key="${book.key}">${book.title} - ${authors}</p>`;
        bookListSection.appendChild(bookElement);
    });

    // Aggiungi event listener per la descrizione
    const bookTitles = document.querySelectorAll(".book-title");
    bookTitles.forEach(title => {
        title.addEventListener("click", () => {
            const key = title.dataset.key;
            showBookDescription(key);
        });
    });
}

function showBookDescription(key) {
    const descriptionUrl = `https://openlibrary.org${key}.json`;

    fetch(descriptionUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore nella richiesta: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const bookDescriptionSection = document.getElementById("bookDescription");
            const description = extractDescription(data.description);
            bookDescriptionSection.innerHTML = `<h3>${data.title}</h3><p>${description || 'Descrizione non disponibile'}</p>`;
        })
        .catch(error => {
            console.error('Errore durante il recupero della descrizione del libro:', error);
            displayError();
        });
}

function extractDescription(description) {
    if (!description) {
        return ''; // Restituisce una stringa vuota se la descrizione non è presente
    }

    // Se la descrizione è una stringa, la restituisci direttamente
    if (typeof description === 'string') {
        return description.trim();
    }

    // Se la descrizione è un array di oggetti, cerca un campo "value"
    if (Array.isArray(description)) {
        const textValue = description.find(part => part.value)?.value;
        if (textValue) {
            return textValue.trim();
        }
    }

    return ''; // Restituisce una stringa vuota se non è possibile estrarre la descrizione
}


function displayError() {
    const bookListSection = document.getElementById("bookList");
    bookListSection.innerHTML = "<p>Errore durante la ricerca dei libri. Si prega di inserire un genere valido.</p>";
}
