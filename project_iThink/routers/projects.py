from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
    Body,
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
from bson import ObjectId


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

    manager_role = RoleIn(
        user_id=manager_id, project_id=project.id, role="manager"
    )
    role_queries.create_role(manager_role)

    return project


@router.delete(
    "/api/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT
)
async def delete_project(
    project_id: str,
    project_queries: ProjectQueries = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    if not account_data:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User not authenticated",
        )

    project_queries.delete_project(project_id)


@router.get("/api/projects/list", response_model=list[ProjectOut])
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


@router.post("/api/projects/{project_id}/add_response")
async def add_response_to_project(
    project_id: str,
    response: str = Body(...),
    project_queries: ProjectQueries = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    try:
        if account_data is None or "id" not in account_data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User authentication required",
            )

        project = project_queries.collection.find_one(
            {"_id": ObjectId(project_id)}
        )

        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        if "responses" not in project:
            project["responses"] = []

        project["responses"].append(response)
        project_queries.collection.update_one(
            {"_id": ObjectId(project_id)}, {"$set": project}
        )

        return {"message": response}
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail="Internal server error!")


@router.get("/api/projects/{id}")
async def get_project_by_id(id: str, repo: ProjectQueries = Depends()):
    project = repo.get_project_by_id(id)
    project["id"] = str(project["_id"])
    return ProjectOut(**project)


@router.put(
    "/api/projects/{project_id}/remove_idea/{idea_index}",
    response_model=ProjectOut,
)
def delete_idea(
    project_id: str, response: str, repo: ProjectQueries = Depends()
):
    collection = repo.remove_idea(project_id, response)
    if collection is None:
        response.status_code = 404
    else:
        return collection


@router.get("/api/projects/{project_id}/ideas")
def get_ideas(project_id: str, repo: ProjectQueries = Depends()):
    return repo.get_ideas(project_id)
