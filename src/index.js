clear = () => {
  title.value = "";
  textarea.value = "";
  console.log("Form Cleared");
};

update = () => {
  let itemsArray = JSON.parse(localStorage.getItem("itemsJSON"));
  if (itemsArray === null) {
    document.getElementById("main_table").innerHTML =
      '<div class="alt-text">Add your first TO-DO</div>';
    console.log("No item to load");
  } else if (itemsArray.length !== 0) {
    let tempstr = "";
    itemsArray.forEach((element, index) => {
      tempstr += ` 
        <div class="table-item">${index + 1}</div>
        <div class="table-item">${element[0]}</div>
        <div class="table-item">${element[1]}</div>
        <div class="table-item">
          <button class="btn-del" onClick="deleteRow(${index})">
            <span class="btn-del-value">Delete</span>
          </button>
        </div>
        `;
    });
    document.getElementById("main_table").innerHTML =
      `<div class="table-header">S.no</div> 
      <div class="table-header">Title</div>
      <div class="table-header">Description</div>
      <div class="table-header">Action</div>` + tempstr;
    console.log("List loaded/Updated");
  } else {
    document.getElementById("main_table").innerHTML =
      '<div class="alt-text">Nothing to do . . . .</div>';
    console.log("No item to load");
  }
};

deleteRow = (index) => {
  let itemsArray = JSON.parse(localStorage.getItem("itemsJSON"));
  itemsArray.splice(index, 1);
  localStorage.setItem("itemsJSON", JSON.stringify(itemsArray));
  console.log(`item number : ${index + 1}, index : ${index} removed`);
  update();
};

add = () => {
  let _title = title.value;
  let _desc = textarea.value;
  if (_title != "" && _desc != "") {
    if (localStorage.getItem("itemsJSON") == null) {
      let itemArray = [];
      itemArray.push([_title, _desc]);
      localStorage.setItem("itemsJSON", JSON.stringify(itemArray));
      console.log("Fisrt item added to local");
    } else {
      let itemsJSONarray = localStorage.getItem("itemsJSON");
      let itemsArray = JSON.parse(itemsJSONarray);
      itemsArray.push([_title, _desc]);
      localStorage.setItem("itemsJSON", JSON.stringify(itemsArray));
      console.log(`item number ${itemsArray.length} added to local`);
    }
    clear();
    update();
  } else {
    console.log(`Both Title and Description are required`);
  }
};

btnAdd.addEventListener("click", add);

btnClear.addEventListener("click", clear);

update();
