import urllib.request
import json

def test_routes():
    print("Testing DIYA backend endpoints...")
    # 1. Test Demo Cases
    try:
        req = urllib.request.urlopen("http://localhost:8000/api/demo-cases")
        data = json.loads(req.read().decode())
        print(f"[PASS] /api/demo-cases: Loaded {len(data)} cases.")
    except Exception as e:
        print(f"[FAIL] /api/demo-cases: {e}")

    # 2. Test Patients Endpoint
    try:
        req = urllib.request.urlopen("http://localhost:8000/api/patients")
        data = json.loads(req.read().decode())
        print(f"[PASS] /api/patients: Loaded {len(data)} patient tracks from Supabase/memory store.")
    except Exception as e:
        print(f"[FAIL] /api/patients: {e}")

    # 3. Test Prescriptions Endpoint
    try:
        req = urllib.request.urlopen("http://localhost:8000/api/prescriptions")
        data = json.loads(req.read().decode())
        print(f"[PASS] /api/prescriptions: Loaded {len(data)} prescription records.")
    except Exception as e:
        print(f"[FAIL] /api/prescriptions: {e}")

    # 4. Test Clinician Login
    try:
        payload = json.dumps({
            "hospital": "St. Jude Memorial Hospital",
            "email": "dr.sharma@hospital.org",
            "role": "Clinical Pharmacist"
        }).encode()
        req = urllib.request.Request(
            "http://localhost:8000/api/auth/login",
            data=payload,
            headers={"Content-Type": "application/json"}
        )
        res = urllib.request.urlopen(req)
        data = json.loads(res.read().decode())
        print(f"[PASS] /api/auth/login: Authorized = {data.get('is_authorized')} - User: {data.get('user', {}).get('email')}")
    except Exception as e:
        print(f"[FAIL] /api/auth/login: {e}")

if __name__ == "__main__":
    test_routes()
