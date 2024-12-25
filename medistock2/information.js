const form = document.getElementById("medicineForm");
const resultDiv = document.getElementById("result");
const errorElem = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Clear previous results
  resultDiv.innerHTML = "";
  errorElem.style.display = "none";

  // Get the medicine name
  const medicineName = document.getElementById("medicineName").value.trim();
  if (!medicineName) {
    errorElem.textContent = "Please enter a medicine name.";
    errorElem.style.display = "block";
    return;
  }

  // Wikipedia API URL
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${encodeURIComponent(
    medicineName
  )}&explaintext=1&origin=*`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Debugging: Check the API response structure
    console.log(data);

    // Extract the page content
    const pages = data.query.pages;
    const page = Object.values(pages)[0]; // Get the first page object

    if (page.missing || !page.extract) {
      // If no content found
      errorElem.textContent = `Sorry, no details found for "${medicineName}". Try a different name.`;
      errorElem.style.display = "block";
    } else {
      // Display the medicine details
      const title = page.title;
      const content = page.extract;

      // Process the content into sections
      const sections = processContent(content);

      // Display the sections
      resultDiv.innerHTML = `
        <h3>${title}</h3>
        ${sections.usage ? `<h4>Usage</h4><p>${sections.usage}</p>` : ""}
        ${sections.advantages ? `<h4>Advantages</h4><p>${sections.advantages}</p>` : ""}
        ${sections.disadvantages ? `<h4>Disadvantages</h4><p>${sections.disadvantages}</p>` : ""}
        ${sections.full ? `<h4>Summary</h4><p>${sections.full}</p>` : ""}
      `;
    }
  } catch (error) {
    console.error("Error fetching medicine details:", error);
    errorElem.textContent = "Something went wrong while fetching the medicine details.";
    errorElem.style.display = "block";
  }
});

// Function to split content into sections
function processContent(content) {
  const sections = {};

  // Split content into paragraphs
  const paragraphs = content.split("\n").filter((p) => p.trim() !== "");

  // Attempt to match sections with common keywords
  const usageKeywords = /(uses|usage|indications|treatment)/i;
  const advantagesKeywords = /(benefits|advantages)/i;
  const disadvantagesKeywords = /(side effects|disadvantages|risks|adverse effects)/i;

  // Loop through paragraphs to find relevant content
  for (const paragraph of paragraphs) {
    if (!sections.usage && usageKeywords.test(paragraph)) {
      sections.usage = paragraph;
    }
    if (!sections.advantages && advantagesKeywords.test(paragraph)) {
      sections.advantages = paragraph;
    }
    if (!sections.disadvantages && disadvantagesKeywords.test(paragraph)) {
      sections.disadvantages = paragraph;
    }
  }

  // Fallback: Use the first few paragraphs as a full summary
  sections.full = paragraphs.slice(0, 3).join("\n");
  return sections;
}
