import * as Tone from 'tone'

const setupNodes = (playerProps) => {
    const gain = new Tone.Gain(1)

    const envelope = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.1,
    sustain: 1,
    release: 0.5,
    })

    console.log("envelope", envelope)

    const filter = new Tone.Filter((2 ** 15), "lowpass", -24)

    const player = new Tone.GrainPlayer(playerProps)

    player.chain(filter, gain, Tone.Destination)

    return {gain, envelope, filter, player}
}

export default setupNodes



