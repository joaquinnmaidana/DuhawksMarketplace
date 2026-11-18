
/*
   DUHAWKS MARKETPLACE
   JavaScript file
   Handles products, searching, filtering, and cart actions.
*/


/*
   1. SAMPLE PRODUCT DATA
*/

// Sample listings for the marketplace.

const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: "Small bookshelf",
        price: 17.99,
        category: "Storage",
        emoji: "📚",
        condition: "Used - Good"
    },
    {
        id: 2,
        name: "Shelf desk",
        price: 43.49,
        category: "House",
        emoji: "🪑",
        condition: "Used - Good"
    },
    {
        id: 3,
        name: "Working table",
        price: 29.00,
        category: "House",
        emoji: "🛠️",
        condition: "Used - Fair"
    },
    {
        id: 4,
        name: "Desk lamp",
        price: 12.50,
        category: "House",
        emoji: "💡",
        condition: "Used - Good"
    },
    {
        id: 5,
        name: "Cooking utensils set",
        price: 15.00,
        category: "Kitchen",
        emoji: "🍳",
        condition: "Used - Good"
    },
    {
        id: 6,
        name: "Introductory textbook",
        price: 24.00,
        category: "Books",
        emoji: "📖",
        condition: "Used - Good"
    },
    {
        id: 7,
        name: "Storage bins",
        price: 9.00,
        category: "Storage",
        emoji: "🗃️",
        condition: "Used - Good"
    },
    {
        id: 8,
        name: "Area carpet",
        price: 35.00,
        category: "House",
        emoji: "🧶",
        condition: "Used - Fair"
    }
];


/*
   2. API INTEGRATION
*/

// Testing a connection to a public API.
// For now, the marketplace uses sample products.

async function initializeApi() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        if (!response.ok) {
            throw new Error("API response unavailable");
        }

        const data = await response.json();

        console.info(
            "Demo API connected; sample record:",
            data.id
        );

    } catch (error) {

        console.info(
            "Demo API unavailable; local listings remain usable."
        );

    }

}


/*
   3. LOCAL STORAGE
*/

// Get items that were previously saved.

const readList = (key) => {

    try {

        return JSON.parse(
            localStorage.getItem(key) || "[]"
        );

    } catch {

        return [];

    }

};


// Save items so they stay after refreshing the page.

const writeList = (key, items) => {

    localStorage.setItem(
        key,
        JSON.stringify(items)
    );

};


/*
   4. PRODUCT CARDS
*/

// Create the HTML for each product.

const productCard = (p) => `

    <div class="col-6 col-md-4">

        <article class="product-card">

            <div
                class="product-art"
                aria-label="Product image placeholder"
            >
                ${p.emoji}
            </div>

            <div class="product-info">

                <h3>${p.name}</h3>

                <div class="price">
                    $${p.price.toFixed(2)}
                </div>

                <p class="small text-muted mb-2">
                    ${p.condition}
                    <br>
                    Sample student listing
                </p>

                <div class="d-flex gap-1 flex-wrap">

                    <button
                        class="btn btn-purple small-btn"
                        data-action="cart"
                        data-id="${p.id}"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="btn btn-outline-secondary small-btn"
                        data-action="save"
                        data-id="${p.id}"
                    >
                        ♡ Save
                    </button>

                </div>

            </div>

        </article>

    </div>

`;


/*
   5. CART AND SAVED ITEMS
*/

// Update the cart count and show saved products.

function updateLists() {

    const cart = readList("duhawks-cart");
    const saved = readList("duhawks-saved");

    // Update the number shown in the cart icon.

    document.querySelectorAll(".cart-count").forEach((el) => {

        el.textContent = cart.length;

    });

    // Show the items in each list.

    const lists = [
        [
            "cart-list",
            cart,
            "Your cart is empty."
        ],
        [
            "saved-list",
            saved,
            "No saved items yet."
        ]
    ];

    for (const [id, items, empty] of lists) {

        const el = document.getElementById(id);

        if (el) {

            el.textContent = items.length
                ? items
                    .map((n) =>
                        SAMPLE_PRODUCTS.find((p) => p.id === n)?.name
                    )
                    .filter(Boolean)
                    .join(", ")
                : empty;

        }

    }

}


