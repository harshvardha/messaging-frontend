import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";

const useUploadImage = () => {
    const [file, setFile] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState("");
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const uploadImage = () => {
        try {
            setIsUploading(true);
            const storage = getStorage(app);
            const filename = new Date().getTime() + file.name;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadPercentage(Math.round(progress));
                    switch (snapshot.state) {
                        case "canceled":
                            setIsUploading(false);
                            console.log("Upload cancelled.");
                            break;
                        case "error":
                            setIsUploading(false);
                            console.log("Some error occurred.");
                            break;
                        case "paused":
                            console.log("Upload is paused.");
                            break;
                        case "running":
                            console.log("upload is running");
                            break;
                        case "success":
                            console.log("upload is successfull.");
                            break;
                    }
                },
                (error) => {
                    setIsUploading(false);
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        setDownloadUrl(downloadURL);
                        setIsUploading(false);
                    });
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    return { setFile, downloadUrl, uploadPercentage, isUploading, uploadImage, setUploadPercentage };
}

export default useUploadImage;