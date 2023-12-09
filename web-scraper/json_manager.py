import json

medicines = []
doctors = []

INDENTATION = 0

def add_product_to_medicines(title, image, text, save_images):
    new_product = {
        'name': title,
        'description': text
    }

    if save_images:
        new_product['image'] = image

    medicines.append(new_product)

def add_doctor_to_doctors(title, specialty, qualifications, link):
    new_doctor = {
        'name': title,
        'specialty': specialty,
        'qualifications': qualifications,
        'link': link
    }

    doctors.append(new_doctor)

def setup(scrape_medicine):
    global medicines

    if scrape_medicine:
        with open('records/medicine.json', 'w+') as json_file:
            json.dump([], json_file)
    else:
        with open('records/doctors.json', 'w+') as json_file:
            json.dump([], json_file)

def load(scrape_medicine):
    file_to_dump = 'records/medicine.json' if scrape_medicine else 'records/doctors.json'
    data_to_dump = medicines if scrape_medicine else doctors

    with open(file_to_dump, 'w+', encoding='utf-8') as json_file:
        json.dump(data_to_dump, json_file, ensure_ascii=False, indent=INDENTATION)