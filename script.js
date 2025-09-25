(function() {
  const container = document.getElementById('poem');

  const lyricsLibrary = {
    'new-song': [
        'Press', 'the', 'lyrics', 'to', 'edit.', 'Spacebar', 'moves', 'foward,', 'backspace', 'moves', 'back.'
    ],
    'instructions': {
        bpm: 120,
        pickup: true,
        words: [
            'Hel-', '-', 'lo', '-', '-', 'and', 'wel-', 'come!', '-', '-', "Let's", '-', 'write', 'a', 'verse.', '-', 'We', 'can', 'start', '-', 'with', 'the', 'but-', 'tons', '-', 'to', 'help', 'you', 're-', '-', 'hearse.', '-', 'On', 'the', 'left,', 'the', 'but-', 'ton', 'Play,', '-', '-', "you'll", 'want', 'to', 'press', '-', 'that.', '-', 'B', 'P', 'M', 'to', 'set', 'the', 'beat,', '-', 'Green', 'and', 'Blue', 'just', 'mix', 'and', 'match.', '-', 'Pre-', 'load',
            'Rhymes', 'make', '-', 'a', // Syncopation 1 (starts at index 67)
            'rhy-', 'thm,', '-', '-', 'pick', 'the', 'one', 'you', 'want.', '-', 'Switch', 'to',
            '9/', '8,', '-', 'or', // Syncopation 2 (starts at index 82)
            '6/', '4,', '-', 'use', 'six-', 'teenth', 'notes', 'too', 'much.', '-', '-', 'But', 'when', 'you', 'want', 'to', 'save,', '-', 'make', 'an', 'ed-', 'it,', 'add', "what's", 'new...', '-', 'Press', 'the',
            'Pa-', 'ra-', '-', 'graph', // Syncopation 3 (starts at index 113)
            'but-', 'ton', '-', 'and', 'see', 'what', 'it', 'can', 'do!', '-', 'Grab', 'the', 'text', '-', 'from', 'the', 'box,', '-', 'store', 'it', 'safe', 'and', 'use', 'it', 'la-', 'ter,', 'make', 'a', 'screen', 'shot', 'on', 'your', 'clip-', 'board,', 'keep', 'the', 'pic-', 'ture', 'for', 'the', 'ha-', 'ters.', 'Then', '-', 'turn', 'the', 'e-', 'dit', 'off,', '-', 'see', 'the', 'Rhyme', 'in', 'all', 'its', 'glo-', 'ry', 'as', 'you', 'plot', 'the', 'se-', 'cond', 'verse', '-', 'and', 'con-', 'ti-', 'nue', 'with', 'your', 'sto-', 'ry.'
        ],
        syncopation: [67, 83, 115], // Trigger positions (index of 2nd sound)
        syncopationStates: {
            69: true, 70: false,   // After '[Rhymes make - a]' -> 'rhy-' is active, 'thm,' is not
            85: true, 86: false,   // After '[9/ 8, - or]' -> '6/' is active, '4,' is not
            117: true, 118: false  // After '[Pa- ra- - graph]' -> 'but-' is active, 'ton' is not
        }
    },
    'hickory-dickory-dock': [
      'Hick-', 'o-', 'ry', 'dick-', 'o-', 'ry', 'dock,',
      'The', 'mouse', 'ran', 'up', 'the', 'clock.',
      'The', 'clock', 'struck', 'one,',
      'The', 'mouse', 'ran', 'down,',
      'Hick-', 'o-', 'ry', 'dick-', 'o-', 'ry', 'dock.'
    ],
    'jack-and-jill': [
      'Jack', 'and', 'Jill', 'went', 'up', 'the', 'hill',
      'To', 'fetch', 'a', 'pail', 'of', 'wa-', 'ter.',
      'Jack', 'fell', 'down', 'and', 'broke', 'his', 'crown,',
      'And', 'Jill', 'came', 'tum-', 'bling', 'af-', 'ter.'
    ],
    'mary-had-a-little-lamb': [
      'Ma-', 'ry', 'had', 'a', 'lit-', 'tle', 'lamb,',
      'Its', 'fleece', 'was', 'white', 'as', 'snow;',
      'And', 'ev-', 'ery-', 'where', 'that', 'Ma-', 'ry', 'went,',
      'The', 'lamb', 'was', 'sure', 'to', 'go.'
    ],
    'humpty-dumpty': [
      'Hump-', 'ty', 'Dump-', 'ty', 'sat', 'on', 'a', 'wall,',
      'Hump-', 'ty', 'Dump-', 'ty', 'had', 'a', 'great', 'fall.',
      'All', 'the', "king's", 'hors-', 'es', 'and', 'all', 'the', "king's", 'men',
      "Could-", "n't", 'put', 'Hump-', 'ty', 'to-', 'geth-', 'er', 'a-', 'gain.'
    ],
    'baa-baa-black-sheep': [
      'Baa,', 'baa,', 'black', 'sheep,', 'have', 'you', 'an-', 'y', 'wool?',
      'Yes', 'sir,', 'yes', 'sir,', 'three', 'bags', 'full.',
      'One', 'for', 'the', 'mas-', 'ter,', 'one', 'for', 'the', 'dame,',
      'And', 'one', 'for', 'the', 'lit-', 'tle', 'boy', 'who', 'lives', 'down', 'the', 'lane.'
    ],
    'twinkle-twinkle-little-star': [
      'Twin-', 'kle,', 'twin-', 'kle,', 'lit-', 'tle', 'star,',
      'How', 'I', 'won-', 'der', 'what', 'you', 'are!',
      'Up', 'a-', 'bove', 'the', 'world', 'so', 'high,',
      'Like', 'a', 'dia-', 'mond', 'in', 'the', 'sky.',
      'Twin-', 'kle,', 'twin-', 'kle,', 'lit-', 'tle', 'star,',
      'How', 'I', 'won-', 'der', 'what', 'you', 'are!'
    ],
    'little-miss-muffet': [
        'Lit-', 'tle', 'Miss', 'Muf-', 'fet',
        'Sat', 'on', 'a', 'tuf-', 'fet,',
        'Eat-', 'ing', 'her', 'curds', 'and', 'whey;',
        'A-', 'long', 'came', 'a', 'spi-', 'der',
        'Who', 'sat', 'down', 'be-', 'side', 'her',
        'And', 'fright-', 'ened', 'Miss', 'Muf-', 'fet', 'a-', 'way.'
    ],
    'hey-diddle-diddle': [
        'Hey', 'did-', 'dle,', 'did-', 'dle,',
        'The', 'cat', 'and', 'the', 'fid-', 'dle,',
        'The', 'cow', 'jumped', 'o-', 'ver', 'the', 'moon.',
        'The', 'lit-', 'tle', 'dog', 'laughed', 'to', 'see', 'such', 'sport,',
        'And', 'the', 'dish', 'ran', 'a-', 'way', 'with', 'the', 'spoon.'
    ],
    'london-bridge': [
        'Lon-', 'don', 'Bridge', 'is', 'fall-', 'ing', 'down,',
        'Fall-', 'ing', 'down,', 'fall-', 'ing', 'down,',
        'Lon-', 'don', 'Bridge', 'is', 'fall-', 'ing', 'down,',
        'My', 'fair', 'la-', 'dy.',
        'Build', 'it', 'up', 'with', 'wood', 'and', 'clay,',
        'Wood', 'and', 'clay,', 'wood', 'and', 'clay,',
        'Build', 'it', 'up', 'with', 'wood', 'and', 'clay,',
        'My', 'fair', 'la-', 'dy.'
    ],
    'old-mother-hubbard': [
        'Old', 'Moth-', 'er', 'Hub-', 'bard',
        'Went', 'to', 'the', 'cup-', 'board',
        'To', 'give', 'her', 'poor', 'dog', 'a', 'bone;',
        'But', 'when', 'she', 'got', 'there',
        'The', 'cup-', 'board', 'was', 'bare,',
        'And', 'so', 'the', 'poor', 'dog', 'had', 'none.'
    ],
    'this-little-piggy': [
        'This', 'lit-', 'tle', 'pig-', 'gy', 'went', 'to', 'mar-', 'ket,',
        'This', 'lit-', 'tle', 'pig-', 'gy', 'stayed', 'home,',
        'This', 'lit-', 'tle', 'pig-', 'gy', 'had', 'roast', 'beef,',
        'This', 'lit-', 'tle', 'pig-', 'gy', 'had', 'none,',
        'And', 'this', 'lit-', 'tle', 'pig-', 'gy', 'went', '"wee', 'wee', 'wee"',
        'All', 'the', 'way', 'home!'
    ],
    'row-row-row-your-boat': [
        'Row,', 'row,', 'row', 'your', 'boat,',
        'Gent-', 'ly', 'down', 'the', 'stream.',
        'Mer-', 'ri-', 'ly,', 'mer-', 'ri-', 'ly,', 'mer-', 'ri-', 'ly,', 'mer-', 'ri-', 'ly,',
        'Life', 'is', 'but', 'a', 'dream.'
    ],
    'patty-cake': [
        'Pat-', 'a-', 'cake,', 'pat-', 'a-', 'cake,', 'ba-', "ker's", 'man,',
        'Bake', 'me', 'a', 'cake', 'as', 'fast', 'as', 'you', 'can;',
        'Pat', 'it', 'and', 'prick', 'it', 'and', 'mark', 'it', 'with', 'B,',
        'And', 'put', 'it', 'in', 'the', 'ov-', 'en', 'for', 'ba-', 'by', 'and', 'me.'
    ]
  };

  const initialLine = () => Array(8).fill('-');
  let words = [initialLine(), initialLine(), initialLine(), initialLine()];
  let visibleLines = 4; // Default to 4 lines visible
  let lineSoundIndexes = [6, 4, 2, 0]; // Default sounds for each line
  let lineMutedState = [false, false, false, false]; // Mute state for each line
  
  let syncopation = [[], [], [], []];
  let syncopationStates = [{}, {}, {}, {}];
  let editingIndex = { line: null, position: null };
  let beatBarIconActive = true;
  let sixteenthNoteModeActive = false;
  let sixteenthNotePatternCache = [];
  let timeSignatureNumerator = 4;
  let timeSignatureDenominator = 4;
  let hasPickupMeasure = false;
  let isFirstPlay = true;
  let isPlaying = false;
  let playTimeouts = [];
  let currentPlayPosition = 0;
  let selectedPlayStartPosition = null; // To store the selected starting beat
  let notesBoxElements = []; // Store references to notes boxes for highlighting
  let beatEnabled = true; // Beat checkbox state
  let rhythmEnabled = true; // Rhythm checkbox state
  let BPM = 82;
  let textImportMode = 'replace'; // 'add' or 'replace'
  let savedTextInput = ''; // Store the text from the modal
  let rhythmSystem = 'kodaly';

  // Audio context for generating sounds
  let audioContext = null;

  function initAudioContext() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  }

  // --- SOUND LIBRARY ---

  let analyser; // Keep a reference to the analyser

  function setupAnalyser(ctx) {
      if (!analyser) {
          analyser = ctx.createAnalyser();
          // Optional: connect analyser to destination to hear the sounds
          // analyser.connect(ctx.destination); 
      }
      return analyser;
  }

  // Sound 1: Bass Drum (Kick)
  function createBassDrum() {
      const ctx = initAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const analyser = setupAnalyser(ctx);
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(analyser);
      gain.connect(ctx.destination); // Connect to output
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
  }

  // Sound 2: Snare Drum
  function createSnareDrum() {
      const ctx = initAudioContext();
      const analyser = setupAnalyser(ctx);
      const decayTime = 0.4;

      // White noise component
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * decayTime, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
          output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      
      // Add a low-pass filter to soften the highs
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.value = 6000; // Taper down frequencies above 6kHz

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.01); // Softer high sounds
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + decayTime);
      
      // Tonal component
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0, ctx.currentTime);
      oscGain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.01);
      oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + decayTime / 2);

      // New bass component
      const bassOsc = ctx.createOscillator();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(60, ctx.currentTime);
      const bassGain = ctx.createGain();
      bassGain.gain.setValueAtTime(0, ctx.currentTime);
      bassGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.01); // More bass
      bassGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + decayTime);
      
      // Connect noise through the filter
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      
      osc.connect(oscGain);
      bassOsc.connect(bassGain);

      noiseGain.connect(analyser);
      oscGain.connect(analyser);
      bassGain.connect(analyser);

      noiseGain.connect(ctx.destination);
      oscGain.connect(ctx.destination);
      bassGain.connect(ctx.destination);

      noise.start();
      osc.start();
      bassOsc.start();

      noise.stop(ctx.currentTime + decayTime);
      osc.stop(ctx.currentTime + decayTime);
      bassOsc.stop(ctx.currentTime + decayTime);
  }

  // Sound 3: Tom Drum
  function createTomDrum() {
      const ctx = initAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const analyser = setupAnalyser(ctx);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(analyser);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
  }

  // Sound 4: Hand Clap
  function createHandClap() {
      const ctx = initAudioContext();
      const analyser = setupAnalyser(ctx);
      const decayTime = 2.0; // Increased decay time for a longer tail

      // We'll create multiple short bursts of noise
      const burstCount = 3 + Math.floor(Math.random() * 2); // 3 or 4 bursts

      for (let i = 0; i < burstCount; i++) {
          const bufferSize = ctx.sampleRate * 0.1; // Short burst
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = buffer.getChannelData(0);
          for (let j = 0; j < bufferSize; j++) {
              output[j] = Math.random() * 2 - 1;
          }

          const noise = ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          // Randomize filter frequency slightly for each burst
          filter.frequency.value = 1500 + (Math.random() - 0.5) * 500;
          filter.Q.value = 1;

          const envelope = ctx.createGain();
          
          // Each burst has its own envelope
          const startTime = ctx.currentTime + i * (0.02 + Math.random() * 0.015);
          const randomGain = 0.5 + Math.random() * 0.5;

          envelope.gain.setValueAtTime(0, startTime);
          envelope.gain.linearRampToValueAtTime(randomGain, startTime + 0.02);
          // Switched to linear ramp for a more gradual decay
          envelope.gain.linearRampToValueAtTime(0.01, startTime + decayTime);

          noise.connect(filter);
          filter.connect(envelope);
          envelope.connect(analyser);
          envelope.connect(ctx.destination);

          noise.start(startTime);
          noise.stop(startTime + decayTime);
      }
  }

  // Sound 5: Claves
  function createClaves() {
      const ctx = initAudioContext();
      const analyser = setupAnalyser(ctx);
      const baseFrequency = 2500;
      const decayTime = 0.15;

      // --- Original Oscillator ---
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = baseFrequency;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.001);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + decayTime);

      const distortion = ctx.createWaveShaper();
      function makeDistortionCurve(amount) {
          const k = typeof amount === 'number' ? amount : 50;
          const n_samples = 44100;
          const curve = new Float32Array(n_samples);
          for (let i = 0; i < n_samples; i++) {
              const deg = Math.PI * i / n_samples;
              curve[i] = ((3 + k) * deg) / (Math.PI + k * Math.abs(deg));
          }
          return curve;
      }
      distortion.curve = makeDistortionCurve(200);
      distortion.oversample = '4x';

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = baseFrequency;
      filter.Q.value = 8;
      const filter2 = ctx.createBiquadFilter();
      filter2.type = 'peaking';
      filter2.frequency.value = 800;
      filter2.gain.value = 3;
      filter2.Q.value = 2;

      // --- Reinforcement Oscillators ---
      const freqs = [
          baseFrequency / 2,            // Octave below
          baseFrequency * 8 / 9,        // Major second below
          (baseFrequency * 8 / 9) / 2   // Major second below, octave lower
      ];

      const reinforcementGains = [0.15, 0.1, 0.08]; // Quiet gain levels

      freqs.forEach((freq, i) => {
          const reinfOsc = ctx.createOscillator();
          reinfOsc.type = 'sine';
          reinfOsc.frequency.value = freq;
          
          const reinfGain = ctx.createGain();
          reinfGain.gain.setValueAtTime(0, ctx.currentTime);
          reinfGain.gain.linearRampToValueAtTime(reinforcementGains[i], ctx.currentTime + 0.001);
          reinfGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + decayTime);

          reinfOsc.connect(reinfGain);
          reinfGain.connect(analyser);
          reinfGain.connect(ctx.destination);
          reinfOsc.start();
          reinfOsc.stop(ctx.currentTime + decayTime);
      });

      // --- Master Gain and Connections ---
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.6;
      
      osc.connect(filter);
      filter.connect(filter2);
      filter2.connect(distortion);
      distortion.connect(gain);
      gain.connect(masterGain);
      masterGain.connect(analyser);
      masterGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + decayTime);
  }

  // Sound 6: Hi-Hat
  function createHiHat() {
      const ctx = initAudioContext();
      const analyser = setupAnalyser(ctx);
      const decayTime = 0.3;
      const bufferSize = ctx.sampleRate * decayTime;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 8000; // Higher frequency for a 'tissy' hi-hat sound
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, ctx.currentTime); // Increased gain
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + decayTime);
      
      noise.connect(highpass);
      highpass.connect(gain);
      gain.connect(analyser);
      gain.connect(ctx.destination);
      noise.start();
      noise.stop(ctx.currentTime + decayTime);
  }

  // Sound 7: Crash Cymbal
  function createCrashCymbal() {
      const ctx = initAudioContext();
      const analyser = setupAnalyser(ctx);
      const bufferSize = ctx.sampleRate * 1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 5000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      noise.connect(highpass);
      highpass.connect(gain);
      gain.connect(analyser);
      gain.connect(ctx.destination);
      noise.start();
      noise.stop(ctx.currentTime + 1);
  }

  // Sound 8: Shaker
  function createShaker() {
      const ctx = initAudioContext();
      const analyser = setupAnalyser(ctx);
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 7000;
      filter.Q.value = 2;
      const envelope = ctx.createGain();
      envelope.gain.setValueAtTime(0, ctx.currentTime);
      envelope.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.005); // Louder and stronger attack
      envelope.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      noise.connect(filter);
      filter.connect(envelope);
      envelope.connect(analyser);
      envelope.connect(ctx.destination);
      noise.start();
      noise.stop(ctx.currentTime + 0.1);
  }

  const soundBank = [
    { name: 'Bass Drum', func: createBassDrum, image: 'https://visualmusicalminds.github.io/images/virtualdrums-bass.png' },
    { name: 'Snare', func: createSnareDrum, image: 'https://visualmusicalminds.github.io/images/virtualdrums-snare.png' },
    { name: 'Tom', func: createTomDrum, image: 'https://visualmusicalminds.github.io/images/virtualdrums-tom.png' },
    { name: 'Hand Clap', func: createHandClap, image: 'https://visualmusicalminds.github.io/images/virtualdrums-clap.png' },
    { name: 'Claves', func: createClaves, image: 'https://visualmusicalminds.github.io/images/virtualdrums-claves.png' },
    { name: 'Hi-Hat', func: createHiHat, image: 'https://visualmusicalminds.github.io/images/virtualdrums-highhat.png' },
    { name: 'Crash', func: createCrashCymbal, image: 'https://visualmusicalminds.github.io/images/virtualdrums-crash.png' },
    { name: 'Shaker', func: createShaker, image: 'https://visualmusicalminds.github.io/images/virtualdrums-shaker.png' }
  ];

  // Copy text to clipboard
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        textArea.remove();
        return true;
      } catch (err) {
        textArea.remove();
        return false;
      }
    }
  }

  // Copy canvas to clipboard
  async function copyCanvasToClipboard(canvas) {
    try {
      // Convert canvas to blob
      return new Promise(resolve => {
        canvas.toBlob(async (blob) => {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            resolve(true);
          } catch (err) {
            console.error('Failed to copy image to clipboard:', err);
            resolve(false);
          }
        }, 'image/png');
      });
    } catch (err) {
      console.error('Clipboard API not supported:', err);
      return false;
    }
  }

  // Capture visual and copy to clipboard
  async function captureVisual() {
    const copyVisualBtn = document.getElementById('copy-visual-btn');
    const originalText = copyVisualBtn.textContent;
    
    try {
      // Add capturing class to hide interactive elements
      document.body.classList.add('capturing');
      
      // Show loading state
      copyVisualBtn.textContent = '⏳';
      copyVisualBtn.style.backgroundColor = '#ffc107';
      
      // Wait a moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Capture the poem area
      const canvas = await html2canvas(container, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0
      });
      
      // Try to copy to clipboard
      const success = await copyCanvasToClipboard(canvas);
      
      if (success) {
        copyVisualBtn.textContent = '✓';
        copyVisualBtn.style.backgroundColor = '#28a745';
      } else {
        // Fallback: download the image
        const link = document.createElement('a');
        link.download = 'rhythm-notation.png';
        link.href = canvas.toDataURL();
        link.click();
        
        copyVisualBtn.textContent = '💾';
        copyVisualBtn.style.backgroundColor = '#17a2b8';
      }
      
    } catch (error) {
      console.error('Failed to capture visual:', error);
      copyVisualBtn.textContent = '✗';
      copyVisualBtn.style.backgroundColor = '#dc3545';
    } finally {
      // Remove capturing class
      document.body.classList.remove('capturing');
      
      // Reset button after 2 seconds
      setTimeout(() => {
        copyVisualBtn.textContent = originalText;
        copyVisualBtn.style.backgroundColor = '';
      }, 2000);
    }
  }

  // Get the first circle position of the next beat after a syncopated position
  function getNextBeatFirstCircle(syncopatedPosition) {
    // syncopatedPosition is the second circle of a beat (odd number)
    // Next beat starts at syncopatedPosition + 1
    return syncopatedPosition + 1;
  }

  // Check if a position is affected by syncopation
  function isAffectedBySyncopation(lineIndex, position) {
    for (const syncPos of syncopation[lineIndex]) {
      const nextBeatFirstCircle = getNextBeatFirstCircle(syncPos);
      const nextBeatSecondCircle = nextBeatFirstCircle + 1;
      if (position === nextBeatFirstCircle || position === nextBeatSecondCircle) {
        return true;
      }
    }
    return false;
  }

  // Check if a position can be syncopated (not on last beat of measure)
  function canSyncopate(position) {
    const config = getLayoutConfig();
    const positionInMeasure = position % config.circlesPerMeasure;
    const beatInMeasure = Math.floor(positionInMeasure / config.circlesPerBeat);
    const lastBeatOfMeasure = config.beatsPerMeasure - 1;
    
    // Cannot syncopate on the last beat of a measure
    return beatInMeasure !== lastBeatOfMeasure;
  }

  // Check if syncopation conditions are met for a position
  function canCreateSyncopation(position) {
    // Syncopation is disabled in compound time for now.
    if (timeSignatureDenominator === 8) return false;
    
    // Position must be odd (second circle of a beat)
    if (position % 2 === 0) return false;
    
    // Previous position (first circle) must be active
    if (position === 0 || words[position - 1] === '-' || words[position - 1] === '') return false;
    
    // Must not be the last beat of a measure
    return canSyncopate(position);
  }

  // Get the syncopation type for a beat (for determining which image to show)
  function getSyncopationType(lineIndex, beatStartPosition) {
    // Check if this beat is affected by a syncopated beat before it
    for (const syncPos of syncopation[lineIndex]) {
      const nextBeatFirstCircle = getNextBeatFirstCircle(syncPos);
      if (nextBeatFirstCircle === beatStartPosition) {
        // This beat is affected by syncopation - use syncopation states
        const firstActive = syncopationStates[lineIndex][beatStartPosition] || false;
        const secondActive = syncopationStates[lineIndex][beatStartPosition + 1] || false;
        
        if (!firstActive && secondActive) {
          return 'SyncopateB'; // First inactive, second active
        } else if (!firstActive && !secondActive) {
          return 'SyncopateC'; // Both inactive
        }
      }
    }
    return null;
  }

  // Convert 8th note pattern to 16th note pattern by inserting inactive notes
  function convertTo16thNotePattern(eighthNoteWords) {
    const sixteenthNoteWords = [];
    for (let i = 0; i < eighthNoteWords.length; i += 2) {
      // For each beat (2 eighth notes), expand to 4 sixteenth notes
      const firstEighth = eighthNoteWords[i] || '-';
      const secondEighth = eighthNoteWords[i+1] || '-';
      
      // Add the first eighth note
      sixteenthNoteWords.push(firstEighth);
      // Add an inactive note after the first eighth note
      sixteenthNoteWords.push('-');
      // Add the second eighth note
      sixteenthNoteWords.push(secondEighth);
      // Add an inactive note after the second eighth note
      sixteenthNoteWords.push('-');
    }
    return sixteenthNoteWords;
  }

  // Convert 16th note pattern back to 8th note pattern by removing inactive notes
  function convertTo8thNotePattern(sixteenthNoteWords) {
    const eighthNoteWords = [];
    for (let i = 0; i < sixteenthNoteWords.length; i += 4) {
      // First 8th note is active if the 1st or 2nd 16th is active
      const first16th = sixteenthNoteWords[i];
      const second16th = sixteenthNoteWords[i+1];
      if (first16th && first16th !== '-') {
          eighthNoteWords.push(first16th);
      } else if (second16th && second16th !== '-') {
          eighthNoteWords.push(second16th);
      } else {
          eighthNoteWords.push('-');
      }

      // Second 8th note is active if the 3rd or 4th 16th is active
      const third16th = sixteenthNoteWords[i+2];
      const fourth16th = sixteenthNoteWords[i+3];
      if (third16th && third16th !== '-') {
        eighthNoteWords.push(third16th);
      } else if (fourth16th && fourth16th !== '-') {
        eighthNoteWords.push(fourth16th);
      } else {
        eighthNoteWords.push('-');
      }
    }
    return eighthNoteWords;
  }

  // Check if a position should be considered active (for rhythm and display)
  function isPositionActive(lineIndex, position, wordArray) {
    if (isAffectedBySyncopation(lineIndex, position)) {
      return syncopationStates[lineIndex][position] || false;
    } else {
      const word = wordArray[position];
      return word && word !== '-' && word !== ''; // Check for truthiness
    }
  }

  // Generate brush drum sound using white noise
  function createBrushDrumSound() {
    const ctx = initAudioContext();
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const envelope = Math.pow(0.01, i / bufferSize);
      output[i] = (Math.random() * 2 - 1) * envelope * 0.3;
    }
    return buffer;
  }

  function playBrushDrum() {
    if (!beatEnabled) return;
    const ctx = initAudioContext();
    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    source.buffer = createBrushDrumSound();
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    source.start();
    source.stop(ctx.currentTime + 0.1);
  }

  // Play triangle wave tone at A2 (110 Hz)
  function playTriangleTone(duration = 0.2) {
    if (!rhythmEnabled) return;
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(110, ctx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + duration - 0.05);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  }

  // Get rhythm pattern for a specific line
  function getRhythmPattern(lineIndex) {
    const pattern = [];
    const lineWords = words[lineIndex];
    if (!lineWords) return pattern;

    for (let i = 0; i < lineWords.length; i++) {
      const isActive = isPositionActive(lineIndex, i, lineWords);
      pattern.push(isActive);
    }
    return pattern;
  }

  // Auto-scroll to keep highlighted element in view
  function scrollToElement(element) {
    if (!element) return;
    const elementRect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const floatingPanelHeight = 60; // The height of the bottom control panel

    // Calculate the ideal vertical center of the screen, accounting for the floating panel
    const viewCenterY = (windowHeight - floatingPanelHeight) / 2;

    // Check if the element is more than a small tolerance away from the center
    const tolerance = 50; // A 50px tolerance zone around the center
    if (Math.abs(elementRect.top - viewCenterY) > tolerance) {
      const elementTopInDocument = elementRect.top + window.pageYOffset;
      // Calculate the target scroll position to place the element in the center
      const targetY = elementTopInDocument - viewCenterY + (elementRect.height / 2);
      
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  }

  // Highlight the column of notes boxes for the current beat
  function highlightBeat(beatIndex) {
    const config = getLayoutConfig();
    const prevBeatIndex = (beatIndex === 0) ? (config.beatsPerMeasure - 1) : (beatIndex - 1);

    for (let i = 0; i < notesBoxElements.length; i++) {
      // Remove highlight from the previous beat
      if (notesBoxElements[i] && notesBoxElements[i][prevBeatIndex]) {
        notesBoxElements[i][prevBeatIndex].classList.remove('playing');
      }
      // Add highlight to the current beat
      if (notesBoxElements[i] && notesBoxElements[i][beatIndex]) {
        notesBoxElements[i][beatIndex].classList.add('playing');
      }
    }

    // Auto-scroll to keep the first line's playing beat in view
    if (notesBoxElements[0] && notesBoxElements[0][beatIndex]) {
      scrollToElement(notesBoxElements[0][beatIndex]);
    }
  }

  // Clear all highlights
  function clearHighlights() {
    notesBoxElements.forEach(line => {
      if (line) {
        line.forEach(box => {
          if (box) box.classList.remove('playing');
        });
      }
    });
  }

  function createImage(url) {
    const img = document.createElement('img');
    img.src = url;
    return img;
  }

  // Get layout configuration based on time signature and screen width
  function getLayoutConfig() {
    let circlesPerBeat = timeSignatureDenominator === 8 ? 3 : 2;
    if (timeSignatureDenominator === 4 && sixteenthNoteModeActive) {
        circlesPerBeat = 4;
    }
    const beatsPerMeasure = 4;
    const measuresPerLine = 1;
    const circlesPerMeasure = beatsPerMeasure * circlesPerBeat;
    return {
      beatsPerMeasure,
      circlesPerBeat,
      circlesPerMeasure,
      measuresPerLine,
      circlesPerLine: measuresPerLine * circlesPerMeasure
    };
  }
    // --- UI ELEMENT SETUP ---

  // Panel Toggle Button
  const panelToggleButton = document.getElementById('panel-toggle-button');
  const floatingPanel = document.getElementById('floating-panel');

  function updatePoemMargin() {
    const isPanelCollapsed = floatingPanel.classList.contains('collapsed');
    const isSmallScreen = window.innerWidth <= 720;
    
    if (isPanelCollapsed) {
      container.style.marginBottom = '40px';
    } else {
      container.style.marginBottom = isSmallScreen ? '150px' : '80px';
    }
  }


  panelToggleButton.addEventListener('click', () => {
    floatingPanel.classList.toggle('collapsed');
    panelToggleButton.classList.toggle('collapsed');
    updatePoemMargin();
  });


  // Circle icon button
  const circleIcon = document.getElementById('circle-icon');
  circleIcon.addEventListener('click', () => {
    beatBarIconActive = !beatBarIconActive;
    circleIcon.className = `icon-button ${beatBarIconActive ? 'active' : 'inactive'}`;
    updateBeatBarVisibility();
  });

  // BPM Control
  const bpmButton = document.getElementById('bpm-button');
  const bpmValueSpan = document.getElementById('bpm-value');

  bpmButton.addEventListener('click', () => {
    const currentBPM = bpmValueSpan.textContent;
    const input = document.createElement('input');
    input.type = 'number';
    input.value = currentBPM;
    input.className = 'bpm-input';
    
    bpmButton.innerHTML = '';
    bpmButton.appendChild(input);
    input.focus();
    input.select();

    const onUpdate = () => {
      let newValue = parseInt(input.value, 10);
      if (isNaN(newValue) || newValue <= 20) { // Set a minimum BPM
        newValue = 82; // Reset to default if invalid
      }
      if (newValue > 600) { // Set a maximum BPM
        newValue = 600;
      }
      BPM = newValue;
      bpmValueSpan.textContent = BPM;
      bpmButton.innerHTML = '';
      bpmButton.appendChild(bpmValueSpan);
      bpmButton.append('\u00A0BPM'); // Add back the " BPM" text
    };

    input.addEventListener('blur', onUpdate);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        input.blur();
      } else if (e.key === 'Escape') {
        input.value = currentBPM; // Revert on escape
        input.blur();
      }
    });
  });

  // Play button
  const playButton = document.getElementById('play-button');
  playButton.addEventListener('click', () => {
    if (isPlaying) stopPlayback(); else startPlayback();
  });


  // Toggle button handlers
  const beatButton = document.getElementById('beat-button');
  const countButton = document.getElementById('count-button');
  const rhythmButton = document.getElementById('rhythm-button');
  const oneButton = document.getElementById('one-button');

  beatButton.addEventListener('click', () => {
    beatEnabled = !beatEnabled;
    beatButton.classList.toggle('active');
  });

  rhythmButton.addEventListener('click', () => {
    rhythmEnabled = !rhythmEnabled;
    rhythmButton.classList.toggle('active');
  });

  countButton.addEventListener('click', () => {
    countButton.classList.toggle('active');
  });

  function updateOneButtonAppearance() {
    const number = visibleLines;
    oneButton.classList.remove('color-1', 'color-2', 'color-3', 'color-4');
    oneButton.classList.add(`color-${number}`);
  }

  oneButton.addEventListener('click', () => {
    const currentNumber = parseInt(oneButton.textContent, 10);
    const nextNumber = (currentNumber % 4) + 1;
    oneButton.textContent = nextNumber;
    visibleLines = nextNumber;
    updateOneButtonAppearance();
    render();
  });

  // Copy Visual button
  const copyVisualBtn = document.getElementById('copy-visual-btn');
  copyVisualBtn.addEventListener('click', captureVisual);

  // Save button and modal
  const saveButton = document.getElementById('save-button');
  const saveModal = document.getElementById('save-modal');
  const cancelSaveButton = document.getElementById('cancel-save-button');
  const submitSaveButton = document.getElementById('submit-save-button');

  saveButton.addEventListener('click', () => {
    const multiLineInput = document.getElementById('multi-line-input');
    let outputText = `[BPM:${BPM}]\n`;

    for (let i = 0; i < 4; i++) {
      const instrumentName = soundBank[lineSoundIndexes[i]].name;
      let lineWords;

      // Determine the correct source for the 16th note pattern
      if (sixteenthNoteModeActive) {
        // If in 16th note mode, the current 'words' array is the source of truth.
        lineWords = words[i];
      } else {
        // If in 8th note mode, check the cache first.
        if (sixteenthNotePatternCache.length > 0 && sixteenthNotePatternCache[i]) {
          // The cache holds the true 16th note pattern.
          lineWords = sixteenthNotePatternCache[i];
        } else {
          // If no cache, it means we started in 8th note mode. Convert the pattern.
          lineWords = convertTo16thNotePattern(words[i]);
        }
      }

      let rhythmText = '';
      // Assuming 4 beats per measure, generate the rhythm string
      for (let beat = 0; beat < 4; beat++) {
        let beatPattern = '';
        for (let sixteenth = 0; sixteenth < 4; sixteenth++) {
          const index = (beat * 4) + sixteenth;
          if (index < lineWords.length) {
            const word = lineWords[index];
            beatPattern += (word && word !== '-' && word !== '') ? 'Y' : 'n';
          } else {
            beatPattern += 'n'; // Pad with rests if the line is unexpectedly short
          }
        }
        rhythmText += `[${beat + 1}:${beatPattern}]`;
        if (beat < 3) {
          rhythmText += ' ';
        }
      }
      outputText += `Line ${i + 1} [${instrumentName}] ${rhythmText}\n`;
    }

    multiLineInput.value = outputText.trim();
    saveModal.classList.add('visible');
  });

  cancelSaveButton.addEventListener('click', () => {
    saveModal.classList.remove('visible');
  });

  submitSaveButton.addEventListener('click', () => {
    const multiLineInput = document.getElementById('multi-line-input');
    const inputText = multiLineInput.value;
    const lines = inputText.split('\n');

    try {
      // Parse BPM
      const bpmMatch = lines[0].match(/\[BPM:(\d+)\]/);
      if (bpmMatch && bpmMatch[1]) {
        let newBPM = parseInt(bpmMatch[1], 10);
        if (!isNaN(newBPM)) {
          if (newBPM < 20) newBPM = 20;
          if (newBPM > 600) newBPM = 600;
          BPM = newBPM;
          document.getElementById('bpm-value').textContent = BPM;
        }
      }

      const lineRegex = /Line (\d+) \[([^\]]+)\]\s*(.*)/;
      const rhythmRegex = /\[\d:([Yn]{4})\]/g;

      for (let i = 1; i < lines.length; i++) {
        const lineMatch = lines[i].match(lineRegex);
        if (lineMatch) {
          const lineIndex = parseInt(lineMatch[1], 10) - 1;
          const instrumentName = lineMatch[2];
          const rhythmData = lineMatch[3];

          if (lineIndex >= 0 && lineIndex < 4) {
            // Update instrument
            const soundIndex = soundBank.findIndex(s => s.name === instrumentName);
            if (soundIndex !== -1) {
              lineSoundIndexes[lineIndex] = soundIndex;
            }

            // Update rhythm
            let fullRhythmPattern = '';
            let match;
            while ((match = rhythmRegex.exec(rhythmData)) !== null) {
              fullRhythmPattern += match[1];
            }

            if (fullRhythmPattern.length === 16) {
              const newSixteenthPattern = fullRhythmPattern.split('').map(char => (char === 'Y' ? 'word' : '-'));
              
              if (sixteenthNoteModeActive) {
                words[lineIndex] = newSixteenthPattern;
              } else {
                // Ensure cache is initialized for all lines if it's being used
                if (sixteenthNotePatternCache.length === 0) {
                    sixteenthNotePatternCache = words.map(lineToCache => convertTo16thNotePattern(lineToCache));
                }
                sixteenthNotePatternCache[lineIndex] = newSixteenthPattern;
                words[lineIndex] = convertTo8thNotePattern(newSixteenthPattern);
              }
            }
          }
        }
      }
      render();
    } catch (error) {
      console.error("Error parsing input:", error);
      // Optionally, show an error message to the user
    }

    saveModal.classList.remove('visible');
  });

  // Lyrics dropdown
  const lyricsDropdown = document.getElementById('lyrics-dropdown');
  lyricsDropdown.addEventListener('change', (e) => {
      rhythmSystem = e.target.value;
      render();
  });

  // 16th note button
  const sixteenthNoteBtn = document.getElementById('sixteenth-note-btn');
  sixteenthNoteBtn.addEventListener('click', () => {
      if (timeSignatureDenominator === 4) {
          if (sixteenthNoteModeActive) {
              // Switching from 16th to 8th mode
              sixteenthNoteModeActive = false;
              // Cache the complex 16th note pattern
              sixteenthNotePatternCache = words.map(line => line.slice());
              // Convert to a simplified 8th note view for display
              words = words.map(line => convertTo8thNotePattern(line));
          } else {
              // Switching from 8th to 16th mode
              sixteenthNoteModeActive = true;
              if (sixteenthNotePatternCache.length > 0) {
                  const currentEighths = words;
                  const simplifiedCachedEighths = sixteenthNotePatternCache.map(line => convertTo8thNotePattern(line));
                  const finalSixteenths = [];

                  for (let i = 0; i < currentEighths.length; i++) {
                      const currentEighthLine = currentEighths[i];
                      const simplifiedCachedEighthLine = simplifiedCachedEighths[i];
                      const cachedSixteenthLine = sixteenthNotePatternCache[i];
                      const mergedSixteenthLine = [];

                      for (let j = 0; j < currentEighthLine.length; j += 2) {
                          const beatIsUnchanged = currentEighthLine[j] === simplifiedCachedEighthLine[j] && 
                                                  currentEighthLine[j+1] === simplifiedCachedEighthLine[j+1];
                          
                          const sixteenthBeatIndex = (j/2) * 4;

                          if (beatIsUnchanged) {
                              mergedSixteenthLine.push(cachedSixteenthLine[sixteenthBeatIndex]);
                              mergedSixteenthLine.push(cachedSixteenthLine[sixteenthBeatIndex + 1]);
                              mergedSixteenthLine.push(cachedSixteenthLine[sixteenthBeatIndex + 2]);
                              mergedSixteenthLine.push(cachedSixteenthLine[sixteenthBeatIndex + 3]);
                          } else {
                              const newSixteenthBeat = convertTo16thNotePattern([currentEighthLine[j], currentEighthLine[j+1]]);
                              mergedSixteenthLine.push(...newSixteenthBeat);
                          }
                      }
                      finalSixteenths.push(mergedSixteenthLine);
                  }
                  words = finalSixteenths;
              } else {
                  words = words.map(line => convertTo16thNotePattern(line));
              }
          }
          sixteenthNoteBtn.classList.toggle('active', sixteenthNoteModeActive);
          render();
      }
  });


  // --- PLAYBACK LOGIC ---

  function startPlayback() {
    initAudioContext();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    isPlaying = true;
    playButton.textContent = '⏸';
    playButton.classList.add('playing');

    const config = getLayoutConfig();
    const beatInterval = 60000 / BPM;
    const noteInterval = beatInterval / config.circlesPerBeat;
    const totalDuration = config.beatsPerMeasure * beatInterval;

    const scheduleLoop = () => {
      if (!isPlaying) return;

      // Schedule BEAT track (metronome) and HIGHLIGHTING
      for (let beat = 0; beat < config.beatsPerMeasure; beat++) {
        const timeDelay = beat * beatInterval;
        playTimeouts.push(setTimeout(() => {
          if (isPlaying) {
            highlightBeat(beat);
            if (beatEnabled) playBrushDrum();
          }
        }, timeDelay));
      }

      // Schedule RHYTHM track for each line
      words.forEach((lineWords, lineIndex) => {
        if (lineMutedState[lineIndex]) {
          return; // Skip this line if it's muted
        }
        const rhythmPattern = getRhythmPattern(lineIndex);
        rhythmPattern.forEach((hasSound, circleIndex) => {
          if (hasSound) {
            const timeDelay = circleIndex * noteInterval;
            playTimeouts.push(setTimeout(() => {
              if (isPlaying && rhythmEnabled) {
                const soundIndex = lineSoundIndexes[lineIndex];
                const sound = soundBank[soundIndex];
                if (sound && typeof sound.func === 'function') {
                  sound.func();
                }
              }
            }, timeDelay));
          }
        });
      });

      // Schedule the next loop
      playTimeouts.push(setTimeout(scheduleLoop, totalDuration));
    };

    const isCountInEnabled = countButton.classList.contains('active');

    if (isCountInEnabled) {
      const countInBeats = 4;
      for (let i = 0; i < countInBeats; i++) {
        const timeDelay = i * beatInterval;
        playTimeouts.push(setTimeout(() => {
          if (isPlaying) {
            playBrushDrum();
          }
        }, timeDelay));
      }
      playTimeouts.push(setTimeout(scheduleLoop, countInBeats * beatInterval));
    } else {
      scheduleLoop();
    }
  }

  function stopPlayback() {
    isPlaying = false;
    playButton.textContent = '▶';
    playButton.classList.remove('playing');
    
    playTimeouts.forEach(timeout => clearTimeout(timeout));
    playTimeouts = [];
    
    clearHighlights();

    if (audioContext) {
      audioContext.suspend();
    }
  }

  function updateBeatBarVisibility() {
    document.querySelectorAll('.beat-bar').forEach(box => {
      box.classList.toggle('hidden', !beatBarIconActive);
    });
  }

  // --- RENDERING LOGIC ---

  function updateSixteenthNoteButtonState() {
      const sixteenthNoteBtn = document.getElementById('sixteenth-note-btn');
      
      // If time signature is not 4/4 and we are in 16th note mode, revert.
      if (timeSignatureDenominator !== 4 && sixteenthNoteModeActive) {
          sixteenthNoteModeActive = false;
          // When the time signature becomes incompatible, we should clear the 16th note cache.
          // This prevents unexpected rhythm restorations if the user switches back to 4/4 later.
          sixteenthNotePatternCache = []; 
          // We also need to decide what to do with the `words` array.
          // Reverting to a simple 8th note pattern is a safe default.
          words = words.map(line => convertTo8thNotePattern(line));
      }

      // Disable button for any non-4/4 time signature
      if (timeSignatureDenominator !== 4) {
          sixteenthNoteBtn.classList.add('disabled');
      } else {
          sixteenthNoteBtn.classList.remove('disabled');
      }

      // Finally, ensure the active class is correct
      sixteenthNoteBtn.classList.toggle('active', sixteenthNoteModeActive);
  }

  function dismantleSyncopation(syncStartIndex) {
      const syncTriggerPos = syncStartIndex + 1;
      const syncopationIndex = syncopation.indexOf(syncTriggerPos);
  
      if (syncopationIndex === -1) return; // Not a valid syncopation start
  
      // Ensure the group is intact before trying to dismantle
      if (syncStartIndex + 3 < words.length && words[syncStartIndex + 2] === '-') {
          const w1 = words[syncStartIndex];
          const w2 = words[syncStartIndex + 1];
          const w3 = words[syncStartIndex + 3];
  
          const replacement = [];
          if (w1 !== '-') replacement.push(w1);
          if (w2 !== '-') replacement.push(w2);
          if (w3 !== '-') replacement.push(w3);
  
          // Replace the 4-element syncopation group with its preserved words.
          words.splice(syncStartIndex, 4, ...replacement);
  
          // Clean up the corresponding syncopation data.
          const affectedBeatStart = syncStartIndex + 2;
          delete syncopationStates[affectedBeatStart];
          delete syncopationStates[affectedBeatStart + 1];
          syncopation.splice(syncopationIndex, 1);
  
          // Adjust subsequent syncopation indices due to the change in array length.
          const lengthChange = replacement.length - 4;
          for (let i = 0; i < syncopation.length; i++) {
              if (syncopation[i] > syncTriggerPos) {
                  syncopation[i] += lengthChange;
              }
          }
      }
  }

  function getFruitRhythmText(pattern) {
    const fruitRhythms = {
      // Two-circle patterns
      'B/G': ['Pie'],
      'B/B': ['Ap', 'ple'],
      'G/B': ['-', 'Sweet'],
      'G/G': ['-', '-'],
      // Four-circle patterns
      'B/G/G/G': ['Pie'],
      'B/G/B/G': ['Ap', '-', 'ple', '-'],
      'B/B/B/B': ['Wa', 'ter', 'me', 'lon'],
      'G/B/B/B': ['-', 'To', 'ma', 'to'],
      'B/B/B/G': ['Co', 'co', 'nut', '-'],
      'B/B/G/B': ['Ba', 'na', '-', 'na'],
      'B/G/B/B': ['Blue', '-', 'ber', 'ry'],
      'B/B/G/G': ['Ki', 'wi', '-', '-'],
      'G/B/B/G': ['-', 'fi', 'let', '-'],
      'G/G/B/B': ['-', '-', 'Ber', 'ry'],
      'G/B/G/B': ['-', 'Sal', '-', 'sa'],
      'B/G/G/B': ['Cher', '-', '-', 'ry'],
      'G/B/G/G': ['-', 'Peas', '-', '-'],
      'G/G/B/G': ['-', '-', 'Sweet', '-'],
      'G/G/G/B': ['-', '-', '-', '&'],
    };
    return fruitRhythms[pattern] || [];
  }

  function getBeatCenteredKodalyText(pattern) {
    const rhythms = {
      'B/G': ['Ta'],
      'B/B': ['Ta', 'Ti'],
      'G/B': ['-', 'Ti'],
      'G/G': ['-', '-'],
      'B/G/G/G': ['Ta'],
      'B/G/B/G': ['Ta', '-', 'Ti', '-'],
      'B/B/B/B': ['Ta', 'Ka', 'Ti', 'Ka'],
      'G/B/B/B': ['-', 'Ka', 'Ti', 'Ka'],
      'B/B/B/G': ['Ta', 'Ka', 'Ta', '-'],
      'B/B/G/B': ['Ta', 'Ka', '-', 'Ka'],
      'B/G/B/B': ['Ta', '-', 'Ti', 'Ka'],
      'B/B/G/G': ['Ta', 'Ka', '-', '-'],
      'G/B/B/G': ['-', 'Ka', 'Ti', '-'],
      'G/G/B/B': ['-', '-', 'Ti', 'Ka'],
      'G/B/G/B': ['-', 'Ka', '-', 'Ka'],
      'B/G/G/B': ['Ta', '-', '-', 'Ka'],
      'G/B/G/G': ['-', 'Ka', '-', '-'],
      'G/G/B/G': ['-', '-', 'Ti', '-'],
      'G/G/G/B': ['-', '-', '-', 'Ka'],
    };
    return rhythms[pattern] || [];
  }

  function getGordonSystemText(pattern) {
    const rhythms = {
      'B/G': ['Du'],
      'B/B': ['Du', 'De'],
      'G/B': ['-', 'De'],
      'G/G': ['-', '-'],
      'B/G/G/G': ['Du'],
      'B/G/B/G': ['Du', '-', 'De', '-'],
      'B/B/B/B': ['Du', 'Ta', 'De', 'Ta'],
      'G/B/B/B': ['-', 'Ta', 'De', 'Ta'],
      'B/B/B/G': ['Du', 'Ta', 'De', '-'],
      'B/B/G/B': ['Du', 'Ta', '-', 'Ta'],
      'B/G/B/B': ['Du', '-', 'De', 'Ta'],
      'B/B/G/G': ['Du', 'Ta', '-', '-'],
      'G/B/B/G': ['-', 'Ta', 'De', '-'],
      'G/G/B/B': ['-', '-', 'De', 'Ta'],
      'G/B/G/B': ['-', 'Ta', '-', 'Ta'],
      'B/G/G/B': ['Du', '-', '-', 'Ta'],
      'G/B/G/G': ['-', 'Ta', '-', '-'],
      'G/G/B/G': ['-', '-', 'De', '-'],
      'G/G/G/B': ['-', '-', '-', 'Ta'],
    };
    return rhythms[pattern] || [];
  }

  function getTakadimiSystemText(pattern) {
    const rhythms = {
      'B/G': ['Ta'],
      'B/B': ['Ta', 'Di'],
      'G/B': ['-', 'Di'],
      'G/G': ['-', '-'],
      'B/G/G/G': ['Ta'],
      'B/G/B/G': ['Ta', '-', 'Di', '-'],
      'B/B/B/B': ['Ta', 'Ka', 'Di', 'Mi'],
      'G/B/B/B': ['-', 'Ka', 'Di', 'Mi'],
      'B/B/B/G': ['Ta', 'Ka', 'Di', '-'],
      'B/B/G/B': ['Ta', 'Ka', '-', 'Mi'],
      'B/G/B/B': ['Ta', '-', 'Di', 'Mi'],
      'B/B/G/G': ['Ta', 'Ka', '-', '-'],
      'G/B/B/G': ['-', 'Ka', 'Di', '-'],
      'G/G/B/B': ['-', '-', 'Di', 'Mi'],
      'G/B/G/B': ['-', 'Ka', '-', 'Mi'],
      'B/G/G/B': ['Ta', '-', '-', 'Mi'],
      'G/B/G/G': ['-', 'Ka', '-', '-'],
      'G/G/B/G': ['-', '-', 'Di', '-'],
      'G/G/G/B': ['-', '-', '-', 'Mi'],
    };
    return rhythms[pattern] || [];
  }

  function getChantText(activeStates) {
    const pattern = activeStates.map(a => a ? 'B' : 'G').join('/');
    
    switch (rhythmSystem) {
      case 'fruit-rhythms':
        return getFruitRhythmText(pattern);
      case 'beat-centered-kodaly':
        return getBeatCenteredKodalyText(pattern);
      case 'gordon-system':
        return getGordonSystemText(pattern);
      case 'takadimi-system':
        return getTakadimiSystemText(pattern);
      case 'simple-kodaly':
      default:
        switch (pattern) {
          // Two-circle patterns (8th note mode)
          case 'B/G': return ['Ta'];        // Quarter note
          case 'B/B': return ['Ti', 'ti'];       // Two eighth notes
          case 'G/B': return ['-', 'ti'];        // Eighth rest + eighth note
          case 'G/G': return ['-', '-'];         // Quarter rest
          
          // Three-circle patterns (compound time - 6/8, 9/8, 12/8)
          case 'B/G/G': return ['Ta', '-', '-'];       // Dotted quarter note
          case 'B/B/G': return ['Ti', 'Ta', '-'];      // Eighth + quarter
          case 'B/B/B': return ['Ti', 'ti', 'ti'];     // Three eighth notes
          case 'G/B/G': return ['-', 'Ta', '-'];       // Rest + quarter + rest
          case 'G/B/B': return ['-', 'ti', 'ti'];      // Rest + two eighths
          case 'G/G/B': return ['-', '-', 'ti'];       // Two rests + eighth
          case 'B/G/B': return ['Ta', '-', 'ti'];      // Quarter + rest + eighth
          case 'G/G/G': return ['-', '-', '-'];        // Three rests
          
          // Four-circle patterns (16th note mode)
          case 'B/G/G/G': return ['Ta'];     // Quarter note
          case 'B/G/B/G': return ['Ti', '-', 'ti', '-'];    // Two eighth notes
          case 'B/B/B/B': return ['Ti', 'ki', 'ti', 'ki'];  // Four sixteenth notes
          case 'B/B/B/G': return ['Ti', 'ki', 'ti', '-'];   // Three sixteenths + rest
          case 'B/G/B/B': return ['Ti', '-', 'ti', 'ki'];   // Eighth + two sixteenths
          case 'G/B/B/B': return ['-', 'ki', 'ti', 'ki'];   // Rest + three sixteenths
          case 'G/B/G/G': return ['-', 'ki', '-', '-'];     // Rest + sixteenth + rests
          case 'G/G/B/G': return ['-', '-', 'ti', '-'];     // Rests + eighth + rest
          case 'G/G/G/B': return ['-', '-', '-', 'ki'];     // Three rests + sixteenth
          case 'B/B/G/G': return ['Ti', 'ki', '-', '-'];    // Two sixteenths + rests
          case 'G/B/G/B': return ['-', 'ki', '-', 'ki'];    // Rest + sixteenth + rest + sixteenth
          case 'G/B/B/G': return ['-', 'ki', 'ti', '-'];    // Rest + two sixteenths + rest
          case 'B/B/G/B': return ['Ti', 'ki', '-', 'ti'];   // Two sixteenths + rest + eighth
          case 'G/G/B/B': return ['-', '-', 'ti', 'ki'];    // Rests + eighth + sixteenth
          case 'G/G/G/G': return ['-', '-', '-', '-'];      // Four rests
          case 'B/G/G/B': return ['Ti', '-', '-', 'ki'];    // Eighth + rests + sixteenth
          
          default: return [];
        }
    }
  }

  function createBeatGroup(lineIndex, beatStartPosition, config, displayWords) {
    // Event handlers for word input, defined here to be reused.
    function onKey(e, lineIndex, idx, input) {
        if (e.key === 'Enter' || e.key === 'Escape') {
            e.preventDefault();
            if (e.key === 'Enter') {
                words[lineIndex][idx] = input.value;
            }
            editingIndex = { line: null, position: null };
            render();
        } else if (e.key === ' ' || e.code === 'Space') {
            e.preventDefault();
            words[lineIndex][idx] = input.value === '' ? '-' : input.value;
            editingIndex = { line: lineIndex, position: idx + 1 };
            if (editingIndex.position >= words[lineIndex].length) {
                editingIndex.position = words[lineIndex].length - 1;
            }
            render();
        }
    }

    function onBlur(e, lineIndex, idx, input) {
        words[lineIndex][idx] = input.value;
        editingIndex = { line: null, position: null };
        render();
    }
      
    const group = document.createElement('div');
    group.className = 'group';

    if (config.circlesPerBeat === 4) {
      group.classList.add('sixteenth');
    }

    const beatBarDiv = document.createElement('div');
    beatBarDiv.className = 'beat-bar';
    if (!beatBarIconActive) beatBarDiv.classList.add('hidden');

    const activeStates = [];
    for (let circleIndex = 0; circleIndex < config.circlesPerBeat; circleIndex++) {
        const idx = beatStartPosition + circleIndex;
        const half = document.createElement('div');
        half.className = 'beat-bar-half';
        if (config.circlesPerBeat === 4) {
            half.style.width = '25%';
        }
        
        const isActive = isPositionActive(lineIndex, idx, displayWords);
        activeStates.push(isActive);

        if (isActive) {
            half.classList.add('active');
        }

        half.addEventListener('click', () => {
            if (words[lineIndex][idx] === '-' || words[lineIndex][idx] === '') {
                words[lineIndex][idx] = 'word'; // Placeholder
            } else {
                words[lineIndex][idx] = '-';
            }
            render();
        });
        beatBarDiv.appendChild(half);
    }
    group.appendChild(beatBarDiv);

    const notesBox = document.createElement('div');
    notesBox.className = 'notes-box';

    if (config.circlesPerBeat === 4) {
        notesBox.classList.add('sixteenth');
        const i = beatStartPosition;
        const active1 = isPositionActive(lineIndex, i, displayWords);
        const active2 = isPositionActive(lineIndex, i + 1, displayWords);
        const active3 = isPositionActive(lineIndex, i + 2, displayWords);
        const active4 = isPositionActive(lineIndex, i + 3, displayWords);
        const pattern = (active1 ? 'X' : 'O') + (active2 ? 'X' : 'O') + (active3 ? 'X' : 'O') + (active4 ? 'X' : 'O');
        const imageUrl = `https://visualmusicalminds.github.io/images/Wordrhythms-${pattern}.svg`;
        notesBox.appendChild(createImage(imageUrl));
    } else {
        const i = beatStartPosition;
        const active1 = isPositionActive(lineIndex, i, displayWords);
        const active2 = isPositionActive(lineIndex, i + 1, displayWords);
        const isSyncopated = syncopation[lineIndex].includes(i + 1);
        const syncopationType = getSyncopationType(lineIndex, i);

        if (syncopationType === 'SyncopateB') notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-SyncopateB.svg'));
        else if (syncopationType === 'SyncopateC') notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-SyncopateC.svg'));
        else if (isSyncopated) notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-SyncopateA.svg'));
        else if (active1 && !active2) notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-quarternote.svg'));
        else if (active1 && active2) notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-eighthnotepair.svg'));
        else if (!active1 && !active2) notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-quarterrest.svg'));
        else if (!active1 && active2) notesBox.appendChild(createImage('https://visualmusicalminds.github.io/images/Wordrhythms-eighthrestnote.svg'));
    }

    group.appendChild(notesBox);

    const wordsDiv = document.createElement('div');
    wordsDiv.className = 'words';

    const pattern = activeStates.map(a => a ? 'B' : 'G').join('/');
    if (pattern === 'B/G/G/G' || pattern === 'B/G') {
        wordsDiv.classList.add('center-text');
    }

    // Get the chant text based on the active states for the beat
    const chantTexts = getChantText(activeStates);

    // Create a word container and word span for each text item
    chantTexts.forEach(text => {
        const wordContainer = document.createElement('div');
        wordContainer.className = 'word-container';

        const span = document.createElement('span');
        span.className = 'word';
        if (text === '-') {
            span.classList.add('rest');
        }
        span.textContent = text;

        wordContainer.appendChild(span);
        wordsDiv.appendChild(wordContainer);
    });

    group.appendChild(wordsDiv);
    return group;
  }

  function createDivider(isFinal = false) {
    const divider = document.createElement('div');
    divider.className = isFinal ? 'final-measure-divider' : 'measure-divider';
    return divider;
  }

  function revalidateSyncopations() {
      const config = getLayoutConfig();
      // If syncopation is not possible (e.g., in compound time), dismantle all existing syncopations.
      if (config.circlesPerBeat !== 2) {
          if (syncopation.length > 0) {
              const newWords = [];
              for (let i = 0; i < words.length; i++) {
                  if (syncopation.includes(i + 1)) {
                      if (words[i] !== '-') newWords.push(words[i]);
                      if (words[i + 1] !== '-') newWords.push(words[i + 1]);
                      if (words[i + 3] !== '-') newWords.push(words[i + 3]);
                      i += 3;
                  } else {
                      newWords.push(words[i]);
                  }
              }
              words = newWords;
              syncopation = [];
              syncopationStates = {};
          }
          return;
      }
  
      // Now, check if any remaining syncopations have become invalid due to their position.
      for (let i = syncopation.length - 1; i >= 0; i--) {
          const syncTriggerPos = syncopation[i];
          const syncStartIndex = syncTriggerPos - 1;
  
          const isEvenPosition = syncStartIndex % 2 === 0;
          const positionInMeasure = syncStartIndex % config.circlesPerMeasure;
          const beatInMeasure = Math.floor(positionInMeasure / config.circlesPerBeat);
          const isLastBeat = beatInMeasure >= config.beatsPerMeasure - 1;
          const isGroupIntact = syncStartIndex + 3 < words.length && words[syncStartIndex + 2] === '-';
  
          if (!isEvenPosition || isLastBeat || !isGroupIntact) {
              dismantleSyncopation(syncStartIndex);
          }
      }
  }

  function render() {
    // This function is overhauled for the new 4-line structure.
    updateSixteenthNoteButtonState();

    container.innerHTML = '';
    notesBoxElements = [[], [], [], []]; // 2D array for 4 lines
    const config = getLayoutConfig();

    for (let lineIndex = 0; lineIndex < visibleLines; lineIndex++) {
        const lineWords = words[lineIndex];
        const lineDiv = document.createElement('div');
        lineDiv.className = 'line';

        const soundSelector = document.createElement('div');
        soundSelector.className = 'sound-selector';

        const prevButton = document.createElement('button');
        prevButton.className = 'selector-button';
        prevButton.textContent = '<';
        prevButton.addEventListener('click', () => {
            lineSoundIndexes[lineIndex] = (lineSoundIndexes[lineIndex] - 1 + soundBank.length) % soundBank.length;
            render();
        });

        const soundImage = document.createElement('img');
        soundImage.className = 'sound-image';
        if (lineMutedState[lineIndex]) {
            soundImage.classList.add('muted');
        }
        soundImage.src = soundBank[lineSoundIndexes[lineIndex]].image;
        soundImage.addEventListener('click', () => {
            lineMutedState[lineIndex] = !lineMutedState[lineIndex];
            render();
        });

        const nextButton = document.createElement('button');
        nextButton.className = 'selector-button';
        nextButton.textContent = '>';
        nextButton.addEventListener('click', () => {
            lineSoundIndexes[lineIndex] = (lineSoundIndexes[lineIndex] + 1) % soundBank.length;
            render();
        });

        soundSelector.appendChild(prevButton);
        soundSelector.appendChild(soundImage);
        soundSelector.appendChild(nextButton);
        lineDiv.appendChild(soundSelector);

        const measureDiv = document.createElement('div');
        measureDiv.className = 'measure';

        const displayWords = [...lineWords];
        const circlesPerMeasure = config.beatsPerMeasure * config.circlesPerBeat;

        for (let beatStartIndex = 0; beatStartIndex < circlesPerMeasure; beatStartIndex += config.circlesPerBeat) {
            const beatGroup = createBeatGroup(lineIndex, beatStartIndex, config, displayWords);
            measureDiv.appendChild(beatGroup);

            // Store reference to the notes-box for highlighting during playback
            const notesBox = beatGroup.querySelector('.notes-box');
            const beatIndex = Math.floor(beatStartIndex / config.circlesPerBeat);
            if (notesBox) {
              if (!notesBoxElements[lineIndex]) {
                  notesBoxElements[lineIndex] = [];
              }
              notesBoxElements[lineIndex][beatIndex] = notesBox;
            }
        }

        lineDiv.appendChild(measureDiv);
        lineDiv.appendChild(createDivider(true)); // Add a final bar line to each line
        container.appendChild(lineDiv);
    }
  }

  // --- INITIALIZATION ---
  updatePoemMargin();
  window.addEventListener('resize', updatePoemMargin);

  // Zoom Controls
  const zoomFab = document.getElementById('zoom-fab');
  const zoomInBtn = document.getElementById('zoom-in-btn');
  const zoomOutBtn = document.getElementById('zoom-out-btn');
  const poemContainer = document.getElementById('poem');

  const zoomLevels = [0.75, 1.0, 1.1, 1.25, 1.5, 1.75];
  let currentZoomIndex = 1; // Default is 1.0

  function applyZoom() {
    poemContainer.className = 'zoom-level-' + currentZoomIndex;
    zoomInBtn.disabled = currentZoomIndex === zoomLevels.length - 1;
    zoomOutBtn.disabled = currentZoomIndex === 0;
  }

  zoomFab.addEventListener('click', () => {
    zoomInBtn.classList.toggle('visible');
    zoomOutBtn.classList.toggle('visible');
  });

  zoomInBtn.addEventListener('click', () => {
    if (currentZoomIndex < zoomLevels.length - 1) {
      currentZoomIndex++;
      applyZoom();
    }
  });

  zoomOutBtn.addEventListener('click', () => {
    if (currentZoomIndex > 0) {
      currentZoomIndex--;
      applyZoom();
    }
  });
  
  applyZoom();
  render();
  updateOneButtonAppearance();
})();
