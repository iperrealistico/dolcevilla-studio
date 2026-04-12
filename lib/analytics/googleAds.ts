export function getGoogleAdsId() {
  return process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
}

export function getGoogleAdsConversionLabel() {
  return process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
}

export function getGoogleAdsConversionDestination() {
  const adsId = getGoogleAdsId();
  const conversionLabel = getGoogleAdsConversionLabel();

  if (!adsId || !conversionLabel) {
    return null;
  }

  return `${adsId}/${conversionLabel}`;
}

export function getGoogleAdsScripts() {
  const adsId = getGoogleAdsId();
  if (!adsId) {
    return null;
  }

  return {
    external: `https://www.googletagmanager.com/gtag/js?id=${adsId}`,
    inline: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${adsId}');
    `,
  };
}
