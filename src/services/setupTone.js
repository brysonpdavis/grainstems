import * as Tone from 'tone'

const setupTone = (playerProps) => {
    const fft = new Tone.FFT(128)

    const gain = new Tone.Gain(1)

    const envelope = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.1,
    sustain: 0,
    release: 0.5,
    })

    const filter = new Tone.Filter((2 ** 15), "lowpass", -24)

    const player = new Tone.GrainPlayer(playerProps)

    player.chain(filter, gain, fft, Tone.Destination)

    return {fft, gain, envelope, filter, player}
}

export default setupTone



