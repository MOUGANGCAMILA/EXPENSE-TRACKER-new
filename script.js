// script.js
document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");
    const customCategoryInput = document.getElementById("custom-category");
    const filterCustomCategoryInput = document.getElementById("filter-custom-category");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let editIndex = -1;

    // Display expenses on page load
    displayExpenses(filterExpenses());
    updateTotalAmount();

    // Handle form submission
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Capture inputs
        const nameInput = document.getElementById("expense-name").value.trim();
        const amountInput = parseFloat(document.getElementById("expense-amount").value);
        const categoryInput = document.getElementById("expense-category").value === "Other" ? customCategoryInput.value.trim() : document.getElementById("expense-category").value;
        const dateInput = document.getElementById("expense-date").value;
        const noteInput = document.getElementById("expense-note").value.trim();

        // Validate inputs
        if (nameInput === "" || isNaN(amountInput) || categoryInput === "" || dateInput === "") {
            alert("Please fill in all fields correctly.");
            return;
        }

        // Create expense object
        const expense = {
            id: Date.now(),
            name: nameInput,
            amount: amountInput,
            category: categoryInput,
            date: dateInput,
            note: noteInput
        };

        if (editIndex >= 0) {
            // Update existing expense
            expenses[editIndex] = expense;
            editIndex = -1;
            expenseForm.querySelector("button").textContent = "Add Expense";
        } else {
            // Add new expense
            expenses.push(expense);
        }

        // Save to localStorage
        localStorage.setItem("expenses", JSON.stringify(expenses));

        // Reset form
        expenseForm.reset();
        document.getElementById("expense-category").selectedIndex = 0;
        customCategoryInput.style.display = "none";

        // Update display
        displayExpenses(filterExpenses());
        updateTotalAmount();
    });

    // Handle clicks on expense list
    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-btn")) {
            const id = e.target.getAttribute("data-id");
            editExpense(id);
        } else if (e.target.classList.contains("delete-btn")) {
            const id = e.target.getAttribute("data-id");
            deleteExpense(id);
        }
    });

    // Filter expenses
    filterCategory.addEventListener("change", () => {
        toggleCustomCategoryFilterInput();
        displayExpenses(filterExpenses());
    });

    filterCustomCategoryInput.addEventListener("input", () => {
        displayExpenses(filterExpenses());
    });

    // Display expenses
    function displayExpenses(expensesToDisplay) {
        expenseList.innerHTML = "";
        expensesToDisplay.forEach((expense) => {
            const row = document.createElement("tr");
            if (expense.category === customCategoryInput.value.trim()) {
                row.classList.add("custom-category-row");
            }

            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>${expense.note}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;
            expenseList.appendChild(row);
        });
    }

    // Update total amount
    function updateTotalAmount() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    // Edit expense
    function editExpense(id) {
        const expenseToEdit = expenses.find((expense) => expense.id == id);
        editIndex = expenses.findIndex((expense) => expense.id == id);

        document.getElementById("expense-name").value = expenseToEdit.name;
        document.getElementById("expense-amount").value = expenseToEdit.amount;
        document.getElementById("expense-category").value = expenseToEdit.category;
        document.getElementById("expense-date").value = expenseToEdit.date;
        document.getElementById("expense-note").value = expenseToEdit.note;

        expenseForm.querySelector("button").textContent = "Update Expense";
    }

    // Delete expense
    function deleteExpense(id) {
        expenses = expenses.filter((expense) => expense.id != id);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        displayExpenses(filterExpenses());
        updateTotalAmount();
    }

    // Filter expenses based on category
    function filterExpenses() {
        const selectedCategory = filterCategory.value;
        const customCategory = filterCustomCategoryInput.value.trim().toLowerCase();
        if (selectedCategory === "All") {
            return expenses;
        } else if (selectedCategory === "Other" && customCategory !== "") {
            return expenses.filter((expense) => expense.category.toLowerCase().includes(customCategory));
        } else {
            return expenses.filter((expense) => expense.category === selectedCategory);
        }
    }

    // Toggle custom category input visibility
    window.toggleCustomCategoryInput = function() {
        const categorySelect = document.getElementById("expense-category");
        const customCategoryInput = document.getElementById("custom-category");
        if (categorySelect.value === "Other") {
            customCategoryInput.style.display = "block";
        } else {
            customCategoryInput.style.display = "none";
        }
    };

    // Toggle custom category filter input visibility
    window.toggleCustomCategoryFilterInput = function() {
        const filterCategorySelect = document.getElementById("filter-category");
        const filterCustomCategoryInput = document.getElementById("filter-custom-category");
        if (filterCategorySelect.value === "Other") {
            filterCustomCategoryInput.style.display = "block";
        } else {
            filterCustomCategoryInput.style.display = "none";
            filterCustomCategoryInput.value = "";
            displayExpenses(filterExpenses());
        }
    };
});









































