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

    public success()
    {
        this.playSound(880, 0.1);
    }

    public error()
    {
        this.playSound(220, 0.1);
    }

    public warning()
    {
        const oscillator = this.audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime+0.05);
        oscillator.connect(this.audioContext.destination);
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    private playSound(frequency: number, duration: number)
    {
        const oscillator = this.audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.connect(this.audioContext.destination);
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + duration);
    }
}
