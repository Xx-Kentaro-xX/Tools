// グローバル変数
// 転送先候補のサイト数を保持する関数
const location_target_counts = 3;

// メインの関数
function blocking(max) {
  try {
    // 0 ~ max未満の数値を生成する
    let number = Math.floor(Math.random() * (max + 1));

    let target_url = location_targeting(number);

    // 転送
    window.location.replace(target_url);
  } catch (error) {
    alert("Unexpected error happened from main function! : " + error);
  }
}

// 転送先のサイトを決める関数
function location_targeting(number) {
  try {
    if (number == 1) {
      // Paiza
      return "https://paiza.jp/works/mypage";
    } else if (number == 2) {
      // Udemy
      return "https://www.udemy.com/";
    } else if (number == 3) {
      // 読書メーカー
      return "https://bookmeter.com/";
    }
  } catch (error) {
    alert(
      "Unexpected error happened from location_targeting function! :" + error
    );
  }
}
// メイン関数呼び出し
window.addEventListener("load", (event) => {
  blocking(location_target_counts);
});
