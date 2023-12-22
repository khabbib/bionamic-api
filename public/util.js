export function decodeBuffer(bufferArray) {
  const uintArray = new Uint8Array(bufferArray);
  const decoder = new TextDecoder();
  return decoder.decode(uintArray);
}

export async function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
  try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Response not OK');
      return await response.json();
  } catch (error) {
      if (retries > 0) {
          setTimeout(() => {
              return fetchWithRetry(url, options, retries - 1, backoff * 2);
          }, backoff);
      } else {
          throw error;
      }
  }
}
document.getElementById('copyToClipboard').addEventListener('click', function() {
  const apiKeyDisplay = document.getElementById('apiKeyDisplay');
  const fullText = apiKeyDisplay.textContent;

  // Check if the API key has been generated
  if (fullText.includes("Your API Key: ")) {
      const apiKey = fullText.split(": ")[1]; // Split the text and get the second part

      navigator.clipboard.writeText(apiKey)
          .then(() => {
              alert('API Key copied to clipboard!');
          })
          .catch(err => {
              console.error('Error in copying text: ', err);
          });
  } else {
      alert('Please generate an API key first.');
  }
});
