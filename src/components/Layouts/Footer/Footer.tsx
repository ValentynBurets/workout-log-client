import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import { Trans } from "react-i18next";

import Logo from "../../../assets/images/Logo/Logo-1.png";
import logoFacebook from "../../../assets/images/Logo/FacebookLogo.png";
import logoTelegram from "../../../assets/images/Logo/TelegramLogo.png";
import logoYoutube from "../../../assets/images/Logo/YoutubeLogo.png";
import logoInsta from "../../../assets/images/Logo/InstagramLogo.png";

import style from "./Footer.module.sass";

const Footer = () => (
  <div className={style.footer_style}>
    <div className={style.footer_container}>
      <div className={style.logo_image_text_style_container}>
        <div className={style.logo_image_text_style}>
          <a href="/" className={style.logo_image}>
            <img src={Logo} className={style.logo_image_style} alt="Logo" />
          </a>
          <label className={style.logo_name}>WorkOutLog</label>
          <label className={style.text_logo_style}>
            <Trans i18nKey="AllRightsReserved">
              Made with ❤️ by Misha Keryta
            </Trans>
          </label>
        </div>
      </div>
      <div className={style.nav_col_container}>
        <div className={style.nav_container}>
          <label className={style.nav_title_lable}>
            <Trans i18nKey="Navigation">Navigation</Trans>
          </label>
          <div className={style.nav_link_container}>
            <a href="/lots" className={style.nav_link}>
              <Trans i18nKey="Lots">Lots</Trans>
            </a>
            <a href="/about_us" className={style.nav_link}>
              <Trans i18nKey="AboutUs">About us</Trans>
            </a>
            <a href="/rules" className={style.nav_link}>
              <Trans i18nKey="Rules">Rules</Trans>
            </a>
          </div>
        </div>
      </div>
      <div className={style.social_media_container}>
        <label>
          <Trans i18nKey="SocialMedia">Social media</Trans>
        </label>
        <div>
          <div className={style.media_image_and_description}>
            <a href="/">
              <img
                src={logoYoutube}
                height="6%"
                width="6%"
                className={style.media_image_style}
                alt="Logo"
              />
            </a>
            <a href="LandSelling.ua" className={style.media_description}>
              YouTube: LandSelling.ua
            </a>
          </div>
          <div className={style.media_image_and_description}>
            <a href="/">
              <img
                src={logoInsta}
                height="6%"
                width="6%"
                className={style.media_image_style}
                alt="Logo"
              />
            </a>
            <a href="@LandSelling.ua" className={style.media_description}>
              Instagram: @LandSelling.ua
            </a>
          </div>
          <div className={style.media_image_and_description}>
            <a href="/">
              <img
                src={logoFacebook}
                height="6%"
                width="6%"
                className={style.media_image_style}
                alt="Logo"
              />
            </a>
            <a href="LandSelling" className={style.media_description}>
              Facebook: LandSelling
            </a>
          </div>
          <div className={style.media_image_and_description}>
            <a href="/">
              <img
                src={logoTelegram}
                height="6%"
                width="6%"
                className={style.media_image_style}
                alt="Logo"
              />
            </a>
            <a href="LandSelling" className={style.media_description}>
              Telegram: LandSelling
            </a>
          </div>
        </div>
      </div>
      <div className={style.contact_us}>
        <div className={style.contact_us_text_container}>
          <label className={style.contact_us_contact_label}>
            <Trans i18nKey="ContactUs">Contact us:</Trans>
          </label>
          <a href="tel:380 959 171 229" className={style.contact_text_style}>
            +380 959 171 229
          </a>
        </div>
      </div>
    </div>
  </div>
);
export default Footer;