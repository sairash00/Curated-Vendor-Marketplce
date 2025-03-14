import dotenv from 'dotenv';
dotenv.config();

import ImageKit from 'imagekit'; 

const imgKit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY_IMAGEKIT,
    privateKey: process.env.PRIVATE_KEY_IMAGEKIT,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


async function uploadImage(fileBuffer) {
    try {
        const response = await imgKit.upload({
            file: fileBuffer,
            fileName: `image-${Date.now()}` 
        });
        return response;
    } catch (error) {
        throw error
    }
}


async function deleteImage(fileId) {
    try {
        const response = await imgKit.deleteFile(fileId);
        return response
    } catch (error) {
        throw error;
    }
}

export { uploadImage, deleteImage };

