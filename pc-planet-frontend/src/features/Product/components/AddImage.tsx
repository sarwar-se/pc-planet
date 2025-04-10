import React, { useState } from 'react';
import { LuImagePlus } from 'react-icons/lu';
import { ProductDetailsModel, ProductImage } from '../../models/Product';

interface ImagePayload {
  id: string;
  fileName: string;
}

const AddImage: React.FC<{
  setProductInfo: React.Dispatch<React.SetStateAction<ProductDetailsModel>>;
}> = ({ setProductInfo }) => {
  const [images, setImages] = useState<ImagePayload[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const promises = Array.from(files).map(async (file) => {
      const base64 = await toBase64(file);
      return {
        id: URL.createObjectURL(file),
        fileName: base64,
      };
    });

    const imageList = await Promise.all(promises);
    setImages(imageList);

    const productImages: ProductImage[] = imageList.map((image) => ({
      id: null,
      fileName: image.fileName,
    }));
    setProductInfo((prev: ProductDetailsModel) => ({ ...prev, images: productImages }));
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });

  const removeImage = (id: string) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div className='border rounded-top'>
      <div className='bg-light border-bottom p-2'>
        <h5>Product Images</h5>
      </div>
      <div className='d-flex gap-3 p-3'>
        <label className='upload-box'>
          <input type='file' multiple accept='image/*' onChange={handleFileChange} hidden />
          <LuImagePlus />
          <div>Click to upload</div>
        </label>
        <div className='d-flex gap-2'>
          {images.map((image) => (
            <div key={image.id} className='image-preview border rounded'>
              <img className='rounded' src={image.id} alt='upload' />
              <button className='remove-btn' onClick={() => removeImage(image.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddImage;
