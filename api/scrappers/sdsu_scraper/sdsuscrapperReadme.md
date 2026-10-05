requirements must have scrapy
https://docs.scrapy.org/en/latest/intro/install.html

python -m pip install --upgrade pip
python -m pip install scrapy scrapy-playwright
python -m playwright install firefox


windows 11
execution: 

cd ./cs514-database-project\api\scrappers\sdsu_scraper
python -m scrapy crawl sdsu_classes -O output\classes.jsonl -L INFO

your urls will be saved to here 
.\output\classes.jsonl



python -m scrapy list for available spiders 



versions

python --version (Python 3.13.14)
python -m scrapy version (Scrapy 2.19.0)
python -m playwright --version (Version 1.63.0)