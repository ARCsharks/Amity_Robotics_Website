from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.database.schemas.user import EmailInfo, VerifyRequest, CreateEmailTicket
from app.services import email_service

router = APIRouter()

@router.post("/send")
def send_code(data: EmailInfo, db: Session = Depends(get_db)):
    email_service.send_verf_email(data.email, data.name, db)
    
    return {"success": True}

@router.post("/verify")
def verify_code(data: VerifyRequest, db: Session = Depends(get_db)):
    result, message = email_service.verify_code(data.email, data.code, db)

    return {
        "success": result,
        "message": message
    }

@router.post("/create-ticket")
def create_ticket(ticketInfo: CreateEmailTicket):

    emails = [ 
                {"name": ticketInfo.name, "email": ticketInfo.email},
                {"name": "Joud Saleh", "email": "jsaleh2030@amitystudent.com"},
                {"name": "Yahya Khan", "email": "acs26967@amitystudent.com"}
            ]

    subject = f"ARC Sharks Ticket: {ticketInfo.name} | {ticketInfo.subject}"

    body = f"""
<html>
    <body>
        <p> {ticketInfo.name} sent a message: <br> </P>
        <p> {ticketInfo.message} <br> </P>
        <p> Email: {ticketInfo.email} </p>
    </body>
</html>

"""

    email_service.send_email(subject, body, "ARC Sharks", "ticket-creator@arcsharks.com.au", emails)
        
    

    return {"success": "true"}