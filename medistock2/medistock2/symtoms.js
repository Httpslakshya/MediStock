 // Symptom-to-Medicine Database
const symptomDatabase = {
    fever: [
        {
            name: "Paracetamol",
            usage: "Take 500mg every 6 hours.",
            advantages: "Reduces fever.",
            disadvantages: "May cause liver damage if overdosed."
        },
        {
            name: "Ibuprofen",
            usage: "Take 200mg every 4 hours.",
            advantages: "Reduces pain and fever.",
            disadvantages: "Can cause stomach irritation."
        }
    ],
    headache: [
        {
            name: "Aspirin",
            usage: "Take 300mg every 4-6 hours.",
            advantages: "Relieves headaches.",
            disadvantages: "Can cause stomach irritation."
        },
        {
            name: "Acetaminophen",
            usage: "Take 500mg every 6 hours.",
            advantages: "Relieves mild to moderate headaches.",
            disadvantages: "Prolonged use may harm the liver."
        }
    ],
    cold: [
        {
            name: "Cetirizine",
            usage: "Take 10mg once daily.",
            advantages: "Relieves symptoms of a runny nose and sneezing.",
            disadvantages: "May cause drowsiness."
        },
        {
            name: "Phenylephrine",
            usage: "Take 10mg every 4 hours.",
            advantages: "Reduces nasal congestion.",
            disadvantages: "May increase blood pressure."
        }
    ],
    cough: [
        {
            name: "Dextromethorphan",
            usage: "Take 10-20mg every 4 hours.",
            advantages: "Suppresses dry cough.",
            disadvantages: "May cause dizziness or nausea."
        },
        {
            name: "Guaifenesin",
            usage: "Take 200-400mg every 4 hours.",
            advantages: "Helps loosen mucus for productive coughs.",
            disadvantages: "Can cause mild gastrointestinal discomfort."
        }
    ],
    "stomach pain": [
        {
            name: "Antacids",
            usage: "Take 1-2 tablets after meals.",
            advantages: "Relieves stomach acidity and pain.",
            disadvantages: "May cause constipation or diarrhea."
        },
        {
            name: "Hyoscine Butylbromide",
            usage: "Take 10mg every 8 hours.",
            advantages: "Relieves stomach cramps and spasms.",
            disadvantages: "May cause dry mouth and dizziness."
        }
    ]
};

// Get references to HTML elements
const form = document.getElementById("symptom-input-form");
const symptomsInput = document.getElementById("symptoms");
const suggestionsContainer = document.getElementById("suggested-medicines-container");
const errorMessage = document.getElementById("error-message");

// Form Submission Event Listener
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const symptoms = symptomsInput.value.trim().toLowerCase(); // Get and normalize user input
    suggestionsContainer.innerHTML = ""; // Clear previous suggestions
    errorMessage.style.display = "none"; // Hide any previous error

    if (!symptoms) {
        errorMessage.textContent = "Please enter your symptoms.";
        errorMessage.style.display = "block";
        return;
    }

    // Find medicines based on symptoms
    const suggestedMedicines = symptomDatabase[symptoms];

    if (suggestedMedicines) {
        // Display medicines
        suggestedMedicines.forEach((medicine) => {
            const medicineCard = document.createElement("div");
            medicineCard.className = "medicine-card";
            medicineCard.innerHTML = `
                <h3>${medicine.name}</h3>
                <p><strong>Usage:</strong> ${medicine.usage}</p>
                <p><strong>Advantages:</strong> ${medicine.advantages}</p>
                <p><strong>Disadvantages:</strong> ${medicine.disadvantages}</p>
            `;
            suggestionsContainer.appendChild(medicineCard);
        });
    } else {
        // No suggestions found
        suggestionsContainer.innerHTML = `<p>No suggestions found for "${symptoms}". Try again with different symptoms.</p>`;
    }
});
