

    function updateAvailableItems() {

        // Get saved inventory data
        let inventory = JSON.parse(localStorage.getItem("decoraInventory")) || [];

        console.log("Inventory data:", inventory);

        // Calculate available quantity
        let totalAvailable = 0;

        inventory.forEach(function(item) {
            totalAvailable += Number(item.availableQuantity);
        });

        // Display in dashboard
        document.getElementById("availableItemsCount").innerHTML = totalAvailable;

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