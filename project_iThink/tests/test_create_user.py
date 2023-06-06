from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries

client = TestClient(app=app)

class AccountQueriesMock():
    def get_all_accounts(self):
        return []

def test_get_all_accounts():
    app.dependency_overrides[AccountQueries] = AccountQueriesMock
    response = client.get("/api/accounts")
    assert response.status_code == 200
    assert response.json() == {"accounts": []}
    app.dependency_overrides = {}

def test_create_user():
    client = TestClient(app)
    response = client.post("/api/accounts", json={
        "email": "test@test.com",
        "password": "test",
        "full_name": "test",
    },)

    assert response.status_code == 200
    assert response.json()["account"]["email"] == "test@test.com"
