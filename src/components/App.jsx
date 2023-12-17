import { useState } from 'react'
import Header from './Header'
import Container from './service-components/Container'
import Main from './Main'
import Video from './Video'
import Controls from './Controls'
import VideoRecorded from './VideoRecorded'


const App = () => {

  

  return (
    <>

      <Header>
        
        <Container className='container p-4'>

          <h1>Screen Recorder</h1>

        </Container>

      </Header>


      <Main>

        <Container className='container p-4'>

          <h2>Video recorder</h2>

          <Video autoPlay />

          <VideoRecorded />

        </Container>

      </Main>

      
      
    </>
  )
}

export default App
