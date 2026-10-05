# # Scrapy settings for sdsu_scraper project
# #
# # For simplicity, this file contains only settings considered important or
# # commonly used. You can find more settings consulting the documentation:
# #
# #     https://docs.scrapy.org/en/latest/topics/settings.html
# #     https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
# #     https://docs.scrapy.org/en/latest/topics/spider-middleware.html
import os

BOT_NAME = "sdsu_scraper"

SPIDER_MODULES = ["sdsu_scraper.spiders"]
NEWSPIDER_MODULE = "sdsu_scraper.spiders"

ROBOTSTXT_OBEY = True
COOKIES_ENABLED = True
CONCURRENT_REQUESTS = 1
DOWNLOAD_DELAY = 1.0
AUTOTHROTTLE_ENABLED = True
AUTOTHROTTLE_START_DELAY = 1.0
AUTOTHROTTLE_MAX_DELAY = 10.0
AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0

DEFAULT_REQUEST_HEADERS = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

FEEDS = {
    "output/classes.jsonl": {
        "format": "jsonlines",
        "encoding": "utf8",
        "overwrite": True,
    }
}

FEED_EXPORT_ENCODING = "utf-8"
LOG_LEVEL = "INFO"

# Use Firefox to render the PeopleSoft page and execute its JavaScript.
DOWNLOAD_HANDLERS = {
    "http": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
    "https": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
}

TWISTED_REACTOR = (
    "twisted.internet.asyncioreactor.AsyncioSelectorReactor"
)

PLAYWRIGHT_BROWSER_TYPE = "firefox"
_playwright_proxy = os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY")
PLAYWRIGHT_LAUNCH_OPTIONS = {"headless": True}
if _playwright_proxy:
    PLAYWRIGHT_LAUNCH_OPTIONS["proxy"] = {"server": _playwright_proxy}
PLAYWRIGHT_DEFAULT_NAVIGATION_TIMEOUT = 60000
PLAYWRIGHT_MAX_CONTEXTS = 1