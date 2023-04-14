var bookMarkName = document.getElementById("bookMarkName");
var bookMarkUrl = document.getElementById("bookMarkUrl");
var addBtn = document.getElementById("addBtn");
var currentIndex = 0;
var bookMarks = [];
if (localStorage.getItem("BookMarks") != null) {
  bookMarks = JSON.parse(localStorage.getItem("BookMarks"));
  displayBookMark();
}

function addBookMark() {
  if (checkEmpty() == true) {
    if (addBtn.innerHTML == "Add BookMark") {
      if (bookMarkUrl.value.includes("https://")) {
        var bookMark =
        {
          bmName: bookMarkName.value,
          bmUrl: bookMarkUrl.value.replace("https://", "")
        }
        if (checkName()) { }
        else {
          bookMarks.push(bookMark);
          clearInputs();
        }
        localStorage.setItem("BookMarks", JSON.stringify(bookMarks));
        clearInputs();
        displayBookMark();
        document.getElementById("errorHandel").classList.add("d-none");
      }
      else if (bookMarkUrl.value.includes("http://")) {
        var bookMark =
        {
          bmName: bookMarkName.value,
          bmUrl: bookMarkUrl.value.replace("http://", "")
        }
        if (checkName()) { }
        else {
          bookMarks.push(bookMark);
          clearInputs();
        }
        localStorage.setItem("BookMarks", JSON.stringify(bookMarks));
        clearInputs();
        displayBookMark();
        document.getElementById("errorHandel").classList.add("d-none");
      }
      else if (bookMarkUrl.value.includes("https://") == false || bookMarkUrl.value.includes("http://") == false) {
        var bookMark =
        {
          bmName: bookMarkName.value,
          bmUrl: bookMarkUrl.value
        }
        if (checkName()) { }
        else {
          bookMarks.push(bookMark);
          clearInputs();
        }
        localStorage.setItem("BookMarks", JSON.stringify(bookMarks));
        displayBookMark();
        document.getElementById("errorHandel").classList.add("d-none");
      }
    }
    else {
      updateBookMark();
    }
  }
  else {
    document.getElementById("errorHandel").classList.remove("d-none");
  }
}

function displayBookMark() {
  var cartona = "";

  for (var i = 0; i < bookMarks.length; i++) {
    if(bookMarks[i].bmUrl.length > 30)
    {
      urlTrunc = bookMarks[i].bmUrl.substring(0,30)+"..."
    }
    else
    [
      urlTrunc = bookMarks[i].bmUrl
    ]
    cartona += `
    <tr>
      <td>${i + 1}</td>
      <td><a class="nav-link d-inline" target="_blank" href="https://${bookMarks[i].bmUrl}">${bookMarks[i].bmName}</td>
      <td><a target="_blank" href="https://${bookMarks[i].bmUrl}"><img class="me-2" src="http://s2.googleusercontent.com/s2/favicons?domain=${bookMarks[i].bmUrl}"></a><a class="nav-link d-inline" target="_blank" href="https://${bookMarks[i].bmUrl}">${urlTrunc}</td>
      <td><button onclick="getData(${i})" class="btn btn-warning text-white"><i class="fa-solid fa-pen-to-square"></i></button></td>
      <td><button onclick="deleteBookMark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
    </tr>
    `
  }

  document.getElementById("bookMarkTable").innerHTML = cartona;

}

function clearInputs() {
  bookMarkName.value = null;
  bookMarkUrl.value = null;
}

function deleteBookMark(index) {
  var text = `Delete ${bookMarks[index].bmName} BookMark\nPress OK or Cancel.`;
  if (confirm(text) == true) {
    bookMarks.splice(index, 1);
    localStorage.setItem("BookMarks", JSON.stringify(bookMarks));
    displayBookMark();
  } 

}
function searchBookMark(term) {
  var cartona = "";
  for (var i = 0; i < bookMarks.length; i++) {
    if (bookMarks[i].bmName.toLowerCase().includes(term.toLowerCase())) {
      if(bookMarks[i].bmUrl.length > 30)
      {
        urlTrunc = bookMarks[i].bmUrl.substring(0,30)+"..."
      }
      else
      [
        urlTrunc = bookMarks[i].bmUrl
      ]
      cartona += `
      <tr>
      <td>${i + 1}</td>
      <td>${bookMarks[i].bmName}</td>
      <td><a target="_blank" href="https://${bookMarks[i].bmUrl}"><img class="me-2" src="http://s2.googleusercontent.com/s2/favicons?domain=${bookMarks[i].bmUrl}"></a><a class="nav-link d-inline" target="_blank" href="https://${bookMarks[i].bmUrl}">${urlTrunc}</td>
      <td><button class="btn btn-warning text-white"><i class="fa-solid fa-pen-to-square"></i></button></td>
      <td><button onclick="deleteBookMark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
    </tr>
      `
    }
  }
  document.getElementById("bookMarkTable").innerHTML = cartona;
}
function getData(index) {
  document.getElementById("errorHandel").classList.add("d-none");
  document.getElementById("errorNameHandel").classList.add("d-none");
  currentIndex = index
  bookMarkName.value = bookMarks[index].bmName;
  bookMarkUrl.value = bookMarks[index].bmUrl;
  addBtn.innerHTML = "Edit BookMark";
  addBtn.classList.add("editHover");
  addBtn.classList.add("editCss");
}