/*
   6. SEARCHING AND FILTERING
*/

// Display products based on the search and filters.

function renderCategory() {

    const target = document.getElementById("product-results");

    if (!target) {
        return;
    }

    // Get the search term and category from the URL.

    const params = new URLSearchParams(location.search);

    const term = (params.get("q") || "")
        .trim()
        .toLowerCase();

    const category = params.get("category") || "";

    // Get the selected sorting and price options.

    const max = document.getElementById("max-price").value;
    const sort = document.getElementById("sort").value;

    // Change the heading depending on the search.

    document.getElementById("results-heading").textContent =
        term
            ? `Results for "${term}"`
            : category
                ? `${category} Listings`
                : "Working Table & More";

    // Find products that match the filters.

    let items = SAMPLE_PRODUCTS.filter((p) => {

        const matchesSearch =
            !term ||
            `${p.name} ${p.category}`
                .toLowerCase()
                .includes(term);

        const matchesCategory =
            !category ||
            p.category.toLowerCase() === category.toLowerCase();

        const matchesPrice =
            max === "all" ||
            p.price <= Number(max);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesPrice
        );

    });

    // Sort products by price if selected.

    if (sort === "low") {

        items.sort((a, b) => a.price - b.price);

    }

    if (sort === "high") {

        items.sort((a, b) => b.price - a.price);

    }

    // Add the matching products to the page.

    target.innerHTML = items.length
        ? items.map(productCard).join("")
        : "<p>No matching listings. Try a different search or price filter.</p>";

    // Show how many products were found.

    document.getElementById("result-status").textContent =
        `Showing ${items.length} sample listing${items.length === 1 ? "" : "s"}.`;

}


/*
   7. PAGE EVENTS
*/

// Run this code once the page has loaded.

document.addEventListener("DOMContentLoaded", () => {

    initializeApi();
    updateLists();
    renderCategory();


    // Show featured products on the home page.

    const featured = document.getElementById("featured-products");

    if (featured) {

        featured.innerHTML = SAMPLE_PRODUCTS
            .slice(0, 3)
            .map(productCard)
            .join("");

    }


    // Search for products when the form is submitted.

    const searchForm = document.getElementById("search-form");

    searchForm?.addEventListener("submit", (e) => {

        e.preventDefault();

        const term = document
            .getElementById("search-input")
            .value
            .trim();

        location.href =
            "category.html" +
            (term ? "?q=" + encodeURIComponent(term) : "");

    });


    // Search using one of the suggested keywords.

    document.querySelectorAll(".suggestion").forEach((btn) => {

        btn.addEventListener("click", () => {

            location.href =
                "category.html?q=" +
                encodeURIComponent(btn.dataset.term);

        });

    });


    // Update the results when the sort option changes.

    document
        .getElementById("sort")
        ?.addEventListener("change", renderCategory);


    // Update the results when the price filter changes.

    document
        .getElementById("max-price")
        ?.addEventListener("change", renderCategory);


    // Handle clicks on Add to Cart and Save buttons.

    document.addEventListener("click", (e) => {

        const button = e.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const key =
            button.dataset.action === "cart"
                ? "duhawks-cart"
                : "duhawks-saved";

        const id = Number(button.dataset.id);

        const items = readList(key);

        // Add the product only if it is not already saved.

        if (!items.includes(id)) {

            items.push(id);

        }

        // Save the changes.

        writeList(key, items);

        // Update the page.

        updateLists();

        // Change the button text after clicking.

        button.textContent =
            key === "duhawks-cart"
                ? "Added ✓"
                : "Saved ✓";

    });

});
