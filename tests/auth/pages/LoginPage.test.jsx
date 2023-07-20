import { fireEvent, render,screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth/thunks";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPaswword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email,password}) => {
        return () => mockStartLoginWithEmailPaswword({email,password});
    },
}));

jest.mock('react-redux',()=>({
    ...jest.requireActual('react-redux'),
    //va a regresar una funcion
    useDispatch: ()=>(fn)=> fn(),
}));


const store = configureStore({
    reducer:{
        auth: authSlice.reducer
    },
    preloadedState:{
        auth: notAuthenticatedState
    }
})


describe('Pruebas en <LoginPage>',()=>{

    beforeEach(()=>jest.clearAllMocks());
    test('debe de mostar el componente correctamente', ()=>{
         render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );
        //screen.debug();
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    });

    test('boton de google debe de llamar el startGoogleSignIn', ()=>{
        render(
           <Provider store={store}>
               <MemoryRouter>
                   <LoginPage/>
               </MemoryRouter>
           </Provider>
       );
       //screen.debug();
      const googleBtn=screen.getByLabelText('google-btn');
      //console.log(googleBtn)
        fireEvent.click(googleBtn);
        //screen.debug();
        expect(mockStartGoogleSignIn).toHaveBeenCalled();
   });

   test('submit debe de llmar startLoginWithEmailPassword',()=>{
        
        const email='gianella@google.com';
        const password='123456';
    
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const emailField= screen.getByRole('textbox', {name:'Correo'});
        fireEvent.change(emailField,{target:{name:'email', value:email}});

        const passwordField= screen.getByTestId('password');
        fireEvent.change(passwordField,{target:{name:'password', value:password}});

        const loginForm= screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        expect(mockStartLoginWithEmailPaswword).toHaveBeenCalledWith({
            email:email,
            password:password
        })

   })
});


