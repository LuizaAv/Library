import "./popup.css";



export default function Popup({popUp, textMessage}){

    return (
        <div className="popup">
            <div className="popup-content">
              <p>{textMessage}</p>
              <button onClick={popUp}>Close</button>
            </div>
        </div>
    )
}