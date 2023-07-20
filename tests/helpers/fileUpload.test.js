import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name:'deutyobw7',
    api_key:'293659938793435',
    api_secret:'afNVYcnSGXDcClBIPttOHAFQ8rg',
    secure:true

});

describe('Pruebas en fileUpload', () => {
    test('debe de subir el archivo correctamente a cloudinary', async()=>{
        const imageUrl= 'https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80';

        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
        //console.log(url);

        const segments = url.split('/');
        const imageId= segments[ segments.length -1 ].replace('.jpg','');
        //console.log({imageId})
        const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image'
         });
        // console.log({cloudResp})




    })

    test('debe de retornar null', async() =>{
        
        const file = new File([], 'foto.jpg');

        const url = await fileUpload(file);
        expect(url).toBe( null );
    })
});