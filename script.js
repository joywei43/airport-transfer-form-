const LIFF_ID = "2009887901-oEPF4JOI"; // 你的 LIFF ID

let profileData = {
  userId: "",
  displayName: ""
};

// 初始化 LIFF
async function initLiff() {
  try {
    await liff.init({ liffId: LIFF_ID });

    if (!liff.isLoggedIn()) {
      liff.login();
      return;
    }

    const profile = await liff.getProfile();
    profileData.userId = profile.userId;
    profileData.displayName = profile.displayName;

    console.log("LIFF OK", profileData);

  } catch (err) {
    console.error("LIFF 初始化錯誤", err);
  }
}

initLiff();

// 表單送出
document.getElementById("transferForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const serviceType = formData.get("serviceType");
  const locationLabel = serviceType === "接機" ? "下車地點" : "上車地點";

  const message = 
`🚗 機場接送預約

姓名：${formData.get("name")}
電話：${formData.get("phone")}
服務：${serviceType}
日期：${formData.get("date")}
時間：${formData.get("time")}
航班：${formData.get("flightNo") || "未填"}
${locationLabel}：${formData.get("location")}
車種：${formData.get("carType")}
人數：${formData.get("passengers")}
行李：${formData.get("luggage")}
備註：${formData.get("note") || "無"}

LINE名稱：${profileData.displayName}
UserID：${profileData.userId}`;

  try {
    if (!liff.isInClient()) {
      alert("請從LINE內開啟");
      return;
    }

    await liff.sendMessages([
      {
        type: "text",
        text: message
      }
    ]);

    alert("已送出，請回LINE確認");
    liff.closeWindow();

  } catch (err) {
    console.error("發送失敗", err);
    alert("發送失敗，請檢查設定");
  }
});
