// Initialize book array and library element
const library = new Array();
const libraryBody = document.querySelector('tbody');
const form = document.querySelector('form');
const titleField = document.querySelector('#book-title');

// Book creator
function Book(title, author, pages, read) {
  if (!new.target) {
    return Error("Please create books with NEW.")
  }
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,
  this.id = crypto.randomUUID()
}

// Prototype function to toggle read
Book.prototype.toggleRead = function () {
  this.read = !this.read;
}

// Adds a book to the library
function addBookToLibrary(title, author, pages, read) {
  const toAdd = new Book(title, author, pages, read);
  library.push(toAdd);
};

// Creates the book element table row
function createBookTD(book) {
  // Create needed elements
  const row = document.createElement('tr');
  const elements = {
    titleData: document.createElement('td'),
    authorData: document.createElement('td'),
    pageData: document.createElement('td'),
    readData: document.createElement('td'),
    toggleRead: document.createElement('td'),
    deleteBook: document.createElement('td'),
  };
  const toggleButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  // Populate empty elements with data
  elements.titleData.textContent = book.title;
  elements.authorData.textContent = book.author;
  elements.pageData.textContent = book.pages;
  elements.readData.textContent = book.read ? '✓' : '';
  toggleButton.dataset.id = book.id;
  deleteButton.dataset.id = book.id;
  toggleButton.classList.add('toggle-button');
  deleteButton.classList.add('delete-button');
  toggleButton.textContent = 'Toggle Read';
  deleteButton.textContent = 'Delete Book';
  elements.toggleRead.appendChild(toggleButton);
  elements.deleteBook.appendChild(deleteButton);

  // Append the elements
  for (const key in elements) {
    row.appendChild(elements[key]);
  }
  return row;
}

// Some initial books to populate the site
const initialBooks = [
  {title: 'Hyperion', author: 'Dan Simmmons', pages: 482, read: true},
  {title: 'Leviathan Wakes', author: 'James S.A. Corey', pages: 577, read: true},
  {title: 'The Lord of The Rings', author: 'J.R.R. Tolkien', pages: 1077, read: false},
  {title: 'Appleseed', author: 'Masamume Shirow', pages: 800, read: true},
  {title: 'Kitchen', author: 'Banana Yoshimoto' , pages: 226, read: false},
];

// Function to empty and populate library
function createLibrary() {
  libraryBody.textContent = '';
  library.forEach(book => {
    libraryBody.appendChild(createBookTD(book));
  });
}

// Toggle the book of "id" read or unread
function toggleRead(id) {
  const book = library.find(book => book.id === id);
  book.toggleRead();
  createLibrary();
  addEventListeners();
}

// Delete the book of "id" from the library
function deleteBook(id) {
  const book = library.find(book => book.id === id);
  const index = library.indexOf(book);
  library.splice(index, 1);
  createLibrary();
  addEventListeners();
}

// Add Event Listeners for the buttons in the table
function addEventListeners() {
  const toggleButtons = document.querySelectorAll('.toggle-button');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      toggleRead(button.dataset.id);
    });
  });
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      deleteBook(button.dataset.id);
    });
  });
}

// Add initial books and display library
initialBooks.forEach(book => addBookToLibrary(book.title, book.author, book.pages, book.read));
createLibrary();
addEventListeners();

form.addEventListener('submit', (event) => {
  // Get the form and prevent the default behavior
  event.preventDefault();
  const formData = new FormData(form);

  // Add the book and recreate the library on the page
  addBookToLibrary(formData.get('book-title'), formData.get('book-author'), formData.get('book-pages'), formData.get('book-read') === "on");
  createLibrary();

  // Reset the form and focus back on the title field
  form.reset();
  titleField.focus();
});