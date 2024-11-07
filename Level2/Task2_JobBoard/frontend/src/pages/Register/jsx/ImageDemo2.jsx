import React, { useRef, useState } from "react";
import ReactCrop, {
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "../../../functionsJs/setCanvasPreview";
const MIN_WIDTH = 150;
const ASPECT_RATIO = 1;
export default function ImageDemo2(props) {
  const [imgReady, setImgReady] = useState(false);
  const imgRef = useRef(null);
  const canvasPreviewRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState(null);
  const [error, setError] = useState("");
  function onSelectFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const imageElement = new Image();

      const imgUrl = reader.result?.toString() || "";
      imageElement.src = imgUrl;
      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (MIN_WIDTH > naturalWidth || MIN_WIDTH > naturalHeight) {
          setError("The Image must be greater than 150x150.");
          return setImgSrc("");
        }
      });
      setImgSrc(imgUrl);
    };
    reader.readAsDataURL(file);
  }
  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    const cropWidthinPercent = (MIN_WIDTH / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthinPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    setCrop(crop);
  }

  return (
    <div className="w-[80%] absolute h-[80%] top-[60px] bg-slate-600 rounded-lg md:left-[100px] overflow-y-auto z-20">
      <div className="flex justify-between bg-slate-500 rounded-t-lg">
        <input
          type="file"
          id="imageinput"
          className="bg-white rounded-lg text-[10px] md:text-[20px]"
          onChange={onSelectFile}
        />
        <button
          type="button"
          className="mr-10 hover:bg-red-600 text-white font-bold px-3"
          onClick={() => props.fn.setImageDiv(false)}
        >
          X
        </button>
      </div>
      {error}
      {imgSrc !== "" && (
        <div className="flex justify-center">
          <ReactCrop
            crop={crop}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_WIDTH}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="display"
              className="h-[300px]"
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
      )}
      {imgSrc && (
        <div className="flex justify-center">
          <button
            type="button"
            className="px-2 bg-green-400 hover:bg-green-700 mt-4"
            onClick={() => {
              setCanvasPreview(
                canvasPreviewRef.current,
                imgRef.current,
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              setImgReady(true);
            }}
          >
            Crop
          </button>
        </div>
      )}
      {crop && (
        <>
          <canvas
            ref={canvasPreviewRef}
            className="w-[150px] h-[150px] border-2 border-[white] m-4"
          ></canvas>
          {imgReady && (
            <button
              className="font-mono bg-black text-white px-2 hover:bg-green-600 shadow-lg mx-4 mb-2"
              type="button"
              onClick={async () => {
                props.fn.setImageDiv(false);
                const dataURL = canvasPreviewRef.current.toDataURL();
                props.fn.setImage(dataURL);
                const modifiedImageBlob = await fetch(dataURL).then((res) =>
                  res.blob()
                );
                console.log(modifiedImageBlob);
                props.fn.setProfilePic(modifiedImageBlob);
              }}
            >
              Save Image
            </button>
          )}
        </>
      )}
    </div>
  );
}
