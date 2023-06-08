import { Modal, Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api"
import { Note } from "../models/note";
import TextInputFeild from "./form/TextInputFeild";

interface AddEditNoteDialogProps {
  noteToEdit?: Note,
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

function AddEditNoteDialog({noteToEdit, onDismiss, onNoteSaved}: AddEditNoteDialogProps) {

  const { register, handleSubmit, formState : { errors, isSubmitting} } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    }
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }

      onNoteSaved(noteResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {noteToEdit ? "Edit Note" : "Add Note"} Note
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>

          <TextInputFeild 
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: "Required"}}
            error={errors.title}
          />

          <TextInputFeild 
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Text"
            register={register}
          />

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEditNoteDialog