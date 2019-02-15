function Book (title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
 

function UI() {}

UI.prototype.addNewBook = function(book){
  const list = document.querySelector('#book-list');

  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><button type="button" class="close"><span aria-hidden="true">&times;</span></button></td>
  `;

  list.appendChild(row);
}


UI.prototype.showAlert = function(message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  
  div.appendChild(document.createTextNode(message));

  const parent = document.querySelector('.card');
  const title = document.querySelector('.card-title');

  parent.insertBefore(div, title);
  

  setTimeout(function(){
    document.querySelector(`.alert.${className}`).remove();
  }, 2500);

}

UI.prototype.deleteBook = function(target) {
  if(target.parentElement.className === 'close') {
    target.parentElement.parentElement.parentElement.parentElement.remove();
  }


}

UI.prototype.clearFields = function() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';

}

document.addEventListener('submit', function(e){
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === '' || author === '' || isbn === ''){
    ui.showAlert('Please fill in all fields','alert-danger');
  
  } else {
    ui.addNewBook(book);
    ui.showAlert('Book Added', 'alert-success');

    ui.clearFields();
  }

  

e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', function(e){
  const ui = new UI();

  ui.deleteBook(e.target);

    ui.showAlert('Book Removed', 'alert-success')
});
