import { flexbox } from "@mui/system";
import { useEffect, useState } from "react";
import { arrayToHex, Message, ShipData, ShipProps, arrayBufferToBase64 } from "./interface";
import "./Ship.scss"

function Ship({ name, setPublicKey, keyLookup, getMessage, setMessage }: ShipProps) {
    const [shipKey, setShipKey] = useState<CryptoKeyPair>();
    const [sharedBits, setSharedBits] = useState<string>("");
    const [getMessageData, setMessageData] = useState<string>("");
    const [recievedECData, setrecievedECData] = useState<string>("");
    const [messageSendData, setMessageSendData] = useState<string>("");

    const [publicKey, setPublicKeyText] = useState("");
    const [privateKey, setPrivateKeyText] = useState("");




    async function decrypt() {
        let keyName = "Human";
        if (name == "Human") {
            keyName = "Alien";
        }

        let other = keyLookup(keyName);
        let m = getMessage(name);
        if (m && other && shipKey) {
            console.log("Here", other, m);
            setrecievedECData(arrayToHex(m.message));
            let key = await getSharedKey(other, shipKey);
            console.log("the key", key);

            // var iv = crypto.getRandomValues(new Uint8Array(12));
            let decryptePromise = crypto.subtle.decrypt({
                "name": "AES-GCM",
                "iv": m.iv
            }, key, m.message);
            decryptePromise.then((decrypted) => {
                console.log(decrypted);
                // The humans decode the message into human readable text...
                var decoded = new TextDecoder().decode(decrypted);
                setMessageData(decoded);
            }
            ).catch((reason) => { console.log(reason) });


        }
    }





    async function getSharedKey(other: ShipData, shipKey: CryptoKeyPair) {
        var sharedBits = await crypto.subtle.deriveBits({
            "name": "ECDH",
            "public": other.publicKey
        }, shipKey.privateKey, 256);
        // btoa("abc")
        let bitString = arrayBufferToBase64(sharedBits);
        setSharedBits(bitString);
        // The first half of the resulting raw bits is used as a salt.
        var sharedDS = sharedBits.slice(0, 16);

        // The second half of the resulting raw bits is imported as a shared derivation key.
        var sharedDK = await crypto.subtle.importKey('raw', sharedBits.slice(16, 32), "PBKDF2", false, ['deriveKey']);

        // A new shared AES-GCM encryption / decryption key is generated using PBKDF2
        // This is computed separately by both parties and the result is always the same.
        var key = await crypto.subtle.deriveKey({
            "name": "PBKDF2",
            "salt": sharedDS,
            "iterations": 100000,
            "hash": "SHA-256"
        }, sharedDK, {
            "name": "AES-GCM",
            "length": 256
        }, true, ['encrypt', 'decrypt']);
        return key;
    }

    async function send() {
        let keyName = "Human";
        if (name == "Human") {
            keyName = "Alien";
        }

        let other = keyLookup(keyName);
        if (shipKey && other) {
            let keyPromise = getSharedKey(other, shipKey);
            keyPromise.then((key) => {
                // The alienship can construct a message and encode it.
                let message = new TextEncoder().encode(messageSendData);

                // A random iv can be generated and used for encryption
                var iv = crypto.getRandomValues(new Uint8Array(12));

                // The iv and the message are used to create an encrypted series of bits.
                let p = crypto.subtle.encrypt({
                    "name": "AES-GCM",
                    "iv": iv
                }, key, message);
                p.then((encrypted) => {
                    console.log(encrypted);
                    let m: Message = { from: name, to: keyName, message: encrypted, iv: iv }
                    setMessage(m);
                });
            }
            );
        }
    }

    useEffect(() => { createKey() }, []
    )

    async function createKey() {
        let exportKeys = true;
        var ship = await crypto.subtle.generateKey({ "name": "ECDH", "namedCurve": "P-256" }, exportKeys, ['deriveBits']);
        setShipKey(ship);
        crypto.subtle.exportKey('jwk', ship.publicKey).then((exportedKey) => {
            setPublicKeyText(JSON.stringify(exportedKey));
        });
        crypto.subtle.exportKey('jwk', ship.privateKey).then((exportedKey) => {
            setPrivateKeyText(JSON.stringify(exportedKey));
        });
        let exported = await crypto.subtle.exportKey('raw', ship.publicKey);
        let v = arrayToHex(exported).substring(0, 20) + " ... ";
        let sd: ShipData = { name: name, publicKey: ship.publicKey, publicKeyText: v }
        setPublicKey(sd, name);
    }
    return (
        <div>
            {/* <div style={{ outline: "5px solid grey" }}> */}

            <div className="box">
                <div>
                    Ship {name}

                </div>
                {/* <div className="boxCol"> */}
                <div>
                    <text>Public Key</text>
                    <div><textarea rows={4} cols={60} value={publicKey}></textarea></div >


                </div>
                <div><button onClick={createKey} style={{ width: "200px", height: "60px" }}>Create Key</button></div>
                {/* <div>
                <div>Private Key </div>
                <textarea rows={4} cols={60} value={privateKey} >
                </textarea>
            </div> */}
                {/* </div> */}
            </div>
            <div className="box">

                <div>
                    <h3>Send Message</h3>
                    <div>
                        <textarea onChange={(e) => setMessageSendData(e.currentTarget.value)} rows={2} cols={20}></textarea>
                    </div>
                    <button onClick={send}>Send</button>
                </div>
                <div>
                    <h3>Shared Bits</h3>
                    <textarea rows={3} cols={20} value={sharedBits}></textarea>
                </div>
                <div>
                    <h3>Get Message</h3>
                    <div>
                        Encrypted Data
                        <textarea value={recievedECData} rows={2} cols={20}></textarea>
                    </div>
                    <div>
                        Decrypted Data
                        <textarea value={getMessageData} rows={2} cols={20}></textarea>
                    </div>
                    <button onClick={decrypt}>Decrypt</button>
                </div>

            </div >


        </div>);
}

export default Ship;