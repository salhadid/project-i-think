from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)
from queries.projects import (
    ProjectIn,
    ProjectOut,
    ProjectQueries,
)
from queries.roles import (
    RoleIn,
    RoleOut,
    RoleQueries,
)
from authenticator import authenticator


router = APIRouter()


@router.post("/api/projects", response_model=ProjectOut)
async def create_project(
    info: ProjectIn,
    project_queries: ProjectQueries = Depends(),
    role_queries: RoleQueries = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    if not account_data:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User not authenticated",
        )

    manager_id = account_data["id"]

    project = project_queries.create_project(info)

    manager_role = RoleIn(user_id=manager_id, project_id=project.id, role="manager")
    role_queries.create_role(manager_role)

    return project


# @router.post("/api/projects/{project_id}/assign", response_model=RoleOut)
# async def assign_user_to_project(
#     project_id: str,
#     user_id: str,
#     role: str,
#     role_queries: RoleQueries = Depends(),
#     account_data: dict = Depends(authenticator.try_get_current_account_data),
# ):
#     manager_role = role_queries.collection.find_one({"project_id": project_id, "user_id": account_data["id"]})

#     if not manager_role or manager_role["role"] != "manager":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="You don't have permission to assign users to this project",
#         )

#     new_role = RoleIn(user_id=user_id, project_id=project_id, role=role)
#     return role_queries.create_role(new_role)


@router.get("/api/projects/list/", response_model=list[ProjectOut])
async def get_all_projects(repo: ProjectQueries = Depends()):
    return repo.get_all_projects()


@router.post("/api/projects/{project_id}/assign", response_model=RoleOut)
async def assign_user_to_project(
    project_id: str,
    user_id: str,
    role: str,
    role_queries: RoleQueries = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    if account_data is None or "id" not in account_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User authentication required",
        )

    manager_role = role_queries.collection.find_one(
        {"project_id": project_id, "user_id": account_data["id"]}
    )

    if not manager_role or manager_role["role"] != "manager":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to assign users to this project",
        )

    new_role = RoleIn(user_id=user_id, project_id=project_id, role=role)
    return role_queries.create_role(new_role)
