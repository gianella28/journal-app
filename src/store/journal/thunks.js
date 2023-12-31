import { doc, collection, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNot = () =>{
    
    return async( dispatch, getState) =>{
        dispatch( savingNewNote());
       
        const {uid} = getState().auth;
        
        const  newNote = {
            title:'',
            body:'',
            date: new Date().getTime(),
        }
        //console.log(Object.values(newNote.title));
       
            const newDoc = doc (collection (FirebaseDB, `${uid}/journal/notes`));
            const setDocResp= await setDoc(newDoc, newNote);
            newNote.id = newDoc.id;

            console.log({newDoc,setDocResp});
            dispatch( addNewEmptyNote (newNote));
            dispatch( setActiveNote (newNote));
        
        
       

        
       
    }
}

export const startLoadingNotes = ()=>{
    return async (dispatch ,getState )=>{
        const {uid} = getState().auth;
        const notes= await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () =>{
    return async(dispatch,getState)=>{
        dispatch(setSaving());

        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, {merge:true})

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files=[]) =>{
    return async(dispatch)=>{
        dispatch(setSaving());
        //await fileUpload(files[0])

        const fileUploadPromises =[];
        for(const file of files){
            fileUploadPromises.push(fileUpload(file))
        }

        const photoUrls = await Promise.all(fileUploadPromises);
        console.log(photoUrls);

        dispatch(setPhotosToActiveNote(photoUrls));
        
    }
}

export const startDeletingNote = () =>{
    return async(dispatch, getState)=>{
        
        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        console.log({uid,note});

        const docRef= doc(FirebaseDB,`${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
        
    }
}