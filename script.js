const GAS_URL = "請放你的 Google Apps Script Web App URL";

document.getElementById("transferForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.textContent = "送出中...";

  const formData = new FormData(e.target);

  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    serviceType: formData.get("serviceType"),
    date: formData.get("date"),
    time: formData.get("time"),
    flightNo: formData.get("flightNo"),
    dropoff: formData.get("dropoff"),
    passengers: formData.get("passengers"),
    luggage: formData.get("luggage"),
    note: formData.get("note"),
    lineDisplayName: formData.get("lineDisplayName") || "",
    lineUserId: formData.get("lineUserId") || "",
    submittedAt: new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })
  };

  try {
    await fetch(GAS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    alert("已收到您的預約資料，我們將盡快與您確認。");
    e.target.reset();

  } catch (error) {
    alert("送出失敗，請稍後再試或直接聯繫客服。");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "送出預約";
  }
});
