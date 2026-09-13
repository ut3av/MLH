import urllib.request
import urllib.parse
import json

# 1. Test POST /api/analyze
data = urllib.parse.urlencode({
    'patientAlias': 'ICU-Bed-04',
    'userRole': 'Hospital Pharmacist',
    'language': 'Hindi',
    'demo_mode': 'true'
}).encode('utf-8')

req = urllib.request.Request('http://127.0.0.1:8000/api/analyze', data=data, method='POST')
with urllib.request.urlopen(req) as resp:
    res = json.loads(resp.read().decode('utf-8'))
    print('POST /api/analyze -> Status:', resp.status)
    print('  Case ID:', res['case_id'])
    print('  Patient:', res['patient_profile']['patient_alias'])
    print('  Summary HI (length):', len(res['summary_hi']))
    print('  Flags count:', len(res['review_flags']))
    first_flag = res['review_flags'][0]
    print(f"  Flag 1 [Priority: {first_flag['priority']}, Type: {first_flag['type']}]")
    print('  Next step:', first_flag['recommended_next_step'])

# 2. Test status update
flag_id = first_flag['id']
status_data = json.dumps({'status': 'escalated', 'note': 'Escalated to ID consultant'}).encode('utf-8')
req2 = urllib.request.Request(
    f'http://127.0.0.1:8000/api/reviews/{flag_id}/status',
    data=status_data,
    headers={'Content-Type': 'application/json'},
    method='POST'
)
with urllib.request.urlopen(req2) as resp2:
    stat_res = json.loads(resp2.read().decode('utf-8'))
    print('\nPOST /api/reviews/status -> Status:', resp2.status, 'New status:', stat_res['new_status'])

# 3. Test export
case_id = res['case_id']
req3 = urllib.request.Request(f'http://127.0.0.1:8000/api/cases/{case_id}/export')
with urllib.request.urlopen(req3) as resp3:
    exp_res = json.loads(resp3.read().decode('utf-8'))
    print('\nGET /api/cases/export -> Status:', resp3.status, 'Patient:', exp_res['patient_profile']['patient_alias'])

# 4. Test Kaggle ARMD endpoints
req4 = urllib.request.Request('http://127.0.0.1:8000/api/kaggle/cases')
with urllib.request.urlopen(req4) as resp4:
    kg_cases = json.loads(resp4.read().decode('utf-8'))
    print('\nGET /api/kaggle/cases -> Status:', resp4.status, 'Total cases:', len(kg_cases))

print('\nALL DIYA BACKEND VERIFICATIONS PASSED!')
