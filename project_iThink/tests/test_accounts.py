import pytest
from fastapi import UploadFile
from fastapi.testclient import TestClient
from unittest.mock import patch
from queries.image import ImageQueries
from main import app


@pytest.fixture
def client():
    return TestClient(app)


@patch("queries.projects.ProjectQueries.get_ideas")
def test_get_all_users(mock_get_all_users, client):
    fake_project_id = "647508c9a358e53a918ae3e7"
    fake_ideas = [
        {
            "responses": ["response1", "response2"],
        },
    ]
    mock_get_all_users.return_value = fake_ideas
    response = client.get(f"/api/projects/{fake_project_id}/ideas")
    assert response.status_code == 200
    assert response.json() == fake_ideas


if __name__ == "__main__":
    pytest.main()

    def get_all_users(self):
        results = self.collection.find()
        return list(results)
