// Initialize book array and library element
const library = new Array();
const libraryBody = document.querySelector('tbody');

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

// Adds a book to the library
function addBookToLibrary(title, author, pages, read) {
  const toAdd = new Book(title, author, pages, read);
  library.push(toAdd);
};

// Creates the book element table row
function createBookTD(book) {
  // Create needed elements
  const row = document.createElement('tr');
  const titleData = document.createElement('td');
  const authorData = document.createElement('td');
  const pageData = document.createElement('td');
  const readData = document.createElement('td');

  // Populate empty elements with data
  titleData.textContent = book.title;
  authorData.textContent = book.author;
  pageData.textContent = book.pages;
  readData.textContent = book.read ? '✓' : '';

  // Append the elements
  row.appendChild(titleData);
  row.appendChild(authorData);
  row.appendChild(pageData);
  row.appendChild(readData);

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

initialBooks.forEach(book => addBookToLibrary(book.title, book.author, book.pages, book.read));

library.forEach(book => {
  libraryBody.appendChild(createBookTD(book));
});