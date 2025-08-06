const container = document.getElementById("api-container");

fetch("../data/API.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((api, index) => {
      const card = document.createElement("div");
      card.className = "api-card";
      card.dataset.url = api.url; // Store the URL for later use

      card.innerHTML = `
        <h2>${index + 1}. <span class="api-url">${api.url}</span></h2>
        <div class="api-details">
          <span><strong>Method:</strong> ${api.method}</span>
          <span><strong>Security Check:</strong> <span class="status ${api.securityCheck.toLowerCase()}">${api.securityCheck}</span></span>
          <span><strong>Functional Check:</strong> <span class="status ${api.functionalCheck.toLowerCase()}">${api.functionalCheck}</span></span>
          <span><strong>API Test Report Link:</strong> 
            <a href="${api.reportLink}" target="_blank" class="report-link">${api.reportLink}</a>
          </span>
        </div>
        <small class="click-hint">📋 Click anywhere to copy URL</small>
      `;

      // ✅ Copy URL when card is clicked
      card.addEventListener("click", (e) => {
        const urlToCopy = card.dataset.url;
        navigator.clipboard.writeText(urlToCopy).then(() => {
          showAlert("✅ API URL copied to clipboard!");
        }).catch(() => {
          showAlert("❌ Failed to copy API URL!");
        });
      });

      container.appendChild(card);
    });
  })
  .catch((err) => {
    container.innerHTML = `<p style="color:red;">❌ Failed to load API data: ${err.message}</p>`;
  });

// ✅ Custom Alert Function
function showAlert(message) {
  const alertBox = document.createElement("div");
  alertBox.className = "custom-alert";
  alertBox.textContent = message;
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.classList.add("show");
  }, 10);

  setTimeout(() => {
    alertBox.classList.remove("show");
    setTimeout(() => alertBox.remove(), 300);
  }, 2000);
}
