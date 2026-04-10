from pydantic import BaseModel

class EmailInfo(BaseModel):
    email: str
    name: str

class VerifyRequest(BaseModel):
    email: str
    code: str

class CreateEmailTicket(BaseModel):
    email: str
    name: str
    subject: str
    message: str
