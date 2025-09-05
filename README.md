# The Shortcut Smileys Game

A didactic game for practicing typing special characters on the Czech QWERTZ keyboard. [Try it online](https://smilecters.pages.dev/#top) (best on Google Chrome 138.0.7204.185).

## What the Game Does

- **Sections**  
  - **Shortcuts:** a list and visualization of keyboard combinations  
  - **Game:** a playground where you type the correct characters as fast as possible  
  - **Scoreboard:** a ranking of the best results  

- **Controls**  
  - Switch between sections using keys: `s` (Shortcuts), `g` (Game), `b` (Scoreboard)  
  - Return to the main menu: `Esc` or click the cross in the top-right corner  

## Run the Game Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/username/smileys.git
   cd smileys
2. Open the file index.html in your browser. The game is fully static, no server required.

## 🛠Technologies & Architecture

### Frontend
- **HTML, CSS, JavaScript** – everything in a single `index.html`, no external libraries  
- **CSS** – Flexbox / Grid layout, CSS variables (colors, hover states)  
- **HTML** – semantic elements (`<main>`, `<section>`, `<footer>`)  
- **Navigation** – hash-based anchors (`#shortcuts`, `#game`, `#scoreboard`)  
- **JavaScript**:
  - Game logic (character prompts, scoring, DOM updates)  
  - Keyboard shortcuts (`s`, `g`, `b`, `Esc`)  
  - Dynamic content switching  

### Backend & Deployment
- **Cloudflare Workers** + **Workers KV** for storing scores  
  - `POST /save-score` – saves a player’s score  
  - `GET /get-scores` – returns results in JSON for the Scoreboard  
- **CORS** support & handling of `OPTIONS` requests for smooth communication  
- **wrangler.toml** – Worker configuration (service name, Cloudflare account, KV namespace)  
- **Cloudflare Pages** – static hosting, auto-deployment on every GitHub push  

| hrs | note
| --- | ---
| 1   |  Danielkův úvod
| 0.3 |  nastavování GitHub
| 2   |  náhodné (nekonečné) generování smajlíků a zbarvení správné odpovědi do růžova
| 2   |  stylování homepage a fontu a pozadí
| 2   |  rozdělení na smilecters.html, game.html, smilecters.css a přebarvení input dle designu
| 5   |  předelání dle designu na fakan.cz (zpět do 1 HTML dokumentu), kontrola kódu a pochopení jeho principu
| 1.5 |  křížek (close button) + vymýšlení klávesnice
| 2   |  Close Button jako speciální znak, funkčnost tlačítka esc; zákaz kopírování smajlíků, tvorba GPTs
| 2   |  tvorba klávesnice v .ai a vkládání .svg
| 2.5 |  sekce shortcuts: zmenšování klavesnice, návod na napsání znaků ?, ! a zvýraznění kláves
| 3   |  sekce shortcuts: zvětšování stránky, přidávání nových klávesnic
| 1   |  vytváření databáze smajlíků
| 1   |  Danielkovo vysvětlení jak funguje Cloudglare KV a vytvoření Cloudflare Page "smilecters"
| 2   |  odpočet času + přičítání bodů
| 1   |  zastavení odpočtu při odchodu, zadávání jména, ovládání klávesami s, g, a b
| 8   |  nastavení KV (ukládání hráčova jména a zobrazování na scoreboard)
| 1.5 |  čištění kódů a úprava komentářů

odkazy:
https://smilecters.pages.dev
https://dash.cloudflare.com/12adc4f2f6e755f1daf67b3038c3d6a5/pages/view/smilecters
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fencedframe
https://specificity.keegan.st

nevyřešené úkoly:
omezit množství znaků hráčova jména
znemožnit přepisovat výsledek stejným jménem
úprava vyskakovacího okna do stylu hry
při stisknutí klávesy b znova načíst scoreboard
