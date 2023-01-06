
import { useState } from "react";
import { arrayBufferToBase64, arrayToHex, Message, ShipData } from "./interface";
import Ship from "./Ship";
import "./Ship.scss"

function Space() {

    const [keyMap, setKeyMap] = useState(new Map<string, ShipData>());
    const [currentState, setCurrentState] = useState(1);
    const [messageMap, setMessageMap] = useState(new Map<string, Message>());
    const [messageList, setMessageList] = useState<Array<Message>>([]);


    function setPublicKey(publickey: ShipData, name: string) {
        keyMap.set(name, publickey);
        setKeyMap(keyMap);
        setCurrentState(currentState + 1);
    }

    function keyLookup(name: string) {
        return keyMap.get(name);
    }
    function getMessage(name: string) {
        return messageMap.get(name);
    }

    function setMessage(message: Message) {
        messageMap.set(message.to, message);
        setMessageMap(messageMap);
        let me = `From: ${message.to} To: ${message.from} Data: ${arrayToHex(message.message)}`
        setMessageList([...messageList, message]);
    }

    // async function getKeyList() {
    //     let keyList: Array<JSX.Element> = [];
    //     keyMap.forEach((value, key) => {


    // }

    // let keyList = getKeyList();
    let keyList: Array<JSX.Element> = [];
    keyMap.forEach((value, key) => {
        keyList.push(<div>{value.name}: {value.publicKeyText}</div>);
    })
    let args = { setPublicKey: setPublicKey, keyLookup: keyLookup, setMessage: setMessage, getMessage: getMessage }
    return (
        <>
            <div className="cards">
                <div>
                    <div className="card">
                        <div className="contianer">
                            <Ship name="Human" key="Human"  {...args}></Ship>
                        </div>
                    </div>
                    <div className="card">
                        <div className="container">
                            <Ship name="Alien" key="Alien"  {...args}></Ship>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <h2>Messages</h2>
                    {messageList.map((x) => <div style={{ padding: "1em" }}>
                        <div><b>From:</b> {x.to}</div>
                        <div><b>To:</b> {x.from}</div>
                        <div><b> Data:</b> {arrayBufferToBase64(x.message)}</div></div>)}
                </div>
            </div>

            <div key={currentState}>
                {keyList}
            </div>
            <div className="box">
                <div>a</div>
                <div>a</div>
                <div>a</div>
            </div>
        </>
    );
}


export default Space;