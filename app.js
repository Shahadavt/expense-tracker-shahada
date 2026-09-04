let transactions = [];
let editingId = null;


// Get elements from HTML

const form = document.getElementById("transactionForm");

const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");

const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEdit");

const transactionList = document.getElementById("transactionList");

const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const currentBalance = document.getElementById("currentBalance");

const monthlyIncome = document.getElementById("monthlyIncome");
const monthlyExpense = document.getElementById("monthlyExpense");
const monthlyBalance = document.getElementById("monthlyBalance");

const monthSelect = document.getElementById("monthSelect");

const typeFilter = document.getElementById("typeFilter");
const categoryFilter = document.getElementById("categoryFilter");

const clearFiltersBtn = document.getElementById("clearFilters");

const themeToggle = document.getElementById("themeToggle");

const categoryChart = document.getElementById("categoryChart");


// Start application

document.addEventListener("DOMContentLoaded", () => {

    loadTransactions();

    dateInput.value = getToday();

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        updateThemeIcon();
    } else if (savedTheme === "light") {
        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        updateThemeIcon();
    }

    updateUI();

    updateMonthOptions();

    updateCategoryFilter();
});


// Add or update transaction

form.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const transaction = {

        id: editingId || Date.now(),

        type: typeInput.value,

        amount: Number(amountInput.value),

        category: categoryInput.value,

        date: dateInput.value,

        description: descriptionInput.value.trim()
    };


    if (editingId) {

        const index = transactions.findIndex(
            item => item.id === editingId
        );

        if (index !== -1) {
            transactions[index] = transaction;
        }

    } else {

        transactions.unshift(transaction);
    }


    saveTransactions();

    updateUI();

    updateMonthOptions();

    updateCategoryFilter();

    resetForm();
});


// Cancel edit

cancelEditBtn.addEventListener("click", resetForm);


// Filters

typeFilter.addEventListener("change", renderTransactions);

categoryFilter.addEventListener(
    "change",
    renderTransactions
);


// Clear filters

clearFiltersBtn.addEventListener("click", () => {

    typeFilter.value = "all";

    categoryFilter.value = "all";

    renderTransactions();
});


// Month selection

monthSelect.addEventListener(
    "change",
    updateMonthlySummary
);


// Theme

themeToggle.addEventListener("click", () => {

    const isDark =
        document.documentElement.getAttribute(
            "data-theme"
        ) === "dark";


    if (isDark) {

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        localStorage.setItem("theme", "light");

    } else {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        localStorage.setItem("theme", "dark");
    }


    updateThemeIcon();
});


// Load saved transactions

function loadTransactions() {

    const savedData =
        localStorage.getItem("transactions");


    try {

        transactions = savedData
            ? JSON.parse(savedData)
            : [];

    } catch (error) {

        transactions = [];
    }

    const seededTransactions = createMonthlyTransactions();

    const existingIds = new Set(
        transactions.map(transaction => transaction.id)
    );

    const missingTransactions = seededTransactions.filter(
        transaction => !existingIds.has(transaction.id)
    );

    if (missingTransactions.length > 0) {

        transactions = [
            ...transactions,
            ...missingTransactions
        ];

        saveTransactions();
    }
}


function createMonthlyTransactions() {

    const year = new Date().getFullYear();
    const transactions = [];

    for (let month = 0; month < 12; month++) {

        const monthNumber = String(month + 1).padStart(2, "0");

        transactions.push({
            id: year * 1000000 + month * 2 + 1,
            type: "expense",
            amount: 1500 + (month * 35),
            category: "Bills",
            date: `${year}-${monthNumber}-05`,
            description: "Current electricity bill"
        });

        transactions.push({
            id: year * 1000000 + month * 2 + 2,
            type: "expense",
            amount: 1800 + (month * 75),
            category: "Travel",
            date: `${year}-${monthNumber}-15`,
            description: "Monthly transport"
        });
    }

    return transactions;
}


// Save transactions

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}


// Get today's date

function getToday() {

    const today = new Date();

    return today.toISOString().split("T")[0];
}


// Form validation

