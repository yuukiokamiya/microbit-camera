# micro:bit カメラ（試作）

micro:bit から `shot` という言葉が届くと、Web ページがカメラで写真を撮ります。

```
micro:bit ──("shot")──▶ Webページ ──▶ カメラで撮影
          ◀──("ok")───
```

| 端末 | ブラウザ | つなぎ方 |
|---|---|---|
| Windows / Mac（開発・確認用） | Chrome / Edge | **USB ケーブル** |
| iPhone / iPad（本番） | **Bluefy**（App Store） | **Bluetooth** |

> Windows の Bluetooth は micro:bit との相性が悪く、受信開始の時点で切断されることがあるため、PC では USB を使います。

## ファイル

| ファイル | 内容 |
|---|---|
| `index.html` | Web ページ（接続・カメラ表示・撮影・ギャラリー） |
| `microbit/main.ts` | MakeCode 用のサンプルプログラム（USB と Bluetooth の両方に対応） |

## 1. micro:bit の準備（MakeCode）

1. https://makecode.microbit.org/ でプロジェクトを開く（または新しく作る）
2. 「拡張機能」から **bluetooth** を追加する（radio を外してよいか聞かれたら OK）
3. 歯車 →「プロジェクトの設定」→ **JustWorks pairing (default)** がオンになっていることを確認
4. 「JavaScript」タブに `microbit/main.ts` の中身を貼り付ける（ブロックに戻すとブロックで見られます）
5. ダウンロードして micro:bit に書き込む → 画面に四角が出れば待機中

> MakeCode は同じプロジェクトを複数のタブ・ブラウザで同時に開かないでください。「- コピー」ができてしまいます。

## 2. Windows / Mac で動かす（USB）

1. micro:bit を USB ケーブルで PC につないだままにする
2. `index.html` を **Chrome または Edge** で開く
3. 「カメラ開始」→ カメラの使用を許可
4. 「**USB で接続**」→ 一覧から micro:bit（`mbed Serial Port` や `BBC micro:bit CMSIS-DAP` など）を選ぶ
5. micro:bit のボタン A を押す（または揺らす）→ 撮影され、micro:bit にチェックマークが出る

- USB で接続できないときは、MakeCode のタブを閉じてから試してください（micro:bit を取り合うことがあります）
- 「テスト撮影」ボタンで micro:bit なしでも撮影を試せます

## 3. iPhone / iPad で動かす（Bluetooth）

iPhone / iPad の Safari・Chrome は Web Bluetooth 非対応なので、App Store の **Bluefy** を使います。
また Bluefy から開くには、ページを **HTTPS で公開**する必要があります（下の「4. 公開」）。

1. micro:bit は電池につなぐ（USB でも可）
2. Bluefy で公開したページの URL を開く
3. 「カメラ開始」→ カメラの使用を許可
4. 「**Bluetooth で接続**」→ `BBC micro:bit [....]` を選ぶ
5. 初回は「ペアリングしますか？」と聞かれるので「ペアリング」→ micro:bit が笑顔になる
6. ボタン A を押す → 撮影

## 4. 公開（GitHub Pages の例）

1. GitHub で新しいリポジトリを作り、`index.html` をアップロード
2. リポジトリの Settings → Pages → Branch を `main` / `/(root)` にして Save
3. 数分後、`https://<ユーザー名>.github.io/<リポジトリ名>/` で開けるようになる

## 困ったとき

| 症状 | 確認すること |
|---|---|
| 「USB で接続」の一覧に出ない | ケーブルがデータ通信対応か（充電専用ケーブルではないか）／micro:bit の黄色 LED が点いているか |
| USB で接続できるが撮影されない | micro:bit に最新のプログラム（`serial.writeLine("shot")` 入り）が書き込まれているか／右下のログに「受信: "shot"」が出るか |
| Bluetooth の一覧に出ない | micro:bit に bluetooth 版のプログラムが入っているか／ほかの端末とつながったままになっていないか |
| Bluetooth でつながってもすぐ切れる | iPhone/iPad の「設定 → Bluetooth」から micro:bit を「このデバイスの登録を解除」してから、もう一度ペアリング |
| カメラが映らない | ブラウザのカメラ許可／ほかのアプリ（Teams など）がカメラを使っていないか |

## カスタマイズ

- 撮影の合図の言葉は `index.html` の `SHOT_COMMAND` で変えられます
- micro:bit 側で `sendShot()` を呼ぶタイミングを変えれば、「明るさが変わったら」「傾けたら」「音がしたら」など、撮影のきっかけを自由にデザインできます
