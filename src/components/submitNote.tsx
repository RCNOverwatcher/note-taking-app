import { Formik } from "formik";
import { collection, addDoc } from "firebase/firestore";
import { db } from "~/firebaseConfig";

type SubmitNoteProps = {
  onNoteSubmitted: () => void;
};

export default function SubmitNote({ onNoteSubmitted }: SubmitNoteProps) {
  return (
    <div>
      <Formik
        initialValues={{ NoteTitle: "My Note", NoteContent: "My Note Content" }}
        onSubmit={async (values, actions) => {
          console.log(values);
          const docRef = await addDoc(collection(db, "notes"), {
            title: values.NoteTitle,
            content: values.NoteContent,
          });
          console.log("Document written with ID: ", docRef.id);
          values.NoteTitle = "My Note";
          values.NoteContent = "My Note Content";
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.NoteTitle}
              name="NoteTitle"
              className={"border border-gray-300 px-4 py-2 text-black"}
            />
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.NoteContent}
              name="NoteContent"
              className={"border border-gray-300 px-4 py-2 text-black"}
            />
            {props.errors.NoteTitle ||
              (props.errors.NoteContent && (
                <div id="feedback">
                  {props.errors.NoteTitle} {props.errors.NoteContent}
                </div>
              ))}
            <button
              type="submit"
              className=" rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
