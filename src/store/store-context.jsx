import { createContext, Suspense, useContext, useEffect, useState } from "react";
import { darkenHexColor, getColorScheme, hexToRgb } from "../utils/utils";
import { apiUrl, filesUrl } from "../constants/Urls";
import FacebookPixel from "../components/FacebookPixel";
import { inDev, ltr, rtl } from "../constants/Values";
import useGetCurrentScreenWidth from "../hooks/useGetCurrentScreenWidth";
import colors from "../json/colors.json";

const storeColors = colors.colors;

const root = document.getElementById("root");

const StoreContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  storeData: {
    logo: null,
    favicon: null,
    askForClientNote: true,
    askForAddress: true,
  },
  language: "en",
  errorBeowserData: null,
  setErrorStoreData: () => {},
  colors: null,
  visitor: null,
  setVisitor: () => {},
  orders: {},
  setOrders: () => {},
  addOrder: (productId) => {},
  langTerms: rtl,
  device: "mobile",
});
const ordersDatafromLocaleStorage = localStorage.getItem("ordersData");

const defaultOrdersData = ordersDatafromLocaleStorage
  ? JSON.parse(ordersDatafromLocaleStorage)
  : {};

// visitor

const host = window.location.host;

let storeFromLocaleStorage = localStorage.getItem(host);
if (storeFromLocaleStorage) {
  storeFromLocaleStorage = JSON.parse(storeFromLocaleStorage);
  storeFromLocaleStorage.isBlocked = storeFromLocaleStorage.flag == 1;
  delete storeFromLocaleStorage.flag;
} else {
  storeFromLocaleStorage = {
    isBlocked: false,
    tracker: null,
  };
}

const defaultStoreData = {
  primaryColor: "#ffffff",
  bordersRounded: true,
  language: "fr",
  mode: "light",
};


const themeFromLocaleStorage = localStorage.getItem("theme");
const themeMode = defaultStoreData.mode;

const defaultOrdersFromLocaleStore = localStorage.getItem("orders");
const defaultOrders = defaultOrdersFromLocaleStore
  ? JSON.parse(defaultOrdersFromLocaleStore)
  : {};

