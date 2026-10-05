import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule


class CmswebSpider(CrawlSpider):
    name = "cmsweb"

    allowed_domains = [
        "cmsweb.cms.sdsu.edu"
    ]

    start_urls = [
        "https://cmsweb.cms.sdsu.edu/psc/CSDPRD/EMPLOYEE/SA/c/"
        "SSR_STUDENT_FL.SSR_CLSRCH_ES_FL.GBL?"
        "Page=SSR_CLSRCH_ES_FL&"
        "SEARCH_GROUP=SSR_CLASS_SEARCH_LFF&"
        "SEARCH_TEXT=%25&"
        "ES_INST=SDCMP&"
        "ES_STRM=2267&"
        "ES_ADV=Y&"
        "ES_SUB=CS&"
        "ES_CNBR=&"
        "ES_LNAME=&"
        "KeywordsOP=CT&"
        "SubjectOP=EQ&"
        "CatalogNbrOP=CT&"
        "LastNameOP=CT&"
        "GBLSRCH=PTSF_GBLSRCH_FLUID"
    ]

    rules = (
        Rule(
            LinkExtractor(
                allow_domains=["cmsweb.cms.sdsu.edu"],
                deny=("logout", "signout"),
            ),
            callback="parse_page",
            follow=True,
        ),
    )

    def parse_page(self, response):
        yield {
            "url": response.url,
            "status": response.status,
            "title": response.css("title::text").get(),
            "text": " ".join(
                response.css("body *::text").getall()
            ).strip(),
            "links": response.css("a::attr(href)").getall(),
        }