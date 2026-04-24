const LIFF_ID = "2009887901-oEPF4JOI";

async function initLiff() {
  await liff.init({ liffId: LIFF_ID });

  if (!liff.isLoggedIn()) {
    liff.login();
  }
}

initLiff();

document.getElementById("transferForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const message =
`🚗 機場接送預約

👤 姓名：${formData.get("name")}
📞 電話：${formData.get("phone")}
🚘 服務：${formData.get("serviceType")}

📅 日期：${formData.get("date")}
⏰ 時間：${formData.get("time")}
✈️ 航班：${formData.get("flightNo") || "未填"}

📍 上下車地點：${formData.get("location")}
🚙 車種：${formData.get("carType")}

👥 人數：${formData.get("passengers")}
🧳 行李：${formData.get("luggage")}

📝 備註：${formData.get("note") || "無"}`;

  try {
    await liff.sendMessages([
      {
        type: "text",
        text: message
      }
    ]);

    liff.closeWindow();

  } catch (err) {
    alert("請從LINE內開啟");
  }
});
