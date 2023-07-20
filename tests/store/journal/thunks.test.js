import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNot } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Pruebas en Journal Thunks', ()=>{
    const dispatch= jest.fn();
    const getState= jest.fn();
    
    beforeEach(()=>jest.clearAllMocks());

    //test si funciona nomas hay que quitar seguridad en la consola de firebase para que deje grabar testing
    test('startNewNote debe de crear una nueva nota en blanco',async()=>{
        const uid ='TEST-UID';
        getState.mockReturnValue({auth:{uid:uid}});
        await startNewNot()(dispatch,getState);
        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith( addNewEmptyNote({
            body:'',
            title:'',
            id:expect.any(String),
            date:expect.any(Number),
        }));
        expect(dispatch).toHaveBeenCalledWith( setActiveNote({
            body:'',
            title:'',
            id:expect.any(String),
            date:expect.any(Number),
        }));

        //Borrar de Firebase
        const collectionRef = collection (FirebaseDB, `${uid}/journal/notes`);
        const docs  = await  getDocs(collectionRef);

        const deletePromises= [];
        docs.forEach(doc=>deletePromises.push(deleteDoc(doc.ref)));

        await Promise.all(deletePromises);
        
    })
})