function validateForm() {

    clearErrors();

    let valid = true;

    const amountText = amountInput.value.trim();
    const amount = Number(amountText);


    if (!["income", "expense"].includes(typeInput.value)) {

        showError(
            "type",
            "Choose whether this is income or an expense."
        );

        valid = false;
    }


    if (!amountText) {

        showError(
            "amount",
            "Enter an amount to continue."
        );

        valid = false;

    } else if (!Number.isFinite(amount) || amount <= 0) {

        showError(
            "amount",
            "Amount must be greater than ₹0."
        );

        valid = false;
    }


    if (!categoryInput.value) {

        showError(
            "category",
            "Select a category for this transaction."
        );

        valid = false;
    }


    if (!dateInput.value) {

        showError(
            "date",
            "Choose the date of this transaction."
        );

        valid = false;
    }


    const description = descriptionInput.value.trim();


    if (!description) {

        showError(
            "description",
            "Add a short description so you can recognize it later."
        );

        valid = false;

    } else if (description.length > 100) {

        showError(
            "description",
            "Description must be 100 characters or fewer."
        );

        valid = false;
    }


    return valid;
}


// Display error

function showError(field, message) {

    document.getElementById(
        field + "Error"
    ).textContent = message;

    document.getElementById(field).setAttribute(
        "aria-invalid",
        "true"
    );
}


// Remove errors

function clearErrors() {

    document
        .querySelectorAll(".error")
        .forEach(error => {
            error.textContent = "";
        });

    document
        .querySelectorAll("#transactionForm [aria-invalid]")
        .forEach(field => {
            field.removeAttribute("aria-invalid");
        });
}


// Reset form

function resetForm() {

    form.reset();

    editingId = null;

    dateInput.value = getToday();


    submitBtn.innerHTML =
        '<i class="fa-solid fa-plus"></i> Add Transaction';


    cancelEditBtn.classList.add("hidden");

    clearErrors();
}


// Update all sections

function updateUI() {

    updateBalance();

    renderTransactions();

    updateMonthlySummary();

    renderCategoryChart();
}


// Calculate total balance

function updateBalance() {

    let income = 0;

    let expense = 0;


    transactions.forEach(transaction => {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;
        }
    });


    totalIncome.textContent =
        formatCurrency(income);

    totalExpense.textContent =
        formatCurrency(expense);

    currentBalance.textContent =
        formatCurrency(income - expense);
}


// Display transactions

function renderTransactions() {

    const selectedType = typeFilter.value;

    const selectedCategory =
        categoryFilter.value;


    const filtered =
        transactions.filter(transaction => {

            const typeMatch =
                selectedType === "all" ||
                transaction.type === selectedType;


            const categoryMatch =
                selectedCategory === "all" ||
                transaction.category === selectedCategory;


            return typeMatch && categoryMatch;
        });


    if (filtered.length === 0) {

        transactionList.innerHTML =
            '<p class="empty-message">No transactions found.</p>';

        return;
    }


    transactionList.innerHTML =
        filtered.map(transaction => {

            const sign =
                transaction.type === "income"
                    ? "+"
                    : "-";


            return `
                <div class="transaction">

                    <div class="transaction-main">

                        <h3>
                            ${escapeHtml(
                                transaction.description
                            )}
                        </h3>

                        <p>
                            ${escapeHtml(
                                transaction.category
                            )}
                            •
                            ${formatDate(
                                transaction.date
                            )}
                        </p>

                    </div>


                    <div class="transaction-amount ${transaction.type}">
                        ${sign}${formatCurrency(
                            transaction.amount
                        )}
                    </div>


                    <div class="transaction-actions">

                        <button
                            class="icon-btn"
                            type="button"
                            onclick="editTransaction(${transaction.id})"
                            aria-label="Edit transaction">

                            <i class="fa-solid fa-pen"></i>

                        </button>


                        <button
                            class="icon-btn"
                            type="button"
                            onclick="deleteTransaction(${transaction.id})"
                            aria-label="Delete transaction">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </div>
            `;

        }).join("");
}


// Edit transaction

