
// ==========================================
// TOAST NOTIFICATION FUNCTION
// ==========================================

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);

}


// ==========================================
// ACTIVITY 7: BOOK BUTTON FUNCTIONALITY
// ==========================================

const bookButtons = document.querySelectorAll(".book-btn");

bookButtons.forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        const bookingForm = document.getElementById("booking");

        bookingForm.scrollIntoView({
            behavior: "smooth"
        });

        showToast("Redirecting to booking form!");

    });

});


// ==========================================
// ACTIVITY 7: SELECTOR FORMS AND LIVE INTERACTION
// ==========================================

// Selecting form elements
const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");

// Selecting Booking Summary elements
const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.getElementById("summaryStand");
const summaryQuantity = document.getElementById("summaryQuantity");
const summaryTotal = document.getElementById("summaryTotal");

// Ticket prices
const ticketPrices = {

    "RCB vs CSK": {
        "General": 1000,
        "Premium": 2500,
        "VIP": 5000
    },

    "MI vs KKR": {
        "General": 1200,
        "Premium": 3000,
        "VIP": 6000
    },

    "CSK vs MI": {
        "General": 1000,
        "Premium": 2500,
        "VIP": 5000
    }

};


// Update Booking Summary
function updateBookingSummary(showNotification = false) {

    const selectedMatch = matchSelect.value;
    const selectedStand = standSelect.value;
    const quantity = Number(quantityInput.value);

    if (!Number.isInteger(quantity) || quantity < 1) {
        return;
    }

    const price = ticketPrices[selectedMatch]?.[selectedStand];

    if (price === undefined) {
        return;
    }

    const total = price * quantity;

    summaryMatch.textContent = selectedMatch;
    summaryStand.textContent = selectedStand;
    summaryQuantity.textContent = quantity;
    summaryTotal.textContent = total.toLocaleString("en-IN");

    if (showNotification) {
        showToast("Booking summary updated successfully!");
    }

}


// Activity 7 Event Listeners
matchSelect.addEventListener("change", () => {
    updateBookingSummary(true);
});

standSelect.addEventListener("change", () => {
    updateBookingSummary(true);
});

quantityInput.addEventListener("input", () => {
    updateBookingSummary(false);
});

quantityInput.addEventListener("change", () => {
    updateBookingSummary(true);
});

// Initial summary
updateBookingSummary();


// ==========================================
// ACTIVITY 8: TEAM FILTER
// ==========================================

const teamFilter = document.getElementById("team");

const matchCards = document.querySelectorAll(".match-card");

teamFilter.addEventListener("change", function() {

    const selectedTeam = teamFilter.value;

    matchCards.forEach(card => {

        const teams = card.dataset.teams.split(" ");

        if (selectedTeam === "all" || teams.includes(selectedTeam)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

    showToast("Match filter updated!");

});


// ==========================================
// ACTIVITY 8: GRID AND LIST VIEW
// ==========================================

const matchContainer = document.getElementById("matchContainer");

const gridButton = document.getElementById("gridView");

const listButton = document.getElementById("listView");

// Grid View
gridButton.addEventListener("click", function() {

    matchContainer.classList.remove("list-view");

    showToast("Grid view enabled!");

});

// List View
listButton.addEventListener("click", function() {

    matchContainer.classList.add("list-view");

    showToast("List view enabled!");

});


// ==========================================
// ACTIVITY 8: MOBILE HAMBURGER MENU
// ==========================================

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

// Open and close menu
menuToggle.addEventListener("click", function() {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    showToast(isOpen ? "Menu opened!" : "Menu closed!");

});

// Close menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});

// ==========================================
// BOOKING CONFIRMATION AND MY BOOKINGS
// ==========================================

const bookingForm = document.getElementById("bookingForm");

const bookingTableBody = document.getElementById("bookingTableBody");

let bookingCount = 0;

bookingForm.addEventListener("submit", function(event) {

    // Prevent page reload and unwanted redirection
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const selectedMatch = matchSelect.value;
    const selectedStand = standSelect.value;
    const quantity = Number(quantityInput.value);

    // Validate customer details
    if (!name || !email || !phone) {
        showToast("Please fill in all your details!");
        return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
        showToast("Enter a valid ticket quantity!");
        return;
    }

    const price = ticketPrices[selectedMatch]?.[selectedStand];

    if (price === undefined) {
        showToast("Please select a valid match and stand!");
        return;
    }

    const total = price * quantity;

    // Generate booking ID
    bookingCount++;

    const bookingID = "IPL" + String(bookingCount).padStart(3, "0");

    // Remove empty message
    const emptyMessage = bookingTableBody.querySelector(".empty-bookings");

    if (emptyMessage) {
        emptyMessage.closest("tr").remove();
    }

    // Create booking row
    const row = document.createElement("tr");

    const bookingDetails = [
        bookingID,
        selectedMatch,
        selectedStand,
        quantity,
        "₹" + total.toLocaleString("en-IN"),
        "Confirmed"
    ];

    bookingDetails.forEach(detail => {

        const cell = document.createElement("td");

        cell.textContent = detail;

        row.appendChild(cell);

    });

    // Display booking in My Bookings
    bookingTableBody.appendChild(row);

    // Confirmation notification
    showToast("Booking confirmed successfully!");

    // Clear customer details
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    // Scroll to My Bookings
    document.getElementById("mybookings").scrollIntoView({
        behavior: "smooth"
    });

});

