from fastapi.testclient import TestClient
from main import app
from bson.objectid import ObjectId
from unittest.mock import patch
import pytest
from authenticator import authenticator
from queries.accounts import AccountOut

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

@patch("queries.projects.ProjectQueries.get_ideas")
def test_get_ideas(mock_get_ideas, client):
    fake_project_id = "647508c9a358e53a918ae3e7"
    fake_ideas = [
        {
            "responses": ["response1", "response2"],
        },
    ]
    mock_get_ideas.return_value = fake_ideas
    response = client.get(f"/api/projects/{fake_project_id}/ideas")
    assert response.status_code == 200
    assert response.json() == fake_ideas

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}


def test_create_project():
    # app.dependency_overrides[authenticator.get_current_account_data] = fake_user
    response = client.post("/projects/", json={"name": "testproject", "description": "This is a test project"})
    assert response.status_code == 200
    assert response.json() == {"name": "testproject", "description": "This is a test project"}
    # app.dependency_overrides = {}


if __name__ == "__main__":
    pytest.main()
