let allBooks = []; 

async function fetchBooks() {
  try {
    const response = await fetch('https://openlibrary.org/search.json?q=history&limit=50');
    const data = await response.json();
    allBooks = data.docs;
    renderBooks(allBooks); 
  } catch (error) {
    console.error('Failed to fetch books:', error);
  }
}

function renderBooks(books) {
  const bookContainer = document.getElementById('book-container');
  bookContainer.innerHTML = '';

  if (books.length === 0) {
    bookContainer.innerHTML = '<p class="text-center col-span-4 text-red-500 font-semibold">No books found.</p>';
    return;
  }

  books.forEach(book => {
    const coverId = book.cover_i;
    const title = book.title;
    const author = book.author_name ? book.author_name[0] : "Unknown Author";
    const coverImg = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : 'https://via.placeholder.com/128x180?text=No+Cover';

    const bookCard = document.createElement('div');
    bookCard.className = "flex flex-col items-center bg-white shadow-md rounded-lg p-4";

    bookCard.innerHTML = `
      <img src="${coverImg}" alt="${title}" class="w-40 h-60 object-cover mb-4">
      <p class="text-center text-sm text-gray-700 font-semibold">${title}</p>
      <p class="text-center text-sm text-gray-500">${author}</p>
    `;

    bookContainer.appendChild(bookCard);
  });
}

// Search input event listener
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filteredBooks = allBooks.filter(book =>
    book.title && book.title.toLowerCase().includes(query)
  );
  renderBooks(filteredBooks);
});

window.onload = fetchBooks;