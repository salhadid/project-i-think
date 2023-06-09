from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError,
    AccountPatch,

)
from typing import Optional


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create_user(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.get("/api/accounts", response_model=list[AccountOut])
async def get_all_accounts(repo: AccountQueries = Depends()):
    return repo.get_all_accounts()


@router.get(
    "/api/accounts/details",
)
async def get_current_user_info(
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        return account_data
    return {"message": "No account logged in."}


@router.patch("/api/accounts/{email}", response_model=AccountOut)
async def update_account(
    email: str,
    updates: AccountPatch,
    accounts: AccountQueries = Depends(),
):
    data = updates.dict(exclude_unset=True)
    if "password" in data:
        hashed_password = authenticator.hash_password(data["password"])
    else:
        hashed_password = None
    updated_account = accounts.update_user(email, data, hashed_password)
    return updated_account

