export const initialState = {
    status:'checking', // checking not-autheticated, authenticated
    uid:null,
    email:null,
    displayName:null,
    photoURL:null,
    errorMessage:null,
}

export const authenticatedState = {
    status:'authenticated', // checking not-autheticated, authenticated
    uid:'123',
    email:'demo@google.com',
    displayName:'Demo User',
    photoURL:'https//demo.jpg',
    errorMessage:null,
}

export const notAuthenticatedState = {
    status:'not-authenticated', // checking not-autheticated, authenticated
    uid:null,
    email:null,
    displayName:null,
    photoURL:null,
    errorMessage:null,
}

export const demoUser={
    uid:'AB123',
    email:'demo@google.com',
    displayName:'Demo User',
    photoURL:'https//demo.jpg',
    
}