import "./popup.css";

//returns the popup component for succesfull adding or deleting book for exmaple
export default function Popup({ popUp, textMessage }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{textMessage}</p>
        <button onClick={popUp}>Close</button>
      </div>
    </div>
  );
}
