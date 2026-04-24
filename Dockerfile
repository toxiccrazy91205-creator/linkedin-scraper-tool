FROM python:3.12-slim

WORKDIR /app

COPY linkedin/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && playwright install chromium \
    && playwright install-deps chromium

COPY linkedin/ .

# Run FastAPI instead of MCP server for the frontend to connect
ENTRYPOINT ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "10000"]
