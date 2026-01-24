Master Prompt: The "Artiste Finance & Legal Guard" App

Role: Expert Senior Frontend Engineer (React/Tailwind) & Music Business Consultant.

Project Objective:
Build a single-file, interactive React application acting as a "CFO & Legal Advisor" for Nigerian/Afrobeats artists. The goal is to protect artists from predatory record deals by visualizing financial data and demystifying legal jargon.

Target Audience: Upcoming and Mid-level Artists in Nigeria (Afrobeats, Alte, Hip-Hop).

1. Core Features & Logic

A. The Deal Simulator (The "Shark Detector")

Create a financial calculator that reveals the reality of a Record Deal.

Inputs:

Advance Amount (₦ - Naira).

Marketing Budget (₦).

Artist Royalty Split (Slider 0-100%).

Estimated Monthly Streams (Slider).

Toggle: "Is Marketing Recoupable?" (Boolean).

Logic (The "Trap" Formula):

Calculate Total Debt = Advance + (Marketing if Recoupable).

Calculate Gross Revenue Needed = Total Debt / (Artist Split %). Crucial: This shows the artist that if they have a 20% split, the song must earn 5x the debt to break even.

Calculate Streams Needed based on an average rate of ₦4.5 per stream.

Calculate Time to Recoup based on monthly streams.

Visual Output:

"Streams to Freedom" Bar: A progress bar showing 0% to 100% recoupment.

"The Verdict": Dynamic text output based on the deal quality (e.g., "Predatory", "Standard", "Good").

B. The "Legal Copilot" (AI Chat Widget)

Integrate a floating chat widget simulating an AI Legal Assistant.

Behavior: Rule-based chatbot (simulated AI) that detects keywords in user questions.

Keywords to Handle: "Perpetuity", "360 Deal", "Advance", "Masters", "Recoupable", "Lawyer".

Dual-Language Support: The bot must be able to answer in Standard English OR Nigerian Pidgin depending on the app's global state.

Example (Pidgin): "Perpetuity mean say dem own your song forever. No gree o!"

C. Localization (The "Nigerian Context")

Currency: All monetary values must be in Naira (₦).

Pidgin Toggle: A global switch in the navbar to toggle the entire UI text between English and Nigerian Pidgin.

English: "Time to Freedom"

Pidgin: "How Long E Go Take?"

2. UI/UX Design Requirements

Aesthetic: Modern "Fintech" style. Clean, trustworthy, professional.

Theme: Light Mode (Slate/White background, Indigo/Blue primary colors).

Typography: Use the Geist Sans font family (injected via style tag).

Components:

Use lucide-react for icons (Music, Calculator, AlertTriangle, Bot).

Glassmorphism effects for cards.

Smooth transitions for hover states and toggles.

Neat Data Viz: Stacked bar charts to visualize the "Label Share" vs "Artist Share" vs "Debt".

3. Technical Constraints

Framework: React (Functional Components, Hooks).

Styling: Tailwind CSS (utility classes).

File Structure: Single-file DealSimulator.jsx.

Responsiveness: Mobile-first design (must look perfect on a phone screen).

No External APIs: All logic (including the "AI" responses) must be self-contained within the code for the prototype.

4. Tone of Voice

Empowering but Realistic: Do not sugarcoat the data. Use colors like Red/Orange for bad deals and Green for good ones.

Culturally Relevant: Use terms that resonate with the Nigerian music scene (e.g., "Wahala", "Setup", "Hammer").

Output:
Generate the complete, runnable React code for this application..