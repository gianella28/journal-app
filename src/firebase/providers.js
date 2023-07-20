import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        //console.log({credentials})
        const {displayName,email,photoURL,uid} = result.user;

        return{
            ok:true,
            displayName,email,photoURL,uid
        }
        
        
    } catch(error){
        // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    
        return{
            ok:false,
            errorMessage
            
        }
    }
    
}

export const registerUserWithEmailPassword = async({ email, password, displayName})=>{
    try{
        console.log({email,password,displayName})
       const resp = await createUserWithEmailAndPassword(FirebaseAuth , email, password);
       const {uid, photoURL}= resp.user;
       console.log(resp);
       
       //TODO: actualizar el displayname en firebase
       await updateProfile( FirebaseAuth.currentUser, {displayName});
        
       return{
            ok:true,
            uid,photoURL,email,displayName
        }

    }catch (error){
        console.log(error);
        return { ok: false, errorMessage:error.message }

    }
}

export const loginWithEmailPassword = async({ email, password})=> {
    try{
        console.log({email,password})
       const resp = await signInWithEmailAndPassword(FirebaseAuth , email, password);
       const {uid, photoURL,displayName}= resp.user;
       console.log(resp);
               
       return{
            ok:true,
            uid,photoURL,email,displayName
        }

    }catch (error){
        console.log(error);
        return { ok: false, errorMessage:error.message }

    }
}


export const logoutFirebase = async()=>{
    return await FirebaseAuth.signOut();
}