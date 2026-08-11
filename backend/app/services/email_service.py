from app.database.models.user import VerificationCode
from sqlalchemy.orm import Session
import hashlib
import secrets
import time
import os
import app.core.config as config

from brevo import Brevo
from brevo.transactional_emails import (
    SendTransacEmailRequestSender,
    SendTransacEmailRequestToItem,
)

client = Brevo(api_key=config.API_KEY)

NRemail = "noreply@arcsharks.com.au"
NRname = "ARC Sharks"

def hash_code(code: str, salt: str) -> str:
    return hashlib.sha256((code + salt).encode()).hexdigest()

def verify_code(input_code: str, salt: str, stored_hash: str) -> bool:
    return hash_code(input_code, salt) == stored_hash

def store_code(email: list, db: Session):

    code = str(secrets.randbelow(900000) + 100000)
    salt = secrets.token_hex(16)

    code_hash = hash_code(code, salt)
    expires_at = int(time.time()) + 600  # 10 mins

    # delete existing code for this email
    existing = db.query(VerificationCode).filter_by(email=email).first()
    if existing:
        db.delete(existing)

    new_code = VerificationCode(
        email=email,
        code_hash=code_hash,
        salt=salt,
        expires_at=expires_at,
        attempts=0
    )

    db.add(new_code)
    db.commit()
    db.close()

    return code

def verify_code(email, user_input, db: Session):

    record = db.query(VerificationCode).filter_by(email=email).first()

    if not record:
        db.close()
        print("not found")
        return False, "No code found"

    if record and time.time() > record.expires_at:
        db.delete(record)
        db.commit()
        db.close()
        return False, "Code expired"

    if record.attempts >= 5:
        db.delete(record)
        db.commit()
        db.close()
        return False, "Too many attempts"

    if hash_code(user_input, record.salt) == record.code_hash:
        record.verified = 1
        db.commit()
        db.close()
        return True, "Email verified successfully"

    else:
        record.attempts += 1
        db.commit()
        db.close()
        print("incorrect")
        return False, "Incorrect code"

def send_email(subject: str, message: str, sName: str, sEmail: str, reciverData: dict):

    recieverList = []

    for data in reciverData:
        name = data["name"] 
        email = data["email"]

       

        recieverList.append(SendTransacEmailRequestToItem(
            email=email,
            name=name
        ))

    return client.transactional_emails.send_transac_email(
        subject=subject,
        html_content=message,

        sender=SendTransacEmailRequestSender(
            name=sName,
            email=sEmail
        ),
        
        to=recieverList

    )


def send_verf_email(email: str, name: str, db: Session):
    code = store_code(email, db)

    subject = "Your verification code"
    body = f"""
    <html>
        <body>
            <p> Hello {name}! </p>
            <p> Your verification code is: {code} <br> </p>
            <p> This code will expire in 10 minutes. </p>
        </body>
    </html>
    """

    recieverData = [
        {
            "name": name,
            "email": email
        }
    ]

    send_email(subject, body, NRname, NRemail, recieverData)

if __name__ == "__main__":

    htmlMessage = """
    <html>
        <body>
            <p> TESTING THE BRAVO API WOOOOOOOHOOOOOOOOOOOOO!!! </p>
        </body>
    </html>

    """

    result = send_email("Testing", htmlMessage, "ARCsharks Support", "support@arcsharks.com.au", "Yahya K", "acs26967@amitystudent.com")



