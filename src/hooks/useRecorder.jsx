import { useState } from "react"

const useRecorder = (initialValue) => {
    const media = navigator.mediaDevices

    const [state, setState] = useState({
        process: initialValue,
        stream: initialValue,
        audio: initialValue,
        mixedStream: initialValue,
        chunks: [],
        blobData: null,
        start: false,
        stop: true

    })

    const {process, stream, audio, chunks, start, stop, blobData} = state

    const setupStream = async (ref) => {
        setState(state => {
            return {
                ...state,
                process: 'setup loading'
            }
        })

        try {
            const stream = await media.getDisplayMedia({
                video: true
            })

            const audio = await media.getUserMedia({
                audio: {
                    noiseSuppression: true,
                    echoCancellation: true,
                    sampleRate: 44100
                }
            })


            setState(state => {
                return {
                    ...state,
                    stream: stream,
                    audio: audio,
                    process: 'setup complete'
                }
            })
            
           
        }
        catch(e){
            setState(state => {
                return {
                    ...state,
                    process: 'error'
                }
            })
            console.error(e)
        }
    }

    const setupVideoFeedback = (ref) => {
        console.log(stream);
        if(stream){
            ref.srcObject = stream
            ref.play()
        }
        else {
            setState(state => {
                return {
                    ...state,
                    process: 'No stream'
                }
            })

            console.error('No stream available!')
        }
    }

    const startRecording = (ref) => {
        setupStream(ref).then(() => {
            setupVideoFeedback(ref)
            console.log('entered');
     
            if(stream && audio){
                setState(state => {
                    return {
                        ...state,
                        process: 'recording',
                        start: true,
                        stop: false
                    }
                })
    
                const mixedStream = new MediaStream([
                    ...stream.getTracks(), 
                    ...audio.getTracks()
                ])
    
           
                const recorder =  new MediaRecorder(mixedStream)

                setState(state => {
                    return {
                        ...state,
                        recorder: recorder
                    }
                })
                    
                console.log(recorder);

                recorder.ondataavailable = handleDataAvailable
                recorder.onstop = handleStop
                recorder.start(200)
    
                console.log('Recording has started...');
            }
            else {
                setState(state => {
                    return {
                        ...state,
                        process: 'No stream available'
                    }
                })
    
                console.log('No stream available');
            }
            
        })

       
    }
      


    const handleDataAvailable = (e) => {
        chunks.push(e.data)
    }

    const stopRecording = () => {
        const {recorder} = state
        try {
            recorder.stop()
            setState(state => {
                return {
                    ...state,
                    start: false,
                    process: 'recorded',
                    stop: true
                }
            })
        }
        catch(e){
            console.error(e)
            setState(state => {
                return {
                    ...state,
                    start: false,
                    process: 'record saving error',
                    stop: true
                }
            })

        }

      

        console.log('Recording has stopped...');
    }

    const handleStop = (e) => {
        const blob = new Blob(chunks, {
            type: 'video/mp4'
        })

        setState(state => {
            return {
                ...state,
                blobData: blob,
                chunks: []
            }
        })

        stream.getTracks().forEach(track => track.stop())
        audio.getTracks().forEach(track => track.stop())

        console.log('Recording has been prepared...');

      
    }


    return {
        process, 
        start,
        blobData,
        stream,
        audio,
        stop,
        stopRecording,
        startRecording,
    }
}

export default useRecorder