import "./Footer.css";
import {} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function FooterNew() {
  return (
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6 about-col">
            <h6>About</h6>
            <p class="text-justify">
              Foodversy.com is <i>ONE-STOP SHOP</i> for food and agricultural
              products. System is developed with 27 years of experience,
              certified producers, updated market informations, unique place for
              marketplace, quick commerce, reliable supply chain, well organized
              logistic solutions.
            </p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Legal</h6>
            <ul class="footer-links">
              <li>
                <a href="">Terms</a>
              </li>
              <li>
                <a href="">Privacy</a>
              </li>
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/home">About</a>
              </li>
              <li>
                <a href="/main-categories/main">Categories</a>
              </li>
              <li>
                <a href="/news">News</a>
              </li>
              <li>
                <a href="">Sitemap</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">
              Copyright &copy; 2022 All Rights Reserved by
              <a href="#"> Socratech</a>.
            </p>
          </div>

          {/* <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li>
                <a class="facebook" href="#">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a class="twitter" href="https://twitter.com/FoodFromTurkey">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a class="dribbble" href="https://www.instagram.com/foodversy/">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li>
                <a class="linkedin" href="#">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