function updateBookMark() {
  if (bookMarkUrl.value.includes("https://")) {
    var bookMark =
    {
      bmName: bookMarkName.value,
      bmUrl: bookMarkUrl.value.replace("https://", "")
    }
    if (bookMarkName.value == (bookMarks[currentIndex].bmName)) {
      bookMarks[currentIndex] = bookMark;
      clearInputs();
      addBtn.innerHTML = "Add BookMark";
      addBtn.classList.remove("editHover");
      addBtn.classList.remove("editCss");
      document.getElementById("errorNameHandel").classList.remove("d-none");
    }
    else {
      if (checkName()) {
        addBtn.innerHTML = "Edit BookMark";
        
      }
      else {
        bookMarks[currentIndex] = bookMark;
        clearInputs();
        addBtn.innerHTML = "Add BookMark";
        addBtn.classList.remove("editHover");
        addBtn.classList.remove("editCss");

      }
    }
    localStorage.setItem("BookMarks", JSON.stringify(bookMarks));
    displayBookMark();
  }
  else if (bookMarkUrl.value.includes("http://")) {
    var bookMark =
    {
      bmName: bookMarkName.value,
      bmUrl: bookMarkUrl.value.replace("http://", "")
    }
    if (bookMarkName.value == (bookMarks[currentIndex].bmName)) {
      bookMarks[currentIndex] = bookMark;
      clearInputs();
      addBtn.innerHTML = "Add BookMark";
      addBtn.classList.remove("editHover");
      addBtn.classList.remove("editCss");
      document.getElementById("errorNameHandel").classList.remove("d-none");
    }
    else {
      if (checkName()) {
        addBtn.innerHTML = "Edit BookMark";
      }
      else {
        bookMarks[currentIndex] = bookMark;
        clearInputs();
        addBtn.innerHTML = "Add BookMark";
        addBtn.classList.remove("editHover");
        addBtn.classList.remove("editCss");
      }
    }
    localStorage.setItem("BookMarks", JSON.stringify(bookMarks));
    displayBookMark();
  }
  else if (bookMarkUrl.value.includes("https://") == false || bookMarkUrl.value.includes("http://") == false) {
    var bookMark =
    {
      bmName: bookMarkName.value,
      bmUrl: bookMarkUrl.value
    }
    if (bookMarkName.value == (bookMarks[currentIndex].bmName)) {
      bookMarks[currentIndex] = bookMark;
      clearInputs();
      addBtn.innerHTML = "Add BookMark";
      addBtn.classList.remove("editHover");
      addBtn.classList.remove("editCss");
      document.getElementById("errorNameHandel").classList.remove("d-none");
    }
    else {
      if (checkName()) {
        addBtn.innerHTML = "Edit BookMark";
      }
      else {
        bookMarks[currentIndex] = bookMark;
        clearInputs();
        addBtn.innerHTML = "Add BookMark";
        addBtn.classList.remove("editHover");
        addBtn.classList.remove("editCss");
      }
    }
    localStorage.setItem("BookMarks", JSON.stringify(bookMarks));
    displayBookMark();
  }

}

function checkEmpty() {
  var regex = /^.{1,20}$/;
  var regexUrl = /.+/;
  if (regex.test(bookMarkName.value) == true && regexUrl.test(bookMarkUrl.value) == true) {
    return true;
  }
  else {
    return false;
  }
}

function checkName() {
  for (var i = 0; i < bookMarks.length; i++) {
    if (bookMarkName.value == (bookMarks[i].bmName)) {
      document.getElementById("errorNameHandel").innerHTML = "* Sorry " + '( <span class="fw-bold text-decoration-underline">' + bookMarkName.value + "</span> )" + " BookMark is already Taken at line : " + (i + 1);
      document.getElementById("errorNameHandel").classList.remove("d-none");
      return true
    }
    else {
      document.getElementById("errorNameHandel").classList.add("d-none");
    }
  }
}

