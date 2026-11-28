

    function updateAvailableItems() {

        // Get saved inventory data
        let inventory = JSON.parse(localStorage.getItem("decoraInventory")) || [];

        console.log("Inventory data:", inventory);

        // Display in dashboard
        document.getElementById("availableItemsCount").innerHTML = inventory.length;

                // Get events from localStorage
        let events = JSON.parse(localStorage.getItem("decoraEvents")) || [];

        console.log("Events:", events);

        // Get total number of events
        let totalEvents = events.length;

        // Display count in dashboard
        document.getElementById("totalEventsCount").innerHTML = totalEvents;

    }

    // Execute when page loads
    document.addEventListener("DOMContentLoaded", updateAvailableItems);


function updateDateTime() {

    const now = new Date();

    const dateElement = document.querySelector(".date-display span");
    const timeElement = document.getElementById("current-time");
    const greetingElement = document.querySelector(".greet-msg");

    const dateOptions = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };

    dateElement.textContent = now.toLocaleDateString("en-US", dateOptions);

    timeElement.textContent = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
        greetingElement.textContent = "Good Morning!";
    } 
    else if (hour >= 12 && hour < 17) {
        greetingElement.textContent = "Good Afternoon!";
    } 
    else if (hour >= 17 && hour < 21) {
        greetingElement.textContent = "Good Evening!";
    } 
    else {
        greetingElement.textContent = "Good Night!";
    }
}

updateDateTime();

setInterval(updateDateTime, 1000);
