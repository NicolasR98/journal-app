export const fileUpload = async (file) => {
    const cloudUrl = process.env.REACT_APP_CLOUDINARY_CLOUD_URL;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET;

    const formData = new FormData();
    formData.append('upload_preset', uploadPreset);
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });
        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }
    } catch (error) {
        throw error;
    };
};