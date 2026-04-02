// PWA Registration
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .catch(err => console.log('SW registration failed', err));
      });
    }

    // Configuración Base
    const levels = [
        { id: 1, name: "Despertar", reps: 5, contractTime: 3, relaxTime: 4, xpRequired: 0, xpReward: 10,
          benefit: "En esta fase inicial, estás despertando la conexión neuronal entre tu cerebro y el músculo pubococcígeo (PC). Es normal sentir temblores o reclutar músculos equivocados (glúteos o abdomen). Al aislar el músculo, inicias un aumento crucial del flujo sanguíneo hacia la región pélvica, vital para tu salud íntima." },
        { id: 2, name: "Iniciación", reps: 8, contractTime: 4, relaxTime: 5, xpRequired: 150, xpReward: 15,
          benefit: "Tu control voluntario mejora y el músculo PC comienza a hipertrofiarse. Ahora puedes contraerlo sin tensar el resto del cuerpo. Empezarás a notar erecciones ligeramente más firmes debido a la mejora en la retención de sangre en los cuerpos cavernosos, además de una eyaculación con más potencia." },
        { id: 3, name: "Control", reps: 10, contractTime: 5, relaxTime: 5, xpRequired: 800, xpReward: 20,
          benefit: "Tu suelo pélvico ya no es pasivo; adquieres la capacidad de intervenir conscientemente. Al realizar una contracción fuerte (Flick) justo antes del 'punto de no retorno', puedes comenzar a suprimir o retrasar el reflejo eyaculatorio prolongando el acto sexual. Además, masajeas internamente la próstata al contraer." },
        { id: 4, name: "Resistencia", reps: 10, contractTime: 7, relaxTime: 8, xpRequired: 2000, xpReward: 25,
          benefit: "Tus fibras musculares actúan ahora con resistencia de maratón. Logras sostener contracciones que funcionan como un torniquete natural, atrapando la sangre para erecciones de máxima dureza y duración. Tu dominio sobre la eyaculación precoz es enorme, permitiéndote decidir cuándo terminar de forma controlada." },
        { id: 5, name: "Maestría Pélvica", reps: 15, contractTime: 10, relaxTime: 10, xpRequired: 4500, xpReward: 30,
          benefit: "El pináculo anatómico. Tienes dominio absoluto sobre tu respuesta orgásmica: con la técnica adecuada, puedes separar el orgasmo de la eyaculación (logrando multiplicar el placer) controlando el PC a voluntad. Tu suelo pélvico es un músculo de acero, asegurando tu longevidad y potencia sexual intacta de por vida." }
    ];

    const baseTips = [
        "Respira fluidamente. Aguantar la respiración anula el efecto.",
        "Asegúrate de no contraer glúteos ni abdomen. Únicamente tu suelo pélvico.",
        "La consistencia es clave. 3 veces por día da resultados visibles en 4 semanas.",
        "El tiempo de relajación es tan importante como la contracción para evitar hipertonía.",
        "Vacía tu vejiga siempre antes de comenzar."
    ];
    
    function getTipsByGoal() {
        let tips = [...baseTips];
        
        // Añadir consejos específicos y ampliados por sexo
        if (user.gender === 'Masculino') {
            tips.push(
                "Para hombres: un Kegel bien hecho se siente como intentar levantar o retraer levemente el pene hacia el cuerpo.",
                "Evita apretar los glúteos. El trabajo debe sentirse internamente, la misma sensación que al intentar detener el flujo de orina.",
                "Es normal sentir un pequeño movimiento expansivo y de retracción en la base del perineo (entre el escroto y el ano).",
                "Hombres: Fortalecer el músculo pubococcígeo (PC) mejora la circulación, promoviendo erecciones significativamente más firmes.",
                "El control pélvico masculino disminuye la sensibilidad excesiva, dándote control consciente para retrasar la eyaculación.",
                "Consejo visual: Imagina que quieres acercar los testículos hacia el estómago de forma lenta y controlada.",
                "Durante el tiempo de relajación (RELAJA), asegúrate de que tu perineo se suelte y 'descienda' por completo. No acumules tensión.",
                "Los ejercicios Kegel diarios previenen afecciones de la próstata y eliminan problemas como el goteo después de orinar."
            );
        } else if (user.gender === 'Femenino') {
            tips.push(
                "Para mujeres: la sensación correcta es similar a intentar levantar y retener una pequeña canica internamente.",
                "Relaja completamente tu mandíbula y tus hombros durante las repeticiones. La tensión facial se refleja en la tensión pélvica.",
                "Es vital relajar el suelo pélvico tanto como lo contraes. Un músculo siempre apretado genera dolores y acortamiento (hipertonía).",
                "Visualiza tu suelo pélvico como un ascensor: cierra puertas, sube lentamente al primer piso, y luego desciende y abre las puertas de nuevo.",
                "Este entrenamiento oxigena los tejidos corporales, aumentando el flujo sanguíneo y mejorando de forma natural tu lubricación.",
                "Un músculo perineal fuerte tiene mayor rango de contracción, lo que incrementa enormemente la fuerza y duración de los orgasmos.",
                "En la recuperación post-parto, los ejercicios Kegel son tus mejores aliados para reconectar y tonificar la musculatura perineal.",
                "Evita 'empujar' hacia afuera con el abdomen. El movimiento de un Kegel siempre es de succionar, cerrar y levantar hacia adentro."
            );
        }
        
        if (!user.goal) return tips;
        if (user.goal === 'clinico') return [...tips, "Objetivo: Paciencia. El control de vejiga mejora drásticamente tras 6 semanas de constancia.", "Notarás las reducciones de fugas al toser o reír muy pronto."];
        if (user.goal === 'postparto') return [...tips, "Objetivo: Recuperación. Empieza suave, tu cuerpo ha pasado por mucho.", "No te excedas. La zona perineal necesita sanar mientras se tonifica."];
        if (user.goal === 'sexual') return [...tips, "Objetivo: Plenitud. Mayor flujo sanguíneo significa mayor sensibilidad física.", "Un músculo PC fuerte mejora el control, el riego capilar y la intensidad orgásmica."];
        if (user.goal === 'fitness') return [...tips, "Objetivo: Core Fuerte. El suelo pélvico es la base oculta de tu core.", "Fortalecer tu suelo pélvico protegerá tu zona lumbar durante levantamientos pesados."];
        
        return tips;
    }

    // Estado del Usuario
    let user = { 
        xp: 0, currentLevelIndex: 0, streak: 0, lastWorkoutDate: null, 
        totalWorkouts: 0, maxHoldTime: 0, achievements: [],
        workoutDates: {}, reminderTime: null, reminderSentToday: null, lastDailyDate: null,
        goal: null, coins: 0, inventory: [], garden: [null, null, null, null],
        historyData: [], unlockedRoutines: [], avatar: '😊'
    };
    
    // Calendario state
    let calendarMonth = new Date().getMonth();
    let calendarYear = new Date().getFullYear();

    // --- Funciones Genéricas de Modal ---
    function openModal(overlayId, contentId, callback) {
        let overlay = document.getElementById(overlayId);
        let content = document.getElementById(contentId);
        if (!overlay) return;
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.style.opacity = '1';
            if (content) content.classList.add('active');
            if (callback) callback();
        }, 10);
    }
    function closeModal(overlayId, contentId, callback) {
        let overlay = document.getElementById(overlayId);
        let content = document.getElementById(contentId);
        if (!overlay) return;
        overlay.style.opacity = '0';
        if (content) content.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
            if (callback) callback();
        }, 400);
    }
    
    // Estado de la App
    let isWorkingOut = false;
    let isPaused = false;
    let isCancelled = false;
    let pSys = null;
    let soundMode = localStorage.getItem('kegelSoundMode') || 'voice'; // 'voice', 'beep', 'mute'
    let masterVolume = parseInt(localStorage.getItem('kegelMasterVolume') || '80') / 100;
    
    // Tracker de Inactividad (FPS Limit)
    let lastInteractionTime = performance.now();
    ['mousemove', 'touchstart', 'keydown', 'click'].forEach(evt => {
        window.addEventListener(evt, () => lastInteractionTime = performance.now(), {passive: true});
    });
    
    // Elementos DOM
    const elLevel = document.getElementById('levelDisplay');
    const elStreak = document.getElementById('streakBadge');
    const elXpProgress = document.getElementById('xpProgress');
    const elBenefitText = document.getElementById('benefitText');
    const elTimerCircle = document.getElementById('timerCircle');
    const elStateText = document.getElementById('stateText');
    const elTimeText = document.getElementById('timeText');
    const elRepsText = document.getElementById('repsText');
    const elStartBtn = document.getElementById('startBtn');
    const elWorkoutControls = document.getElementById('workoutControls');
    const elPauseBtn = document.getElementById('pauseBtn');
    const elTipText = document.getElementById('tipText');
    const elSoundBtn = document.getElementById('soundToggle');
    
    // Variables de UI
    let displayedXp = -1;
    let displayedCoins = -1;
    
    // Caché adicional para optimización
    const elLevelText = document.getElementById('levelText');
    const elXpTextMax = document.getElementById('xpTextMax');
    const elXpTextNum = document.getElementById('xpTextNum');
    const elStatWorkouts = document.getElementById('statTotalWorkouts');
    const elStatAvgHold = document.getElementById('statAvgHold');
    const elStatTotalXP = document.getElementById('statTotalXP');

    // --- Audio y Haptic ---
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx;
    let noiseNode, noiseGain;

    let ambientOscillators = [];
    let ambientGain;
    function initMusic() {
        if (!audioCtx) audioCtx = new AudioContext();
        if (ambientGain) return; 
        ambientGain = audioCtx.createGain();
        ambientGain.gain.value = 0;
        ambientGain.connect(audioCtx.destination);
        
        let baseFrequencies = [261.63, 329.63, 392.00, 523.25, 659.25]; // C E G C E
        
        baseFrequencies.forEach(freq => {
            let osc = audioCtx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            let lfo = audioCtx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.value = Math.random() * 0.05 + 0.02; 
            
            let lfoGain = audioCtx.createGain();
            lfoGain.gain.value = 0.15;
            
            lfo.connect(lfoGain.gain);
            osc.connect(lfoGain);
            lfoGain.connect(ambientGain);
            
            osc.start();
            lfo.start();
            ambientOscillators.push(osc);
        });
    }

    function setMusicVolume(vol, duration=2) {
        if (!ambientGain) return;
        try {
            ambientGain.gain.setTargetAtTime(vol * masterVolume, audioCtx.currentTime, duration / 4);
        } catch(e) {}
    }

    function stopMusic() {
        try {
            if (ambientGain) {
                ambientGain.gain.cancelScheduledValues(audioCtx.currentTime);
                ambientGain.gain.setValueAtTime(0, audioCtx.currentTime);
            }
            ambientOscillators.forEach(osc => {
                try { osc.stop(); osc.disconnect(); } catch(e) {}
            });
            ambientOscillators = [];
            if (ambientGain) { ambientGain.disconnect(); ambientGain = null; }
        } catch(e) {}
    }

    function initNoise() {
        if (!audioCtx) audioCtx = new AudioContext();
        if (noiseNode) return;
        let bufferSize = 2 * audioCtx.sampleRate;
        let noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        let output = noiseBuffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            let white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02; // brown noise approx
            lastOut = output[i];
            output[i] *= 3.5; // gain compensation
        }
        noiseNode = audioCtx.createBufferSource();
        noiseNode.buffer = noiseBuffer;
        noiseNode.loop = true;
        
        let filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400; // ocean rumble
        
        noiseGain = audioCtx.createGain();
        noiseGain.gain.value = 0;
        
        noiseNode.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noiseNode.start(0);
    }
    
    function setOceanVolume(targetVolume, duration = 1.0) {
        if (!noiseGain) return;
        try {
            noiseGain.gain.setTargetAtTime(targetVolume * masterVolume, audioCtx.currentTime, duration / 4);
        } catch(e) {}
    }
    
    function stopOceanNoise() {
        try {
            if (noiseGain) noiseGain.gain.cancelScheduledValues(audioCtx.currentTime);
            if (noiseGain) noiseGain.gain.setValueAtTime(0, audioCtx.currentTime);
            if (noiseNode) { noiseNode.stop(); noiseNode.disconnect(); noiseNode = null; }
            noiseGain = null;
        } catch(e) {}
    }

    function emitVibration(type) {
        if (!navigator.vibrate) return;
        try {
            if (type === 'contract') navigator.vibrate(150);
            if (type === 'relax') navigator.vibrate([100, 50, 100]);
            if (type === 'success') navigator.vibrate([100, 50, 100, 50, 300]);
            if (type === 'error') navigator.vibrate([50, 50, 50]);
        } catch(e) {}
    }

    function playTone(frequency, type = 'sine', duration = 1.0) {
        if (soundMode !== 'beep' && soundMode !== 'voice') return;
        // Si está en modo voz, reproducimos un pequeño beep muy suave de fondo (opcional) o directamente no
        if (soundMode === 'voice') return; 

        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3 * masterVolume, audioCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    }

    function playVoice(text) {
        if (soundMode === 'music') {
            if (text === 'Contrae' || text.includes('Sube') || text.includes('Mantén') || text.includes('Pulso')) setMusicVolume(0.8, 1.5);
            if (text.includes('Relaja')) setMusicVolume(0.2, 2);
            if (text.includes('Épica') || text.includes('Cancelado') || text === 'Prepárate') setMusicVolume(0, 1);
            return;
        }
        if (soundMode === 'ocean') {
            if (text === 'Contrae' || text.includes('Sube') || text.includes('Mantén') || text.includes('Pulso')) setOceanVolume(0.5, 1.5);
            if (text.includes('Relaja')) setOceanVolume(0.1, 2);
            if (text.includes('Épica') || text.includes('Cancelado') || text === 'Prepárate') setOceanVolume(0, 1);
            return;
        }
        if (soundMode !== 'voice') {
            if (soundMode === 'beep') {
                if (text === 'Contrae' || text === 'Mantén firme') playTone(440, 'sine', 1.5);
                if (text.includes('Relaja')) playTone(220, 'sine', 1.5);
                if (text === 'Sube 1') playTone(330, 'sine', 1); // E4
                if (text === 'Sube 2') playTone(440, 'sine', 1); // A4
                if (text === 'Máximo') playTone(554.37, 'sine', 1.5); // C#5
                if (text === '¡Pulso!') playTone(659.25, 'triangle', 0.2); // E5 short blip
                if (text.includes('Épica')) { playTone(330, 'sine', 0.5); setTimeout(()=>playTone(440, 'sine', 1), 300); }
            }
            return;
        }
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            let msg = new SpeechSynthesisUtterance(text);
            msg.lang = 'es-ES';
            msg.rate = 1.1; // Un poco más rápido para no desfasar
            window.speechSynthesis.speak(msg);
        }
    }

    function updateSoundIcon() {
        if (soundMode === 'voice') elSoundBtn.innerText = '🗣️';
        else if (soundMode === 'ocean') elSoundBtn.innerText = '🌊';
        else if (soundMode === 'music') elSoundBtn.innerText = '🎵';
        else if (soundMode === 'beep') elSoundBtn.innerText = '🔔';
        else elSoundBtn.innerText = '🔇';
    }

    function toggleSound() {
        // Detener TODOS los sonidos antes de cambiar
        stopOceanNoise();
        stopMusic();
        
        if (soundMode === 'voice') soundMode = 'ocean';
        else if (soundMode === 'ocean') soundMode = 'music';
        else if (soundMode === 'music') soundMode = 'beep';
        else if (soundMode === 'beep') soundMode = 'mute';
        else soundMode = 'voice';
        localStorage.setItem('kegelSoundMode', soundMode);
        updateSoundIcon();
        
        // Iniciar sonidos del modo nuevo
        if (soundMode === 'ocean') initNoise();
        if (soundMode === 'music') initMusic();
        emitVibration('contract');
    }
    
    function setMasterVolume(val) {
        masterVolume = parseInt(val) / 100;
        localStorage.setItem('kegelMasterVolume', val);
        let label = document.getElementById('volumeLabel');
        if (label) label.innerText = val + '%';
        
        // Aplicar volumen en tiempo real a los sonidos activos
        if (noiseGain && soundMode === 'ocean') {
            try { noiseGain.gain.setValueAtTime(masterVolume * 0.5, audioCtx.currentTime); } catch(e) {}
        }
        if (ambientGain && soundMode === 'music') {
            try { ambientGain.gain.setValueAtTime(masterVolume * 0.3, audioCtx.currentTime); } catch(e) {}
        }
    }

    // --- Fechas y Guardado ---
    function getLocalDateString() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    }

    function getYesterdayDateString() {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    }

    function saveProgress() {
        localStorage.setItem('kegelAppData', JSON.stringify(user));
        updateUI();
    }

    function loadProgress() {
        const savedData = localStorage.getItem('kegelAppData');
        if (savedData) {
            let parsed = JSON.parse(savedData);
            user = { ...user, ...parsed }; // Merge con defaults
        }
        
        // Re-evaluar nivel actual en base al XP en caso de rebalanceo
        user.currentLevelIndex = 0;
        for (let i = 1; i < levels.length; i++) {
            if (user.xp >= levels[i].xpRequired) {
                user.currentLevelIndex = i;
            }
        }
        
        updateSoundIcon();
    }

    function resetProgress() {
        if(confirm("¿Estás seguro de que quieres borrar todo tu progreso?")) {
            user = { xp: 0, currentLevelIndex: 0, streak: 0, lastWorkoutDate: null, totalWorkouts: 0, maxHoldTime: 0, achievements: [], workoutDates: {}, reminderTime: null, reminderSentToday: null, lastDailyDate: null, coins: 0, inventory: [], garden: [null, null, null, null], historyData: [], unlockedRoutines: [] };
            saveProgress();
            updateUI();
            alert("Progreso reiniciado.");
            closeSettingsModal();
        }
    }

    // --- Interfaz ---
    function updateUI() {
        let lvl = levels[user.currentLevelIndex];
        let nextLvl = levels[user.currentLevelIndex + 1];
        
        elLevelText.innerText = `Nivel ${lvl.id}: ${lvl.name}`;
        elBenefitText.innerText = lvl.benefit;
        elStreak.innerText = `🔥 ${user.streak}`;
        
        if (nextLvl) {
            let xpIntoLevel = user.xp - lvl.xpRequired;
            let xpNeededForNext = nextLvl.xpRequired - lvl.xpRequired;
            elXpTextMax.innerText = `/ ${nextLvl.xpRequired} XP`;
            elXpProgress.style.width = `${Math.min((xpIntoLevel / xpNeededForNext) * 100, 100)}%`;
        } else {
            elXpTextMax.innerText = `XP (Máx)`;
            elXpProgress.style.width = `100%`;
        }
        
        if (displayedXp === -1) {
            elXpTextNum.innerText = user.xp;
            displayedXp = user.xp;
        } else if (displayedXp !== user.xp) {
            animateValue('xpTextNum', displayedXp, user.xp, 1500);
            displayedXp = user.xp;
        }
        
        if(!isWorkingOut) elRepsText.innerText = `0 / ${lvl.reps} Repeticiones`;
        
        // Actualizar Stats
        elStatWorkouts.innerText = user.totalWorkouts || 0;
        elStatAvgHold.innerText = `${user.maxHoldTime || 0}s`;
        elStatTotalXP.innerText = user.xp || 0;

        rotateTip();
        updateAICoach();
        renderStreakCalendar();
        renderGarden();
        updateMarquee();
        
        // Actualizar avatar en header
        applyAvatarToElement('topAvatar');

        // Actualizar botones con recompensas potenciales
        let today = getLocalDateString();
        let dailyXP = lvl.xpReward * 3;
        let isDailyDone = user.lastDailyDate === today;
        
        if(document.getElementById('btnChallenge')) {
            let btnChal = document.getElementById('btnChallenge');
            if(isDailyDone) {
                btnChal.innerHTML = `👑 Reto Completado Hoy <span style="font-size: 0.75rem; opacity: 0.8; font-weight: normal; margin-left: 5px;">✓</span>`;
                btnChal.style.background = 'rgba(255,255,255,0.1)';
                btnChal.style.color = 'var(--text-muted)';
                btnChal.style.boxShadow = 'none';
            } else {
                btnChal.innerHTML = `👑 Reto Diario Supremo <span style="font-size: 0.75rem; opacity: 0.8; font-weight: normal; margin-left: 5px;">(+${dailyXP} XP)</span>`;
                btnChal.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
                btnChal.style.color = 'white';
                btnChal.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.4)';
            }
        }
        if(document.getElementById('btnModoLibre')) document.getElementById('btnModoLibre').innerHTML = `🏋️ Entrenar <span style="font-size: 0.7rem; opacity: 0.8; font-weight: normal; margin-left: 5px;">(+${lvl.xpReward} XP)</span>`;
        if(document.getElementById('btnFlicks')) document.getElementById('btnFlicks').innerHTML = `⚡ Flicks <span style="font-size: 0.7rem; opacity: 0.8; font-weight: normal; margin-left: 5px;">(+${Math.floor(lvl.xpReward * 0.8)} XP)</span>`;
    }

    function updateMarquee() {
        let el = document.getElementById('achievementsMarquee');
        if (!el) return;
        if (!user.achievements || user.achievements.length === 0) {
            el.innerText = "No hay logros aún. ¡Sigue entrenando!";
        } else {
            let text = user.achievements.map(achId => {
                let achDef = allAchievements.find(ac => ac.id === achId);
                return `🏆 ${achDef ? achDef.name : 'Misterio'}`;
            }).join(' ✨ ');
            // Repetimos el texto si es muy corto para asegurar el flujo continuo
            if (user.achievements.length < 4) {
                text = text + ' ✨ ' + text + ' ✨ ' + text;
            }
            el.innerText = text;
        }
    }

    function rotateTip() {
        const pool = getTipsByGoal();
        const randomTip = pool[Math.floor(Math.random() * pool.length)];
        elTipText.innerText = `💡 ${randomTip}`;
    }

    function updateAICoach(forceAnimate = false, customMessage = null) {
        let el = document.getElementById('aiCoachText');
        if (!el) return;
        let today = getLocalDateString();
        
        let finalHtml = "";
        if (customMessage) {
            finalHtml = customMessage;
        } else if (user.totalWorkouts === 0 || !user.lastWorkoutDate) {
            finalHtml = "<strong>Bienvenido.</strong> Todo gran viaje comienza con un sencillo paso. Presiona Entrenar.";
        } else if (user.streak >= 3 && user.lastWorkoutDate === today) {
            finalHtml = `<strong>¡Racha de ${user.streak} días!</strong> Estás desarrollando una memoria muscular increíble. Céntrate en la relajación total.`;
        } else if (user.streak >= 3 && user.lastWorkoutDate !== today) {
            finalHtml = `<strong>Protege tu racha de ${user.streak}.</strong> Solo toma 3 minutos mantener tu progreso de élite intacto.`;
        } else if (user.lastDailyDate === today) {
            finalHtml = `<strong>Reto Supremo completado.</strong> Tus fibras de contracción rápida están fatigadas (es positivo). Descansa y recupera.`;
        } else {
            let fallbackText = "<strong>Constancia técnica.</strong> La fuerza pura no sirve sin la técnica. Asegúrate de aislar el suelo pélvico sin tensar los glúteos ni los muslos.";
            if (user.gender === 'Masculino') {
                fallbackText = "<strong>Foco en el control masculino.</strong> El verdadero poder no está en la fuerza bruta, sino en aislar el músculo púbico. Si tus abdominales tiemblan o cortas la respiración, baja la intensidad.";
            } else if (user.gender === 'Femenino') {
                fallbackText = "<strong>Conexión profunda femenina.</strong> El progreso perineal requiere suavidad y soltar tensiones externas. Durante la relajación, inhala profundo y percibe cómo toda el área cede y descansa.";
            }
            finalHtml = fallbackText;
        }

        if (forceAnimate) {
            el.innerHTML = '';
            let i = 0;
            let isTag = false;
            let currentText = '';
            
            function type() {
                if (i < finalHtml.length) {
                    let char = finalHtml.charAt(i);
                    currentText += char;
                    el.innerHTML = currentText + '<span style="opacity: 0.7;">_</span>';
                    if (char === '<') isTag = true;
                    if (char === '>') isTag = false;
                    
                    i++;
                    if (isTag) {
                        type();
                    } else {
                        setTimeout(type, 15);
                    }
                } else {
                    el.innerHTML = finalHtml;
                }
            }
            type();
        } else {
            el.innerHTML = finalHtml;
        }
    }

    // --- Lógica de Heatmap y Roadmap ---
    function renderHeatmap() {
        const container = document.getElementById('heatmapContainer');
        if(!container) return;
        container.innerHTML = '';
        if (!user.workoutDates) user.workoutDates = {};
        
        let today = new Date();
        let html = '';
        // 35 days (5 weeks)
        for (let i = 34; i >= 0; i--) {
            let d = new Date(today);
            d.setDate(today.getDate() - i);
            let dString = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            let count = user.workoutDates[dString] || 0;
            
            let colorClass = 'heat-0';
            if (count > 0 && count <= 2) colorClass = 'heat-1';
            else if (count > 2 && count <= 4) colorClass = 'heat-2';
            else if (count > 4) colorClass = 'heat-3';
            
            html += `<div class="heat-box ${colorClass}" title="${dString}: ${count} sesiones"></div>`;
        }
        container.innerHTML = html;
    }

    // --- Calendario de Rachas ---
    function renderStreakCalendar() {
        const cal = document.getElementById('streakCalendar');
        if (!cal) return;
        if (!user.workoutDates) user.workoutDates = {};

        const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        const dayNames = ['L','M','X','J','V','S','D'];
        
        let today = new Date();
        let firstDay = new Date(calendarYear, calendarMonth, 1);
        let lastDay = new Date(calendarYear, calendarMonth + 1, 0);
        let startDayOfWeek = (firstDay.getDay() + 6) % 7; // Monday = 0

        let html = `<div class="cal-nav">`;
        html += `<button onclick="changeCalMonth(-1)">◀</button>`;
        html += `<span>${monthNames[calendarMonth]} ${calendarYear}</span>`;
        html += `<button onclick="changeCalMonth(1)">▶</button>`;
        html += `</div>`;
        html += `<div class="cal-header">${dayNames.map(d => `<span>${d}</span>`).join('')}</div>`;
        html += `<div class="cal-grid">`;

        // Empty cells before month starts
        for (let i = 0; i < startDayOfWeek; i++) html += `<div class="cal-day empty"></div>`;

        for (let d = 1; d <= lastDay.getDate(); d++) {
            let dateStr = `${calendarYear}-${String(calendarMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            let count = user.workoutDates[dateStr] || 0;
            let isToday = (d === today.getDate() && calendarMonth === today.getMonth() && calendarYear === today.getFullYear());
            
            let cls = 'cal-day';
            if (isToday) cls += ' today';
            if (count >= 1 && count <= 2) cls += ' active-1';
            else if (count >= 3 && count <= 4) cls += ' active-2';
            else if (count >= 5) cls += ' active-3';

            let fire = count > 0 ? `<span class="cal-fire">🔥</span>` : '';
            html += `<div class="${cls}" title="${dateStr}: ${count} sesiones">${d}${fire}</div>`;
        }

        html += `</div>`;
        cal.innerHTML = html;
    }

    function changeCalMonth(delta) {
        calendarMonth += delta;
        if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
        if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
        renderStreakCalendar();
    }

    function openRoadmapModal() {
        renderRoadmap();
        openModal('roadmapModal', 'roadmapModalContent');
    }

    function closeRoadmapModal() {
        closeModal('roadmapModal', 'roadmapModalContent');
    }

    function renderRoadmap() {
        const list = document.getElementById('roadmapList');
        if(!list) return;
        let html = '<div class="roadmap-line"></div>';

        levels.forEach((lvl, index) => {
            let stateClass = 'locked';
            let icon = '🔒';
            
            if (index < user.currentLevelIndex) {
                stateClass = 'completed';
                icon = '✓';
            } else if (index === user.currentLevelIndex) {
                stateClass = 'current';
                icon = '🔥';
            }

            let nextXpText = index === user.currentLevelIndex && levels[index+1] ? `Progreso hacia nivel ${index+2}: ${user.xp}/${levels[index+1].xpRequired} XP` : '';
            if (index === user.currentLevelIndex && !levels[index+1]) nextXpText = '¡NIVEL MÁXIMO ALCANZADO!';

            html += `
                <div class="roadmap-item ${stateClass}">
                    <div class="roadmap-icon">${icon}</div>
                    <div class="roadmap-content">
                        <h3>Nivel ${lvl.id}: ${lvl.name}</h3>
                        <p>${lvl.benefit}</p>
                        ${stateClass === 'current' ? `<div style="margin-top: 10px; font-size: 0.75rem; color: var(--primary); font-weight: bold; padding: 4px 8px; background: rgba(56, 189, 248, 0.1); border-radius: 8px; border: 1px solid rgba(56,189,248,0.2); display: inline-block;">${nextXpText}</div>` : ''}
                    </div>
                </div>
            `;
        });
        
        list.innerHTML = html;
    }

    // --- Lógica del Modal Custom ---
    function openCustomModal() {
        openModal('customModal', 'customModalContent');
    }

    function closeCustomModal() {
        closeModal('customModal', 'customModalContent');
    }

    function startCustomWorkout() {
        let reps = parseInt(document.getElementById('inpReps').value) || 10;
        let contract = parseInt(document.getElementById('inpContract').value) || 5;
        let relax = parseInt(document.getElementById('inpRelax').value) || 5;
        
        let customData = { name: "Personalizado", reps, contractTime: contract, relaxTime: relax, xpReward: Math.floor(reps * 1.5), isCustom: true };
        closeCustomModal();
        startWorkoutEngine(customData);
    }

    function openTrainingMenu() {
        let btnInv = document.getElementById('btnRutinaInverso');
        let btnEsp = document.getElementById('btnRutinaEspartana');
        if (!user.unlockedRoutines) user.unlockedRoutines = [];
        
        if (btnInv) {
            if (user.unlockedRoutines.includes('rutina_inverso')) {
                btnInv.innerHTML = `🧘 Kegel Inverso <br><span style="font-size:0.75rem; font-weight:normal;">Enfoque en relajación profunda</span>`;
                btnInv.style.opacity = '1';
                btnInv.style.background = 'rgba(16, 185, 129, 0.2)';
                btnInv.style.borderColor = 'var(--relax)';
            } else {
                btnInv.innerHTML = `🔒 Kegel Inverso (En Tienda)`;
                btnInv.style.opacity = '0.5';
                btnInv.style.background = 'rgba(255,255,255,0.05)';
                btnInv.style.borderColor = '#334155';
            }
        }

        if (btnEsp) {
            if (user.unlockedRoutines.includes('rutina_espartana')) {
                btnEsp.innerHTML = `🛡️ Rutina Espartana <br><span style="font-size:0.75rem; font-weight:normal;">Resistencia Extrema</span>`;
                btnEsp.style.opacity = '1';
                btnEsp.style.background = 'rgba(239, 68, 68, 0.2)';
                btnEsp.style.borderColor = 'var(--danger)';
            } else {
                btnEsp.innerHTML = `🔒 Rutina Espartana (En Tienda)`;
                btnEsp.style.opacity = '0.5';
                btnEsp.style.background = 'rgba(255,255,255,0.05)';
                btnEsp.style.borderColor = '#334155';
            }
        }

        document.getElementById('trainingModal').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('trainingModal').style.opacity = '1';
            document.getElementById('trainingModalContent').classList.add('active');
        }, 10);
    }
    
    function closeTrainingModal() {
        closeModal('trainingModal', 'trainingModalContent');
    }

    function startLevelWorkout() {
        closeTrainingModal();
        startWorkout();
    }

    function openCustomModalFromMenu() {
        closeTrainingModal();
        setTimeout(() => { openCustomModal(); }, 350);
    }

    function startWorkout() {
        let lvl = { ...levels[user.currentLevelIndex] };
        startWorkoutEngine(applyDifficultyMultiplier(lvl));
    }

    function startRoutine(id) {
        if (!user.unlockedRoutines || !user.unlockedRoutines.includes(id)) {
            alert("Ve a la Tienda Zen para desbloquear esta rutina.");
            return;
        }
        closeTrainingModal();
        let routineDef;
        if (id === 'rutina_inverso') {
            routineDef = { name: "Kegel Inverso", reps: 10, contractTime: 4, relaxTime: 12, xpReward: 35, isCustom: true, benefit: "Empuja sutilmente como intentando relajar por completo los esfínteres." };
        } else if (id === 'rutina_espartana') {
            let p1 = { name: "Resistencia Base", reps: 5, contractTime: 15, relaxTime: 8 };
            let p2 = { name: "Quema Rápida", reps: 15, contractTime: 2, relaxTime: 2 };
            routineDef = { name: "Rutina Espartana", xpReward: 55, isCustom: true, phases: [p1, p2] };
        }
        setTimeout(() => startWorkoutEngine(applyDifficultyMultiplier(routineDef)), 350);
    }

    function startFlicks() {
        let lvl = levels[user.currentLevelIndex];
        let reps = lvl.reps * 2; 
        startWorkoutEngine(applyDifficultyMultiplier({ 
            name: "Ráfaga Rápida (Flicks)", reps: reps, contractTime: 1, relaxTime: 1, 
            xpReward: Math.floor(lvl.xpReward * 0.8), isCustom: true,
            benefit: "Entrenando fibras de contracción rápida para fortalecer el esfínter velozmente."
        }));
    }

    function startDailyChallenge() {
        if (user.lastDailyDate === getLocalDateString()) {
            alert("Ya completaste el Reto Supremo hoy. ¡Descansa y vuelve mañana!");
            return;
        }
        let lvl = levels[user.currentLevelIndex];
        let p1 = { name: "Calentamiento", reps: lvl.reps, contractTime: lvl.contractTime, relaxTime: lvl.relaxTime };
        let p2 = { name: "Resistencia", reps: Math.ceil(lvl.reps * 1.5), contractTime: Math.ceil(lvl.contractTime * 1.5), relaxTime: lvl.relaxTime };
        let p3 = { name: "Flicks", reps: lvl.reps * 2, contractTime: 1, relaxTime: 1 };
        
        let dailyDef = { name: "Reto Diario Supremo", xpReward: lvl.xpReward * 3, isDaily: true, phases: [p1, p2, p3] };
        startWorkoutEngine(applyDifficultyMultiplier(dailyDef));
    }

    function applyDifficultyMultiplier(baseParams) {
        if (user.difficultyMultiplier === undefined) user.difficultyMultiplier = 1.0;
        if (baseParams.isCustom && baseParams.name === "Personalizado") return baseParams; // Do not alter user-input custom values
        
        let p = { ...baseParams };
        if (p.phases) {
            p.phases = p.phases.map(phase => applyDifficultyMultiplier(phase));
        } else {
            if (p.reps) p.reps = Math.max(1, Math.round(p.reps * user.difficultyMultiplier));
            if (p.contractTime && p.contractTime > 1) p.contractTime = Math.max(1, Math.round(p.contractTime * user.difficultyMultiplier));
        }
        return p;
    }

    // --- Motor de Entrenamiento ---
    function calculateStreak() {
        const today = getLocalDateString();
        const yesterday = getYesterdayDateString();
        let bonusXP = 0;

        if (user.lastWorkoutDate !== today) {
            if (!user.lastWorkoutDate) {
                user.streak = 1; 
            } else if (user.lastWorkoutDate === yesterday) {
                user.streak += 1;
                bonusXP = Math.min(user.streak * 2, 25); 
            } else {
                user.streak = 1; 
            }
            user.lastWorkoutDate = today;
        }
        return bonusXP;
    }

    // Wait func adaptable a pausas/cancelaciones
    async function countdown(seconds) {
        return new Promise(resolve => {
            let startTime = null;
            let pausedTime = 0;
            let lastPauseStart = null;
            let reqId = null;

            const update = (timestamp) => {
                if (isCancelled) {
                    cancelAnimationFrame(reqId);
                    resolve(false);
                    return;
                }

                if (isPaused) {
                    if (!lastPauseStart) lastPauseStart = timestamp;
                    reqId = requestAnimationFrame(update);
                    return;
                }

                if (lastPauseStart) {
                    pausedTime += (timestamp - lastPauseStart);
                    lastPauseStart = null;
                }

                if (!startTime) startTime = timestamp;

                let elapsed = (timestamp - startTime - pausedTime) / 1000;
                let timeLeft = Math.max(0, seconds - elapsed);
                
                // Mostrar siempre 2 decimales para mayor precisión
                if (timeLeft > 0) {
                    let tStr = timeLeft.toFixed(2).split('.');
                    elTimeText.innerHTML = `${tStr[0]}<span style="font-size: 0.45em; opacity: 0.85; padding-left: 2px;">.${tStr[1]}</span>`;
                    reqId = requestAnimationFrame(update);
                } else {
                    elTimeText.innerHTML = `0<span style="font-size: 0.45em; opacity: 0.85; padding-left: 2px;">.00</span>`;
                    resolve(true);
                }
            };
            reqId = requestAnimationFrame(update);
        });
    }

    function setTimerState(text, cssClass) {
        elStateText.innerText = text;
        elTimerCircle.className = `timer-container ${cssClass}`;
        document.getElementById('timerWrapper').className = "wrapper-" + cssClass;
        
        if (pSys) pSys.state = cssClass;
        
        if (cssClass === 'contracting') {
            elStateText.style.color = 'var(--primary)';
        } else if (cssClass === 'relaxing') {
            elStateText.style.color = 'var(--relax)';
        } else {
            elStateText.style.color = 'var(--text-muted)';
        }
    }

    function togglePause() {
        if (!isWorkingOut) return;
        isPaused = !isPaused;
        if (isPaused) {
            elPauseBtn.innerHTML = "▶ Reanudar";
            elPauseBtn.style.background = "var(--relax)";
            elPauseBtn.style.color = "white";
            elTimerCircle.classList.add("paused-state");
        } else {
            elPauseBtn.innerHTML = "⏸ Pausar";
            elPauseBtn.style.background = "var(--warning)";
            elPauseBtn.style.color = "black";
            elTimerCircle.classList.remove("paused-state");
        }
        emitVibration('error'); // Little hiccup feeling
    }

    function cancelWorkout() {
        if (!confirm("¿Seguro que quieres detener el entrenamiento? No se guardará tu progreso.")) return;
        isCancelled = true;
        isPaused = false; 
    }

    function startDailyChallenge() {
        let today = getLocalDateString();
        if (user.lastDailyDate === today) {
            alert("Ya completaste el Reto Supremo de hoy. ¡Vuelve mañana para más!");
            return;
        }
        let lvl = levels[user.currentLevelIndex];
        let p1 = { name: "Calentamiento", reps: Math.max(3, Math.floor(lvl.reps / 2)), contractTime: lvl.contractTime, relaxTime: lvl.relaxTime };
        let p2 = { name: "El Elevador", type: 'elevator', reps: Math.max(2, Math.floor(lvl.reps * 0.3)), contractTime: lvl.contractTime * 3, relaxTime: lvl.relaxTime * 2 };
        let p3 = { name: "Micro-Pulsos", type: 'pulse', reps: Math.max(2, Math.floor(lvl.reps * 0.3)), contractTime: lvl.contractTime * 2, relaxTime: lvl.relaxTime };
        
        startWorkoutEngine({ 
            name: "Reto Diario Supremo", 
            xpReward: lvl.xpReward * 3, 
            isDaily: true,
            phases: [p1, p2, p3]
        });
    }

    async function startWorkoutEngine(workoutParams) {
      try {
        if (isWorkingOut) return;
        isWorkingOut = true;
        isCancelled = false;
        isPaused = false;

        // UI Reset
        elStartBtn.style.display = 'none';
        document.getElementById('actionButtonsWrapper').style.display = 'none';
        elWorkoutControls.style.display = 'flex';
        elPauseBtn.innerHTML = "⏸ Pausar";
        elPauseBtn.style.background = "var(--warning)";
        elPauseBtn.style.color = "black";
        
        rotateTip();

        // Prep sound context (requires gesture)
        try {
            if ('speechSynthesis' in window) window.speechSynthesis.resume();
            if (!audioCtx) audioCtx = new AudioContext();
            if (audioCtx.state === 'suspended') await audioCtx.resume();
            if (soundMode === 'ocean') initNoise();
            if (soundMode === 'music') initMusic();
        } catch(audioErr) { console.warn('Audio init warn:', audioErr); }

        setTimerState("PREPÁRATE", "idle");
        playVoice("Prepárate");
        let completed = await countdown(3);
        if (!completed) return handleCancel();

        let phasesToRun = workoutParams.phases ? workoutParams.phases : [workoutParams];

        for (let pIdx = 0; pIdx < phasesToRun.length; pIdx++) {
            if (isCancelled) break;
            let p = phasesToRun[pIdx];
            
            if (workoutParams.phases) {
                setTimerState(p.name.toUpperCase(), "idle");
                playVoice(`Iniciando ${p.name}`);
                completed = await countdown(3);
                if (!completed) break;
            }

            for (let i = 1; i <= p.reps; i++) {
                if (isCancelled) break;
                elRepsText.innerText = workoutParams.phases ? `Fase ${pIdx+1}: ${i}/${p.reps} Repeticiones` : `${i} / ${p.reps} Repeticiones`;
                
                if (p.type === 'elevator') {
                    let stepTime = p.contractTime / 3;
                    for (let step=1; step<=3; step++) {
                        setTimerState(step===3 ? "MÁXIMO" : `SUBE ${step}`, "contracting");
                        playVoice(step===3 ? "Máximo" : `Sube ${step}`);
                        emitVibration("contract");
                        completed = await countdown(Math.max(1, Math.floor(stepTime)));
                        if(!completed) break;
                    }
                    if(!completed) break;

                    setTimerState("RELAJA", "relaxing");
                    playVoice("Relaja lento");
                    emitVibration("relax");
                    completed = await countdown(p.relaxTime);
                    if(!completed) break;
                    
                } else if (p.type === 'pulse') {
                    setTimerState("MANTÉN", "contracting");
                    playVoice("Mantén firme");
                    emitVibration("contract");
                    completed = await countdown(Math.floor(p.contractTime * 0.7)); 
                    if(!completed) break;
                    
                    let pulses = Math.max(3, Math.floor(p.contractTime * 0.3 * 2));
                    for(let pulse=1; pulse<=pulses; pulse++) {
                        setTimerState("¡PULSO!", "contracting");
                        if(soundMode==='voice' || soundMode==='beep') playTone(600, 'sine', 0.1);
                        emitVibration("contract");
                        completed = await countdown(0.5);
                        if(!completed) break;
                    }
                    if(!completed) break;
                    
                    setTimerState("RELAJA", "relaxing");
                    playVoice("Relaja");
                    emitVibration("relax");
                    completed = await countdown(p.relaxTime);
                    if(!completed) break;
                
                } else {
                    setTimerState("CONTRAE", "contracting");
                    playVoice("Contrae");
                    emitVibration("contract");
                    
                    completed = await countdown(p.contractTime);
                    if (!completed) break;

                    setTimerState("RELAJA", "relaxing");
                    playVoice("Relaja");
                    emitVibration("relax");
                    
                    completed = await countdown(p.relaxTime);
                    if (!completed) break;
                }
            }
        }

        if (isCancelled) {
            handleCancel();
        } else {
            openFeedbackModal(workoutParams);
        }
      } catch(engineErr) {
        console.error('[KF] Workout engine error:', engineErr);
        resetWorkoutUI();
      }
    }

    function handleCancel() {
        setTimerState("CANCELADO", "idle");
        elTimeText.innerText = "0:00";
        emitVibration('error'); // Vibration error feedback
        resetWorkoutUI();
    }

    function resetWorkoutUI() {
        isWorkingOut = false;
        isCancelled = false;
        isPaused = false;
        // Silenciar todos los sonidos de entrenamiento
        stopOceanNoise();
        stopMusic();
        elTimerCircle.classList.remove("paused-state");
        elWorkoutControls.style.display = 'none';
        elStartBtn.style.display = 'flex';
        document.getElementById('actionButtonsWrapper').style.display = 'flex';
        updateUI();
    }

    let pendingWorkoutParams = null;

    function openFeedbackModal(workoutParams) {
        pendingWorkoutParams = workoutParams;
        openModal('feedbackModal', 'feedbackModalContent');
        
        // Prevenir sonidos y resets no deseados hasta la decisión
        isWorkingOut = false;
        elWorkoutControls.style.display = 'none';
        elTimerCircle.classList.remove("paused-state");
        stopOceanNoise();
        stopMusic();
    }

    window.submitFeedback = function(multiplierDelta, difficultyName) {
        closeModal('feedbackModal', 'feedbackModalContent');
        
        if (user.difficultyMultiplier === undefined) user.difficultyMultiplier = 1.0;
        user.difficultyMultiplier += multiplierDelta;
        
        // Limits: no less than 50% base difficulty, no more than 300%
        if (user.difficultyMultiplier < 0.5) user.difficultyMultiplier = 0.5;
        if (user.difficultyMultiplier > 3.0) user.difficultyMultiplier = 3.0;

        saveProgress();
        finishWorkout(pendingWorkoutParams, difficultyName);
    };

    function finishWorkout(workoutParams, difficultyName) {
        setTimerState("¡MISIÓN ÉPICA!", "idle");
        elTimeText.innerText = "✓";
        if (pSys) pSys.burst();
        
        playVoice("¡Misión Épica!");
        emitVibration('success');
        
        let bonusXP = calculateStreak();
        let earnedXP = workoutParams.xpReward + bonusXP;
        user.xp += earnedXP;
        
        user.totalWorkouts = (user.totalWorkouts || 0) + 1;
        if (workoutParams.contractTime > (user.maxHoldTime || 0)) {
            user.maxHoldTime = workoutParams.contractTime;
        }
        
        let localDateStr = getLocalDateString();
        if (!user.workoutDates) user.workoutDates = {};
        user.workoutDates[localDateStr] = (user.workoutDates[localDateStr] || 0) + 1;
        
        waterPlants(localDateStr);
        
        if (workoutParams.isDaily) {
            user.lastDailyDate = localDateStr;
        }

        if (!user.historyData) user.historyData = [];
        let todayLog = user.historyData.find(h => h.date === localDateStr);
        if (todayLog) {
            todayLog.xp += earnedXP;
        } else {
            user.historyData.push({ date: localDateStr, xp: earnedXP });
        }

        let coinsEarned = Math.floor(workoutParams.xpReward / 2);
        if (user.coins === undefined) user.coins = 0;
        user.coins += coinsEarned;

        let leveledUp = false;
        while (true) {
            let nextLvl = levels[user.currentLevelIndex + 1];
            if (nextLvl && user.xp >= nextLvl.xpRequired) {
                user.currentLevelIndex++;
                leveledUp = true;
            } else {
                break;
            }
        }

        saveProgress();
        checkAchievements();

        let toastMsg = `+${workoutParams.xpReward} XP | +${coinsEarned} 🪙`;
        if (bonusXP > 0) toastMsg += ` (+${bonusXP} racha)`;
        
        setTimeout(() => showToast(toastMsg, "Entrenamiento Completado", "⭐"), 500);

        if (leveledUp) {
            setTimeout(() => alert(`¡NUEVO NIVEL ALCANZADO!\n\nEstás en el Nivel ${levels[user.currentLevelIndex].id}: ${levels[user.currentLevelIndex].name}\n\nRevisa la sección de "Tu cuerpo en este nivel".`), 2500);
        }
        setTimeout(() => {
            elStateText.innerText = "LISTO";
            elTimeText.innerText = "0:00";
            resetWorkoutUI();
            
            // Generate Custom Message
            let customMsg = `<strong>¡Excelente trabajo!</strong> Has completado la misión y ganado +${workoutParams.xpReward} XP.`;
            
            if (workoutParams.isDaily) {
                if (user.gender === 'Masculino') {
                    customMsg = `<strong>¡Reto superado!</strong> Excelente resistencia. Tu riego sanguíneo pélvico está en su pico.`;
                } else if (user.gender === 'Femenino') {
                    customMsg = `<strong>¡Reto superado!</strong> Maravilloso control. Has tonificado vitalmente tu suelo pélvico.`;
                } else {
                    customMsg = `<strong>¡Reto superado!</strong> Has tonificado y fortalecido tu resistencia al máximo hoy.`;
                }
            } else if (leveledUp) {
                customMsg = `<strong>¡Nivel Avanzado!</strong> Has subido al nivel ${levels[user.currentLevelIndex].id}. ¡Tómate un respiro!`;
            } else if (difficultyName === 'Fallida') {
                customMsg = `<strong>¡Intento valioso!</strong> Llegar hasta el fallo es donde reside el progreso. He bajado la intensidad de las próximas rutinas para ajustar a tu capacidad actual.`;
            } else if (difficultyName === 'Muy Fácil' || difficultyName === 'Fácil') {
                customMsg = `<strong>¿Muy fácil? Entendido.</strong> Has superado esto sin sudar. He aumentado la intensidad matemática del sistema para la próxima vez. Preparate.`;
            } else if (difficultyName === 'Difícil') {
                customMsg = `<strong>¡Perfecto!</strong> Esa sensación de quemazón indica progreso real. Estamos en la zona óptima de hipertrofia. Sigue así.`;
            } else {
                if (user.gender === 'Masculino') {
                    customMsg = "<strong>¡Misión cumplida!</strong> Buen control perineal masculino. Tu músculo PC se fortalece con cada sesión.";
                } else if (user.gender === 'Femenino') {
                    customMsg = "<strong>¡Misión cumplida!</strong> Excelente conexión. Tu piso pélvico femenino mejora visiblemente.";
                } else {
                    customMsg = "<strong>¡Misión cumplida!</strong> Has sumado experiencia valiosa para tu control central.";
                }
            }
            
            updateAICoach(true, customMsg);
            
            // Highlight AI Coach Effect
            let overlay = document.getElementById('focusOverlay');
            let coach = document.getElementById('aiCoachCard');
            if (overlay && coach) {
                overlay.classList.add('active');
                coach.classList.add('coach-focused');
                
                // Keep the focus for 3.5 seconds
                setTimeout(() => {
                    overlay.classList.remove('active');
                    coach.classList.remove('coach-focused');
                }, 3500);
            }
        }, 3000);
    }

    // --- Sistema Evolutivo del Jardín ---
    function waterPlants(dateStr) {
        if (!user.garden) return;
        let wateredAny = false;
        let yesterdayStr = getYesterdayDateString();
        
        user.garden.forEach((slot, idx) => {
            if (slot && slot.plant) {
                if (slot.lastWaterDate !== dateStr) {
                    let pWater = slot.water || 0;
                    // Penalización si se rompe la racha (ni ayer ni hoy)
                    if (slot.lastWaterDate && slot.lastWaterDate !== yesterdayStr) {
                        pWater = Math.max(0, pWater - 2);
                    }
                    pWater = Math.min(7, pWater + 1); // Max Nivel 7
                    user.garden[idx].water = pWater;
                    user.garden[idx].lastWaterDate = dateStr;
                    wateredAny = true;
                }
            }
        });
        
        if (wateredAny) {
            setTimeout(() => {
                showToast("+1 💧 Tu jardín ha sido regado", "Riego Zen", "🌿");
                renderGarden();
            }, 1000);
        }
    }

    // --- Lógica de Logros ---
    const allAchievements = [
        { id: 'first_workout', icon: '🌱', name: 'Primera Semilla', desc: 'Comprueba el flujo pélvico completando tu primera sesión.', xpReward: 50, coinReward: 10 },
        { id: 'workouts_10', icon: '🛡️', name: 'Constancia', desc: 'Completa 10 sesiones en total.', xpReward: 200, coinReward: 50 },
        { id: 'workouts_30', icon: '⛩️', name: 'Maestro Constante', desc: 'Completa 30 sesiones en total.', xpReward: 500, coinReward: 150 },
        { id: 'streak_3', icon: '🔥', name: 'Racha de Fuego', desc: 'Entrena 3 días consecutivos.', xpReward: 100, coinReward: 25 },
        { id: 'streak_7', icon: '⚙️', name: 'Racha de Acero', desc: 'Entrena 7 días consecutivos.', xpReward: 300, coinReward: 75 },
        { id: 'streak_14', icon: '👑', name: 'Racha Legendaria', desc: 'Entrena 14 días consecutivos.', xpReward: 800, coinReward: 200 },
        { id: 'hold_10', icon: '⏳', name: 'Fuerza de Voluntad', desc: 'Sostén una contracción por 10 segundos o más.', xpReward: 100, coinReward: 30 },
        { id: 'level_3', icon: '⭐', name: 'Control Maestro', desc: 'Alcanza el Nivel 3 (Control).', xpReward: 300, coinReward: 100 },
        { id: 'level_5', icon: '🌟', name: 'Maestría Absoluta', desc: 'Alcanza el Nivel 5 (Maestría Pélvica).', xpReward: 1000, coinReward: 300 },
        { id: 'first_plant', icon: '🪴', name: 'Jardín Floreciente', desc: 'Planta tu primera semilla en el Jardín Zen.', xpReward: 150, coinReward: 50 }
    ];

    function checkAchievements() {
        if (!user.achievements) user.achievements = [];
        
        let newlyUnlocked = false;
        const unlock = (id) => {
            if (!user.achievements.includes(id)) {
                user.achievements.push(id);
                let ach = allAchievements.find(a => a.id === id);
                if (ach) {
                    if (ach.xpReward) user.xp += ach.xpReward;
                    if (ach.coinReward) {
                        if (user.coins === undefined) user.coins = 0;
                        user.coins += ach.coinReward;
                    }

                    setTimeout(() => {
                        let rewardText = "";
                        if (ach.xpReward) rewardText += `+${ach.xpReward} XP `;
                        if (ach.coinReward) rewardText += `| +${ach.coinReward} 🪙`;

                        showToast(ach.name, "Misión Completada", ach.icon);
                        if (rewardText !== "") {
                            setTimeout(() => {
                                showToast(rewardText, "Recompensas", "🎁");
                            }, 3500);
                        }
                        spawnConfetti();
                    }, 500);
                }
                newlyUnlocked = true;
            }
        };

        if (user.totalWorkouts >= 1) unlock('first_workout');
        if (user.totalWorkouts >= 10) unlock('workouts_10');
        if (user.totalWorkouts >= 30) unlock('workouts_30');
        if (user.streak >= 3) unlock('streak_3');
        if (user.streak >= 7) unlock('streak_7');
        if (user.streak >= 14) unlock('streak_14');
        if (user.maxHoldTime >= 10) unlock('hold_10');
        if (user.currentLevelIndex >= 2) unlock('level_3');
        if (user.currentLevelIndex >= 4) unlock('level_5');
        
        let hasPlant = user.garden && user.garden.some(s => s && s.plant);
        if (hasPlant) unlock('first_plant');
        
        if (newlyUnlocked) {
            saveProgress();
            renderAchievements();
        }
    }

    function showToast(name, title = "Logro Desbloqueado", icon = "🏆") {
        let toast = document.getElementById('toastNotification');
        document.getElementById('toastDesc').innerText = name;
        if(document.getElementById('toastTitle')) document.getElementById('toastTitle').innerText = title;
        if(document.getElementById('toastIcon')) document.getElementById('toastIcon').innerText = icon;
        toast.style.bottom = 'calc(20px + env(safe-area-inset-bottom))';
        setTimeout(() => toast.style.bottom = '-250px', 5000);
        emitVibration('success');
    }

    function openAchievementsModal() {
        renderAchievements();
        openModal('achievementsModal', 'achievementsModalContent');
    }

    function closeAchievementsModal() {
        closeModal('achievementsModal', 'achievementsModalContent');
    }

    function renderAchievements() {
        const list = document.getElementById('achievementsList');
        list.innerHTML = '';
        if (!user.achievements) user.achievements = [];
        
        allAchievements.forEach(ach => {
            let isUnlocked = user.achievements.includes(ach.id);
            let bg = isUnlocked ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.02)';
            let border = isUnlocked ? 'var(--primary)' : '#334155';
            let opacity = isUnlocked ? '1' : '0.4';
            
            let rewardsHtml = '';
            if (ach.xpReward || ach.coinReward) {
                rewardsHtml = `<div style="font-size: 0.75rem; font-weight: bold; margin-top: 6px; color: ${isUnlocked ? 'var(--primary)' : 'var(--warning)'}; display: flex; gap: 10px;">`;
                if (ach.xpReward) rewardsHtml += `<span>✨ ${ach.xpReward} XP</span>`;
                if (ach.coinReward) rewardsHtml += `<span>🪙 ${ach.coinReward}</span>`;
                rewardsHtml += `</div>`;
            }

            list.innerHTML += `
                <div style="display: flex; align-items: center; gap: 15px; padding: 12px; background: ${bg}; border: 1px solid ${border}; border-radius: 12px; opacity: ${opacity}; transition: transform 0.2s;">
                    <div style="font-size: 2rem; width: 40px; text-align: center;">${isUnlocked ? ach.icon : '🔒'}</div>
                    <div style="text-align: left; flex: 1;">
                        <div style="font-weight: bold; color: ${isUnlocked ? 'var(--text-main)' : 'var(--text-muted)'}">${ach.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">${ach.desc}</div>
                        ${rewardsHtml}
                    </div>
                </div>
            `;
        });
    }

    // --- Lógica del Heatmap y Chart.js (Estadísticas) ---
    let progressChartInstance = null;

    function renderChart() {
        const ctx = document.getElementById('progressChart');
        if (!ctx) return;
        if (!user.historyData) user.historyData = [];
        
        let chartData = [...user.historyData].slice(-7);
        if (chartData.length === 0) {
            chartData = [{date: getLocalDateString(), xp: 0}]; // Dummy for empty
        }

        let labels = chartData.map(d => d.date.substring(5)); // MM-DD
        let dataXP = chartData.map(d => d.xp);

        if (progressChartInstance) progressChartInstance.destroy();
        
        progressChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'XP Ganado',
                    data: dataXP,
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.2)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#0f172a',
                    pointBorderColor: '#38bdf8',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, border: { dash: [5, 5] }, ticks: { color: '#94a3b8' } },
                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                }
            }
        });
    }

    function openStatsModal() {
        renderHeatmap();
        openModal('statsModal', 'statsModalContent', renderChart);
    }
    
    function closeStatsModal() {
        closeModal('statsModal', 'statsModalContent');
    }



    // --- Lógica de Recordatorios ---
    function openRemindersModal() {
        if (user.reminderTime) document.getElementById('reminderTimeInput').value = user.reminderTime;
        document.getElementById('reminderStatus').innerText = user.reminderTime ? `Activo: ${user.reminderTime}` : 'Sin recordatorio';
        openModal('remindersModal', 'remindersModalContent');
    }

    function closeRemindersModal() {
        closeModal('remindersModal', 'remindersModalContent');
    }

    function saveReminder() {
        if ("Notification" in window) {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    let timeVal = document.getElementById('reminderTimeInput').value;
                    user.reminderTime = timeVal;
                    user.reminderSentToday = null;
                    document.getElementById('reminderStatus').innerText = `Guardado: te avisaremos a las ${timeVal}`;
                    saveProgress();
                    setTimeout(closeRemindersModal, 1500);
                } else {
                    alert("Necesitamos permisos de notificaciones para avisarte.");
                }
            });
        } else {
            alert("Tu navegador no soporta Notificaciones Web.");
        }
    }

    function clearReminder() {
        user.reminderTime = null;
        document.getElementById('reminderStatus').innerText = 'Recordatorio desactivado';
        saveProgress();
    }

    // Intervalo de evaluación de recordatorios en vivo
    setInterval(() => {
        if (!user.reminderTime) return;
        if (Notification.permission !== "granted") return;
        
        let now = new Date();
        let currentStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
        let localDateStr = getLocalDateString();
        
        if (currentStr === user.reminderTime && user.reminderSentToday !== localDateStr) {
            user.reminderSentToday = localDateStr;
            saveProgress();
            new Notification("Kegel Flow", {
                body: "¡Es tu momento zen! Toca aquí para iniciar tus ejercicios pélvicos.",
                icon: "icon.svg"
            });
        }
    }, 60000); // Evalúa cada minuto

    // --- Lógica Tema Claro/Oscuro/Colores ---
    const themes = ['dark', 'light', 'pink', 'pinkdark', 'green'];
    let currentThemeIndex = parseInt(localStorage.getItem('kegelThemeIndex')) || 0;
    const themeBtn = document.getElementById('themeBtn');
    
    function initTheme() {
        let activeTheme = themes[currentThemeIndex];
        if (activeTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            if(themeBtn) themeBtn.innerText = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', activeTheme);
            if(themeBtn) {
                if(activeTheme === 'light') themeBtn.innerText = '☀️';
                if(activeTheme === 'pink') themeBtn.innerText = '🌸';
                if(activeTheme === 'pinkdark') themeBtn.innerText = '🌺';
                if(activeTheme === 'green') themeBtn.innerText = '🌿';
            }
        }
        // Actualizar colores de partículas al cambiar tema
        updateParticleColors();
    }
    
    function toggleTheme() {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        localStorage.setItem('kegelThemeIndex', currentThemeIndex);
        initTheme();
    }
    initTheme();

    // --- Guardado y Logs (Archivos) ---
    function openSettingsModal() {
        // Sincronizar slider con volumen guardado
        let slider = document.getElementById('volumeSlider');
        let label = document.getElementById('volumeLabel');
        let savedVol = localStorage.getItem('kegelMasterVolume') || '80';
        if (slider) slider.value = savedVol;
        if (label) label.innerText = savedVol + '%';
        openModal('settingsModal', 'settingsModalContent');
    }
    function closeSettingsModal() {
        closeModal('settingsModal', 'settingsModalContent');
    }
    function downloadBackup() {
        let str = JSON.stringify(user);
        let blob = new Blob([str], {type: "application/json"});
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = `KegelFlow_Backup_${getLocalDateString()}.json`;
        a.click();
    }
    function importBackup(event) {
        let file = event.target.files[0];
        if (!file) return;
        let reader = new FileReader();
        reader.onload = function(e) {
            try {
                let importedFile = JSON.parse(e.target.result);
                if (importedFile.xp !== undefined) {
                    user = { ...user, ...importedFile };
                    saveProgress();
                    updateUI();
                    alert("¡Progreso restaurado con éxito!");
                    closeSettingsModal();
                } else throw new Error();
            } catch(err) { alert("El archivo no es válido."); }
        };
        reader.readAsText(file);
    }



    // --- Sistema Zen Garden y Tienda ---
    const shopItems = {
        pots: [
            { id: 'pot_greda', name: 'Maceta de Greda', emoji: '🟫', price: 50 },
            { id: 'pot_wood', name: 'Tronco Hueco', emoji: '🪵', price: 150 },
            { id: 'pot_vasija', name: 'Vasija Antigua', emoji: '🏺', price: 300 },
            { id: 'pot_cosmic', name: 'Maceta Cósmica', emoji: '🧊', price: 500 }
        ],
        plants: [
            { id: 'plant_brote', name: 'Brote de Vida', emoji: '🌱', price: 50, stages: ['🧆', '🌱', '🌿', '🌳'] },
            { id: 'plant_helecho', name: 'Helecho Calmo', emoji: '🌿', price: 150, stages: ['🧆', '🌱', '🌿', '🌿✨'] },
            { id: 'plant_cactus', name: 'Cactus Fuerte', emoji: '🌵', price: 200, stages: ['🪨', '🌱', '🌵', '🌵🌸'] },
            { id: 'plant_girasol', name: 'Girasol Energía', emoji: '🌻', price: 350, stages: ['🧆', '🌱', '🌿', '🌻'] },
            { id: 'plant_bambu', name: 'Bambú Constante', emoji: '🎋', price: 500, stages: ['🌱', '🎍', '🎋', '🎋✨'] },
            { id: 'plant_sakura', name: 'Cerezo Zen', emoji: '🌸', price: 800, stages: ['🪵', '🌱', '🌳', '🌸'] },
            { id: 'plant_bonsai', name: 'Bonsái Milenario', emoji: '🌳', price: 1500, stages: ['🧆', '🌱', '🪴', '🌲'] },
            { id: 'plant_loto', name: 'Loto Brillante', emoji: '🪷', price: 2500, stages: ['💧', '🍃', '🪷', '🪷✨'] }
        ],
        routines: [
            { id: 'rutina_inverso', name: 'Kegel Inverso (Relajación)', emoji: '🧘', price: 300 },
            { id: 'rutina_espartana', name: 'Rutina Espartana (Resistencia)', emoji: '🛡️', price: 600 }
        ]
    };

    let selectedDecoratorSlot = 0;

    function initGardenSystem() {
        if (user.coins === undefined) user.coins = 0;
        if (!user.inventory) user.inventory = [];
        if (!user.garden || user.garden.length !== 4) user.garden = [null, null, null, null];
    }

    function getPlantStageEmoji(plantItem, water = 0) {
        if (!plantItem.stages) return plantItem.emoji;
        if (water >= 7) return plantItem.stages[3];
        if (water >= 3) return plantItem.stages[2];
        if (water >= 1) return plantItem.stages[1];
        return plantItem.stages[0];
    }

    function renderGarden() {
        initGardenSystem();
        document.getElementById('topCoinsDisplay').innerText = user.coins || 0;
        const garden = document.getElementById('zenGarden');
        if(!garden) return;
        garden.innerHTML = '';
        
        let todayStr = getLocalDateString();
        
        for (let i = 0; i < 4; i++) {
            let slot = user.garden[i];
            let html = `<div class="garden-slot" onclick="openDecorateModal(${i})">`;
            
            if (slot) {
                let plantItem = shopItems.plants.find(p => p.id === slot.plant);
                let potItem = shopItems.pots.find(p => p.id === slot.pot);
                
                let needsWater = slot.plant && (slot.lastWaterDate !== todayStr);
                
                if (plantItem) {
                    let pEmoji = getPlantStageEmoji(plantItem, slot.water || 0);
                    let title = `${plantItem.name} (Crecimiento: ${slot.water||0}/7)`;
                    html += `<div class="garden-plant" title="${title}">${pEmoji}</div>`;
                    if (needsWater) {
                        html += `<div class="water-indicator" title="¡Entrena hoy para regarla!">💧</div>`;
                    }
                }
                if (potItem) html += `<div class="garden-pot">${potItem.emoji}</div>`;
                
                if (!plantItem && !potItem) html += `<div class="slot-add">+</div>`;
            } else {
                html += `<div class="slot-add">+</div>`;
            }
            html += `</div>`;
            garden.innerHTML += html;
        }
    }

    function openShopModal() {
        initGardenSystem();
        document.getElementById('shopCoinsDisplay').innerText = user.coins;
        
        const listPots = document.getElementById('shopListPots');
        const listPlants = document.getElementById('shopListPlants');
        const listRoutines = document.getElementById('shopListRoutines');
        listPots.innerHTML = '';
        listPlants.innerHTML = '';
        if(listRoutines) listRoutines.innerHTML = '';
        
        const renderItem = (item, type) => {
            let owned = type === 'routine' ? (user.unlockedRoutines || []).includes(item.id) : user.inventory.includes(item.id);
            let canAfford = user.coins >= item.price;
            let btnTxt = owned && type === 'routine' ? 'Desbloqueado' : (owned ? 'En Propiedad' : `Comprar (${item.price} 🪙)`);
            let btnHtml = owned && type === 'routine' ? `<button class="shop-btn" disabled>${btnTxt}</button>` : 
                 (owned && type !== 'routine' ? `<button class="shop-btn" disabled>${btnTxt}</button>` : 
                 `<button class="shop-btn" ${canAfford ? '' : 'disabled'} onclick="buyItem('${item.id}', ${item.price}, '${type}')">Comprar (${item.price} 🪙)</button>`);
                 
            return `
                <div class="shop-item">
                    <div style="display: flex; align-items: center;">
                        <div class="shop-item-icon">${item.emoji}</div>
                        <div class="shop-item-info">
                            <div class="shop-item-title">${item.name}</div>
                            <div class="shop-item-price">${item.price} 🪙</div>
                        </div>
                    </div>
                    ${btnHtml}
                </div>
            `;
        };
        
        shopItems.pots.forEach(item => listPots.innerHTML += renderItem(item, 'pot'));
        shopItems.plants.forEach(item => listPlants.innerHTML += renderItem(item, 'plant'));
        if(listRoutines && shopItems.routines) shopItems.routines.forEach(item => listRoutines.innerHTML += renderItem(item, 'routine'));
        
        document.getElementById('shopModal').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('shopModal').style.opacity = '1';
            document.getElementById('shopModalContent').classList.add('active');
        }, 10);
    }

    function buyItem(id, price, type) {
        if (user.coins >= price) {
            user.coins -= price;
            if (type === 'routine') {
                if(!user.unlockedRoutines) user.unlockedRoutines = [];
                user.unlockedRoutines.push(id);
            } else {
                user.inventory.push(id);
            }
            saveProgress();
            emitVibration('success');
            openShopModal(); 
            if (type !== 'routine') renderGarden(); 
        }
    }

    function closeShopModal() {
        document.getElementById('shopModal').style.opacity = '0';
        document.getElementById('shopModalContent').classList.remove('active');
        setTimeout(() => document.getElementById('shopModal').style.display = 'none', 300);
    }

    function openDecorateModal(slotIndex) {
        selectedDecoratorSlot = slotIndex;
        const listPots = document.getElementById('decoratePotsList');
        const listPlants = document.getElementById('decoratePlantsList');
        
        let currentSlot = user.garden[slotIndex] || { pot: null, plant: null };
        let uniqueInv = [...new Set(user.inventory)];
        
        let ownedPots = [];
        let ownedPlants = [];
        
        uniqueInv.forEach(id => {
            let available = user.inventory.filter(i => i === id).length;
            let pItem = shopItems.pots.find(p => p.id === id);
            if (pItem) ownedPots.push({ ...pItem, available });
            let plItem = shopItems.plants.find(p => p.id === id);
            if (plItem) ownedPlants.push({ ...plItem, available });
        });
        
        if (currentSlot.pot && !ownedPots.find(p => p.id === currentSlot.pot)) {
            let pItem = shopItems.pots.find(p => p.id === currentSlot.pot);
            if (pItem) ownedPots.push({ ...pItem, available: 0 });
        }
        if (currentSlot.plant && !ownedPlants.find(p => p.id === currentSlot.plant)) {
            let plItem = shopItems.plants.find(p => p.id === currentSlot.plant);
            if (plItem) ownedPlants.push({ ...plItem, available: 0 });
        }
        
        listPots.innerHTML = ownedPots.length ? '' : '<span style="color: var(--text-muted); font-size: 0.8rem; margin: auto;">No tienes macetas aún. ¡Visita la Tienda!</span>';
        listPlants.innerHTML = ownedPlants.length ? '' : '<span style="color: var(--text-muted); font-size: 0.8rem; margin: auto;">No tienes plantas aún. ¡Visita la Tienda!</span>';
        
        ownedPots.forEach(item => {
            let isSelected = currentSlot.pot === item.id;
            let disabled = !isSelected && item.available <= 0;
            listPots.innerHTML += `
                <div class="inv-item ${isSelected ? 'selected' : ''}" style="${disabled ? 'opacity: 0.4; cursor: not-allowed; filter: grayscale(1);' : ''}" ${!disabled ? `onclick="applyDecoration('pot', '${item.id}')"` : ''}>
                    <div class="inv-item-icon">${item.emoji}</div>
                    <div class="inv-item-name">${item.name}</div>
                    <div style="font-size: 0.65rem; color: var(--warning); margin-top: 4px; font-weight: bold;">Disp: ${isSelected ? item.available + 1 : item.available}</div>
                </div>
            `;
        });
        
        ownedPlants.forEach(item => {
            let isSelected = currentSlot.plant === item.id;
            let disabled = !isSelected && item.available <= 0;
            listPlants.innerHTML += `
                <div class="inv-item ${isSelected ? 'selected' : ''}" style="${disabled ? 'opacity: 0.4; cursor: not-allowed; filter: grayscale(1);' : ''}" ${!disabled ? `onclick="applyDecoration('plant', '${item.id}')"` : ''}>
                    <div class="inv-item-icon">${item.emoji}</div>
                    <div class="inv-item-name">${item.name}</div>
                    <div style="font-size: 0.65rem; color: var(--warning); margin-top: 4px; font-weight: bold;">Disp: ${isSelected ? item.available + 1 : item.available}</div>
                </div>
            `;
        });
        
        document.getElementById('decorateModal').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('decorateModal').style.opacity = '1';
            document.getElementById('decorateModalContent').classList.add('active');
        }, 10);
    }

    function closeDecorateModal() {
        document.getElementById('decorateModal').style.opacity = '0';
        document.getElementById('decorateModalContent').classList.remove('active');
        setTimeout(() => document.getElementById('decorateModal').style.display = 'none', 300);
    }

    function applyDecoration(type, itemId) {
        let slot = user.garden[selectedDecoratorSlot];
        if (!slot) slot = { pot: null, plant: null };
        
        if (type === 'pot' && slot.pot) user.inventory.push(slot.pot);
        if (type === 'plant' && slot.plant) user.inventory.push(slot.plant);
        
        let invIdx = user.inventory.indexOf(itemId);
        if (invIdx > -1) user.inventory.splice(invIdx, 1);
        
        if (type === 'pot') slot.pot = itemId;
        else if (type === 'plant') {
            slot.plant = itemId;
            slot.water = 0; // Semilla recién plantada
            slot.lastWaterDate = null;
        }
        
        user.garden[selectedDecoratorSlot] = slot;
        saveProgress();
        checkAchievements();
        renderGarden();
        openDecorateModal(selectedDecoratorSlot);
        emitVibration('success');
    }

    function removeDecoration() {
        let slot = user.garden[selectedDecoratorSlot];
        if (slot) {
            if (slot.pot) user.inventory.push(slot.pot);
            if (slot.plant) user.inventory.push(slot.plant);
        }
        user.garden[selectedDecoratorSlot] = null;
        saveProgress();
        renderGarden();
        closeDecorateModal();
        emitVibration('success');
    }

    // --- Premium UI Animations (Particles & Counters) ---
    function animateValue(elementId, start, end, duration) {
        let el = document.getElementById(elementId);
        if (!el) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * (end - start) + start);
            el.innerText = current;
            if (progress < 1) window.requestAnimationFrame(step);
            else el.innerText = end;
        };
        window.requestAnimationFrame(step);
    }

    class ParticleSystem {
        constructor() {
            this.canvas = document.getElementById('particlesCanvas');
            if(!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.state = 'idle'; // idle, contracting, relaxing, finish
            this.resize();
            window.addEventListener('resize', () => this.resize());
            for(let i=0; i<150; i++) this.addParticle();
            this.loop();
        }
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        addParticle(x, y, isBurst = false) {
            // Leer colores del tema activo
            let style = getComputedStyle(document.documentElement);
            let primary = style.getPropertyValue('--primary').trim() || '#818cf8';
            let relax = style.getPropertyValue('--relax').trim() || '#34d399';
            let isPrimary = Math.random() > 0.5;
            let themeColor = isPrimary ? primary : relax;
            
            this.particles.push({
                x: x || Math.random() * this.canvas.width,
                y: y || Math.random() * this.canvas.height + (isBurst?0:this.canvas.height),
                vx: isBurst ? (Math.random()-0.5)*15 : (Math.random()-0.5)*1.2,
                vy: isBurst ? (Math.random()-0.5)*15 : (Math.random()*-1.5 - 0.5),
                size: isBurst ? Math.random() * 5 + 2 : Math.random() * 4.5 + 2,
                color: isBurst ? `hsl(${Math.random()*360}, 100%, 70%)` : themeColor,
                alpha: isBurst ? 1 : (Math.random()*0.3+0.2),
                life: isBurst ? 1.0 : Infinity
            });
        }
        burst() {
            this.state = 'finish';
            for(let i=0; i<120; i++) this.addParticle(this.canvas.width/2, this.canvas.height/2 - 100, true);
        }
        loop(timestamp = 0) {
            let isHidden = document.hidden;
            let timeSinceAction = performance.now() - lastInteractionTime;
            
            // Limitar a 20 FPS (50ms) si la app no está visible o el usuario lleva 30s sin interactuar (y no está en modo entrenamiento)
            if (isHidden || (timeSinceAction > 30000 && !isWorkingOut)) {
                if (timestamp - (this.lastFrameTime || 0) < 50) { 
                    requestAnimationFrame((t) => this.loop(t));
                    return;
                }
            } else if (this.state === 'idle') {
                // Si la app está idle pero el usuario SÍ interactuó hace poco, lo configuraremos a 60 FPS para cumplir el requerimiento de primer plano activo, o podemos dejarlo sin límite.
                // El requerimiento decía "si el usuario tiene la aplicacion en primer plano se renderice a 60fps... y no, baje a 20."
                // Por ende, si no entra en la condición anterior, es 60 FPS libres. Lo sacamos del throttle de fallbacks previos.
            }
            
            this.lastFrameTime = timestamp;

            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            let speedMult = this.state === 'contracting' ? 4 : (this.state === 'relaxing' ? 0.3 : 1);
            
            for (let i = this.particles.length - 1; i >= 0; i--) {
                let p = this.particles[i];
                p.x += p.vx * speedMult;
                p.y += p.vy * speedMult;
                
                if (p.life !== Infinity) {
                    p.life -= 0.01;
                    p.vy += 0.2; 
                    if (p.life <= 0) { this.particles.splice(i, 1); continue; }
                } else {
                    if (this.state === 'contracting') {
                        p.x += (this.canvas.width/2 - p.x) * 0.02;
                    }
                    if (p.y < -10) p.y = this.canvas.height + 10;
                    if (p.x < -10) p.x = this.canvas.width + 10;
                    if (p.x > this.canvas.width + 10) p.x = -10;
                }
                
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = p.life !== Infinity ? Math.max(0, p.life) : (p.alpha || 0.3);
                this.ctx.beginPath();
                
                // Confetti son rectángulos, partículas son círculos
                if (p.isConfetti) {
                    this.ctx.save();
                    this.ctx.translate(p.x, p.y);
                    this.ctx.rotate(p.rotation || 0);
                    this.ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.6);
                    this.ctx.restore();
                    p.rotation = (p.rotation || 0) + 0.1;
                } else {
                    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
                    this.ctx.fill();
                }
            }
            requestAnimationFrame((t) => this.loop(t));
        }
    }
    pSys = new ParticleSystem();

    // --- Onboarding & Academy ---
    function checkOnboarding() {
        if (!user.goal) {
            document.getElementById('onboardingModal').style.display = 'flex';
            document.getElementById('onboardingModal').style.opacity = '1';
        }
    }
    
    function selectGoal(goalId, goalName) {
        user.goal = goalId;
        saveProgress();
        document.getElementById('onboardingModal').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('onboardingModal').style.display = 'none';
            showToast("Objetivo guardado");
            rotateTip();
        }, 300);
    }

    function openAcademyModal() {
        openModal('academyModal', 'academyModalContent');
    }
    
    function closeAcademyModal() {
        closeModal('academyModal', 'academyModalContent', () => {
            document.querySelectorAll('details').forEach(d => d.removeAttribute('open'));
        });
    }

    // --- Partículas Temáticas ---
    function updateParticleColors() {
        if (!pSys || !pSys.particles) return;
        let style = getComputedStyle(document.documentElement);
        let primary = style.getPropertyValue('--primary').trim() || '#818cf8';
        let relax = style.getPropertyValue('--relax').trim() || '#34d399';
        
        pSys.particles.forEach(p => {
            if (p.life === Infinity) {
                p.color = Math.random() > 0.5 ? primary : relax;
            }
        });
    }

    // --- Confetti de Logros ---
    function spawnConfetti() {
        if (!pSys) return;
        const colors = ['#fb7185','#818cf8','#34d399','#fbbf24','#f472b6','#a78bfa','#22d3ee','#f97316'];
        for (let i = 0; i < 80; i++) {
            let color = colors[Math.floor(Math.random() * colors.length)];
            pSys.particles.push({
                x: pSys.canvas.width / 2 + (Math.random()-0.5) * 200,
                y: pSys.canvas.height * 0.6,
                vx: (Math.random()-0.5) * 20,
                vy: (Math.random()-1) * 15 - 5,
                size: Math.random() * 8 + 4,
                color: color,
                alpha: 1,
                life: 1.5 + Math.random(),
                isConfetti: true,
                rotation: Math.random() * Math.PI * 2
            });
        }
    }

    // --- Perfil de Usuario ---
    const avatarOptions = ['😊','💪','🧘','🦋','🌸','🔥','⭐','💎','🦅','🌟','🚀','🌿'];
    
    function openProfileModal() {
        renderProfileStats();
        openModal('profileModal', 'profileModalContent');
    }
    function closeProfileModal() {
        closeModal('profileModal', 'profileModalContent');
    }
    function toggleAvatarPicker() {
        let container = document.getElementById('avatarPickerContainer');
        let picker = document.getElementById('avatarPicker');
        if (container.style.display === 'none') {
            container.style.display = 'block';
            picker.innerHTML = '';
            avatarOptions.forEach(av => {
                let sel = av === (user.avatar || '😊') ? 'selected' : '';
                picker.innerHTML += `<div class="avatar-option ${sel}" onclick="selectAvatar('${av}')">${av}</div>`;
            });
        } else {
            container.style.display = 'none';
        }
    }
    function selectAvatar(av) {
        user.avatar = av;
        if (!user.photoUrl) {
            document.getElementById('profileAvatar').innerText = av;
            let topAv = document.getElementById('topAvatar');
            if (topAv) topAv.innerText = av;
        }
        saveProgress();
        document.getElementById('avatarPickerContainer').style.display = 'none';
        renderProfileStats();
    }
    
    // --- Lógica del Nuevo Modal de Editar Perfil ---
    let pendingPhotoData = null;

    function openEditProfileModal() {
        pendingPhotoData = user.photoUrl || null;
        document.getElementById('inpProfileName').value = user.username || "";
        document.getElementById('inpProfileGender').value = user.gender || "";
        
        updatePreviewEditAvatar();
        openModal('editProfileModal', 'editProfileModalContent');
    }

    function closeEditProfileModal() {
        closeModal('editProfileModal', 'editProfileModalContent');
    }

    function updatePreviewEditAvatar() {
        let preview = document.getElementById('previewEditAvatar');
        if (pendingPhotoData) {
            preview.style.backgroundImage = `url(${pendingPhotoData})`;
            preview.innerText = "";
        } else {
            preview.style.backgroundImage = "none";
            preview.innerText = user.avatar || "😊";
        }
    }

    function handlePhotoUpload(event) {
        let file = event.target.files[0];
        if (!file) return;
        if (!file.type.match('image.*')) {
            alert("Solo se permiten imágenes.");
            return;
        }
        
        let reader = new FileReader();
        reader.onload = function(readerEvent) {
            let img = new Image();
            img.onload = function() {
                // Resize logic to avoid LocalStorage quota issues
                let canvas = document.createElement('canvas');
                let max_size = 300;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                
                // Compress to WebP or JPEG
                pendingPhotoData = canvas.toDataURL('image/jpeg', 0.8);
                updatePreviewEditAvatar();
            };
            img.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    }

    function clearProfilePhoto() {
        pendingPhotoData = null;
        document.getElementById('inpProfilePhoto').value = "";
        updatePreviewEditAvatar();
    }

    function saveProfileData() {
        let newName = document.getElementById('inpProfileName').value.trim();
        let newGender = document.getElementById('inpProfileGender').value;
        
        user.username = newName || null;
        user.gender = newGender || null;
        user.photoUrl = pendingPhotoData;
        
        saveProgress();
        renderProfileStats();
        closeEditProfileModal();
        showToast("Perfil actualizado", "Éxito", "✅");
    }

    function applyAvatarToElement(elementId) {
        let el = document.getElementById(elementId);
        if (!el) return;
        if (user.photoUrl) {
            el.style.backgroundImage = `url(${user.photoUrl})`;
            el.innerText = "";
        } else {
            el.style.backgroundImage = "none";
            el.innerText = user.avatar || '😊';
        }
    }

    function renderProfileStats() {
        let lvl = levels[user.currentLevelIndex];
        
        applyAvatarToElement('profileAvatar');
        applyAvatarToElement('topAvatar');
        
        let nameEl = document.getElementById('profileName');
        if (nameEl) nameEl.innerText = user.username ? user.username : 'Guerrero Kegel';
        
        let genderEl = document.getElementById('profileGender');
        if (genderEl) genderEl.innerText = user.gender ? user.gender : '';

        let levelEl = document.getElementById('profileLevel');
        if (levelEl) levelEl.innerText = `Nivel ${lvl.id}: ${lvl.name}`;
        
        let stats = document.getElementById('profileStats');
        let totalDays = Object.keys(user.workoutDates || {}).filter(k => user.workoutDates[k] > 0).length;
        if (stats) {
            stats.innerHTML = `
                <div class="profile-stat"><div class="profile-stat-value">${user.totalWorkouts || 0}</div><div class="profile-stat-label">Sesiones</div></div>
                <div class="profile-stat"><div class="profile-stat-value">🔥 ${user.streak || 0}</div><div class="profile-stat-label">Racha</div></div>
                <div class="profile-stat"><div class="profile-stat-value">${user.xp || 0}</div><div class="profile-stat-label">XP Total</div></div>
                <div class="profile-stat"><div class="profile-stat-value">${totalDays}</div><div class="profile-stat-label">Días Activos</div></div>
                <div class="profile-stat"><div class="profile-stat-value">${user.maxHoldTime || 0}s</div><div class="profile-stat-label">Rto. Máx</div></div>
                <div class="profile-stat"><div class="profile-stat-value">🪙 ${user.coins || 0}</div><div class="profile-stat-label">Monedas</div></div>
            `;
        }
        
        // Logros
        let achContainer = document.getElementById('profileAchievements');
        if (achContainer) {
            if (!user.achievements || user.achievements.length === 0) {
                achContainer.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-muted);">Aún no tienes logros. ¡Empieza a entrenar!</span>';
            } else {
                achContainer.innerHTML = '';
                user.achievements.forEach(id => {
                    let ach = allAchievements.find(a => a.id === id);
                    if (ach) achContainer.innerHTML += `<div style="font-size: 2rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));" title="${ach.name}">${ach.icon}</div>`;
                });
            }
        }
    }

    // Init
    loadProgress();
    if (!user.achievements) user.achievements = [];
    if (!user.workoutDates) user.workoutDates = {};
    if (!user.avatar) user.avatar = '😊';
    updateUI();
    checkOnboarding();