import json_manager

import subar
import doctor

def main():
    # Set to true to scrape medicine
    # Set to false to scrape doctors
    scrape_medicine = False

    save_images = False
    testing = False

    json_manager.setup(scrape_medicine)
    
    if scrape_medicine:
        subar.scrape_products(save_images, testing)
    else:
        doctor.scrape_doctors()

    json_manager.load(scrape_medicine)

if __name__ == "__main__":
    main()