function editTransaction(id) {

    const transaction =
        transactions.find(
            item => item.id === id
        );


    if (!transaction) {
        return;
    }


    editingId = id;

    typeInput.value =
        transaction.type;

    amountInput.value =
        transaction.amount;

    categoryInput.value =
        transaction.category;

    dateInput.value =
        transaction.date;

    descriptionInput.value =
        transaction.description;


    submitBtn.innerHTML =
        '<i class="fa-solid fa-pen"></i> Update Transaction';


    cancelEditBtn.classList.remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Delete transaction

function deleteTransaction(id) {

    const transaction =
        transactions.find(
            item => item.id === id
        );


    if (!transaction) {
        return;
    }


    const shouldDelete =
        confirm(
            "Are you sure you want to delete this transaction?"
        );


    if (!shouldDelete) {
        return;
    }


    transactions =
        transactions.filter(
            item => item.id !== id
        );


    saveTransactions();

    updateUI();

    updateMonthOptions();

    updateCategoryFilter();
}


// Create month list

function updateMonthOptions() {

    const months = [
        ...new Set(
            transactions.map(
                transaction =>
                    transaction.date.substring(0, 7)
            )
        )
    ];


    const currentMonth =
        new Date()
            .toISOString()
            .substring(0, 7);


    if (!months.includes(currentMonth)) {
        months.push(currentMonth);
    }


    months.sort().reverse();


    const selectedMonth =
        monthSelect.value;


    monthSelect.innerHTML =
        months.map(month => {

            return `
                <option value="${month}">
                    ${formatMonth(month)}
                </option>
            `;

        }).join("");


    if (months.includes(selectedMonth)) {

        monthSelect.value =
            selectedMonth;
    }
}


// Monthly summary

function updateMonthlySummary() {

    const selectedMonth =
        monthSelect.value ||
        new Date()
            .toISOString()
            .substring(0, 7);


    const monthlyTransactions =
        transactions.filter(transaction =>
            transaction.date.substring(0, 7) ===
            selectedMonth
        );


    let income = 0;

    let expense = 0;


    monthlyTransactions.forEach(transaction => {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;
        }
    });


    monthlyIncome.textContent =
        formatCurrency(income);

    monthlyExpense.textContent =
        formatCurrency(expense);

    monthlyBalance.textContent =
        formatCurrency(income - expense);
}


// Category filter

function updateCategoryFilter() {

    const categories = [
        ...new Set(
            transactions.map(
                transaction =>
                    transaction.category
            )
        )
    ].sort();


    const selectedCategory =
        categoryFilter.value;


    categoryFilter.innerHTML =
        '<option value="all">All Categories</option>';


    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);
    });


    if (categories.includes(selectedCategory)) {

        categoryFilter.value =
            selectedCategory;
    }
}


// Category chart

function renderCategoryChart() {

    const categoryTotals = {};


    transactions
        .filter(
            transaction =>
                transaction.type === "expense"
        )
        .forEach(transaction => {

            categoryTotals[transaction.category] =
                (categoryTotals[transaction.category] || 0) +
                transaction.amount;
        });


    const entries =
        Object.entries(categoryTotals);


    if (entries.length === 0) {

        categoryChart.innerHTML =
            '<p class="empty-message">No expense data available.</p>';

        return;
    }


    const maxAmount =
        Math.max(
            ...entries.map(item => item[1])
        );


    categoryChart.innerHTML =
        entries
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount]) => {

                const width =
                    (amount / maxAmount) * 100;


                return `
                    <div class="chart-row">

                        <span class="chart-name">
                            ${escapeHtml(category)}
                        </span>

                        <div class="bar-wrapper">

                            <div
                                class="bar"
                                style="width: ${width}%">
                            </div>

                        </div>

                        <span class="chart-amount">
                            ${formatCurrency(amount)}
                        </span>

                    </div>
                `;

            })
            .join("");
}


// Change theme icon

function updateThemeIcon() {

    const icon =
        themeToggle.querySelector("i");


    const isDark =
        document.documentElement.getAttribute(
            "data-theme"
        ) === "dark";


    icon.className =
        isDark
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";
}


// Currency format

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR"
        }
    ).format(amount);
}


// Date format

function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


// Month format

function formatMonth(month) {

    const date =
        new Date(
            month + "-01T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            month: "long",
            year: "numeric"
        }
    );
}


// Prevent HTML injection

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}