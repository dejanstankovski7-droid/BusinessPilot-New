const form = document.getElementById("generator");
const button = document.getElementById("generate");
const resultWrap = document.getElementById("resultWrap");
const result = document.getElementById("result");
document.getElementById("year").textContent = new Date().getFullYear();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  button.disabled = true;
  button.innerHTML = "Working on your content… <span>✦</span>";
  resultWrap.hidden = false;
  result.textContent = "BusinessPilot is preparing your content…";
  try {
    const payload = {
      business: document.getElementById("business").value.trim(),
      audience: document.getElementById("audience").value.trim(),
      goal: document.getElementById("goal").value.trim(),
      tone: document.getElementById("tone").value,
      language: document.getElementById("language").value
    };
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Er ging iets mis.");
    result.textContent = data.result;
  } catch (error) {
    result.textContent = error.message;
  } finally {
    button.disabled = false;
    button.innerHTML = 'Generate my content <span>✦</span>';
  }
});

document.getElementById("copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(result.textContent);
    document.getElementById("copy").textContent = "Copied!";
  } catch {
    document.getElementById("copy").textContent = "Select and copy the text";
  }
});
