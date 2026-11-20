// micro:bit カメラ用サンプル（MakeCode の「JavaScript」タブに貼り付けてください）
// USB（Windows/Mac の Chrome・Edge）と Bluetooth（iPhone/iPad の Bluefy）の両方で動きます
//
// 事前準備:
//   1. 拡張機能から「bluetooth」を追加（「radio」を外してよいか聞かれたら OK）
//   2. 歯車 → プロジェクトの設定 → 「No Pairing Required: Anyone can connect via Bluetooth.」をオン
//      （PC は USB でつなぐので、Bluetooth はペアリングなしで iPhone/iPad からつなぐ）

// 撮影の合図を USB と Bluetooth の両方に送る
function sendShot () {
    serial.writeLine("shot")
    bluetooth.uartWriteLine("shot")
}

// Web ページから「撮ったよ (ok)」が返ってきたらチェックマーク
function onReply (msg: string) {
    if (msg == "ok") {
        basic.showIcon(IconNames.Yes)
        basic.pause(500)
        basic.showIcon(IconNames.Happy)
    }
}

// ボタン A を押したら撮影
input.onButtonPressed(Button.A, function () {
    sendShot()
})

// 揺らしても撮影（ここを自由に変えて、「いつ撮るか」をデザインしよう）
input.onGesture(Gesture.Shake, function () {
    sendShot()
})

// Bluetooth: つながったら笑顔、切れたら四角
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Square)
})

// 返事の受け取り（Bluetooth）
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    onReply(bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)))
})

// 返事の受け取り（USB）
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    onReply(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
})

bluetooth.startUartService()
basic.showIcon(IconNames.Square)