/*

// script.js
document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");

    let expenses = [];
    let editIndex = -1;

    // Handle form submission
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Capture inputs
        const nameInput = document.getElementById("expense-name").value.trim();
        const amountInput = parseFloat(document.getElementById("expense-amount").value);
        const categoryInput = document.getElementById("expense-category").value;
        const dateInput = document.getElementById("expense-date").value;
        const noteInput = document.getElementById("expense-note").value.trim();

        // Validate inputs
        if (nameInput === "" || isNaN(amountInput) || categoryInput === "" || dateInput === "") {
            alert("Please fill in all fields correctly.");
            return;
        }

        // Create expense object
        const expense = {
            id: Date.now(),
            name: nameInput,
            amount: amountInput,
            category: categoryInput,
            date: dateInput,
            note: noteInput
        };

        if (editIndex >= 0) {
            // Update existing expense
            expenses[editIndex] = expense;
            editIndex = -1;
            expenseForm.querySelector("button").textContent = "Add Expense";
        } else {
            // Add new expense
            expenses.push(expense);
        }

        // Reset form
        expenseForm.reset();
        document.getElementById("expense-category").selectedIndex = 0;

        // Update display
        displayExpenses(filterExpenses());
        updateTotalAmount();
    });

    // Handle clicks on expense list
    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-btn")) {
            const id = e.target.getAttribute("data-id");
            editExpense(id);
        } else if (e.target.classList.contains("delete-btn")) {
            const id = e.target.getAttribute("data-id");
            deleteExpense(id);
        }
    });

    // Filter expenses
    filterCategory.addEventListener("change", () => {
        displayExpenses(filterExpenses());
    });

    // Display expenses
    function displayExpenses(expensesToDisplay) {
        expenseList.innerHTML = "";
        expensesToDisplay.forEach((expense) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>${expense.note}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;
            expenseList.appendChild(row);
        });
    }

    // Update total amount
    function updateTotalAmount() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    // Edit expense
    function editExpense(id) {
        const expenseToEdit = expenses.find((expense) => expense.id == id);
        editIndex = expenses.findIndex((expense) => expense.id == id);

        document.getElementById("expense-name").value = expenseToEdit.name;
        document.getElementById("expense-amount").value = expenseToEdit.amount;
        document.getElementById("expense-category").value = expenseToEdit.category;
        document.getElementById("expense-date").value = expenseToEdit.date;
        document.getElementById("note").value = expenseToEdit.note;

        expenseForm.querySelector("button").textContent = "Update Expense";
    }

    // Delete expense
    function deleteExpense(id) {
        expenses = expenses.filter((expense) => expense.id != id);
        displayExpenses(filterExpenses());
        updateTotalAmount();
    }

    // Filter expenses based on category
    function filterExpenses() {
        const selectedCategory = filterCategory.value;
        if (selectedCategory === "All") {
            return expenses;
        } else {
            return expenses.filter((expense) => expense.category === selectedCategory);
        }
    }
});















// script.js
document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let editIndex = -1;

    // Display expenses on page load
    displayExpenses(filterExpenses());
    updateTotalAmount();

    // Handle form submission
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Capture inputs
        const nameInput = document.getElementById("expense-name").value.trim();
        const amountInput = parseFloat(document.getElementById("expense-amount").value);
        const categoryInput = document.getElementById("expense-category").value;
        const dateInput = document.getElementById("expense-date").value;
        const noteInput = document.getElementById("expense-note").value.trim();

        // Validate inputs
        if (nameInput === "" || isNaN(amountInput) || categoryInput === "" || dateInput === "") {
            alert("Please fill in all fields correctly.");
            return;
        }

        // Create expense object
        const expense = {
            id: Date.now(),
            name: nameInput,
            amount: amountInput,
            category: categoryInput,
            date: dateInput,
            note: noteInput
        };

        if (editIndex >= 0) {
            // Update existing expense
            expenses[editIndex] = expense;
            editIndex = -1;
            expenseForm.querySelector("button").textContent = "Add Expense";
        } else {
            // Add new expense
            expenses.push(expense);
        }

        // Save to localStorage
        localStorage.setItem("expenses", JSON.stringify(expenses));

        // Reset form
        expenseForm.reset();
        document.getElementById("expense-category").selectedIndex = 0;

        // Update display
        displayExpenses(filterExpenses());
        updateTotalAmount();
    });

    // Handle clicks on expense list
    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-btn")) {
            const id = e.target.getAttribute("data-id");
            editExpense(id);
        } else if (e.target.classList.contains("delete-btn")) {
            const id = e.target.getAttribute("data-id");
            deleteExpense(id);
        }
    });

    // Filter expenses
    filterCategory.addEventListener("change", () => {
        displayExpenses(filterExpenses());
    });

    // Display expenses
    function displayExpenses(expensesToDisplay) {
        expenseList.innerHTML = "";
        expensesToDisplay.forEach((expense) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>${expense.note}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;
            expenseList.appendChild(row);
        });
    }

    // Update total amount
    function updateTotalAmount() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    // Edit expense
    function editExpense(id) {
        const expenseToEdit = expenses.find((expense) => expense.id == id);
        editIndex = expenses.findIndex((expense) => expense.id == id);

        document.getElementById("expense-name").value = expenseToEdit.name;
        document.getElementById("expense-amount").value = expenseToEdit.amount;
        document.getElementById("expense-category").value = expenseToEdit.category;
        document.getElementById("expense-date").value = expenseToEdit.date;
        document.getElementById("expense-note").value = expenseToEdit.note;

        expenseForm.querySelector("button").textContent = "Update Expense";
    }

    // Delete expense
    function deleteExpense(id) {
        expenses = expenses.filter((expense) => expense.id != id);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        displayExpenses(filterExpenses());
        updateTotalAmount();
    }

    // Filter expenses based on category
    function filterExpenses() {
        const selectedCategory = filterCategory.value;
        if (selectedCategory === "All") {
            return expenses;
        } else {
            return expenses.filter((expense) => expense.category === selectedCategory);
        }
    }
});




*/