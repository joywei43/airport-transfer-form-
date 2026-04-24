const LIFF_ID = "2009887901-oEPF4JOI";

let lineProfile = {
  userId: "",
  displayName: ""
};

async function initLiff() {
  try {
    await liff.init({ liffId: LIFF_ID });

    if (!liff.isLoggedIn()) {
      liff.login();
      return;
    }

    const profile = await liff.getProfile();

    lineProfile.userId = profile.userId;
    lineProfile.displayName = profile.displayName;

  } catch (error) {
    console.error("LIFF 初始化失敗：", error);
  }
}

initLiff();

document.getElementById("transferForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = document.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "送出中...";

  const formData = new FormData(e.target);

  const serviceType = formData.get("serviceType");
  const locationLabel = serviceType === "接機" ? "下車地點" : "上車地點";

  const message =
`機場接送預約資料

姓名：${formData.get("name")}
聯絡電話：${formData.get("phone")}
服務類型：${serviceType}
日期：${formData.get("date")}
時間：${formData.get("time")}
航班號碼：${formData.get("flightNo") || "未填寫"}
${locationLabel}：${formData.get("location")}
車種：${formData.get("carType")}
人數：${formData.get("passengers")}
行李數：${formData.get("luggage")}
備註：${formData.get("note") || "無"}

LINE名稱：${lineProfile.displayName || "未取得"}
LINE User ID：${lineProfile.userId || "未取得"}`;

  try {
    if (!liff.isInClient()) {
      alert("請從 LINE 內開啟此表單，才能自動帶入官方帳號對話框。");
      return;
    }

    await liff.sendMessages([
      {
        type: "text",
        text: message
      }
    ]);

    alert("已送出預約資料，請在對話框中確認。");
    liff.closeWindow();

  } catch (error) {
    console.error("送出失敗：", error);
    alert("送出失敗，請確認 LIFF 權限是否已開啟 chat_message.write。");

  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "送出預約";
  }
});
