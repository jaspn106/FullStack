import styles from '../styles/Note.module.css'
import styleUtils from "../styles/utils.module.css"
import { Note as NoteModel } from '../models/note'
import { Card } from 'react-bootstrap'
import { formatDate } from '../utils/formatDate';
import { MdDelete } from "react-icons/md"

interface NoteProps {
  note: NoteModel,
  onNoteClicked: (note: NoteModel) => void,
  onDeleteNoteCLicked: (note: NoteModel) => void,
  className?: string,
}

function Note({ note, onNoteClicked, onDeleteNoteCLicked, className }: NoteProps) {
  const {
    title,
    text,
    createdAt,
    updatedAt
  } = note;

  let createdUpdateText: string;
  if (updatedAt>createdAt) {
    createdUpdateText = "Updated: " + formatDate(updatedAt);
  }
  else {
    createdUpdateText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card 
    className={`${styles.noteCard} ${className}`}
    onClick={() => onNoteClicked(note)}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteCLicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.noteText}>
          {text}
        </Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>
        {createdUpdateText}
      </Card.Footer>
    </Card>
  )
}

export default Note