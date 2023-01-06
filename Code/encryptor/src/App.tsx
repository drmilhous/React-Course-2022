import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { getOffsetLeft } from '@mui/material'
import Ship from './components/Ship';

function App() {

  const [a, setStarShipKey] = useState<CryptoKeyPair>();
  const [b, setAlienKey] = useState<CryptoKeyPair>();
  const [publicKeyTextAlien, setPublicKeyTextAlien] = useState("");
  const [publicKeyTextHuman, setPublicKeyTextHuman] = useState("");


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

  let go = async () => {
    let exportKeys = true;
    // The starship will generate an Elliptic Curve Diffie-Hellman keypair
    var starship = await crypto.subtle.generateKey({
      "name": "ECDH",
      "namedCurve": "P-256"
    }, false, ['deriveBits']);

    setStarShipKey(starship);
    // The alienship will generate an Elliptic Curve Diffie-Hellman keypair

    var alienship = await crypto.subtle.generateKey({ "name": "ECDH", "namedCurve": "P-256" }, exportKeys, ['deriveBits']);

    if (exportKeys) {
      crypto.subtle.exportKey('jwk', alienship.publicKey).then((exportedKey) => {
        setPublicKeyTextAlien(JSON.stringify(exportedKey));
      });
      crypto.subtle.exportKey('jwk', starship.publicKey).then((exportedKey) => {
        setPublicKeyTextHuman(JSON.stringify(exportedKey));
      });
    }
    else {
      crypto.subtle.exportKey('raw', alienship.publicKey).then((exportedKey) => {
        setPublicKeyTextAlien(convertArrayBufferToHexaDecimal(exportedKey));
      });
      crypto.subtle.exportKey('raw', starship.publicKey).then((exportedKey) => {
        setPublicKeyTextHuman(convertArrayBufferToHexaDecimal(exportedKey));
      });
    }





    // alienship sends alienship.publicKey to starship
    // starship sends starship.publicKey to alienship
    // TIP: You can paint your public ECDH x and y coordinates on your vessel for all to see.

    // sharedBits - Both ships can now compute the shared bits.
    // The ship's private key is used as the "key", the other ship's public key is used as "public".
    var sharedBits = await crypto.subtle.deriveBits({
      "name": "ECDH",
      "public": alienship.publicKey
    }, starship.privateKey, 256);

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

    // The raw bits of the actual encryption key can be exported and saved in the ship's computer.
    // These bits should be stored encrypted and should reference the specfic ship you are communicating with.
    var exported = await crypto.subtle.exportKey('raw', key);

    // The alienship can construct a message and encode it.
    var message = new TextEncoder().encode('TO SERVE MAN...');

    // A random iv can be generated and used for encryption
    var iv = crypto.getRandomValues(new Uint8Array(12));

    // The iv and the message are used to create an encrypted series of bits.
    var encrypted = await crypto.subtle.encrypt({
      "name": "AES-GCM",
      "iv": iv
    }, key, message);

    // The alienship sends the bits and the iv to the starship

    // The starship decrypts the message using the shared key and publicly provided iv.
    var decrypted = await crypto.subtle.decrypt({
      "name": "AES-GCM",
      "iv": iv
    }, key, encrypted);

    // The humans decode the message into human readable text...
    var decoded = new TextDecoder().decode(decrypted);

    // The humans output the message to the console and gasp!
    console.log(decoded);
  }
  const [count, setCount] = useState(0)

  function setPublicKey(publickey: CryptoKey, name: string) {

  }
  return (
    <div>
      <div>
        <Ship name="Human"></Ship>
      </div>


      <div className="ship">
        <div className='keytitle'>
          Alien Ship
        </div>
        <div className="keyarea">
          <div className='keyitem'>
            Alien Public Key
            <textarea rows={4} cols={50} name="textValue" id="AlienPublicKey" value={publicKeyTextAlien} />
          </div>
          {/* </div>

        <div className="keyarea"> */}
          {/* <div className='keytext'>
            Alien Private Key
          </div>
          <div className='keyitem'>
            <textarea rows={4} cols={50} name="textValue" id="AlienPrivateKey" value={privateKeyTextAlien} />
          </div> */}
        </div>
      </div>
      <div className="keyarea">
        <div className='keytext'>
          Human Ship
        </div>
        <div className='keyitem'>
          Human Public Key
          <textarea rows={4} cols={50} name="textValue" id="humanKey" value={publicKeyTextHuman} />
        </div>
      </div>

      <button onClick={go}>Press me</button>

    </div>
  )
}

export default App
