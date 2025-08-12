const library = new Array();
const libraryBody = document.querySelector('tbody');

function Book(title, author, pages) {
  if (!new.target) {
    return Error("Please create books with NEW.")
  }
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages) {
  const toAdd = new Book(title, author, pages);
  library.push(toAdd);
};

function createBookTD(book) {
  const row = document.createElement('tr');
  const titleData = document.createElement('td');
  const authorData = document.createElement('td');
  const pageData = document.createElement('td');
  titleData.textContent = book.title;
  authorData.textContent = book.author;
  pageData.textContent = book.pages;
  row.appendChild(titleData);
  row.appendChild(authorData);
  row.appendChild(pageData);
  return row;
}

const initialBooks = [
  {title: 'Hyperion', author: 'Dan Simmmons', pages: 482},
  {title: 'Leviathan Wakes', author: 'James S.A. Corey', pages: 577},
  {title: 'The Lord of The Rings', author: 'J.R.R. Tolkien', pages: 1077},
  {title: 'Appleseed', author: 'Masamume Shirow', pages: 800},
  {title: 'Kitchen', author: 'Banana Yoshimoto' , pages: 226},
];

initialBooks.forEach(book => addBookToLibrary(book.title, book.author, book.pages));

library.forEach(book => {
  libraryBody.appendChild(createBookTD(book));
});