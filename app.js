
// Toast Notification Function
function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}


// Book Buttons Functionality
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


// Activity 7: Selector Forms and Live Interaction


// Selecting Form Elements
const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");


// Selecting Booking Summary Elements
const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.getElementById("summaryStand");
const summaryQuantity = document.getElementById("summaryQuantity");
const summaryTotal = document.getElementById("summaryTotal");


// Ticket Prices
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


// Function to Update Booking Summary
function updateBookingSummary(showNotification = false) {

    const selectedMatch = matchSelect.value;
    const selectedStand = standSelect.value;
    const quantity = Number(quantityInput.value);

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
        return;
    }

    // Get ticket price
    const price = ticketPrices[selectedMatch]?.[selectedStand];

    if (price === undefined) {
        return;
    }

    // Calculate total price
    const total = price * quantity;


    // Update Booking Summary Card
    summaryMatch.textContent = selectedMatch;
    summaryStand.textContent = selectedStand;
    summaryQuantity.textContent = quantity;
    summaryTotal.textContent = total.toLocaleString("en-IN");


    // Show Toast Notification
    if (showNotification) {
        showToast("Booking summary updated successfully!");
    }

}


// Event Listeners

matchSelect.addEventListener("change", function() {
    updateBookingSummary(true);
});


standSelect.addEventListener("change", function() {
    updateBookingSummary(true);
});


// Update summary immediately when quantity changes
quantityInput.addEventListener("input", function() {
    console.log("Quantity changed:", quantityInput.value);
    updateBookingSummary(true);
});


// Display Initial Booking Summary
updateBookingSummary();
