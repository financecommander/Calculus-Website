# Calculus Research Website

Modern institutional platform for **Calculus -- Research . Labs . Management**
A static, high-performance site built with HTML + Tailwind CSS, designed to feel like a $40MM+ AUM private credit / AI-driven finance firm.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy Status](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?logo=github)](https://calculusresearch.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![HubSpot Forms](https://img.shields.io/badge/Forms-HubSpot-orange?logo=hubspot)](https://www.hubspot.com/products/marketing/forms)

**Live:** https://www.calculusresearch.io
**Repository:** https://github.com/financecommander/calculusresearch.io

---

## Overview

This is a **static multi-page** website for Calculus, featuring:

- Dark/teal premium design with Space Grotesk + Inter typography
- 3-pillar structure: **Research** (lending/syndication), **Labs** (AI research & products), **Management** ($40MM+ AUM)
- Impact mission: financial inclusion for the unbanked, food security, energy stability
- 14+ dedicated pages including portfolio company pages and AI Portal gateway
- HubSpot form integration for lead capture
- Responsive, accessible, fast-loading (GitHub Pages / Google Cloud VM compatible)

Built for credibility, SEO, and conversion in private credit, real estate development, fintech, and AI-finance verticals.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Pure HTML5 + Tailwind CSS (CDN) |
| **Fonts** | Inter + Space Grotesk (Google Fonts) |
| **Icons** | Font Awesome 6.6.0 |
| **Forms** | HubSpot embedded forms |
| **Hosting** | GitHub Pages (primary) + Google Cloud VM (fallback) |
| **Build** | None required (static files) |

---

## Project Structure

```
calculusresearch.io/
|-- index.html                           # Home
|-- research/index.html                  # Calculus Research (capital solutions)
|-- labs/index.html                      # Calculus Labs (AI research & products)
|-- management/index.html               # Calculus Management ($40MM+ AUM)
|-- solutions/index.html                # Capital Solutions overview
|-- development/index.html              # Real Estate Development Finance
|-- portfolio/index.html                # Portfolio overview
|-- compression-ai-technologies/index.html   # Labs portfolio company
|-- quantum-protocol-system/index.html       # Labs portfolio company
|-- private-ai-networks/index.html           # Labs portfolio company
|-- digital-money-center/index.html          # PE portfolio company
|-- constitutional-tender/index.html         # PE portfolio company
|-- ai-portal/index.html               # Gateway to AI Portal app
|-- insights/index.html                 # Blog / thought leadership
|-- about/index.html                    # About Calculus
|-- contact/index.html                  # Contact with HubSpot form
|-- README.md
```

---

## Quick Start (Local Development)

1. **Clone the repo**
   ```bash
   git clone https://github.com/financecommander/calculusresearch.io.git
   cd calculusresearch.io
   ```

2. **Open any page in browser**
   ```bash
   # Just double-click index.html or use a live server
   npx live-server    # recommended (install globally: npm i -g live-server)
   ```

3. **Edit files** -- changes are instant (no build step)

---

## Deployment

### Option 1: GitHub Pages (Recommended -- Free & Automatic)

1. Go to repo Settings > Pages
2. Source: Deploy from a branch > `main` > `/(root)`
3. Custom domain: `calculusresearch.io` (add `CNAME` file with: `www.calculusresearch.io`)
4. DNS records at your registrar:
   - `www` CNAME > `financecommander.github.io`
   - Apex A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

### Option 2: Google Cloud VM

1. Copy files to `/var/www/html/`
2. Configure Nginx to serve static files
3. Point domain DNS to VM public IP

### Option 3: Vercel / Netlify

Connect GitHub repo -- auto-deploys on push.

---

## HubSpot Form Setup

1. Log into HubSpot > Marketing > Forms
2. Create a form with fields: First Name, Last Name, Email, Phone, Message
3. Get your `portalId` and `formId` from the embed code
4. Replace `YOUR_PORTAL_ID_HERE` and `YOUR_FORM_ID_HERE` in `contact/index.html`

---

## Roadmap

### Phase 1 -- MVP (Completed Q1 2026)
- [x] Core 14-page structure
- [x] Consistent dark/teal design system across all pages
- [x] Portfolio company pages (5 dedicated pages)
- [x] AI Portal gateway page
- [x] HubSpot form integration (placeholders ready)
- [x] Responsive navbar with mobile menu
- [x] Mission-driven content (unbanked, food security, energy stability)

### Phase 2 -- Polish & Optimization (Q2 2026)
- [ ] Replace placeholder images with custom visuals
- [ ] Add meta tags, Open Graph, JSON-LD schema, sitemap.xml
- [ ] Accessibility improvements (ARIA labels, alt text, contrast)
- [ ] Performance: move Tailwind to build step (Vite), image optimization (WebP)
- [ ] Trust signals: testimonials, case studies, metrics dashboard
- [ ] Analytics: GA4 + HubSpot tracking

### Phase 3 -- Growth & Features (Q3-Q4 2026)
- [ ] Build /insights with real blog posts
- [ ] Lead magnets: whitepapers, AI demo reports
- [ ] Calendly embed for booking calls
- [ ] Integrate AI Portal subdomain (ai.calculusresearch.io)
- [ ] Dark/light mode toggle

### Phase 4 -- Advanced (2027+)
- [ ] Client dashboard / member portal
- [ ] Dynamic content via headless CMS
- [ ] Multilingual support
- [ ] API integrations (portfolio performance feeds)

---

## Design System

| Element | Value |
|---------|-------|
| **Background** | `bg-slate-950` (primary), `bg-slate-900` (alternating) |
| **Accent** | `teal-500` / `teal-400` |
| **Headings** | Space Grotesk (`heading-font`) |
| **Body Text** | Inter |
| **Cards** | `bg-slate-900`, `border-slate-800`, `rounded-2xl` |
| **Hover** | `translateY(-8px)` with box-shadow |
| **Buttons** | `rounded-xl` / `rounded-2xl` |

---

## Contact

**Sean Grady** -- Founder & CEO
hello@calculusresearch.io
Boston, MA | Windsor, CT

---

Built with purpose in Boston & Windsor, CT.
