import requests
from get_serial_number import *
from result_text_read import *

URL = "http://pocdev.eba-gu27fjfe.ap-northeast-2.elasticbeanstalk.com/api/sensors/log-data/"
cpuserial = getserial()
masked, unmasked = result_text_read()
def send_data():
    data = {"id":cpuserial, "masked": masked, "unmasked": unmasked}
    print(data)
    # response = requests.post(URL, data=data)
    # print(response.json())
if __name__ == '__main__':
    send_data()