FROM python:3.12

WORKDIR /api

RUN apt-get update && \
    apt-get install -y \
    gcc \
    gettext \
    postgresql-client

# Copy requirements.txt to the working directory
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project files to the working directory
COPY . .

# Perform Django migrations
RUN python manage.py migrate

# Load initial data (if any)
RUN python manage.py loaddata users/fixtures/initial_data.json roles/fixtures/initial_data.json status/fixtures/initial_data.json

# Expose port (if needed)
EXPOSE 8000

# Command to run the Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]