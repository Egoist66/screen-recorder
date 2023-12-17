import { useRecorderAppContext } from "../hooks/AppContext"
import Button from "./service-components/Button"

const Controls = ({VideoRef}) => {

    const {startRecording, stopRecording, start, stop} = useRecorderAppContext()

   
    const handleRecording = () => {
        startRecording(VideoRef)
    }

    return (

        <div className="app-video-controls pt-4">

            <Button disabled={start} onClick={handleRecording} className='control-button start-recording btn'>Start Recording</Button>
            <Button onClick={stopRecording} disabled={stop} className='control-button stop-recording btn'>Stop Recording</Button>

        </div>
    )
}

export default Controls