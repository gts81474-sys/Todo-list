let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  // prevent form from being submitted
  e.preventDefault();
  // get the input values
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDay = form.children[2].value;

  if (todoMonth < 1 || todoMonth > 12 || todoDay < 1 || todoDay > 31) {
    alert("Please enter a valid month/day");
    return;
  }

  if (todoText === "") {
    alert("Please enter a task");
    return;
  }

  // create a todo
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + "/" + todoDay;
  todo.appendChild(text);
  todo.appendChild(time);

  // create green check and red trash can
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
    //change status of todoItem into completion in local storage
    let text = todoItem.children[0].innerText;
    let mylistArray = JSON.parse(localStorage.getItem("list"));
    mylistArray.forEach((item) => {
      if (item.todoText === text && item.completion === false) {
        item.completion = true;
      } else if (item.todoText === text && item.completion === true) {
        item.completion = false;
      }
    });
    localStorage.setItem("list", JSON.stringify(mylistArray));
  });

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  trashButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.addEventListener("animationend", () => {
      // remove from local storage
      let text = todoItem.children[0].innerText;
      let mylistArray = JSON.parse(localStorage.getItem("list"));
      mylistArray.forEach((item, index) => {
        if (item.todoText == text) {
          mylistArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(mylistArray));
        }
      });
      todoItem.remove();
    });
    todoItem.style.animation = "scaleDown 0.3s forwards";
    // todoItem.remove();直接加這行並不會等到動畫結束才執行刪除
  });

  todo.appendChild(trashButton);
  todo.appendChild(completeButton);

  todo.style.animation = "scaleUp 0.3s forwards";
  section.appendChild(todo);
  form.children[0].value = ""; //clear the text input

  // create an object

  let myTodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDay: todoDay,
    completion: false,
  };

  // store data into an array of objects

  let mylist = localStorage.getItem("list");
  if (mylist === null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let mylistArray = JSON.parse(mylist);
    mylistArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(mylistArray));
  }
});

loadData();

function loadData() {
  let mylist = localStorage.getItem("list");
  if (mylist !== null) {
    let mylistArray = JSON.parse(mylist);
    mylistArray.forEach((item) => {
      //create a todo
      let todo = document.createElement("div");
      todo.classList.add("todo");
      // display completed todoItem effect
      if (item.completion === true) todo.classList.add("done");
      let text = document.createElement("p");
      text.classList.add("todo-text");
      text.innerText = item.todoText;
      let time = document.createElement("p");
      time.classList.add("todo-time");
      time.innerText = item.todoMonth + "/" + item.todoDay;
      todo.appendChild(text);
      todo.appendChild(time);

      // create green check and red trash can
      let completeButton = document.createElement("button");
      completeButton.classList.add("complete");
      completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
      completeButton.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
        //change status of todoItem into completion in local storage
        let text = todoItem.children[0].innerText;
        let mylistArray = JSON.parse(localStorage.getItem("list"));
        mylistArray.forEach((item) => {
          if (item.todoText === text && item.completion === false) {
            item.completion = true;
          } else if (item.todoText === text && item.completion === true) {
            item.completion = false;
          }
        });
        localStorage.setItem("list", JSON.stringify(mylistArray));
      });

      let trashButton = document.createElement("button");
      trashButton.classList.add("trash");
      trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      trashButton.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;
        todoItem.addEventListener("animationend", () => {
          // remove from local storage
          let text = todoItem.children[0].innerText;
          let mylistArray = JSON.parse(localStorage.getItem("list"));
          mylistArray.forEach((item, index) => {
            if (item.todoText == text) {
              mylistArray.splice(index, 1);
              localStorage.setItem("list", JSON.stringify(mylistArray));
            }
          });
          todoItem.remove();
        });
        todoItem.style.animation = "scaleDown 0.3s forwards";
        // todoItem.remove();直接加這行並不會等到動畫結束才執行刪除
      });

      todo.appendChild(trashButton);
      todo.appendChild(completeButton);
      section.appendChild(todo);
    });
  }
}

function mergeSort(arr) {
  if (arr.length === 1) return arr;
  let middle = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, middle));
  let right = mergeSort(arr.slice(middle));
  return merge(left, right);
}

function merge(arr1, arr2) {
  let result = [];
  let i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
      result.push(arr2[j]);
      j++;
    } else {
      if (Number(arr1[i].todoDay) < Number(arr2[j].todoDay)) {
        result.push(arr1[i]);
        i++;
      } else {
        result.push(arr2[j]);
        j++;
      }
    }
  }

  return [...result, ...arr1.slice(i), ...arr2.slice(j)];
}

let sortButton = document.querySelector("div.sort button");

sortButton.addEventListener("click", () => {
  //sort data
  let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
  localStorage.setItem("list", JSON.stringify(sortedArray));

  //remove data
  let len = section.children.length;
  for (let i = 0; i < len; i++) {
    section.children[0].remove();
  }

  //load data
  loadData();
});
