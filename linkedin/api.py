import os
import sys
import logging
from contextlib import asynccontextmanager
from typing import Optional

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Configure basic logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from scraper import LinkedInScraper
from stealth_browser import StealthBrowser
from pathlib import Path

SESSION_DIR = Path(__file__).parent / ".sessions"

class AppState:
    scraper: LinkedInScraper = None
    browser: StealthBrowser = None

state = AppState()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize browser and scraper
    logger.info("Initializing stealth browser and scraper...")
    state.browser = StealthBrowser()
    state.scraper = LinkedInScraper(browser=state.browser)
    try:
        yield
    finally:
        logger.info("Cleaning up stealth browser...")
        if state.scraper:
            await state.scraper.cleanup()

app = FastAPI(title="LinkedIn Scraper API", lifespan=lifespan)

# Add CORS so Next.js can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Open for tool usage, restrict in production if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred while processing the request.", "error": str(exc)},
    )

def _has_session() -> bool:
    return (SESSION_DIR / "linkedin.json").exists()

@app.get("/api/status")
async def get_status():
    return {
        "status": "ok",
        "logged_in": _has_session()
    }

@app.post("/api/login")
async def login():
    try:
        success = await state.scraper.login()
        if success:
            return {"status": "success", "message": "Login saved."}
        else:
            raise HTTPException(status_code=400, detail="Login not completed or timed out.")
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail=f"Login process failed: {str(e)}")

@app.get("/api/profile")
async def get_profile(profile_url: Optional[str] = None, username: Optional[str] = None):
    if not profile_url and not username:
        raise HTTPException(status_code=400, detail="Provide profile_url or username")
    
    try:
        profile = await state.scraper.get_profile(profile_url=profile_url, username=username)
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found or login required.")
        return profile.to_dict()
    except Exception as e:
        logger.error(f"Profile extraction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/search/people")
async def search_people(
    query: str, 
    location: str = "", 
    company: str = "", 
    title: str = "", 
    max_results: int = 20
):
    if not query.strip():
        raise HTTPException(status_code=400, detail="Search query cannot be empty.")
    if not _has_session():
        raise HTTPException(status_code=401, detail="Login required for people search.")
        
    try:
        result = await state.scraper.search_people(
            query=query, location=location, company=company, title=title, max_results=min(max_results, 50)
        )
        return result.to_dict()
    except Exception as e:
        logger.error(f"People search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/search/jobs")
async def search_jobs(
    query: str, 
    location: str = "", 
    remote: str = "", 
    job_type: str = "", 
    experience: str = "", 
    max_results: int = 25
):
    if not query.strip():
        raise HTTPException(status_code=400, detail="Search query cannot be empty.")
        
    try:
        result = await state.scraper.search_jobs(
            query=query, location=location, remote=remote, job_type=job_type, 
            experience=experience, max_results=min(max_results, 50)
        )
        return result.to_dict()
    except Exception as e:
        logger.error(f"Job search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/company")
async def get_company(company_url: Optional[str] = None, company_slug: Optional[str] = None):
    if not company_url and not company_slug:
        raise HTTPException(status_code=400, detail="Provide company_url or company_slug")
        
    try:
        company = await state.scraper.get_company(company_url=company_url, company_slug=company_slug)
        if not company:
            raise HTTPException(status_code=404, detail="Company not found.")
        return company.to_dict()
    except Exception as e:
        logger.error(f"Company extraction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
