from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class UserModel(BaseModel):
    id: UUID
    aud: str
    role: str
    email: str | None = None
    email_confirmed_at: datetime | None = None
    created_at: datetime
    updated_at: datetime
    is_anonymous: bool = False