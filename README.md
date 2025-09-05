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
- **HTML, CSS, JavaScript:** everything in a single `index.html`, no external libraries  
- **CSS:** Flexbox / Grid layout, CSS variables (colors, hover states)  
- **HTML:** semantic elements (`<main>`, `<section>`, `<footer>`)  
- **Navigation:** hash-based anchors (`#shortcuts`, `#game`, `#scoreboard`)  
- **JavaScript:**
  - Game logic (character prompts, scoring, DOM updates)  
  - Keyboard shortcuts (`s`, `g`, `b`, `Esc`)  
  - Dynamic content switching  

### Backend & Deployment
- **Cloudflare Workers** + **Workers KV** for storing scores  
  - `POST /save-score` saves a player’s score  
  - `GET /get-scores` returns results in JSON for the Scoreboard  
- **CORS** support & handling of `OPTIONS` requests for smooth communication  
- **wrangler.toml:** Worker configuration (service name, Cloudflare account, KV namespace)  
- **Cloudflare Pages:** static hosting, auto-deployment on every GitHub push  

## Future Improvements

Future development could focus on features that would **enhance feedback and learning effectiveness**, such as:

- **Detailed feedback**: percentage of correct answers, time spent on each item, or a progress bar showing advancement.  
- **Smart hints**: activated when the player repeatedly makes mistakes or hesitates, e.g. by highlighting the correct keys or showing a short animation.  
- **Gradual difficulty levels**: from simple emoticons (like `:-)`), to more complex combinations (`@_%`), up to advanced characters (`#_€`).  

## Known Issues / To-Do

The current version is fully playable and tested in Chrome.  
Some improvements and fixes are planned:

- Limit the maximum length of player names  
- Prevent overwriting scores with the same name  
- Restyle the popup window to match the game’s design  
- Refresh the scoreboard automatically when pressing `b` 

## Development Log

| hrs | note |
|-----|------|
| 1   | Dan’s introduction |
| 0.5 | GitHub setup |
| 2   | Random (infinite) smiley generation and coloring correct answers pink |
| 2   | Styling homepage, fonts, and background |
| 2   | Splitting into `smilecters.html`, `game.html`, `smilecters.css` and recoloring input fields according to design |
| 5   | Redesign based on fakan.cz (back to single HTML document), code review and understanding its logic |
| 1.5 | Close button + keyboard design |
| 2   | Close button as a special character, ESC key functionality; disabling copy of smileys, GPT experiments |
| 2   | Keyboard design in .ai and embedding .svg |
| 2.5 | Shortcuts section: shrinking keyboard, tutorial for typing `?`, `!`, highlighting keys |
| 3   | Shortcuts section: enlarging page, adding new keyboards |
| 1   | Creating a smiley database |
| 1   | Dan’s explanation of Cloudflare KV and setup of Cloudflare Page “smilecters” |
| 2   | Timer countdown + score increment |
| 1   | Pausing countdown on exit, name input, keyboard navigation with s, g, b |
| 2   | KV setup (saving player names and displaying on scoreboard) |
| 1.5 | Code cleanup and comment updates |
| **32**  | Total |


