# ============================================================
# Dockerfile — Hugging Face Spaces Deployment
# ============================================================

FROM python:3.10-slim

# Set working directory inside container
WORKDIR /code

# Copy requirements and install
COPY requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy all codebase files into the container
COPY . /code

# Expose port 7860 (Hugging Face Spaces standard port)
EXPOSE 7860

# Start FastAPI server on port 7860
CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--port", "7860"]
