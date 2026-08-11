import os.path
import base64
from email.mime.text import MIMEText

try:
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
except ImportError:
    Request = None
    Credentials = None
    InstalledAppFlow = None
    build = None

from app.database.models.user import VerificationCode
from sqlalchemy.orm import Session

import os
import hashlib
import secrets
import time
from app.core import config

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]
TOKEN_PATH = os.path.join(config.GOOGLE_AUTH_DIR, "token.json")
CREDENTIALS_PATH = os.path.join(config.GOOGLE_AUTH_DIR, "credentials.json")



def cred_setup():
    os.makedirs(config.GOOGLE_AUTH_DIR, exist_ok=True)

    if not os.path.exists(TOKEN_PATH) and os.getenv("GOOGLE_TOKEN_JSON"):
        with open(TOKEN_PATH, "w") as f:
            print("Checking for token :)")
            f.write(os.environ["GOOGLE_TOKEN_JSON"])

    if os.path.exists(TOKEN_PATH):
        print("I get a json file hahahha")

    print("If you see this, it means cred_setup() has ran successfully!")

    if not os.path.exists(CREDENTIALS_PATH) and os.getenv("GOOGLE_CREDENTIALS_JSON"):
        with open(CREDENTIALS_PATH, "w") as f:
            f.write(os.environ["GOOGLE_CREDENTIALS_JSON"])

def hash_code(code: str, salt: str) -> str:
    return hashlib.sha256((code + salt).encode()).hexdigest()

def verify_code(input_code: str, salt: str, stored_hash: str) -> bool:
    return hash_code(input_code, salt) == stored_hash

def store_code(email: list, db: Session):

    code = str(secrets.randbelow(900000) + 100000)
    salt = secrets.token_hex(16)

    code_hash = hash_code(code, salt)
    expires_at = int(time.time()) + 300  # 5 mins

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

def get_service():
    if Request is None or Credentials is None or InstalledAppFlow is None or build is None:
        raise RuntimeError("Missing Google API dependencies; install google-auth, google-auth-oauthlib, google-api-python-client")

    creds = None

    # Load saved token
    if os.path.exists(TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)

    print(creds)

    # If not valid then back to login :)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            creds = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_PATH, SCOPES).run_local_server(port=0)
            print("Got new credentials!")

        # Save token
        with open(TOKEN_PATH, "w") as token:
            token.write(creds.to_json())

    return build("gmail", "v1", credentials=creds)

def send_email(emails: list, subject: str, body: str):
    service = get_service()

    message = MIMEText(body)

    message["to"] = ", ".join(emails)
    message["from"] = "me"
    message["subject"] = subject

    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()

    service.users().messages().send(
        userId="me",
        body={"raw": raw}
    ).execute()

    print("Email sent successfully to ", emails, "!")

def send_verf_email(email: str, name: str, db: Session):
    code = store_code(email, db)

    print("Code to send: ", code, "\n For email: ", email)

    subject = "Your verification code"
    body = f"Hello {name}! \nYour verification code is: {code}\n\nThis code will expire in 5 minutes."

    send_email([email], subject, body)

    return code

if __name__ == "__main__":
    send_email()


