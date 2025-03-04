export const loadGoogleFont = (fontName) => {
    if (!fontName) return; // Evita errori se il font non è definito
  
    const existingLink = document.getElementById("dynamic-font");
    const fontURL = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, "+")}&display=swap`;
  
    if (existingLink) {
      if (existingLink.href !== fontURL) {
        existingLink.href = fontURL;
      }
    } else {
      const link = document.createElement("link");
      link.id = "dynamic-font";
      link.rel = "stylesheet";
      link.href = fontURL;
      document.head.appendChild(link);
    }
  };
  