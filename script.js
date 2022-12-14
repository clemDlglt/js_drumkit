const DRUMKIT = document.getElementById('drumkit');
const samples = [{
        name: 'Snare',
        key: 'a',
        sound: 'assets/snare.wav'
    },
    {
        name: 'Kick',
        key: 'z',
        sound: 'assets/kick.wav'
    },
    {
        name: 'Crash',
        key: 'e',
        sound: 'assets/crash.wav'
    },
    {
        name: 'Hi-hat',
        key: 'r',
        sound: 'assets/hihat.wav'
    },
];

class Sample {
    constructor({
        name,
        key,
        sound = null,
    }) {
        this.key = key;
        this.sound = new Audio(sound);
        this.name = name;
    }

    set playing(isPlaying) {
        if (isPlaying) document.getElementById(this.name).classList.add('playing');
        else document.getElementById(this.name).classList.remove('playing');
    }

    create() {
        const div = document.createElement('div');
        div.classList.add('sample');
        div.setAttribute('id', this.name);

        const keySpan = document.createElement('span');
        keySpan.textContent = this.key;

        const nameSpan = document.createElement('span');
        nameSpan.textContent = this.name;

        div.append(
            keySpan,
            nameSpan,
        );

        DRUMKIT.appendChild(div);
    }

    setListener() {
        window.addEventListener('keypress', (event) => this.play(event));
        this.sound.addEventListener('ended', () => this.playing = false);
    }

    play(event) {
        if (event.key != this.key) return;

        this.sound.load();
        this.sound.play();
        this.playing = true;
    }
}

for (const sample of samples) {
    const drum = new Sample({
        name: sample.name,
        key: sample.key,
        sound: sample.sound,
    });

    drum.create();
    drum.setListener();
}