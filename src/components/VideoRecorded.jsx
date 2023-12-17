import { useEffect, useRef, useState } from "react"
import { useRecorderAppContext } from "../hooks/AppContext"

const VideoRecorded = () => {

    const [loadedData, handleDataLoaded] = useState(false)

    const recordedVideoRef = useRef()
    const {blobData} = useRecorderAppContext()

    const handleBlobData = () => {
        if(!blobData){
            return ''
        }
        else {
            return URL.createObjectURL(blobData)
        }
    }

    useEffect(() => {
        recordedVideoRef.current.load()
        recordedVideoRef.current.onloadeddata = () => {
            // recordedVideoRef.current.play()

            handleDataLoaded(true)


        }
    }, [])


    return (
        <div className={loadedData ? "recorded-video-wrap" : "recorded-video-wrap hidden"}>

            <h2 className="mt-4">Download your video</h2>

            <video controls  ref={recordedVideoRef} src={handleBlobData()} className='recorded-video app-video mt-4'></video>
            <a href={handleBlobData()} download='video.mp4' className="btn control-button mt-4 download" >Download</a>

        </div>
    )
}

export default VideoRecorded