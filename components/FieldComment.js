export default function FieldComment(props) {
  const handleNoteChange = (event) => {
    props.setNotes(event.target.value);
  };

  return (
    <div className="comment">
      <div className="comment-title title">
        4. What did you do? <span className="fig">Min. 50 characters </span>{" "}
      </div>
      <input
        name="duration"
        type="text"
        value={props.notes}
        onChange={handleNoteChange}
        maxlength="50"
        required
      />
    </div>
  );
}
