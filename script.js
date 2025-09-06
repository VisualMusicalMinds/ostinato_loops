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
  
  let syncopation = [[], [], [], []];
  let syncopationStates = [{}, {}, {}, {}];
  let editingIndex = { line: null, position: null };
  let beatBarIconActive = true;
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

  // Audio context for generating sounds
  let audioContext = null;

  function initAudioContext() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  }


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
      // For each beat (4 sixteenth notes), compress to 2 eighth notes
      eighthNoteWords.push(sixteenthNoteWords[i] || '-');
      eighthNoteWords.push(sixteenthNoteWords[i+2] || '-');
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
    // Simplified for the new 4-line, 4-beat structure.
    const circlesPerBeat = 2; // 8th notes
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

  // Checkbox handlers
  const beatCheckbox = document.getElementById('beat-checkbox');
  const rhythmCheckbox = document.getElementById('rhythm-checkbox');
  beatCheckbox.addEventListener('change', (e) => { beatEnabled = e.target.checked; });
  rhythmCheckbox.addEventListener('change', (e) => { rhythmEnabled = e.target.checked; });

  // Copy Visual button
  const copyVisualBtn = document.getElementById('copy-visual-btn');
  copyVisualBtn.addEventListener('click', captureVisual);


  // --- PLAYBACK LOGIC ---

  function startPlayback() {
    initAudioContext();
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
        const rhythmPattern = getRhythmPattern(lineIndex);
        rhythmPattern.forEach((hasSound, circleIndex) => {
          if (hasSound) {
            const timeDelay = circleIndex * noteInterval;
            playTimeouts.push(setTimeout(() => {
              if (isPlaying && rhythmEnabled) {
                playTriangleTone(noteInterval * 0.8 / 1000);
              }
            }, timeDelay));
          }
        });
      });

      // Schedule the next loop
      playTimeouts.push(setTimeout(scheduleLoop, totalDuration));
    };

    scheduleLoop();
  }

  function stopPlayback() {
    isPlaying = false;
    playButton.textContent = '▶';
    playButton.classList.remove('playing');
    
    playTimeouts.forEach(timeout => clearTimeout(timeout));
    playTimeouts = [];
    
    clearHighlights();
    // No need to re-render, clearHighlights is enough.
  }

  function updateBeatBarVisibility() {
    document.querySelectorAll('.beat-bar').forEach(box => {
      box.classList.toggle('hidden', !beatBarIconActive);
    });
  }

  // --- RENDERING LOGIC ---

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

  function getChantText(activeStates) {
    const pattern = activeStates.map(a => a ? 'B' : 'G').join('/');
    switch (pattern) {
      // Two-circle
      case 'B/G': return ['Ta', '-'];
      case 'B/B': return ['Ti', 'ti'];
      case 'G/B': return ['-', 'ti'];
      case 'G/G': return ['-', '-'];
      // Three-circle
      case 'B/G/G': return ['Ta', '-', '-'];
      case 'B/B/G': return ['Ti', 'Ta', '-'];
      case 'B/B/B': return ['Ti', 'ti', 'ti'];
      case 'G/B/G': return ['-', 'Ta', '-'];
      case 'G/B/B': return ['-', 'ti', 'ti'];
      case 'G/G/B': return ['-', '-', 'ti'];
      case 'B/G/B': return ['Ta', '-', 'ti'];
      case 'G/G/G': return ['-', '-', '-'];
      // Four-circle
      case 'B/G/G/G': return ['Ta', '-', '-', '-'];
      case 'B/G/B/G': return ['Ti', '-', 'ti', '-'];
      case 'B/B/B/B': return ['Ti', 'ki', 'ti', 'ki'];
      case 'B/B/B/G': return ['Ti', 'ki', 'ti', '-'];
      case 'B/G/B/B': return ['Ti', '-', 'ti', 'ki'];
      case 'G/B/B/B': return ['-', 'ki', 'ti', 'ki'];
      case 'G/B/G/G': return ['-', 'ki', '-', '-'];
      case 'G/G/B/G': return ['-', '-', 'ti', '-'];
      case 'G/G/G/B': return ['-', '-', '-', 'ki'];
      case 'B/B/G/G': return ['Ti', 'ki', '-', '-'];
      case 'G/B/G/B': return ['-', 'ki', '-', 'ki'];
      case 'G/B/B/G': return ['-', 'ki', 'ti', '-'];
      case 'B/B/G/B': return ['Ti', 'ki', '-', 'ti'];
      case 'G/G/B/B': return ['-', '-', 'ti', 'ki'];
      case 'G/G/G/G': return ['-', '-', '-', '-'];
      case 'B/G/G/B': return ['Ti', '-', '-', 'ki'];
      default: return [];
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

    const beatBarDiv = document.createElement('div');
    beatBarDiv.className = 'beat-bar';
    if (!beatBarIconActive) beatBarDiv.classList.add('hidden');

    const activeStates = [];
    for (let circleIndex = 0; circleIndex < config.circlesPerBeat; circleIndex++) {
        const idx = beatStartPosition + circleIndex;
        const half = document.createElement('div');
        half.className = 'beat-bar-half';
        
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

    group.appendChild(notesBox);

    const wordsDiv = document.createElement('div');
    wordsDiv.className = 'words';

    // Determine the pattern from the two active states for this beat.
    const pattern = (activeStates[0] ? 'O' : 'G') + (activeStates[1] ? 'O' : 'G');

    let textContent = '';
    let isRest = false;

    switch (pattern) {
        case 'OG': // Ta
            textContent = 'Ta';
            break;
        case 'OO': // Ti - Ti
            textContent = 'Ti - Ti';
            break;
        case 'GO': // - ti
            textContent = '- ti';
            break;
        case 'GG': // -
            textContent = '-';
            isRest = true;
            break;
    }

    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = textContent;
    if (isRest) {
        span.classList.add('rest');
    }

    wordsDiv.appendChild(span);
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

    container.innerHTML = '';
    notesBoxElements = [[], [], [], []]; // 2D array for 4 lines
    const config = getLayoutConfig();

    words.forEach((lineWords, lineIndex) => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'line';

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
    });
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
})();
