// utils/sendConversionData.js
export const sendConversionData = () => {
  // Check if MediaAlphaExchange is defined before using it
  const tryConversion = () => {
    if (
      typeof MediaAlphaExchange !== "undefined" &&
      typeof MediaAlphaExchange.conversion === "function"
    ) {
      MediaAlphaExchange.conversion({
        campaign_name: localStorage.getItem("campaign_name"),
        campaign_id: localStorage.getItem("campaign_id"),
        click_id: localStorage.getItem("click_id"),
      });
      console.log("Conversion data sent successfully");
    } else {
      console.warn("MediaAlphaExchange is not ready yet, retrying...");
      // Retry after a short delay if MediaAlphaExchange isn't loaded yet
      setTimeout(tryConversion, 5);
    }
  };

  tryConversion();
};
