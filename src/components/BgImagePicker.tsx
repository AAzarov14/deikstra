import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'
import graphData from './Store';

const BgImagePicker = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addImage = graphData((state:any) => state.addPhoto)
  const images = graphData((state:any) => state.photos)
  const setBgImageSrc = graphData((state:any) => state.setBgImageSrc)

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addImage(url);
    }
  };

  return (
    <div id='bgImagePicker'>
      {images.map((item:string, index:number) => <button key={"img-"+index} onClick={() => setBgImageSrc(item)}><img src={item} className='object-cover h-full w-full' alt='Ваше изображение'></img></button>)}
      <button onClick={() => handleButtonClick()}>
          <FaPlus className='m-auto' size={28}/>
      </button>
      <input type="file" className='hidden' ref={fileInputRef} onChange={handleFileChange} accept="image/*"></input>
    </div>
  )
}

export default BgImagePicker