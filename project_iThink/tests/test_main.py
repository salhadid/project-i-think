from fastapi.testclient import TestClient
from project_iThink.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_create_account():
    response = client.post("/accounts/", json={"username": "testuser", "password": "testpassword"})
    assert response.status_code == 200
    assert response.json() == {"username": "testuser"}

def test_create_project():
    response = client.post("/projects/", json={"name": "testproject", "description": "This is a test project"})
    assert response.status_code == 200
    assert response.json() == {"name": "testproject", "description": "This is a test project"}

# Add more tests as needed
