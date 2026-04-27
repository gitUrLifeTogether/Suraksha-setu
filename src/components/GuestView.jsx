import React, { useState } from 'react';
import { 
  AlertTriangle, Flame, Heart, ShieldAlert, Waves, Car, Wind, 
  Bug, CloudRain, Activity, MapPin, Globe 
} from 'lucide-react';

const emergencies = [
  { type: 'fire', icon: Flame, labelEn: '🔥 Fire', labelHi: '🔥 आग', labelMr: '🔥 आग', labelTa: '🔥 தீ' },
  { type: 'medical', icon: Heart, labelEn: '🚑 Medical', labelHi: '🚑 चिकित्सा', labelMr: '🚑 वैद्यकीय', labelTa: '🚑 மருத்துவ' },
  { type: 'violence', icon: ShieldAlert, labelEn: '⚔️ Violence', labelHi: '⚔️ हिंसा', labelMr: '⚔️ हिंसा', labelTa: '⚔️ வன்முறை' },
  { type: 'earthquake', icon: Activity, labelEn: '🌍 Earthquake', labelHi: '🌍 भूकंप', labelMr: '🌍 भूकंप', labelTa: '🌍 நிலநடுக்கம்' },
  { type: 'tsunami', icon: Waves, labelEn: '🌊 Tsunami', labelHi: '🌊 सुनामी', labelMr: '🌊 त्सुनामी', labelTa: '🌊 சுனாமி' },
  { type: 'flood', icon: CloudRain, labelEn: '💧 Flood', labelHi: '💧 बाढ़', labelMr: '💧 पूर', labelTa: '💧 வெள்ளம்' },
  { type: 'car accident', icon: Car, labelEn: '🚗 Car Accident', labelHi: '🚗 कार दुर्घटना', labelMr: '🚗 कार अपघात', labelTa: '🚗 கார் விபத்து' },
  { type: 'gunfire', icon: ShieldAlert, labelEn: '🔫 Gunfire', labelHi: '🔫 गोलीबारी', labelMr: '🔫 गोळीबार', labelTa: '🔫 துப்பாக்கிச் சூடு' },
  { type: 'snakebite', icon: Bug, labelEn: '🐍 Snake Bite', labelHi: '🐍 साँप का काटना', labelMr: '🐍 साप चावणे', labelTa: '🐍 பாம்பு கடி' },
  { type: 'hurricane', icon: Wind, labelEn: '🌀 Hurricane', labelHi: '🌀 चक्रवात', labelMr: '🌀 चक्रीवादळ', labelTa: '🌀 சூறாவளி' },
];

const translations = {
  en: {
    checkInTitle: 'Check In',
    checkInDesc: 'Select your room so we can locate you during an emergency.',
    floor: 'Floor',
    confirm: 'Confirm Location',
    emergencyTitle: 'EMERGENCY HELP',
    yourRoom: 'Your room',
    tapButton: 'Tap the big red button below. Hotel staff and 112 will be notified instantly.',
    emergencyButton: '🔴 EMERGENCY (TAP ONCE)',
    alertSent: '✓ ALERT SENT',
    optionalSpecify: '— OR SPECIFY EMERGENCY TYPE (OPTIONAL) —',
    optionalNote: '* If you specify the type, it helps staff respond faster.',
  },
  hi: {
    checkInTitle: 'चेक इन करें',
    checkInDesc: 'अपना कमरा चुनें ताकि आपातकाल में हम आपको ढूंढ सकें।',
    floor: 'मंज़िल',
    confirm: 'स्थान पुष्टि करें',
    emergencyTitle: 'आपातकालीन सहायता',
    yourRoom: 'आपका कमरा',
    tapButton: 'नीचे बड़े लाल बटन पर टैप करें। होटल स्टाफ और 112 को तुरंत सूचित कर दिया जाएगा।',
    emergencyButton: '🔴 आपातकाल (एक बार टैप करें)',
    alertSent: '✓ अलर्ट भेज दिया गया',
    optionalSpecify: '— या आपातकाल का प्रकार चुनें (वैकल्पिक) —',
    optionalNote: '* प्रकार बताने से स्टाफ तेजी से जवाब दे सकता है।',
  },
  mr: {
    checkInTitle: 'चेक इन करा',
    checkInDesc: 'तुमची खोली निवडा जेणेकरून आपत्कालीन स्थितीत आम्ही तुम्हाला शोधू शकू.',
    floor: 'मजला',
    confirm: 'स्थान निश्चित करा',
    emergencyTitle: 'आपत्कालीन मदत',
    yourRoom: 'तुमची खोली',
    tapButton: 'खालील मोठ्या लाल बटणावर टॅप करा. हॉटेल कर्मचारी आणि 112 ला त्वरित सूचित केले जाईल.',
    emergencyButton: '🔴 आपत्कालीन (एकदा टॅप करा)',
    alertSent: '✓ अलर्ट पाठविला',
    optionalSpecify: '— किंवा आपत्कालीन प्रकार निवडा (पर्यायी) —',
    optionalNote: '* प्रकार सांगितल्यास कर्मचारी जलद प्रतिसाद देऊ शकतात.',
  },
  ta: {
    checkInTitle: 'உள்நுழைக',
    checkInDesc: 'உங்கள் அறையைத் தேர்ந்தெடுக்கவும், அவசர காலத்தில் உங்களைக் கண்டறிய.',
    floor: 'தளம்',
    confirm: 'இருப்பிடத்தை உறுதிப்படுத்துக',
    emergencyTitle: 'அவசர உதவி',
    yourRoom: 'உங்கள் அறை',
    tapButton: 'கீழே உள்ள பெரிய சிவப்பு பொத்தானைத் தட்டவும். ஹோட்டல் ஊழியர்கள் மற்றும் 112 உடனடியாக அறிவிக்கப்படுவார்கள்.',
    emergencyButton: '🔴 அவசரம் (ஒருமுறை தட்டவும்)',
    alertSent: '✓ எச்சரிக்கை அனுப்பப்பட்டது',
    optionalSpecify: '— அல்லது அவசர வகையைக் குறிப்பிடவும் (விரும்பினால்) —',
    optionalNote: '* நீங்கள் வகையைக் குறிப்பிட்டால், ஊழியர்கள் விரைவாக பதிலளிக்க முடியும்.',
  },
};

