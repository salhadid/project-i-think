from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries
from queries.projects import ProjectQueries

client = TestClient(app=app)


class AccountQueriesMock:
    def get_all_accounts(self):
        return []


def test_get_all_accounts():
    app.dependency_overrides[AccountQueries] = AccountQueriesMock
    response = client.get("/api/accounts/")
    assert response.status_code == 200
    assert response.json() == []
    app.dependency_overrides = {}


class ProjectQueriesMock:
    def get_all_projects(self):
        return []


def test_get_all_projects():
    app.dependency_overrides[ProjectQueries] = ProjectQueriesMock
    response = client.get("/api/projects/list/")
    assert response.status_code == 200
    assert response.json() == []
    app.dependency_overrides = {}
