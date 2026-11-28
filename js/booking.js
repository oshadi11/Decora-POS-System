
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let events = JSON.parse(localStorage.getItem("decoraEvents")) || [];

    const selectedPackage = document.querySelector('input[name="package"]:checked');

    if (!selectedPackage) {
        alert("Please select a decoration package.");
        return;
    }

    const packageDetails = {
        "75000": "Wedding Deluxe",
        "35000": "Birthday Magic",
        "60000": "Corporate Elegance"
    };

    const packagePrice = Number(selectedPackage.value);
    const advancePayment = Number(document.getElementById("advancePayment").value || 0);

    if (advancePayment < 0 || advancePayment > packagePrice) {
        alert("Please enter a valid advance payment.");
        return;
    }

    let newEvent = {

        eventId: "EVT" + Date.now(),

        customerName: document.getElementById("customerName").value.trim(),

        customerId: document.getElementById("customerId").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        email: document.getElementById("email").value.trim(),

        eventName: document.getElementById("eventName").value.trim(),

        eventType: document.getElementById("eventType").value,

        eventDate: document.getElementById("eventDate").value,

        eventTime: document.getElementById("eventTime").value,

        eventLocation: document.getElementById("eventLocation").value.trim(),

        venueAddress: document.getElementById("venueAddress").value.trim(),

        specialRequirements: document.getElementById("specialRequirements").value.trim(),

        packageName: packageDetails[selectedPackage.value],

        packagePrice: packagePrice,

        advancePayment: advancePayment,

        balance: packagePrice - advancePayment,

        paymentMethod: document.getElementById("paymentMethod").value,

        status: document.getElementById("bookingStatus").value,

        createdAt: new Date().toISOString()

    };

    events.push(newEvent);

    localStorage.setItem("decoraEvents", JSON.stringify(events));

    alert("Booking created successfully!");

    bookingForm.reset();

    console.log("Saved Events:", events);

});
