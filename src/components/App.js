import React, {useState} from 'react'
import {Paper, Grid, Collapse} from '@material-ui/core'
import NewKnob from './NewKnob'
import FetchedStems from './FetchedStems'
import UploadForm from './UploadForm'
import Visualizer from './Visualizer'
import DarkTooltip from './DarkTooltip'
import '../index.css'

const App = ({audioObject, frequencyBandArray}) => {

  // bind all methods of audioObject
  for(let key in audioObject) {
      if (typeof(audioObject[key]) == 'function') {
          audioObject[key] = audioObject[key].bind(audioObject)
      }
  }    

    const[uploadEnabled, setUploadEnabled] = useState(false)
    const[isPlaying, setIsPlaying] = useState(false)
    const[currentlyPlaying, setCurrentlyPlaying] = useState('drum loop 1')
    const[sampleDuration, setSampleDuration] = useState(audioObject.player.sampleTime)
    const[reversed, setReversed] = useState(false)
    const[showInfo, setShowInfo] = useState(false)

    const activeButtonStyle = {borderColor: '#c0f3fc', boxShadow: '0px 0px 60px -5px'}

    return (
        <Paper elevation={4} className={'interface-container'} style={{backgroundColor: '#383838'}}>
        <div className={'interface'}>
          <Grid container xs={12} spacing={0}>
            <Grid item xs={4}>
              <div>
                <h2 className={"title"}>grainstems</h2>
                <h3 className={"subtitle"}>a toy granular synth</h3> 
                {
                  !isPlaying 
                  ? 
                  <button disabled={!audioObject.isLoaded} onClick={() => {audioObject.startPlayer(); if (audioObject.player.state === 'started') setIsPlaying(true)}}>start</button>
                  :
                  <button onClick={() => {audioObject.stopPlayer(); setIsPlaying(false)}} style={activeButtonStyle}>stop</button>
                }
                <button onClick={() => setShowInfo(!showInfo)} style={showInfo ? activeButtonStyle : {}}>{' \u24d8'}</button>
                <button onClick={() => setUploadEnabled(!uploadEnabled)} style={uploadEnabled ? activeButtonStyle : {}}>{!uploadEnabled?"upload a sample":"collapse"}</button>
                <Collapse in={uploadEnabled}>
                  <UploadForm />
                </Collapse>
              </div>

            </Grid>
            <Grid item xs={8} className={'screen'}>
              {
                showInfo 
                ?
                <>
                  <p className={'screen-text'}>welcome to grainstems!</p>
                  <p className={'screen-text'}>
                    grainstems is a granular synthesizer, meaning it manipulates audio samples into interesting new sounds. 
                    to get started, choose a sample from below and press start. 
                    mouse over any parameter name for a brief description of what it does, and 
                    if you would like to share a sample of your own for granularization, feel free to upload one for others to use.
                    have fun experimenting!
                  </p>
                </>
                :
                <>
                  <p className={'screen-text'}>current sample:</p>
                  <p className={'screen-text'}>{currentlyPlaying}</p>
                </>
              }
                <Visualizer
                  visible={!showInfo}
                  audioObject={audioObject}
                  frequencyBandArray={frequencyBandArray}
                />
            </Grid>
          </Grid>

          <h3>choose sample</h3> 
          <FetchedStems audioObject={audioObject} setCurrentlyPlaying = {setCurrentlyPlaying} setSampleDuration={setSampleDuration}/>
          <br />
          <br />
          <table>
            <tbody>
              <tr>
                <NewKnob 
                  text={"grain size"}
                  tooltip={'the granular engine breaks the sample down into tiny "grains" of sound which can then be overlapped or played with more or less time between them \
                  to slow down or speed up the sample without affecting pitch. this parameter determines the size of those "grains".'}
                  onChange={(v) => {audioObject.player.grainSize = v / 10}}
                  show={v => Math.floor(10 * v) / 100}
                  units = {'s'}
                  startVal = {5}
                  min={0.1}
                  max={10}
                  diam={80}
                />
                <NewKnob 
                  text={"overlap"}
                  tooltip={'since the sample is chopped up into "grains" of sound, the result can often be choppy or unnatural sounding. the bits of sound can be overlapped to make them \
                  sound more natural. the results of this parameter can be surprising, so play around with it. the percent displayed is the amount that one grain of sound overlaps with the grain before or after it.'}
                  onChange={(v) => {audioObject.player.overlap = audioObject.player.grainSize * v / 10}}
                  show={v => Math.floor(10 * v)}
                  units = {'%'}
                  startVal = {5}
                  min={0.1}
                  max={10}
                  diam={80}
                />
                <NewKnob 
                  text={'tuning'}
                  tooltip={'adjusts the tuning of the granularized sample relative to the original. 12 semitones is an octave and 7 semitones is a perfect fifth.'}
                  show={v => Math.floor(v) / 100}
                  units={'semitones'}
                  onChange={(v) => {audioObject.player.detune = v}}
                  diam={80}
                  startVal={0}
                  min={-3600}
                  max={3600}
                />
                <td>
                  <DarkTooltip arrow placement={'top-start'} title={'reverses playthrough of the sample selection.'}>
                    <h3>reverse</h3>
                  </DarkTooltip>
                  <button onClick={() => {audioObject.setReverse(); setReversed(!reversed)}} className={'reverse-button'} style={reversed ? activeButtonStyle : {} } >~</button>
                </td>
              </tr>
              <tr>
                <NewKnob 
                  text={'loop start'}
                  tooltip={'the granular engine loops through the sample again and again. this parameter sets at what point in time in the sample that loop begins.'}
                  show={v => Math.floor(v * 100) / 100}
                  units={'s'}
                  onChange={(v) => {audioObject.player.loopStart = v}}
                  diam={80}
                  startVal={0}
                  min={0}
                  max={sampleDuration}
                />
                <NewKnob 
                  text={'loop end'}
                  tooltip={'this parameter sets at what point in time in the sample that the loop ends.'}
                  show={v => Math.floor(v * 100) / 100}
                  units={'s'}
                  onChange={(v) => {audioObject.player.loopEnd = v}}
                  diam={80}
                  startVal={sampleDuration}
                  min={0}
                  max={sampleDuration}
                />
                <NewKnob 
                  text={'filter cutoff'}
                  tooltip={'this parameter can filter out higher frequencies. when you lower the filter cutoff, listen for how the higher frequencies get quieter or disappear.'}
                  show={v => Math.floor(2 ** v)}
                  units={'Hz'}
                  onChange={(v) => {audioObject.filter.frequency.rampTo(2 ** v)}}
                  diam={80}
                  startVal={14.28778}
                  min={5}
                  max={14.28778}
                />
                <NewKnob 
                  text={'sample speed'}
                  tooltip={'this parameter adjusts how quickly the synth will loop through the sample selection. 200% will be twice as fast, and 50% will be half as fast.'}
                  show={v => Math.floor((v ** 2) * 100)}
                  units={'%'}
                  onChange={(v) => audioObject.player.playbackRate = v ** 2 }
                  diam={80}
                  startVal={1}
                  min={0.1}
                  max={3}
                />                
              </tr>
            </tbody>
          </table>
        </div>
        </Paper>
    )
}

export default App