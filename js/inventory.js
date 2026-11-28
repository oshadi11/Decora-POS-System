
    // Get inventory from localStorage
    function getInventory() {
        return JSON.parse(localStorage.getItem("decoraInventory")) || [];
    }


    // Prevent user-entered text from being treated as HTML
    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function(char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[char];
        });
    }


    // Format currency
    function formatPrice(price) {
        return Number(price || 0).toLocaleString("en-LK", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }


    // Get stock status
    function getStockStatus(item) {

        const available = Number(item.availableQuantity || 0);
        const minimum = Number(item.minimumStock || 0);

        if (available <= 0) {
            return {
                text: "Out of Stock",
                className: "stock-out"
            };
        }

        if (available <= minimum) {
            return {
                text: "Low Stock",
                className: "stock-low"
            };
        }

        return {
            text: "In Stock",
            className: "stock-good"
        };
    }


    // Load inventory
    function loadInventory() {

        const inventory = getInventory();

        const tableBody = document.getElementById("inventoryTableBody");
        const emptyState = document.getElementById("emptyState");

        const searchValue = document.getElementById("searchInput")
            .value.toLowerCase();

        const selectedCategory = document.getElementById("categoryFilter").value;

        tableBody.innerHTML = "";

        // Filter items
        const filteredItems = inventory
            .map((item, index) => ({ item, index }))
            .filter(({ item }) => {

                const matchesSearch =
                    String(item.name || "").toLowerCase().includes(searchValue) ||
                    String(item.code || "").toLowerCase().includes(searchValue);

                const matchesCategory =
                    selectedCategory === "all" ||
                    item.category === selectedCategory;

                return matchesSearch && matchesCategory;
            });


        // Display items
        filteredItems.forEach(({ item, index }) => {

            const status = getStockStatus(item);

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    <div class="item-name">${escapeHTML(item.name)}</div>
                    <div class="item-code">${escapeHTML(item.code)}</div>
                </td>

                <td>
                    <span class="category-badge">
                        ${escapeHTML(item.category)}
                    </span>
                </td>

                <td>
                    <span class="type-badge">
                        ${escapeHTML(item.type)}
                    </span>
                </td>

                <td>${Number(item.totalQuantity || 0)}</td>

                <td>${Number(item.availableQuantity || 0)}</td>

                <td>Rs. ${formatPrice(item.sellingPrice)}</td>

                <td>
                    <span class="stock-badge ${status.className}">
                        ${status.text}
                    </span>
                </td>

                <td>
                    <div class="action-buttons">
                        <button class="action-btn delete-btn"
                                title="Delete item"
                                onclick="deleteItem(${index})">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });


        // Empty state
        emptyState.style.display =
            filteredItems.length === 0 ? "block" : "none";

        // Update footer
        document.getElementById("itemCount").textContent =
            filteredItems.length;

        updateStatistics(inventory);
    }


    // Update statistics
    function updateStatistics(inventory) {

        const totalItems = inventory.length;

        const totalStock = inventory.reduce((sum, item) => {
            return sum + Number(item.totalQuantity || 0);
        }, 0);

        const lowStock = inventory.filter(item => {
            const available = Number(item.availableQuantity || 0);
            const minimum = Number(item.minimumStock || 0);

            return available > 0 && available <= minimum;
        }).length;

        const outOfStock = inventory.filter(item => {
            return Number(item.availableQuantity || 0) <= 0;
        }).length;

        document.getElementById("totalItems").textContent = totalItems;
        document.getElementById("totalStock").textContent = totalStock;
        document.getElementById("lowStock").textContent = lowStock;
        document.getElementById("outOfStock").textContent = outOfStock;
    }


    // Delete item
    function deleteItem(index) {

        const inventory = getInventory();

        if (!confirm("Are you sure you want to delete this item?")) {
            return;
        }

        inventory.splice(index, 1);

        localStorage.setItem("decoraInventory", JSON.stringify(inventory));

        loadInventory();
    }


    // Search and category filters
    document.getElementById("searchInput")
        .addEventListener("input", loadInventory);

    document.getElementById("categoryFilter")
        .addEventListener("change", loadInventory);


    // Load items when page opens or refreshes
    loadInventory();