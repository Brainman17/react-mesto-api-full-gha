function InfoTooltip({ isOpen, onClose, info }) {

  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <div className="popup__infoTooltip-wrap">
          <img
            className="popup__infoTooltip-image"
            src={info.image}
            alt={info.text}
          />
          <p className="popup__infoTooltip-text">{info.text}</p>
        </div>
        <button
          className={"popup__close-button"}
          type="button"
          onClick={onClose}
        />
      </div>
    </section>
  );
}

export default InfoTooltip;
