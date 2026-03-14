export function getGaTrackingId() {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
}

export function getGaScripts() {
  const measurementId = getGaTrackingId();
  if (!measurementId) {
    return null;
  }

  return {
    external: `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
    inline: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', { anonymize_ip: true });
    `,
  };
}
