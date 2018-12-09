# scraper
Scraping images from google image search, applying compression and greyscale filter.

- Scraps google images and downloads 15 top jpg and png images to server. Applies compression algorithm and greyscale filter.
- A list is created of previous searches.
- Upon clicking on the list item, images are rendered from the server.

Issues:
[1] Scraping google image search is a cpu intensive work; therfore it takes more than 30 seconds to respond, causing heroku servers to reboot. I applied cluster module, but still the issue is present. Perhaps solution is to schedule workers manually using external library as mentioned in heroku documents.
[2] The downloadImages Function in helpers directory is showing unpredictable behaivour in 20%-30%  of cases of broken links and for response status-codes other than 200 even though I have already filtered the requests.

Heroku Link: https://sleepy-falls-65798.herokuapp.com/
