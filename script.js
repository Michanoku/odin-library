const library = new Array();

function Book(title, author, pages) {
  this.title = title,
  this.author = author,
  this.page = pages,
  this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages) {
  const toAdd = new Book(title, author, pages);
  library.push(toAdd);
};