import "./Footer.css";

import { pageContext } from "../Contexts/Page";

import { useContext } from "react";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="navLeftFooter nav-sprite-v1" id="navFooter">
      <a href="#main-header" id="navBackToTop" aria-label="Back to top">
        <div className="navFooterBackToTop">
          <span className="navFooterBackToTopText">Back to top</span>
        </div>
      </a>

      <div
        className="navFooterVerticalColumn navAccessibility"
        role="presentation"
      >
        <div className="navFooterVerticalRow navAccessibility flex-column  text-center text-md-start flex-md-row justify-content-center">
          <div className="navFooterLinkCol navAccessibility">
            <div className="navFooterColHead" role="heading" aria-level="6">
              Get to Know Us
            </div>
            <ul>
              <li className="nav_first">
                <a href="https://www.amazon.jobs" className="nav_a">
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="https://blog.aboutamazon.com/?utm_source=gateway&amp;utm_medium=footer"
                  className="nav_a"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://www.aboutamazon.com/?utm_source=gateway&amp;utm_medium=footer"
                  className="nav_a"
                >
                  About Amazon
                </a>
              </li>
              <li>
                <a href="https://www.amazon.com/ir" className="nav_a">
                  Investor Relations
                </a>
              </li>
              <li>
                <a
                  href="/gp/browse.html?node=2102313011&amp;ref_=footer_devices"
                  className="nav_a"
                >
                  Amazon Devices
                </a>
              </li>
              <li className="nav_last ">
                <a href="https://www.amazon.science" className="nav_a">
                  Amazon Science
                </a>
              </li>
            </ul>
          </div>

          <div className="navFooterLinkCol navAccessibility">
            <div className="navFooterColHead" role="heading" aria-level="6">
              Make Money with Us
            </div>
            <ul>
              <li className="nav_first">
                <a
                  href="https://services.amazon.com/sell.html?ld=AZFSSOA&amp;ref_=footer_soa"
                  className="nav_a"
                >
                  Sell products on Amazon
                </a>
              </li>
              <li>
                <a
                  href="https://services.amazon.com/amazon-business.html?ld=usb2bunifooter&amp;ref_=footer_b2b"
                  className="nav_a"
                >
                  Sell on Amazon Business
                </a>
              </li>
              <li>
                <a href="https://developer.amazon.com" className="nav_a">
                  Sell apps on Amazon
                </a>
              </li>
              <li>
                <a
                  href="https://affiliate-program.amazon.com/"
                  className="nav_a"
                >
                  Become an Affiliate
                </a>
              </li>
              <li>
                <a
                  href="https://advertising.amazon.com/?ref=ext_amzn_ftr"
                  className="nav_a"
                >
                  Advertise Your Products
                </a>
              </li>
              <li>
                <a
                  href="/gp/seller-account/mm-summary-page.html?ld=AZFooterSelfPublish&amp;topic=200260520&amp;ref_=footer_publishing"
                  className="nav_a"
                >
                  Self-Publish with Us
                </a>
              </li>
              <li>
                <a
                  href="https://go.thehub-amazon.com/amazon-hub-locker"
                  className="nav_a"
                >
                  Host an Amazon Hub
                </a>
              </li>
              <li className="nav_last nav_a_carat">
                <span className="nav_a_carat" aria-hidden="true">
                  ›
                </span>
                <a
                  href="/b/?node=18190131011&amp;ld=AZUSSOA-seemore&amp;ref_=footer_seemore"
                  className="nav_a"
                >
                  See More Make Money with Us
                </a>
              </li>
            </ul>
          </div>
          <div className="navFooterLinkCol navAccessibility">
            <div className="navFooterColHead" role="heading" aria-level="6">
              Amazon Payment Products
            </div>
            <ul>
              <li className="nav_first">
                <a
                  href="/dp/B07984JN3L?plattr=ACOMFO&amp;ie=UTF-8"
                  className="nav_a"
                >
                  Amazon Business Card
                </a>
              </li>
              <li>
                <a
                  href="/gp/browse.html?node=16218619011&amp;ref_=footer_swp"
                  className="nav_a"
                >
                  Shop with Points
                </a>
              </li>
              <li>
                <a
                  href="/gp/browse.html?node=10232440011&amp;ref_=footer_reload_us"
                  className="nav_a"
                >
                  Reload Your Balance
                </a>
              </li>
              <li className="nav_last ">
                <a
                  href="/gp/browse.html?node=388305011&amp;ref_=footer_tfx"
                  className="nav_a"
                >
                  Amazon Currency Converter
                </a>
              </li>
            </ul>
          </div>
          <div className="navFooterLinkCol navAccessibility">
            <div className="navFooterColHead" role="heading" aria-level="6">
              Let Us Help You
            </div>
            <ul>
              <li className="nav_first">
                <a
                  href="/gp/help/customer/display.html?nodeId=GDFU3JS5AL6SYHRD&amp;ref_=footer_covid"
                  className="nav_a"
                >
                  Amazon and COVID-19
                </a>
              </li>
              <li>
                <Link to="/account" className="nav_a">
                  Your Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="nav_a">
                  Your Orders
                </Link>
              </li>
              <li>
                <a
                  href="/gp/help/customer/display.html?nodeId=468520&amp;ref_=footer_shiprates"
                  className="nav_a"
                >
                  Shipping Rates &amp; Policies
                </a>
              </li>
              <li>
                <a
                  href="/gp/css/returns/homepage.html?ref_=footer_hy_f_4"
                  className="nav_a"
                >
                  Returns &amp; Replacements
                </a>
              </li>
              <li>
                <a
                  href="/gp/digital/fiona/manage?ref_=footer_myk"
                  className="nav_a"
                >
                  Manage Your Content and Devices
                </a>
              </li>
              <li className="nav_last ">
                <a
                  href="/gp/help/customer/display.html?nodeId=508510&amp;ref_=footer_gw_m_b_he"
                  className="nav_a"
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="nav-footer-line"></div>

      <div className="navFooterLine navFooterLinkLine navFooterPadItemLine">
        <span>
          <div className="navFooterLine navFooterLogoLine">
            <a aria-label="Amazon US Home" href="/?ref_=footer_logo">
              <div className="nav-logo-base nav-sprite">
                <img
                  src={require("../images/amz-white-logo.png")}
                  alt="AMZ LOGO"
                />
              </div>
            </a>
          </div>
        </span>
      </div>
      <div
        className="navFooterLine navFooterLinkLine navFooterDescLine d-none d-lg-block"
        role="navigation"
        aria-label="More on Amazon"
      >
        <table
          className="navFooterMoreOnAmazon"
          cellspacing="0"
          summary="More on Amazon"
        >
          <tbody>
            <tr>
              <td className="navFooterDescItem">
                <a
                  href="https://music.amazon.com?ref=dm_aff_amz_com"
                  className="nav_a"
                >
                  Amazon Music
                  <br />
                  <span className="navFooterDescText">
                    Stream millions
                    <br />
                    of songs
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a
                  href="https://advertising.amazon.com/?ref=footer_advtsing_amzn_com"
                  className="nav_a"
                >
                  Amazon Ads
                  <br />
                  <span className="navFooterDescText">
                    Reach customers
                    <br />
                    wherever they
                    <br />
                    spend their time
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://www.6pm.com" className="nav_a">
                  6pm
                  <br />
                  <span className="navFooterDescText">
                    Score deals
                    <br />
                    on fashion brands
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://www.abebooks.com" className="nav_a">
                  AbeBooks
                  <br />
                  <span className="navFooterDescText">
                    Books, art
                    <br />
                    &amp; collectibles
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://www.acx.com/" className="nav_a">
                  ACX <br />
                  <span className="navFooterDescText">
                    Audiobook Publishing
                    <br />
                    Made Easy
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a
                  href="https://sell.amazon.com/?ld=AZUSSOA-footer-aff&amp;ref_=footer_sell"
                  className="nav_a"
                >
                  Sell on Amazon
                  <br />
                  <span className="navFooterDescText">
                    Start a Selling Account
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="/business?ref_=footer_retail_b2b" className="nav_a">
                  Amazon Business
                  <br />
                  <span className="navFooterDescText">
                    Everything For
                    <br />
                    Your Business
                  </span>
                </a>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td className="navFooterDescItem">
                <a
                  href="/gp/browse.html?node=230659011&amp;ref_=footer_amazonglobal"
                  className="nav_a"
                >
                  AmazonGlobal
                  <br />
                  <span className="navFooterDescText">
                    Ship Orders
                    <br />
                    Internationally
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="/services?ref_=footer_services" className="nav_a">
                  Home Services
                  <br />
                  <span className="navFooterDescText">
                    Experienced Pros
                    <br />
                    Happiness Guarantee
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a
                  href="https://aws.amazon.com/what-is-cloud-computing/?sc_channel=EL&amp;sc_campaign=amazonfooter"
                  className="nav_a"
                >
                  Amazon Web Services
                  <br />
                  <span className="navFooterDescText">
                    Scalable Cloud
                    <br />
                    Computing Services
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://www.audible.com" className="nav_a">
                  Audible
                  <br />
                  <span className="navFooterDescText">
                    Listen to Books &amp; Original
                    <br />
                    Audio Performances
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a
                  href="https://www.boxofficemojo.com/?ref_=amzn_nav_ftr"
                  className="nav_a"
                >
                  Box Office Mojo
                  <br />
                  <span className="navFooterDescText">
                    Find Movie
                    <br />
                    Box Office Data
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://www.goodreads.com" className="nav_a">
                  Goodreads
                  <br />
                  <span className="navFooterDescText">
                    Book reviews
                    <br />
                    &amp; recommendations
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://www.imdb.com" className="nav_a">
                  IMDb
                  <br />
                  <span className="navFooterDescText">
                    Movies, TV
                    <br />
                    &amp; Celebrities
                  </span>
                </a>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td className="navFooterDescItem">
                <a
                  href="https://pro.imdb.com?ref_=amzn_nav_ftr"
                  className="nav_a"
                >
                  IMDbPro
                  <br />
                  <span className="navFooterDescText">
                    Get Info Entertainment
                    <br />
                    Professionals Need
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://kdp.amazon.com" className="nav_a">
                  Kindle Direct Publishing
                  <br />
                  <span className="navFooterDescText">
                    Indie Digital &amp; Print Publishing
                    <br />
                    Made Easy
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a
                  href="https://videodirect.amazon.com/home/landing"
                  className="nav_a"
                >
                  Prime Video Direct
                  <br />
                  <span className="navFooterDescText">
                    Video Distribution
                    <br />
                    Made Easy
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://www.shopbop.com" className="nav_a">
                  Shopbop
                  <br />
                  <span className="navFooterDescText">
                    Designer
                    <br />
                    Fashion Brands
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://www.woot.com/" className="nav_a">
                  Woot!
                  <br />
                  <span className="navFooterDescText">
                    Deals and <br />
                    Shenanigans
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://www.zappos.com" className="nav_a">
                  Zappos
                  <br />
                  <span className="navFooterDescText">
                    Shoes &amp;
                    <br />
                    Clothing
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://ring.com" className="nav_a">
                  Ring
                  <br />
                  <span className="navFooterDescText">
                    Smart Home
                    <br />
                    Security Systems
                  </span>
                </a>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td className="navFooterDescItem">&nbsp;</td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://eero.com/" className="nav_a">
                  eero WiFi
                  <br />
                  <span className="navFooterDescText">
                    Stream 4K Video
                    <br />
                    in Every Room
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a
                  href="https://blinkforhome.com/?ref=nav_footer"
                  className="nav_a"
                >
                  Blink
                  <br />
                  <span className="navFooterDescText">
                    Smart Security
                    <br />
                    for Every Home
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a
                  href="https://shop.ring.com/pages/neighbors-app"
                  className="nav_a"
                >
                  Neighbors App <br />
                  <span className="navFooterDescText">
                    {" "}
                    Real-Time Crime
                    <br />
                    &amp; Safety Alerts
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a
                  href="/gp/browse.html?node=14498690011&amp;ref_=amzn_nav_ftr_swa"
                  className="nav_a"
                >
                  Amazon Subscription Boxes
                  <br />
                  <span className="navFooterDescText">
                    Top subscription boxes – right to your door
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">
                <a href="https://www.pillpack.com" className="nav_a">
                  PillPack
                  <br />
                  <span className="navFooterDescText">Pharmacy Simplified</span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "3%" }}></td>
              <td className="navFooterDescItem">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="navFooterLine navFooterLinkLine navFooterPadItemLine navFooterCopyright">
        <ul>
          <li className="nav_first">
            <a
              href="/gp/help/customer/display.html?nodeId=508088&amp;ref_=footer_cou"
              id=""
              className="nav_a"
            >
              Conditions of Use
            </a>{" "}
          </li>
          <li>
            <a
              href="/gp/help/customer/display.html?nodeId=468496&amp;ref_=footer_privacy"
              id=""
              className="nav_a"
            >
              Privacy Notice
            </a>{" "}
          </li>
          <li>
            <a
              href="/gp/help/customer/display.html?ie=UTF8&amp;nodeId=TnACMrGVghHocjL8KB&amp;ref_=footer_consumer_health_data_privacy"
              id=""
              className="nav_a"
            >
              Consumer Health Data Privacy Disclosure
            </a>{" "}
          </li>
          <li>
            <a href="/privacyprefs?ref_=footer_iba" id="" className="nav_a">
              Your Ads Privacy Choices
            </a>{" "}
          </li>
          <li className="nav_last">
            <span id="nav-icon-ccba" className="nav-sprite"></span>{" "}
          </li>
        </ul>
        <span>© 1996-2024, Amazon.com, Inc. or its affiliates</span>
      </div>
    </div>
  );
}
