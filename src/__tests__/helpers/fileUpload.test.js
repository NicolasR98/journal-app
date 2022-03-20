import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

describe('Tests on fileUpload.js', () => {
    test('Should load a file and retun an url', async () => {
        const imageURLTest = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
        const resp = await fetch(imageURLTest);
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        // Delete uploaded image
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');
        cloudinary.v2.api.delete_resources(imageId);
    });

    test('Should return an error', async () => {
        const file = new File([], 'foto.png');
        const expectedError = { 'error': { 'message': 'Empty file' } };

        await expect(fileUpload(file)).rejects.toEqual(expectedError);
    });
});