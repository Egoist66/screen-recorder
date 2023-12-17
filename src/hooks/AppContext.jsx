import { createContext, useContext } from "react";
import useRecorder from "./useRecorder";

const Context = createContext()

export const useRecorderAppContext = () => {
    return useContext(Context)
}


export const RecorderContext = ({children}) => {

    const {startRecording, stopRecording, process, stream, audio, blobData, start, stop} = useRecorder(null)

    return (
        <Context.Provider value={{
            startRecording,
            stopRecording,
            process,
            stream,
            audio,
            blobData,
            start,
            stop,
            
        }}>

            {children}

        </Context.Provider>
    )
}