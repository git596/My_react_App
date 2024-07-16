import React from 'react';      //import React library
import { useState , useEffect } from 'react';       //import useState library
import { storage } from './Firebase';
import { ref , uploadBytes, listAll , getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';
import axios, { Axios } from 'axios';

const FileUpload = () => {

const [files, setFiles] = useState(null);       //defines a state variable called files using the useState hook to store files
const [imageList, setImageList] = useState([]);
const imageListRef = ref(storage, 'images/');

const [progress, setProgress] = useState( {started: false, pc : 0} );   
const [msg , setMsg] = useState( null );    //defines a state variable called msg using the useState hook to display msg to user

function handleupload() {
    if (!files) {
        setMsg("Please select a file");
        return;
    
}

    const imageref = ref(storage , `images/${files.name + v4()}`);
    uploadBytes(imageref, files).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            setImageList((prev) => [...prev, url]);
        })
        alert("File uploaded successfully");
    })

    

    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
        fd.append('file${i+1}' , files[i]);
    }

    setMsg("ing...");
    fetch('http://httpbin.org/post', {
        method: 'POST',
        body: fd,
        headers: {
            "Custom-Header": "value",
        }
    })
    .then(res => {
        if(!res.ok){
            throw new Error("upload failed");
        }
        setMsg(" successful");
        console.log("heeeeeeeeee !!!!");
        return res.json();
    })

    .then(data => console.log(data))
    .catch(err => {
        setMsg("upload failed");
        console.log(err)
    });


    // axios.post('http://httpbin.org/post', fd, {
    //     onUploadProgress: (progressEvent) => {
    //         setProgress(prevState => {
    //             return {...prevState, pc: progressEvent.progress*100}
    //         })
    //     },
    //     headers: {
    //         "Custom-Header": "value",
    //     }
    // })
    // .then(res => {
    //     setMsg("upload successful");
    //     console.log(res.data);
    // })
    // .catch(err => {
    //     setMsg("upload failed");
    //     console.log(err)
    // });

} 

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            console.log(response); // you will see the references of images stored in 'firebase storage' in the inspect console
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prevState) => [...prevState, url])
                })
            })
        })
    }, [])


    return (
        <div className='text-center pt-20'>
            {/* <h1>Uploading files in React</h1> */}

            <input onChange={(e) => setFiles(e.target.files[0])} type="file" multiple/>

            <button className='w-20 h-7 bg-slate-300 hover:bg-green-600 hover:text-gray-800 rounded-xl text-10px' onClick={handleupload}>Upload</button>

            {/* {progress.started && <progress max={100} value={progress.pc}></progress>} */}
            {msg && <span>{msg}</span>}

            <div>
            {imageList.map((url) => {
                return <img className='w-1/4 h-1/4 m-2 ' src={url}/>
            }
            )}
            </div>

            {/* <div>
            {imageList.map((url, index) => {
                const fileName = url.split("/").pop(); // Extracting the file name from the URL
                return (
                <a key={index} href={url} download={fileName} className='block m-2'>
                    {fileName}
                </a>
                );
            })}
            </div> */}

            
        </div>
    );
};

export default FileUpload;