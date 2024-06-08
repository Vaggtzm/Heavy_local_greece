import sys
import firebase_admin
from firebase_admin import auth, credentials

def main(uid_to_make_admin):
    try:
        # Initialize Firebase Admin SDK with service account credentials
        cred = credentials.Certificate('./heavy-local-admin.json')  # Path to your service account JSON file
        firebase_admin.initialize_app(cred)

        # Set custom user claims to make the user an admin
        auth.set_custom_user_claims(uid_to_make_admin, {'admin': True})

        print(f"User with UID {uid_to_make_admin} is now an admin.")

        # Retrieve the user to verify custom claims
        user = auth.get_user(uid_to_make_admin)
        if 'admin' in user.custom_claims and user.custom_claims['admin'] == True:
            print(f"Custom claims for user {uid_to_make_admin} have been set successfully.")
        else:
            print(f"Failed to set custom claims for user {uid_to_make_admin}.")
    
    except Exception as e:
        print('Error setting custom claims:', e)

def check_if_user_is_admin(uid):
    try:
        # Initialize Firebase Admin SDK with service account credentials
        cred = credentials.Certificate('./heavy-local-admin.json')  # Path to your service account JSON file
        firebase_admin.initialize_app(cred)

        # Retrieve the user to check custom claims
        user = auth.get_user(uid)
        print(user.custom_claims)
        if 'admin' in user.custom_claims and user.custom_claims['admin'] == True:
            print(f"User with UID {uid} is an admin.")
            return True
        else:
            print(f"User with UID {uid} is not an admin.")
            return False
    
    except Exception as e:
        print('Error fetching user data:', e)
        return False


# Run the main function
if __name__ == "__main__":
    uid = sys.argv[1]
#    main(uid)
    check_if_user_is_admin(uid)

