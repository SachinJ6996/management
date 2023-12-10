var selectedRow = null;

// the below funtion creates the alert message with a sepcified class name and displayes it 
function showAlert(message, className) {
    // to create a new div element
    const div = document.createElement("div")

    // setting the class attributes using calssName
    div.className = `alert alert-${className}`

    // to add the text message to div element
    div.appendChild(document.createTextNode(message));

    // to find the element with class container and main
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");

    // to insert the div before the main and inside of the container
    container.insertBefore(div, main);

    // to remove the alert from 3 seconds 
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// to clear all fields
function clearField() {
    // clears the field with the ID task name 
    document.querySelector("#taskName").value = "";

    // clears the field with the ID task decription 
    document.querySelector("#taskDescription").value = "";

    // clears the field with the ID task number 
    document.querySelector("#taskNumber").value = "";

}

// to add data

// adding the event listener for submit the event 
document.querySelector("#task-form").addEventListener("submit", (e) => {
    e.preventDefault(); // to prevent from defaul actions of form submission 

    // get form values
    
    // to get the values of the input form of the ID task name
    const taskName = document.querySelector("#taskName").value;

     // to get the values of the input form of the ID task Description
    const taskDescription = document.querySelector("#taskDescription").value;

    // to get the values of the input form of the ID task number
    const taskNumber = document.querySelector("#taskNumber").value;


    // handling form submission

    if (taskName == "" || taskDescription == "" || taskNumber == "") {
        showAlert("No field can be empty", "danger"); // show this alert message even if any one field is empty
    } else {
        if (selectedRow == null) { // if all fields are empty

            const list = document.querySelector("#task-list");
            const row = document.createElement("tr");
            
            // to create a new table of task list 
            row.innerHTML = `
            <td>${taskName}</td>
            <td>${taskDescription}</td>
            <td>${taskNumber}</td>
            <td>
            <a href="#" class="btn btn-outline-light btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
            <td>
            <input type="checkbox" id="myCheckbox" name="myCheckbox">
                                <label for="myCheckbox">My Checkbox</label>  
            </td>
            `;

            // addd the newly created row to the list 
            list.appendChild(row);

            // to reset 
            selectedRow = null;
            showAlert("Task Added", "success"); // to notify that the task has been successfuly added
        }
        else {
            // to update task name, task description, and task number
            selectedRow.children[0].textContent = taskName;
            selectedRow.children[1].textContent = taskDescription;
            selectedRow.children[2].textContent = taskNumber;
            selectedRow = null; // to reset 
            showAlert("Task info edited", "info"); // to notify that the task has been successfuly edited
        }

        clearField(); // to clear the input field after submission or edition 

    }

});

// to edit data

document.querySelector("#task-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")) { // if the clicked element has the edit button class then...

        selectedRow = target.parentElement.parentElement;

        // to get task details and add it to the respective fields to edit
       document.querySelector("#taskName").value = selectedRow.children[0].textContent;
       document.querySelector("#taskDescription").value = selectedRow.children[1].textContent;
       document.querySelector("#taskNumber").value = selectedRow.children[2].textContent;
    }
})



// to delete task 
document.querySelector("#task-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {  // if the clicked element has the delete button class then...
       
       // go to the DOM tree twice and remove the added list 
        target.parentElement.parentElement.remove(); 

        // notifies about deletion 
        showAlert("Task data deleted", "danger");
    }
});

