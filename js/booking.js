
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get existing events from localStorage
    let events = JSON.parse(localStorage.getItem("decoraEvents")) || [];

    // Create a new event object
    let newEvent = {

        eventId: "EVT" + Date.now(),

        customerName: document.getElementById("customerName").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        email: document.getElementById("email").value.trim(),

        eventType: document.getElementById("eventType").value,

        eventDate: document.getElementById("eventDate").value,

        eventLocation: document.getElementById("eventLocation").value.trim(),

        guestCount: Number(document.getElementById("guestCount").value),

        description: document.getElementById("description").value.trim(),

        status: "Pending",

        createdAt: new Date().toISOString()

    };


    // Add new event to the array
    events.push(newEvent);

    // Save updated events array
    localStorage.setItem("decoraEvents", JSON.stringify(events));

    // Show success message
    alert("Booking created successfully!");

    // Clear form
    bookingForm.reset();

    console.log("Saved Events:", events);

});
