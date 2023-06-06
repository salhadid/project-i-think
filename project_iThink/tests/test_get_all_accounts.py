from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries

client = TestClient(app=app)

class AccountQueriesMock():
    def get_all_accounts(self):
        return []

def test_get_all_accounts():
    app.dependency_overrides[AccountQueries] = AccountQueriesMock
    response = client.get("/api/accounts/")
    assert response.status_code == 200
    assert response.json() == []
    app.dependency_overrides = {}
