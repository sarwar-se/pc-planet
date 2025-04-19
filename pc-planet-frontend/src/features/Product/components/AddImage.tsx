import React, { useEffect, useState } from 'react';
import { LuImagePlus } from 'react-icons/lu';
import { ProductDetailsModel, ProductImage } from '../../models/Product';
import { getImageUrl } from '../../../utils/helperFunction';

interface ImagePayload {
  id: number | null;
  fileName: string;
  url: string;
}

const AddImage: React.FC<{
  editImages?: ProductImage[];
  setProductInfo: React.Dispatch<React.SetStateAction<ProductDetailsModel>>;
}> = ({ editImages = [], setProductInfo }) => {
  const [images, setImages] = useState<ImagePayload[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const promises = Array.from(files).map(async (file) => {
      const base64 = await toBase64(file);
      return {
        id: null,
        url: URL.createObjectURL(file),
        fileName: base64,
      };
    });

    const imageList = await Promise.all(promises);
    setImages((prev) => [...prev, ...imageList]);
    updateProductImages([...images, ...imageList]);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });

  const updateProductImages = (imageList: ImagePayload[]) => {
    const productImages: ProductImage[] = imageList.map((image) => ({
      id: image.id,
      fileName: image.fileName,
    }));
    setProductInfo((prev: ProductDetailsModel) => ({ ...prev, images: productImages }));
  };

  const removeImage = (url: string) => {
    const filtered = images.filter((image) => image.url !== url);
    setImages(filtered);
    updateProductImages(filtered);
  };

  useEffect(() => {
    if (editImages.length > 0 && images.length === 0) {
      const existing: ImagePayload[] = editImages.map((img) => ({
        id: img.id,
        url: getImageUrl(img.fileName),
        fileName: img.fileName,
      }));
      setImages(existing);
      updateProductImages(existing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editImages]);

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
              <img className='rounded' src={image.url} alt='upload' />
              <button className='remove-btn' onClick={() => removeImage(image.url)}>
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
