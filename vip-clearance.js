const LIFF_ID = "這裡放新的LIFF_ID";

async function initLiff() {
  await liff.init({ liffId: LIFF_ID });

  if (!liff.isLoggedIn()) {
    liff.login();
  }
}

initLiff();

document.getElementById("vipClearanceForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const message =
`✈️ 寰宇VIP快速通關預約

📅 日期：${formData.get("date")}
⏰ 時間：${formData.get("time")}
✈️ 航班：${formData.get("flightNo")}
👤 中英文護照姓名：${formData.get("passportName")}
🎂 出生年月日：${formData.get("birthday")}
🛂 護照號碼：${formData.get("passportNo")}

請一併提供護照個人資料頁照片，以利作業，收到資料後，我們將盡快為您安排，謝謝您 😊`;

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
