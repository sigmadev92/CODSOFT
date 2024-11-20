import React, { useRef, useState } from "react";
import ReactCrop, {
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "../../functionsJs/setCanvasPreview";
import axios from "axios";
import { toast } from "react-toastify";
import { usersUrl } from "../../functionsJs/urls";
import { useDispatch } from "react-redux";
import { setProfilePic } from "../../redux/slice/userSlice";
const MIN_WIDTH = 150;
const ASPECT_RATIO = 1;
export default function ChangeImage(props) {
  const dispatch = useDispatch();
  const [imgReady, setImgReady] = useState(false);
  const imgRef = useRef(null);
  const [orginal, setOriginal] = useState(props.img);
  const canvasPreviewRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState(null);
  const [error, setError] = useState("");
  function onSelectFile(e) {
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) return;
    const ext = file.name.split(".")[1];
    if (!["jpg", "jpeg", "png"].includes(ext)) {
      return toast.error("Upload only image (.jpg,jpeg or png");
    }
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
  async function handleSaveButton() {
    const dataURL = canvasPreviewRef.current.toDataURL();
    console.log(dataURL);
    setOriginal(dataURL);
    const modifiedImageBlob = await fetch(dataURL).then((res) => res.blob());
    console.log(modifiedImageBlob);
    const formData = new FormData();
    formData.append("USER_ID", props.user_id);
    formData.append(
      "ProfilePic",
      modifiedImageBlob,
      `images-${props.user_id}.jpg`
    );
    try {
      const resp = await axios.put(`${usersUrl}/edit-profile-pic`, formData);
      if (resp.data.status) {
        console.log("11", dataURL);
        dispatch(setProfilePic(`images-${props.user_id}.jpg`));
        console.log("12");
        props.functions.setEditImageBox(false);
        return toast.success("Profile Pic updated successfully");
      } else {
        toast.error("some Error occured while changing profile pic.");
        console.log(resp.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("PIPELINE_ERROR");
    }
  }
  return (
    <div className="w-[100%] min-h-screen absolute top-0 z-[100] bg-[cyan]">
      <div id="header" className="flex justify-end px-4 bg-black">
        <button
          onClick={() => props.functions.setEditImageBox(false)}
          className="text-white hover:bg-red-500 px-3"
        >
          X
        </button>
      </div>
      <div className="flex flex-wrap">
        <div className="bg-slate-500">
          <img src={orginal} alt="to be changed" className="w-60 h-60" />
          <input
            type="file"
            onChange={onSelectFile}
            className="text-[10px] text-[aqua] bg-black"
          />
        </div>
        <div className="w-[400px]">
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
        </div>
        <div>
          {crop && (
            <>
              <canvas
                ref={canvasPreviewRef}
                className="w-[250px] h-[250px] border-2 border-[white] m-4"
              ></canvas>
              {imgReady && (
                <button
                  className="font-mono bg-black text-white px-2 hover:bg-green-600 shadow-lg mx-4 mb-2"
                  type="button"
                  onClick={handleSaveButton}
                >
                  Save Image
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
