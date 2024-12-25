from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
#from requests import proxies
import time
import schedule
import random
import requests
#代理池，实际应用中需要替换为可用的代理
proxy_list =['http://proxy1:port','http://proxy2:port']
#更多代理

def get_proxies():
    """
    随机选择一个代理
    """
    proxies={'http':random.choice(proxy_list),'https':random.choice(proxy_list)}
    return proxies

def parse_links(url):
    """
    解析页面链接
    """
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    #无头模式
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    try:
        #等待页面加载完成
        WebDriverWait(driver,10).until(EC.presence_of_element_located((By.TAG_NAME,'a')))
        #获取所有链接
        links = driver.find_elements(By.TAG_NAME,'a')
        hrefs = [link.get_attribute('href') for link in links]
        return hrefs
    finally:
        driver.quit()

def visit_links(links):
    """
    访问链接
    """
    for link in links:
        proxies = get_proxies()
        # response = requests.get(link,proxies=proxies)
        if link:
            response = requests.get(link)
        if response.status_code == 200:
            print(f"访问成功:{link}")
        else:
            print(f"访问失败:{link},状态码:{response.status_code}")
        time.sleep(1)
        #避免过快访问

def job():
    """
    定时任务
    """
    print('tâche')
    url = 'https://imt-nord-europe.fr'
    #替换为实际的URL
    links = parse_links(url)
    visit_links(links)
    print("等待35分钟")
    time.sleep(35*60)
    #等待35分钟
    job()
#递归调用，实际应用中应使用schedule
if __name__ == "__main__":
    #schedule.every(35).minutes.do(job)
    schedule.every(1).seconds.do(job)
    #每35分钟执行一次
    while True:
        schedule.run_pending()
        time.sleep(1)