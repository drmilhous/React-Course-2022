import { useState } from "react";
import axios from 'axios';
import uuid from 'react-uuid';
import '../index.css'
interface key_interface {
    name: string
    id: string
    public_key: string
}
function Key() {
    const [keypair, setKey] = useState<CryptoKeyPair>();
    const [publicKey, setPublicKey] = useState<CryptoKey>();
    const [publicKeyText, setPublicKeyText] = useState("");
    const [keyName, setKeyName] = useState("");

    function convertArrayBufferToHexaDecimal(buffer: ArrayBuffer) {
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
    async function saveKey(key: CryptoKey) {
        if (key) {
            crypto.subtle.exportKey('raw', key).then((exportedKey) => {
                let keyText = convertArrayBufferToHexaDecimal(exportedKey);
                setPublicKeyText(keyText);
                let data: key_interface = {
                    "name": keyName,
                    "id": uuid(),
                    "public_key": keyText
                };
                // let res = axios.post<key_interface, key_interface>("http://localhost:5011/publickeys", data);
            });
        }
    }
    function setName(event: React.FormEvent<HTMLInputElement>) {
        setKeyName(event.currentTarget.value);
    }
    async function createKey() {
        const key = await crypto.subtle.generateKey({
            "name": "ECDH",
            "namedCurve": "P-256"
        }, false, ['deriveBits']);
        setKey(key);
        setPublicKey(key.publicKey);
        saveKey(key.publicKey);

    }
    return (
        <>
            <section>
                <div className="zedrow">
                    <div className="zedcol">Key Name</div>
                    <div className="zedcol">
                        <input id="name" onChange={setName} />
                    </div>
                </div>
                <div className="zedrow">
                    <div className="zedcol">Key Hex</div>
                    <div className="zedcol">
                        <textarea rows={6} cols={20} name="textValue" id="PublicKeyText" readOnly={true} value={publicKeyText} />
                    </div>
                </div>
            </section>
            <button onClick={createKey}>Create Key</button>
        </>

    );
}

export default Key;