const StoreContextProvider = ({ children }) => {
  // theme
  const defaultTheme =
    themeMode === "auto"
      ? themeFromLocaleStorage
        ? themeFromLocaleStorage
        : getColorScheme()
      : themeMode;
  const [theme, setTheme] = useState(defaultTheme);
  const toggleTheme = () =>
    setTheme((state) => (state === "light" ? "dark" : "light"));
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // store data
  const [storeData, setStoreData] = useState(defaultStoreData);

  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    fetch(filesUrl + "/get-store?domain=" + host).then((response) => {
      response.json().then((data) => {
        setStoreData((storeData) => ({
          id: true,
          ...storeData,
          ...data,
        }));
        setLanguage(data.language)
        // set meta data
        const defaultTitle = document.title
        document.title = data.name || defaultTitle
        document.querySelector('#meta-title').setAttribute('content', data.name || defaultTitle)

        const defaultDescription = document.querySelector('#description').getAttribute('content')
        document.querySelector('#description').setAttribute('content', data.description || defaultDescription)
        document.querySelector('#meta-descrition').setAttribute('content', data.description || defaultDescription)

        document.querySelector('#meta-image').setAttribute('content', data.logo)

        document.querySelector('#favicon-link').setAttribute('href', data.favicon)
                
      });
    });
  }, []);

  // language

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    localStorage.setItem("language", language);
    if (language === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      root.style.setProperty("--lang--100", "100%");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      root.style.setProperty("--lang--100", "-100%");
    }
  }, [language]);

  // colors
  const [colors, setColors] = useState({});
  useEffect(() => {
    const primary = storeData.primaryColor;
    const primaryDark = storeData.primaryColorDark;

    setColors(() => {
      const newColors = storeColors[theme];
      for (let key in newColors) {
        root.style.setProperty(`--${key}`, newColors[key]);
        root.style.setProperty(`--${key}-rgb`, hexToRgb(newColors[key]));
      }
      root.style.setProperty(
        "--primaryColor",
        theme === "light" ? primary : primaryDark
      );
      root.style.setProperty(
        "--primaryColor-rgb",
        theme === "light" ? hexToRgb(primary) : hexToRgb(primaryDark)
      );
      root.style.setProperty(
        "--primary100Color",
        theme === "light"
          ? darkenHexColor(primary, 20)
          : darkenHexColor(primaryDark, -20)
      );
      return newColors;
    });

    // setColors(newColors)
    // for (let key in newColors) {
    //     root.style.setProperty([key], newColors[key])
    // }
  }, [theme, storeData.primaryColor]);

  useEffect(() => {
    if (storeData.bordersRounded) {
      root.style.setProperty("--border-radius-1", "4px");
      root.style.setProperty("--border-radius-2", "8px");
      root.style.setProperty("--border-radius-3", "12px");
    } else {
      root.style.setProperty("--border-radius-1", "0");
      root.style.setProperty("--border-radius-2", "0");
      root.style.setProperty("--border-radius-3", "0");
    }
  }, [storeData.bordersRounded]);

  const [ordersData, setOrdersData] = useState(defaultOrdersData); //{/* finish from here */}
  useEffect(() => {
    localStorage.setItem("ordersData", JSON.stringify(ordersData));
  }, [ordersData]);

  // check last order from a product
  const [orders, setOrders] = useState(defaultOrders);
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // visitor tracking
  const [visitor, setVisitor] = useState(storeFromLocaleStorage);
  useEffect(() => {
    fetch(apiUrl + "/store/check-visitor", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: host,
        tracker: visitor?.tracker,
      }),
    }).then((response) =>
      response.json().then((data) => {
        setVisitor(data);
      })
    );
  }, []);

  useEffect(() => {
    if (visitor) {
      localStorage.setItem(
        host,
        JSON.stringify({
          tracker: visitor.tracker,
          flag: visitor.isBlocked ? 1 : 2,
        })
      );
    }
  }, [visitor]);

  const addOrder = (productId) => {
    setOrders((orders) => {
      const newOrders = { ...orders };
      if (newOrders[productId]) {
        newOrders[productId] = {
          lastOrderTime:
            newOrders[productId].deltaTimes === 0
              ? Date.now()
              : newOrders[productId].lastOrderTime,
          times: newOrders[productId].times + 1,
          deltaTimes: newOrders[productId].deltaTimes + 1,
        };
      } else {
        newOrders[productId] = {
          lastOrderTime: Date.now(),
          times: 1,
          deltaTimes: 1,
        };
      }
      return newOrders;
    });
  };

  const setColor = (id, value) => {
    setColors((colors) => ({
      ...colors,
      [id]: value,
    }));
    root.style.setProperty([id], value);
  };

  const [pageBg, setPageBg] = useState(undefined);

  const screenWidth = useGetCurrentScreenWidth();
  // default context value
  const defaultStoreValue = {
    theme,
    toggleTheme,
    storeData,
    colors,
    ordersData,
    setOrdersData,
    visitor,
    setVisitor,
    language,
    orders,
    setOrders,
    addOrder,
    langTerms: language === "ar" ? rtl : ltr,
    device: screenWidth > 450 ? "PC" : "mobile",
    setColor,
    pageBg,
    setPageBg,
    screenWidth,
  };

  const fetchChildren = storeData.id;
  return (
    <StoreContext.Provider value={defaultStoreValue}>
      {storeData.facebookPixelsId?.length > 0 && (
          <FacebookPixel facebookPixelsId={storeData.facebookPixelsId} />
      )}
      <div
        key={colors}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          backgroundColor: pageBg,
        }}
        id="app"
      >
        {fetchChildren && children}
      </div>
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
export const useStoreContext = () => useContext(StoreContext);
