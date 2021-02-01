import requests

URL = "http://3.35.82.17/:8000/api/logs/log-data"
def send_data(cpuserial, masked, unmasked, time):
    data = {"masked": masked, "unmasked": unmasked, "sensor_id":cpuserial, "time": time}
    print(data)
    try:
        response = requests.post(URL, data=data)
        response.raise_for_status()
        print(response.json())
        return True
    except Exception as e:
        print("OOPS!! Connection Error. Make sure you are connected to Internet. Technical Details given below.\n")
        print(str(e))  
        return False

if __name__ == '__main__':
    send_data()