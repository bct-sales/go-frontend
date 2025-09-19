export interface SoundEmitter
{
    success() : void;
    warning() : void;
    error() : void;
}

export class MuteSoundEmitter implements SoundEmitter
{
    success() { }
    warning() { }
    error() { }
}

export class ActiveSoundEmitter implements SoundEmitter
{
    private audioContext: AudioContext;

    public constructor()
    {
        this.audioContext = new AudioContext();
    }

    private pitch(n: number): number
    {
        return 440 * 2**(n/12);
    }

    public success()
    {
        const frequencies = [
            { frequency: this.pitch(12), offset: 0 },
            { frequency: this.pitch(16), offset: 0.05 },
        ];

        this.playSound(frequencies, 0.1);
    }

    public error()
    {
        const frequencies = [
            { frequency: this.pitch(-6), offset: 0 },
            { frequency: this.pitch(-12), offset: 0.05 },
        ];

        this.playSound(frequencies, 0.1);
    }

    public warning()
    {
        const frequencies = [
            { frequency: 440, offset: 0 },
            { frequency: 880, offset: 0.05 },
            { frequency: 440, offset: 0.1 },
            { frequency: 880, offset: 0.15 },
        ];

        this.playSound(frequencies, 0.2);
    }

    private playSound(frequencies: {frequency: number, offset: number}[], duration: number)
    {
        const oscillator = this.audioContext.createOscillator();
        for ( const {frequency, offset } of frequencies )
        {
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime + offset);
        }
        oscillator.connect(this.audioContext.destination);
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + duration);
    }
}
