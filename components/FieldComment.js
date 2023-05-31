export default function FieldComment(props) {
  const handleNoteChange = (event) => {
    props.setNotes(event.target.value); // Opdaterer noterne med den indtastede værdi
  };

  return (
    <div className="comment">
      <div className="comment-title title">
        4. What did you do? <span className="fig">Min. 20 characters </span>{" "}
      </div>
      {/* textarea-element til at indtaste og vise noter, værdien af textarea er bundet til props.notes og opdateres ved ændringer */}
      <textarea rows={3} value={props.notes} onChange={handleNoteChange} />
    </div>
  );
}
