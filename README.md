# Cinematic AI Engineering Portfolio

A premium, interactive AI engineer capability dashboard and portfolio. Designed with a futuristic dark aesthetic, glassmorphism, signal pathways, and premium interactive terminals.

---

## Security & Credentials

> [!IMPORTANT]
> **Environment Variables & Secrets Protection**
> This repository uses environment variables to store sensitive keys and API credentials (such as EmailJS integration keys).
> 
> - **Exclusion from Version Control:** The configuration file `.env` contains live production secrets and is **intentionally excluded** from version control (defined in `.gitignore`) to prevent accidental leaks.
> - **Local Development:** When setting up this project locally, you must create your own `.env` file at the root level.
> - **Configuration Template:** Refer to `.env.example` for the list of required key mappings.

### Setting up Environment Variables

1. Copy the `.env.example` template to create your local `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Populate the `.env` file with your credentials from the EmailJS dashboard:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

---

## Local Setup & Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Run Development Server:**
   ```bash
   npm run dev
   ```
3. **Build for Production:**
   ```bash
   npm run build
   ```
4. **Linting Check:**
   ```bash
   npm run lint
   ```
