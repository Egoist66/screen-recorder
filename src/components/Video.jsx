import { useEffect, useRef, useState } from "react"
import { useRecorderAppContext } from "../hooks/AppContext"
import Controls from "./Controls"

const Video = ({children, ...options}) => {

    const videoRef = useRef()
    const {process, stream, video} = useRecorderAppContext()


  
    useEffect(() => {
        
    }, [])


    return (
        <>
        
            <video ref={videoRef} className="app-video mt-4" {...options}>{children}</video>
            <Controls VideoRef={videoRef.current} />
        
        </>
    )
}

export default Video