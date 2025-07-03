import { TIME_LIMIT_SECONDS, REDIRECT_URL } from "./config.js";

// 今日の日付を取得する処理
function getTodayDateString() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); //Stringに変換するのは、後ろにあるpadStartで数値が1桁だった場合に0埋めするため
  const day = String(now.getDate()).padStart(2, "0"); //Stringに変換するのは、後ろにあるpadStartで数値が1桁だった場合に0埋めするため

  return `${year}-${month}-${day}`;
}

// Local Storageの時間データを読み込み、返す
function loadTimeData() {
  // localStorageに設定されている値を取得
  //JSON.parse()を実行しているのはlocalStorageから取得してきた値をオブジェクトにするため
  const data = JSON.parse(localStorage.getItem("urlTimeTracker")) || {};
  const today = getTodayDateString();

  // 過去の日付のデータがあれば削除
  for (const key in data) {
    if (key != today) {
      delete data[key];
    }
  }

  // 今日の日付のデータがなければ初期化
  if (!data[today]) {
    data[today] = {
      totalSeconds: 0,
    };
  }

  return data;
}

// LocalStorageに時間を保存する
function saveTimeData(data) {
  localStorage.setItem("urlTimeTracker", JSON.stringify(data));
}

// === 時間制限チェックと追跡開始 ===
export function startTracking() {
  const today = getTodayDateString();
  let data = loadTimeData();

  // すでに制限超過なら即リダイレクト
  if (data[today].totalSeconds >= TIME_LIMIT_SECONDS) {
    alert("今日の閲覧時間はすでに制限を超えています。");
    window.location.href = REDIRECT_URL;
    return;
  }

  // --- 30秒ごとに時間を加算 ---
  // setInterval()の管理IDをcountIntervalIdに代入している => あとでclearInterval()する際にIDが必要なため
  //
  const countIntervalId = setInterval(() => {
    data = loadTimeData(); // 他タブ対応のため毎回読み込み
    data[today].totalSeconds += 30;
    saveTimeData(data);
    // ログ出力　[動作確認目的]
    console.log(`[追跡中] ${today} の合計時間: ${data[today].totalSeconds}秒`);
  }, 30000);

  // --- 1分ごとにチェック ---
  const checkIntervalId = setInterval(() => {
    data = loadTimeData(); // 他タブ対応
    if (data[today].totalSeconds >= TIME_LIMIT_SECONDS) {
      // ログ出力 [動作確認目的]
      console.log(
        `[制限超過] ${data[today].totalSeconds}秒 に達したためリダイレクト`
      );
      clearInterval(countIntervalId);
      clearInterval(checkIntervalId);
      alert("1日の閲覧時間上限を超えました。別ページに移動します。");
      window.location.href = REDIRECT_URL;
    }
  }, 60000); // 1分 = 60,000ms
}
