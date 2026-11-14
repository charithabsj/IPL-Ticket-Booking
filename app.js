
function showToast(message) {
    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

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
