"""
Calculus AI Chatbot — FastAPI Backend
Powered by Calculus GPU infrastructure (Ollama + Llama 3.1).
Run: uvicorn server:app --host 127.0.0.1 --port 8091
"""

import os
import time
from collections import defaultdict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI(title="Calculus Chatbot API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Ollama client via OpenAI-compatible API (Calculus GPU)
OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://10.142.0.6:11434")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "llama3.1:8b")
client = OpenAI(base_url=f"{OLLAMA_HOST}/v1", api_key="ollama")

# Rate limiting (simple in-memory)
rate_limits = defaultdict(list)
RATE_LIMIT = 20  # max requests per minute per IP
RATE_WINDOW = 60  # seconds

SYSTEM_PROMPT = """You are the Calculus AI Assistant — a helpful, professional chatbot for Calculus, a multi-discipline private capital platform headquartered in Boston, Massachusetts.

## Your Role
- Answer questions about Calculus services, loan products, rates, AI products, and company information
- Be concise, friendly, and professional
- When visitors ask about applying for a loan or getting started, direct them to the contact page at /contact/ or email hello@calculusresearch.io
- Never make up information. Only share what's listed below
- If you don't know something, say so and suggest they contact the team

## Company Overview
- Name: Calculus (dba Calculus Research)
- Founded: 2020 by Sean Grady (Founder & CEO)
- Headquarters: Boston, MA | Second Office: Windsor, CT
- Contact: hello@calculusresearch.io
- AUM: $40MM+ | Capital Deployed: $150M+ | Deals Closed: 120+

## Loan Products (7 programs)

1. **Fannie Mae & Freddie Mac Agency Loans**
   - Amount: $750K – $100M+
   - Rates: 5.5% – 7.5%
   - Non-recourse, up to 80% LTV, 5–30 year terms
   - For stabilized multifamily (5+ units)
   - 30-year amortization, interest-only available

2. **DSCR Rental Loans**
   - Amount: $150K – $3M per property
   - Rates: 6.0% – 8.5%
   - No income verification — qualify on property cash flow only
   - 30-year fixed or ARM, DSCR as low as 0.75
   - Single-family, 2-4 unit, 5+ unit properties

3. **USDA B&I Guaranteed Loans**
   - Amount: Up to $25M
   - Rates: 6.0% – 9.0%
   - 80% federal guarantee, up to 30-year terms
   - For rural businesses (<50,000 population areas)
   - Manufacturing, renewable energy, healthcare, commercial RE

4. **Real Estate Bridge Loans**
   - Amount: $1M – $15M
   - Rates: 9.0% – 12.5%
   - 12–24 month terms, up to 85% LTV/LTC
   - Multifamily, hospitality, mixed-use
   - Interest-only, no prepayment penalty

5. **SBA 7(a) Loans**
   - Amount: Up to $5M
   - Rates: Prime + 2.25% – 2.75%
   - 10–25 year terms
   - Working capital, equipment, real estate acquisition

6. **SBA 504 Loans**
   - Amount: Up to $5.5M
   - Below-market fixed rates, 10–25 year terms
   - Major fixed assets, commercial real estate
   - 10% borrower injection

7. **Business Lines of Credit**
   - Amount: $50K – $500K revolving
   - Rates: 8.0% – 15.0%
   - 12–24 month renewable terms
   - Working capital, inventory, payroll

All rates are indicative and subject to change based on market conditions, property type, and borrower qualifications.

## AI Labs
Calculus AI Labs develops 16 AI products for financial services:
- Flagship: UnderwriteAI (automated underwriting, 700+ variables, <4 seconds)
- Platform: Triton Compression Engine
- Products include: Finclusion Score API, MarketPulse Forecast Engine, Voice AI Platform, Lex Intelligence, Constitutional Tender Terminal, and more

## Other Divisions
- Real Estate Development: Hospitality & multifamily (HTC, LIHTC, NMTC, Opportunity Zones)
- Energy: Biomass power plants & renewable energy across North America
- Consulting: Strategic advisory for capital markets, fintech, AI adoption
- Portfolio: 5 companies (Compression AI, Quantum Protocol, Private AI Networks, Digital Money Center, Constitutional Tender)

## Key URLs
- Apply/Contact: /contact/
- Lending: /lending/
- USDA B&I: /usda-bi/
- AI Labs: /labs/
- AI Portal: /ai-portal/
- About: /about/

When suggesting pages, use relative URLs (e.g., /lending/) so they work as links."""


class ChatRequest(BaseModel):
    message: str
    history: list = []


class ChatResponse(BaseModel):
    reply: str


def check_rate_limit(client_ip: str) -> bool:
    now = time.time()
    rate_limits[client_ip] = [t for t in rate_limits[client_ip] if now - t < RATE_WINDOW]
    if len(rate_limits[client_ip]) >= RATE_LIMIT:
        return False
    rate_limits[client_ip].append(now)
    return True


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # Build messages array
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    # Add conversation history (limit to last 10 exchanges)
    for msg in request.history[-20:]:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        if role in ("user", "assistant") and content:
            messages.append({"role": role, "content": content})

    # Add current message
    messages.append({"role": "user", "content": request.message})

    try:
        response = client.chat.completions.create(
            model=OLLAMA_MODEL,
            messages=messages,
            max_tokens=500,
            temperature=0.7,
        )
        reply = response.choices[0].message.content
        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")


@app.get("/api/health")
async def health():
    return {
        "status": "ok",
        "service": "calculus-chatbot",
        "engine": "Calculus GPU",
        "model": OLLAMA_MODEL,
    }