export default function GuestView({ setActiveCrisis, addAlertForStaff }) {
  const [pressed, setPressed] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [floor, setFloor] = useState(3);
  const [room, setRoom] = useState(312);
  const [language, setLanguage] = useState('en');

  const getText = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const getEmergencyLabel = (emergency) => {
    if (language === 'hi') return emergency.labelHi;
    if (language === 'mr') return emergency.labelMr;
    if (language === 'ta') return emergency.labelTa;
    return emergency.labelEn;
  };

  const handleCheckIn = () => {
    if (floor && room) setIsCheckedIn(true);
  };

  const playSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.frequency.value = 880;
      gainNode.gain.value = 0.5;
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.5);
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch(e) { console.log("Audio not supported"); }
  };

  const sendEmergency = (type) => {
    setPressed(true);
    playSound();
    document.body.classList.add('flash-red');
    setTimeout(() => document.body.classList.remove('flash-red'), 500);
    
    const crisis = {
      id: Date.now(),
      type: type,
      severity: 0.9,
      timestamp: new Date().toISOString(),
      location: { floor: floor, room: room },
      affected: []
    };
    setActiveCrisis(crisis);
    addAlertForStaff(crisis);
    setTimeout(() => setPressed(false), 2000);
  };

  // Language selector component to reuse
  const LanguageSelector = () => (
    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-700 text-sm p-1 rounded">
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="mr">मराठी</option>
      <option value="ta">தமிழ்</option>
    </select>
  );

  // Check‑in screen
  if (!isCheckedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 text-center">
          <div className="flex justify-end mb-2"><LanguageSelector /></div>
          <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{getText('checkInTitle')}</h2>
          <p className="text-gray-400 mb-4">{getText('checkInDesc')}</p>
          <div className="flex gap-3 mb-4">
            <select value={floor} onChange={(e) => setFloor(parseInt(e.target.value))} className="bg-gray-700 p-2 rounded flex-1">
              {[1,2,3,4,5].map(f => <option key={f} value={f}>{getText('floor')} {f}</option>)}
            </select>
            <select value={room} onChange={(e) => setRoom(parseInt(e.target.value))} className="bg-gray-700 p-2 rounded flex-1">
              {Array.from({length: 20}, (_, i) => i+101).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <button onClick={handleCheckIn} className="bg-blue-600 w-full py-3 rounded-xl text-lg font-bold">
            {getText('confirm')}
          </button>
        </div>
      </div>
    );
  }

  // Emergency screen
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="max-w-4xl w-full bg-gray-800 rounded-2xl p-8 text-center">
        <div className="flex justify-end mb-2"><LanguageSelector /></div>
        <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-4 animate-pulse" />
        <h2 className="text-3xl font-bold mb-2">{getText('emergencyTitle')}</h2>
        <p className="text-gray-300 mb-2">{getText('yourRoom')}: Floor {floor}, #{room}</p>
        <p className="text-gray-400 mb-6">{getText('tapButton')}</p>
        
        <button
          onClick={() => sendEmergency('general')}
          className={`w-full py-6 rounded-xl font-bold text-2xl transition-all mb-8 ${pressed ? 'bg-red-700 scale-95' : 'bg-red-600 hover:bg-red-700 animate-pulse'}`}
        >
          {pressed ? getText('alertSent') : getText('emergencyButton')}
        </button>
        
        <p className="text-sm text-gray-400 mb-4">{getText('optionalSpecify')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {emergencies.map((emergency) => (
            <button 
              key={emergency.type} 
              onClick={() => sendEmergency(emergency.type)} 
              className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg flex flex-col items-center transition"
            >
              <emergency.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{getEmergencyLabel(emergency)}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-6">{getText('optionalNote')}</p>
      </div>
      <style>{`
        .flash-red { animation: flashBg 0.5s; }
        @keyframes flashBg { 0% { background-color: rgba(220,38,38,0); } 50% { background-color: rgba(220,38,38,0.6); } 100% { background-color: rgba(220,38,38,0); } }
      `}</style>
    </div>
  );
}