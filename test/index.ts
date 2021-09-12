import { Parallels } from '../src';
const main = async () => {
  const ps = Parallels();
  for (let i = 0; i < 10; i++) {
    // ランダムに終了する処理を実行し、Promiseを保存
    ps.add(new Promise((resolve) => setTimeout(() => resolve(i), Math.random() * 100)));
    // 最大並列実行数を指定し待機
    // 戻り値 false:制限値内で処理が終了していない
    // 戻り値 resolveで戻した処理のindex
    const v = await ps.wait(5);
    console.log(`${i}:${v}`); // ループ回数:終了した関数を表示
  }
  // 並列5未満でループを抜けた場合の残存処理待ち
  (await ps.all()).forEach((v) => console.log(`*:${v}`));
};

main();
