from fastapi.testclient import TestClient
from project_iThink.main import app
from bson.objectid import ObjectId
from unittest.mock import patch
import pytest

@pytest.fixture
def client():
    return TestClient(app)

@patch("queries.projects.ProjectQueries.get_project_by_id")
def test_get_project_by_id(mock_project_id, client):
    fake_id = "60b835d9a770fa4a63416e5a"
    fake_project = {
        "_id": str(ObjectId(fake_id)),
        "title": "Sample Title",
        "description": "Sample Description",
        "responses": ["Sample Response"],
    }
    mock_project_id.return_value = fake_project
    response = client.get(f"/api/projects/{fake_id}")
    assert response.status_code == 200
    assert response.json()["title"] == fake_project["title"]
    assert response.json()["description"] == fake_project["description"]
    assert response.json()["responses"] == fake_project["responses"]
    assert response.json()["id"] == fake_project["_id"]

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


if __name__ == "__main__":
    pytest.main()
