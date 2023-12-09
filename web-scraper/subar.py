import requests
from bs4 import BeautifulSoup as bs

import json_manager

testing = True

categories = [
    'produkti-povlijavashti-bolka',
    'produkti-pri-prostuda-kashlica-i-dihatelni-problemi',
    'produkti-za-syrdechno-sydova-sistema-i-kryvoobrashtenie',
    'produkti-povlijavashti-hranosmilatelnata-sistema',
    'produkti-za-ochi-i-ushi'
]

page_indexes = [
    '5/3',
    '5/4',
    '5/5',
    '5/8',
    '5/17'
]

product_url = "https://subra.bg/1/"
image_url = "https://subra.bg"

max_char_limit = 500

links = []

def parse_soup(url):
    response = requests.get(url)
    soup = bs(response.content, 'html.parser')

    return soup

def get_all_product_links(page):
    soup = parse_soup(url + str(page))

    a_links = soup.find_all('a')

    products = []
    should_continue = False

    for i in range(len(a_links)):
        if should_continue:
            should_continue = False
            continue
        href = a_links[i]['href'].strip()
        if href[:len(product_url)] == product_url and categories[current_index] in href and "page" not in href and page_indexes[current_index] not in href:
            products.append(href)
            should_continue = True
    
    return products

def scrape_products_links(testing):
    global current_index
    global categories

    current_index = 0

    max_pages = 100

    if testing:
        categories = categories[:1]
        max_pages = 2

    for i in range(len(categories)):
        current_index = i
        category_products = 0

        global url
        url = f'https://subra.bg/1/lekarstva-i-zdrave/{categories[current_index]}/{page_indexes[current_index]}?page='

        for page in range(1, max_pages):
            products = get_all_product_links(page)
            category_products += len(products)

            if testing:
                products = products[:3]

            if len(products) > 0:
                for product in products:
                    links.append(product)
            else:
                print(f"INFO: Saved {page - 1} ({category_products} products) pages from category {i + 1}")
                break
            
def get_product_properties(url):
    soup = parse_soup(url)

    title = soup.find_all('h1', class_='product__info-title')[0].text

    images = soup.find_all('img')

    image = None
    for img in images:
        if img.get('alt') == title and 'thumbs' in img.get('src'):
            image = f'{image_url}{img['src']}'

    text_div = soup.find_all('div', class_='text')[0]
    text = ''
    text += text_div.find('h2').text + '\n'
    text += '\n'.join( i.text for i in text_div.find_all('p') )

    text = text[:max_char_limit]

    return (title, image, text)

def scrape_products(save_images, testing):
    scrape_products_links(testing)

    for i in range(len(links)):
        properties = get_product_properties(links[i])
        print(f'SUBAR ({i + 1}/{len(links)}) : {properties[0]}')
        json_manager.add_product_to_medicines(properties[0], properties[1], properties[2], save_images)