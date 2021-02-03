import requests

def send_data(URL, cpuserial, masked, unmasked, time):
    URL = URL
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