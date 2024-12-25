const medicines = [
    { name: "Paracetamol", expiryDate: "2024-12-26" },
    { name: "Ibuprofen", expiryDate: "2024-12-24" },
    { name: "Vitamin C", expiryDate: "2024-12-28" }
  ];
  
  // Function to send a WhatsApp message
  async function sendWhatsAppNotification(medicineName, daysLeft) {
    const accountSid = "your_account_sid"; // Replace with your Twilio Account SID
    const authToken = "your_auth_token"; // Replace with your Twilio Auth Token
    const fromWhatsAppNumber = "whatsapp:+14155238886"; // Twilio's WhatsApp sandbox number
    const toWhatsAppNumber = "whatsapp:+1234567890"; // Replace with the recipient's WhatsApp number
  
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  
    const body = `Your medicine "${medicineName}" will expire in ${daysLeft} days. Please take appropriate action.`;
  
    const headers = new Headers();
    headers.append("Authorization", `Basic ${btoa(`${accountSid}:${authToken}`)}`);
    headers.append("Content-Type", "application/x-www-form-urlencoded");
  
    const params = new URLSearchParams();
    params.append("From", fromWhatsAppNumber);
    params.append("To", toWhatsAppNumber);
    params.append("Body", body);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: params
      });
  
      if (response.ok) {
        console.log(`WhatsApp notification sent: ${body}`);
      } else {
        console.error("Failed to send WhatsApp notification:", await response.text());
      }
    } catch (error) {
      console.error("Error sending WhatsApp notification:", error);
    }
  }
  
  // Function to check medicine expiry
  function checkMedicineExpiry() {
    const today = new Date();
  
    medicines.forEach((medicine) => {
      const expiryDate = new Date(medicine.expiryDate);
      const timeDiff = expiryDate - today;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  
      if (daysLeft === 2) {
        // Send WhatsApp notification
        sendWhatsAppNotification(medicine.name, daysLeft);
      }
    });
  }
  
  // Run the expiry check
  checkMedicineExpiry();
  