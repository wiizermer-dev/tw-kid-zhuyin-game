// 音效管理系統 - 使用 Web Audio API 生成音效

class AudioManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.5;
    
    // 從 localStorage 載入設定
    const savedEnabled = localStorage.getItem('zhuyin_audio_enabled');
    const savedVolume = localStorage.getItem('zhuyin_audio_volume');
    
    if (savedEnabled !== null) {
      this.enabled = savedEnabled === 'true';
    }
    if (savedVolume !== null) {
      this.volume = parseFloat(savedVolume);
    }
  }
  
  // 播放音效（使用 Web Audio API 生成簡單音效）
  playSound(type) {
    if (!this.enabled) return;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // 根據類型設置不同的音效
      switch (type) {
        case 'correct':
          // 上升音階 - 愉快的音效
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
          oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
          oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
          gainNode.gain.setValueAtTime(this.volume * 0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          break;
          
        case 'wrong':
          // 下降音階 - 錯誤音效
          oscillator.frequency.setValueAtTime(392.00, audioContext.currentTime); // G4
          oscillator.frequency.setValueAtTime(329.63, audioContext.currentTime + 0.1); // E4
          gainNode.gain.setValueAtTime(this.volume * 0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          break;
          
        case 'click':
          // 短促點擊音
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(this.volume * 0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          break;
          
        case 'combo':
          // 連擊音效 - 更高頻率
          oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime); // C6
          gainNode.gain.setValueAtTime(this.volume * 0.4, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          break;
          
        case 'levelup':
          // 升級音效 - 快速上升
          oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime); // C4
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime + 0.05); // C5
          oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime + 0.1); // C6
          gainNode.gain.setValueAtTime(this.volume * 0.5, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          break;
          
        case 'unlock':
          // 解鎖音效 - 魔法般的音效
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(1760, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(this.volume * 0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
          break;
          
        default:
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
          gainNode.gain.setValueAtTime(this.volume * 0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      }
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }
  
  // 切換音效開關
  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('zhuyin_audio_enabled', this.enabled.toString());
    return this.enabled;
  }
  
  // 設置音量
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    localStorage.setItem('zhuyin_audio_volume', this.volume.toString());
  }
  
  // 播放注音發音（使用 Speech Synthesis API）
  speak(text, lang = 'zh-TW') {
    if (!this.enabled) return;
    
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8; // 稍微慢一點方便學習
      utterance.volume = this.volume;
      
      window.speechSynthesis.cancel(); // 取消之前的語音
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn('Speech synthesis failed:', error);
    }
  }
}

// 創建全域實例
export const audioManager = new AudioManager();

// 便捷函式
export function playCorrectSound() {
  audioManager.playSound('correct');
}

export function playWrongSound() {
  audioManager.playSound('wrong');
}

export function playClickSound() {
  audioManager.playSound('click');
}

export function playComboSound() {
  audioManager.playSound('combo');
}

export function playLevelUpSound() {
  audioManager.playSound('levelup');
}

export function playUnlockSound() {
  audioManager.playSound('unlock');
}

export function speakWord(word) {
  audioManager.speak(word);
}

export function toggleAudio() {
  return audioManager.toggle();
}

export function setAudioVolume(volume) {
  audioManager.setVolume(volume);
}

// 播放音效的通用函式（相容原有的 API）
export function playSound(soundName) {
  audioManager.playSound(soundName);
}
