// src/main.js

// Create a "delete" button and append it to each list item
function addDeleteButton(li) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("❌");
    span.className = "delete";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Create a "complete" button and append it to each list item
function addCompleteButton(li) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("✅");
    span.className = "complete";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
        li.classList.toggle('checked');
        if (li.classList.contains('checked')) {
            document.getElementById("completedTaskList").appendChild(li);
        } else {
            document.getElementById("taskList").appendChild(li);
            sortTasks();
        }
    }
}

// Create an "edit" button and append it to each list item
function addEditButton(li, textDiv) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("📝");
    span.className = "edit";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
        textDiv.contentEditable = true;
        textDiv.focus();
    }

    textDiv.onblur = function() {
        textDiv.contentEditable = false;
    }
}

// Create a "priority" tag and append it to each list item
function addPriorityTag(li, priorityValue) {
    var span = document.createElement("SPAN");
    span.className = "priority " + priorityValue;
    span.textContent = priorityValue.charAt(0).toUpperCase() + priorityValue.slice(1);
    li.appendChild(span);

    span.onclick = function() {
        var select = document.createElement("SELECT");
        select.innerHTML = `
            <option value="high" ${priorityValue === "high" ? "selected" : ""}>High</option>
            <option value="medium" ${priorityValue === "medium" ? "selected" : ""}>Medium</option>
            <option value="low" ${priorityValue === "low" ? "selected" : ""}>Low</option>
        `;
        li.replaceChild(select, span);

        select.onblur = function() {
            var newPriority = select.value;
            span.className = "priority " + newPriority;
            span.textContent = newPriority.charAt(0).toUpperCase() + newPriority.slice(1);
            li.setAttribute("data-priority", newPriority);
            li.replaceChild(span, select);
            sortTasks();
        }

        select.focus();
    }
}

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var textDiv = document.createElement("div");
    textDiv.className = "task-text";
    var inputValue = document.getElementById("taskInput").value.trim();
    var priorityValue = document.getElementById("taskPriority").value;
    var dueDateValue = document.getElementById("taskDueDate").value;
    var t = document.createTextNode(inputValue);
    textDiv.appendChild(t);
    li.appendChild(textDiv);
    li.setAttribute("data-priority", priorityValue);
    li.setAttribute("data-due-date", dueDateValue);
    if (inputValue === '' || !inputValue.replace(/\s/g, '').length) {
        alert("You must write a valid task!");
    } else {
        document.getElementById("taskList").appendChild(li);
        addPriorityTag(li, priorityValue);
        addDueDateTag(li, dueDateValue);
        addDeleteButton(li);
        addCompleteButton(li);
        addEditButton(li, textDiv);
        sortTasks();
        addParticleEffect(li);
    }
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDueDate").value = "";
}


// Sort tasks based on selected option
function sortTasks() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("taskList");
    switching = true;
    var sortOption = document.getElementById("sortOptions").value;
    while (switching) {
        switching = false;
        b = list.getElementsByTagName("LI");
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            if (sortOption === "priority") {
                if (comparePriority(b[i].getAttribute("data-priority"), b[i + 1].getAttribute("data-priority")) > 0) {
                    shouldSwitch = true;
                    break;
                }
            } else if (sortOption === "latestDue") {
                if (compareDueDate(b[i].getAttribute("data-due-date"), b[i + 1].getAttribute("data-due-date")) < 0) {
                    shouldSwitch = true;
                    break;
                }
            } else if (sortOption === "oldestDue") {
                if (compareDueDate(b[i].getAttribute("data-due-date"), b[i + 1].getAttribute("data-due-date")) > 0) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
    // Move tasks with no due date to the end
    for (i = 0; i < b.length; i++) {
        if (!b[i].getAttribute("data-due-date")) {
            list.appendChild(b[i]);
        }
    }
}

// Compare priority values
function comparePriority(a, b) {
    var priorities = { "high": 1, "medium": 2, "low": 3 };
    return priorities[a] - priorities[b];
}

// Compare due date values
function compareDueDate(a, b) {
    if (!a) return 1;
    if (!b) return -1;
    return new Date(a) - new Date(b);
}

// Filter tasks based on selected priority
function filterTasks() {
    var list, i, li, priority;
    list = document.getElementById("taskList");
    li = list.getElementsByTagName("LI");
    var filterOption = document.getElementById("filterOptions").value;
    for (i = 0; i < li.length; i++) {
        priority = li[i].getAttribute("data-priority");
        if (filterOption === "all" || priority === filterOption) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

// Toggle the display of completed tasks
function toggleCompletedTasks() {
    var completedTaskList = document.querySelector('.completed-task-list');
    var toggleButton = document.querySelector('.toggle-completed-btn');
    if (completedTaskList.style.display === 'none') {
        completedTaskList.style.display = 'block';
        toggleButton.textContent = 'Hide Completed Tasks';
    } else {
        completedTaskList.style.display = 'none';
        toggleButton.textContent = 'Show Completed Tasks';
    }
}


// Add due date tag to task items
function addDueDateTag(li, dueDateValue) {
    var span = document.createElement("SPAN");
    span.className = "due-date";
    span.textContent = dueDateValue ? `Due: ${dueDateValue}` : "No due date";
    li.appendChild(span);

    span.onclick = function() {
        var input = document.createElement("INPUT");
        input.type = "date";
        input.value = dueDateValue;
        input.className = "due-date-input";
        li.replaceChild(input, span);

        input.onblur = function() {
            var newDueDate = input.value;
            span.textContent = newDueDate ? `Due: ${newDueDate}` : "No due date";
            li.setAttribute("data-due-date", newDueDate);
            li.replaceChild(span, input);
        }

        input.focus();
    }
}

// Sort tasks based on priority
function sortTasks() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("taskList");
    switching = true;
    while (switching) {
        switching = false;
        b = list.getElementsByTagName("LI");
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            if (comparePriority(b[i].getAttribute("data-priority"), b[i + 1].getAttribute("data-priority")) > 0) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}

// Compare priority values
function comparePriority(a, b) {
    var priorities = { "high": 1, "medium": 2, "low": 3 };
    return priorities[a] - priorities[b];
}

// Initialize existing list items with delete, complete, edit buttons, and due date
var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
    var textDiv = myNodelist[i].querySelector(".task-text");
    var priorityValue = myNodelist[i].getAttribute("data-priority");
    var dueDateValue = myNodelist[i].getAttribute("data-due-date");
    if (textDiv) {
        addPriorityTag(myNodelist[i], priorityValue);
        addDueDateTag(myNodelist[i], dueDateValue);
        addDeleteButton(myNodelist[i]);
        addCompleteButton(myNodelist[i]);
        addEditButton(myNodelist[i], textDiv);
        addParticleEffect(myNodelist[i]);
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Add particle effect to task items
function addParticleEffect(li) {
    let lastX = 0, lastY = 0;
    let targetX = 0, targetY = 0;
    let isHovering = false;

    li.style.transition = 'background 0.1s ease-out';

    li.addEventListener('mousemove', function(e) {
        isHovering = true;
        var rect = li.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
    });

    li.addEventListener('mouseleave', function() {
        isHovering = false;
        li.style.background = '';
    });

    function updateGradient() {
        if (isHovering) {
            lastX += (targetX - lastX) * 0.1;
            lastY += (targetY - lastY) * 0.1;
            var size = 50; // Fixed size to avoid flickering
            li.style.background = `radial-gradient(circle at ${lastX}px ${lastY}px, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) ${size}px)`;
        }
        requestAnimationFrame(updateGradient);
    }

    updateGradient();
}