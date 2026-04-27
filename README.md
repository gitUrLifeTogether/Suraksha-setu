<div align="center">
  <img src="https://img.shields.io/badge/Google_Solution_Challenger-2026-4285F4" alt="Google Solution Challenge 2026">
  <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Firebase-039BE5?logo=firebase&logoColor=white" alt="Firebase">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <br/>
  <img src="https://img.shields.io/badge/Status-Active-brightgreen" alt="Active">
</div>

<br/>

# 🛡️ SurakshaSetu – The Multilingual Hotel Crisis Bridge

**Bridging distressed guests, hotel staff, and emergency services – offline-ready, fairness-aware, and available in 4 languages.**

## Live Demo
[https://crisis-suraksha-setu.netlify.app/](https://crisis-suraksha-setu.netlify.app/)

## Demo Video
[🎥 Watch the 2 min demo →](#)
<!-- Replace # with your YouTube unlisted link once your video is ready. -->

## The Problem

A hotel guest has a medical emergency. They don’t speak English. The hotel Wi‑Fi is down. Hotel staff find out 10 minutes later. 112 arrives with no information.

In hospitality emergencies, communication is fractured. Guests don’t know who to call. Staff lack real-time situation data. Emergency services arrive blind. **The result:** delayed response, forgotten vulnerable guests, wasted resources.

## The Solution – SurakshaSetu

SurakshaSetu is a real‑time crisis coordination system built specifically for hotels, resorts, and large hospitality venues.

### 👥 Three Roles, One Seamless Bridge

| Role | What they do | Why it matters |
|------|--------------|----------------|
| **Guest** | One‑tap emergency button, select room & language | In a panic, there’s no time for forms. Just hit red. |
| **Hotel Staff** | Receive instant alert, assess situation (victims, demographics, medical risks, mobility/language notes) | Staff on‑scene provide structured data – not guesswork. |
| **112 Dispatch** | Auto‑call simulation, receive full situation report, see resource recommendations | First responders arrive with actionable intelligence. |

## Features

- **Multilingual Guest Experience** – English, हिंदी, मराठी, தமிழ்
- **Bias‑Aware Priority Calculator** – Elevates priority for elderly, children, medical risks, mobility issues, language barriers
- **Offline‑First Mesh Network Simulation** – No single point of failure; messages relay even without internet
- **Auto‑112 Call Simulation** – Demonstrates the complete bridge from guest to emergency services
- **Resource Estimator** – Recommends ambulances, fire trucks, and police units based on victim data
- **Live Digital Twin Map** – Shows guest location with optional floor‑plan overlay
- **Real‑Time Cloud Sync** – Built with Firebase Firestore

## Tech Stack

| Area | Technology |
|------|------------|
| Frontend | React 18 + Vite |
| Styling | TailwindCSS |
| Real‑time DB | Firebase Firestore |
| Maps | Leaflet + OpenStreetMap |
| Icons | Lucide React |
| Hosting | Netlify |

## Quick Start (Run Locally)

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/surakshasetu.git
cd surakshasetu
npm install
npm run dev
```

Then open `http://localhost:5173`.

(You’ll need a Firebase project with Firestore in test mode – or the app falls back to localStorage.)

## Project Structure

```
src/
├── components/
│   ├── GuestView.jsx          # Check-in + emergency buttons + language selector
│   ├── StaffView.jsx          # Dashboard for hotel personnel
│   ├── EmergencyView.jsx      # 112 dispatch console with call simulation
│   ├── StaffAssessment.jsx    # Situation report form (victims, notes, etc.)
│   ├── BiasAwareDispatcher.jsx# Priority calculator (rule‑based, transparent)
│   ├── ResourceEstimator.jsx  # Ambulance/fire/police recommendations
│   ├── DigitalTwinMap.jsx     # Live map + floor plan overlay
│   └── ...                    # Mesh simulator, crisis log, toast, etc.
├── firebase.js                # Firebase config (replace with your own)
├── App.jsx                    # Role‑based router + Firestore listeners
└── index.css                  # Tailwind + custom animations
```

## Why This Wins (Judging Alignment)

| Judging Criterion | How SurakshaSetu Delivers |
|-------------------|----------------------------|
| **Real‑world problem** | Fragmented hotel emergency communication is a documented, deadly issue. |
| **Innovation** | Multilingual + bias‑aware priority + offline mesh simulation – rarely combined. |
| **Technical implementation** | Full‑stack (React + Firebase), real‑time sync, mobile responsive, working prototype. |
| **Impact** | Directly improves response time, protects vulnerable guests, and works without internet. |
| **Scalability** | Can be extended to stadiums, airports, convention centres. |
| **Google tech** | Firebase Firestore + Hosting (planned). |

## Team

**Sakshi Andhale** – Built from scratch with love for Google Solution Challenge 2026.

## License

MIT – feel free to fork and improve.

---

<div align="center">
  <b>Made with ❤️ for saving lives in hospitality emergencies</b><br/>
  <sub>© 2026 SurakshaSetu</sub>
</div>