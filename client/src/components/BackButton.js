import '../styles/BackButton.css'

const BackButton=({goBack})=> {
    return (
        <div className="bk-btn" onClick={goBack}><div className="bk-btn-triangle"></div><div className="bk-btn-bar"></div></div>
    );
  }

export default BackButton;  