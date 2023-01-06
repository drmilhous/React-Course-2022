export interface ShipProps {
    name: string
    setPublicKey: (publickey: ShipData, name: string) => void
    keyLookup: (key: string) => (ShipData | void)
    getMessage: (name: string) => (Message | void)
    setMessage: (message: Message) => void
}
export interface Message {
    to: string
    from: string
    iv: Uint8Array
    message: ArrayBuffer
}
export interface ShipData {
    name: string
    publicKey: CryptoKey
    publicKeyText: string
}

export function arrayToHex(buffer: ArrayBuffer) {
    var data_view = new DataView(buffer)
    var bitIndex, len, hex = '', c;
    for (bitIndex = 0, len = data_view.byteLength; bitIndex < len; bitIndex += 1) {
        c = data_view.getUint8(bitIndex).toString(16);
        if (c.length < 2) {
            c = '0' + c;
        }
        hex += c;
    }
    return hex;
}
export function arrayBufferToBase64(buffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}