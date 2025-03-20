import axios from 'axios';

const CLOUDINARY_CLOUD_NAME = 'conectart';
const CLOUDINARY_UPLOAD_PRESET = 'shop_preset';

// Define image transformation parameters
const IMAGE_TRANSFORMATIONS = 'c_pad,w_800,h_600,q_auto,f_auto,b_auto';

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    
    // Add transformation parameters to the URL
    const baseUrl = response.data.secure_url.split('/upload/')[0];
    const imagePath = response.data.secure_url.split('/upload/')[1];
    return `${baseUrl}/upload/${IMAGE_TRANSFORMATIONS}/${imagePath}`;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};