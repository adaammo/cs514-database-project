from __future__ import annotations

import html
import re

import scrapy
from scrapy_playwright.page import PageMethod


MAIN_SEARCH_URL = (
    "https://cmsweb.cms.sdsu.edu/psc/CSDPRD/EMPLOYEE/SA/c/"
    "SSR_STUDENT_FL.SSR_CLSRCH_MAIN_FL.GBL?"
    "Page=SSR_CLSRCH_MAIN_FL"
)


async def perform_search(page):
    """Select Spring 2027, choose CS, and submit the PeopleSoft search."""
    term_link = page.get_by_text("Spring 2027", exact=True)
    await term_link.wait_for(state="visible", timeout=20000)
    await term_link.click(no_wait_after=True, timeout=20000)
    await page.wait_for_timeout(3000)

    advanced_link = page.get_by_role(
        "link",
        name="Additional ways to search",
        exact=True,
    )
    await advanced_link.wait_for(state="visible", timeout=20000)
    await advanced_link.click(no_wait_after=True, timeout=20000)
    await page.wait_for_timeout(1500)

    # PeopleSoft places these controls in an iframe.
    advanced_frame = page.frame_locator("#ptModFrame_0")
    subject_dropdown = advanced_frame.get_by_label(
        "Available Subjects Dropdown",
        exact=True,
    )
    await subject_dropdown.select_option("CS")

    search_button = advanced_frame.locator(
        '[id="SSR_CLSRCH_FLDS_SSR_SEARCH_PB_1$0"]'
    )
    await search_button.click(no_wait_after=True, timeout=20000)
    await page.wait_for_timeout(5000)


class SdsuClassesSpider(scrapy.Spider):
    name = "sdsu_classes"
    allowed_domains = ["cmsweb.cms.sdsu.edu"]

    custom_settings = {
        "DOWNLOAD_TIMEOUT": 90,
        "RETRY_TIMES": 2,
    }

    async def start(self):
        yield scrapy.Request(
            url=MAIN_SEARCH_URL,
            callback=self.parse,
            meta={
                "playwright": True,
                "playwright_page_methods": [
                    PageMethod(perform_search),
                ],
            },
        )

    def parse(self, response):
        # Playwright has already executed the search and returned the
        # browser-rendered DOM to Scrapy.
        onclick_values = response.css(
            "[onclick]::attr(onclick)"
        ).getall()

        javascript_hrefs = response.css(
            "a[href^='javascript']::attr(href)"
        ).getall()

        found_urls = set()

        for value in onclick_values + javascript_hrefs:
            value = html.unescape(value)

            matches = re.findall(
                r"openSrchRsltURL\(['\"]"
                r"(https://cmsweb\.cms\.sdsu\.edu/[^'\"]+)",
                value,
            )

            found_urls.update(matches)

        self.logger.info(
            "Found %s hidden course URLs after the rendered search",
            len(found_urls),
        )

        for url in sorted(found_urls):
            yield {"url": url}
