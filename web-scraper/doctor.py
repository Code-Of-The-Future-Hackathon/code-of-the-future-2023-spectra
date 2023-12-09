import requests
from bs4 import BeautifulSoup as bs

import json_manager

url = 'https://superdoc.bg/lekari?region_id=2&sort=1&page='

doctor_links = []

max_qualifications = 7

def parse_soup(url):
    response = requests.get(url)
    soup = bs(response.content, 'html.parser')

    return soup

def get_all_doctor_links(page):
    soup = parse_soup(url + str(page))

    links = soup.find_all('a', class_='search-result-link')

    return [ link['href'] for link in links ]

def scrape_doctors_links():
    for page in range(1, 100):
        doctors = get_all_doctor_links(page)

        if len(doctors) > 0:
            for i in range(len(doctors)):
                doctor_links.append(doctors[i])
            print(f"INFO: Saved all doctors from page {page}")
        else:
            break

def get_doctor_properties(url):
    soup = parse_soup(url)

    title = soup.find('h1', class_='heading-2').text

    specialty = soup.find('h2', class_='text-muted').text

    qualifications_div = soup.find('div', class_='doctor-description')

    qualifications_ul = qualifications_div.find('ul')

    try:
        qualifications = [ li.text for li in qualifications_ul.find_all('li') ]
        qualifications = qualifications[:max_qualifications]
    except:
        return None

    return (title, specialty, qualifications)

def scrape_doctors():
    scrape_doctors_links()

    if len(doctor_links) <= 0:
        return

    for i in range(len(doctor_links)):
        properties = get_doctor_properties(doctor_links[i])

        if properties == None:
            print(f'SUPERDOC ({i + 1}/{len(doctor_links)}) : FAILED TO FETCH')
            continue

        print(f'SUPERDOC ({i + 1}/{len(doctor_links)}) : {properties[0]}')
        json_manager.add_doctor_to_doctors(properties[0], properties[1], properties[2], doctor_links[i])