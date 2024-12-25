document.addEventListener('DOMContentLoaded', () => {
    const showFormButton = document.getElementById("show-add-medicine-form");
    const addMedicineForm = document.getElementById("add-medicine-form");
    const medicineForm = document.getElementById("medicine-form");
    const medicineContainer = document.getElementById("medicine-container");
    const body = document.querySelector('body');

    // Toggle form visibility and background blur
    showFormButton.addEventListener("click", () => {
        const isHidden = addMedicineForm.classList.contains("hidden");
        if (isHidden) {
            addMedicineForm.classList.remove("hidden");
            addMedicineForm.classList.add("show");
            body.classList.add("blur"); // Apply blur effect to the background only
        } else {
            addMedicineForm.classList.remove("show");
            setTimeout(() => addMedicineForm.classList.add("hidden"), 300); // Delay hiding the form
            body.classList.remove("blur"); // Remove blur effect
        }
    });

    // Function to calculate days left until expiry
    const calculateDaysLeft = (expiryDate) => {
        const currentDate = new Date();
        const expiry = new Date(expiryDate);
        const timeDifference = expiry - currentDate;
        const daysLeft = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
        return daysLeft;
    };

    // Load medicines from localStorage and initialize the app
    const loadMedicines = () => {
        const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
        renderMedicines(medicines);
    };

    // Render medicines as cards in the container
    const renderMedicines = (medicines) => {
        medicineContainer.innerHTML = ""; // Clear existing cards
        if (medicines.length === 0) {
            medicineContainer.innerHTML = `<p>No medicines available. Add some!</p>`;
            return;
        }

        medicines.forEach((medicine, index) => {
            const { name, expiryDate, quantity } = medicine;
            const daysLeft = calculateDaysLeft(expiryDate);

            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Quantity:</strong> ${quantity}</p>
                <p><strong>Days Left:</strong> ${daysLeft} days</p>
                <p><strong>Expiry:</strong> ${expiryDate}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            medicineContainer.appendChild(card);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", deleteMedicine);
        });
    };

    // Add new medicine
    medicineForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("medicine-name").value.trim();
        const expiryDate = document.getElementById("expiry-date").value.trim();
        const quantity = document.getElementById("quantity").value.trim();

        if (!name || !expiryDate || !quantity) {
            alert("Please fill in all fields!");
            return;
        }

        const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
        medicines.push({ name, expiryDate, quantity });
        localStorage.setItem("medicines", JSON.stringify(medicines));

        renderMedicines(medicines);
        medicineForm.reset();
        addMedicineForm.style.display = "none";
        showFormButton.textContent = "Add Medicine";
    });

    // Delete a medicine
    const deleteMedicine = (e) => {
        const index = e.target.dataset.index;
        const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
        medicines.splice(index, 1);
        localStorage.setItem("medicines", JSON.stringify(medicines));
        renderMedicines(medicines);
    };

    // Initialize the application
    loadMedicines();
});
