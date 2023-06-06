import { useEffect, useState } from 'react'
import {Note as NoteModel} from './models/note'
import Note from './components/Note';
import { Container, Row, Col } from 'react-bootstrap'
import styles from './styles/NotesPage.module.css'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes () {
      try {
        const response = await fetch("/api/notes/", { method: "GET" });
        console.log(response)
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <>
      <Container>
        <Row xs={1} md={2} lg={3} className='g-4'>
          {notes.map( (note) => (
            <Col key={note._id}>
              <Note className={styles.note} note={note} key={note._id} />
            </Col>
          ))}
        </Row>
      </Container>  
    </>
  )
}

export default App
