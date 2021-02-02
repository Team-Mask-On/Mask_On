from datetime import datetime, timedelta

time_stack = []
def roundTime(dt=None, dateDelta=timedelta(minutes=5)):
    roundTo = dateDelta.total_seconds()

    if dt == None : dt = datetime.now()
    seconds = (dt - dt.min).seconds
    # // is a floor division, not a comment on following line:
    rounding = (seconds+roundTo/2) // roundTo * roundTo
    return dt + timedelta(0,rounding-seconds,-dt.microsecond)

def get_time(sleep_time=300):
    minutes = sleep_time // 60
    print(minutes)
    curr_time = datetime.now()
    result_time = roundTime(curr_time, timedelta(minutes=minutes)).strftime('%H%M')
    if time_stack:
        prev_time = time_stack.pop()
    else:
        prev_time = None

    if result_time != prev_time:
        time_stack.append(result_time)
    else:
        result_time = roundTime(curr_time + timedelta(minutes=minutes)).strftime('%H%M')
        time_stack.append(result_time)
    return result_time

if __name__ == '__main__':
    get_time()