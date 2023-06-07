from fastapi.testclient import TestClient
from main import app
from unittest.mock import patch
import pytest


@pytest.fixture
def client():
    return TestClient(app)


@patch("queries.image.ImageQueries.get_image")
def test_get_image(mock_get_image, client):
    fake_filename = "sample.jpg"
    fake_image = b"sample_image_data"
    mock_get_image.return_value = fake_image

    response = client.get(f"/api/images/{fake_filename}")

    assert response.status_code == 200
    assert response.content == fake_image
    assert response.headers["content-type"] == "image/jpeg"
