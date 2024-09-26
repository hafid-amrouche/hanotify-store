import { inDev } from "../constants/Values";

export function darkenHexColor(hex, percent) {
    // Ensure hex starts with '#'
    if(hex){
      if (hex[0] === '#') {
        hex = hex.slice(1);
      }
    
      // Convert hex to RGB
      let r = parseInt(hex.slice(0, 2), 16);
      let g = parseInt(hex.slice(2, 4), 16);
      let b = parseInt(hex.slice(4, 6), 16);
    
      // Calculate darkening factor
      const factor = (100 - percent) / 100;
    
      // Darken each color component
      r = Math.round(r * factor);
      g = Math.round(g * factor);
      b = Math.round(b * factor);
    
      // Ensure values are within the valid range
      r = Math.max(0, Math.min(255, r));
      g = Math.max(0, Math.min(255, g));
      b = Math.max(0, Math.min(255, b));
    
      // Convert RGB back to hex
      const newHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
      return newHex;
    }
}

const getScrollableAncestor = (element) => {
  let currentNode = element.parentElement;

  while (currentNode && currentNode !== document.body) {
    const style = window.getComputedStyle(currentNode);
    const overflow = style.overflow;
    const overflowY = style.overflowY;

    // Check if the element is scrollable
    if ( overflow  === 'auto' || overflowY  === 'auto' ) {
      if (currentNode.scrollHeight > currentNode.clientHeight) {
        return currentNode;
      }
    }

    // Move to the parent node
    currentNode = currentNode.parentElement;
  }

  // Default to the body or documentElement if no scrollable ancestor is found
  return document.scrollingElement || document.documentElement;
};

export function adjustScrollPosition(element) {
  // Get the element's bounding box relative to the viewport
  const rect = element.getBoundingClientRect();
  const scrollingContainer = getScrollableAncestor(element)
  // Calculate the amount of space needed to ensure the dropdown is fully visible
  const spaceBelow = scrollingContainer.clientHeight - rect.bottom;

  if (spaceBelow < 0) { // If there's not enough space below
    // Scroll the window to make the drop-down fully visible
    scrollingContainer.scrollBy({
      top: -spaceBelow,
      behavior: 'smooth'
    });
  }
}

const textsDict = {
  'ar': {
    'DA': 'دج',
    'Full name': 'الاسم الكامل',
    'Phone number': 'رقم الهاتف',
    'Shipping to': 'الشحن إلى',
    'Home': 'المنزل',
    'Office': 'المكتب',
    'Total price': 'السعر الإجمالي',
    'Confirm order': 'تأكيد الطلب',
    'Your order have been recieved': 'لقد تم استلام طلبك',
    'Order now': 'اطلب الآن',
    'Exit': 'خروج',
    'Free': 'مجاني',
    'Your order was not submitted, please try again': 'لم يتم إرسال طلبك، يرجى المحاولة مرة أخرى',
    'No image was provider': 'لا توجد صور',
    'No price available !': 'لا يوجد سعر !',
    'Quantity': 'الكمية',
    'Product price': 'ثمن المنتوع',
    "Shipping cost": 'ثمن التوصيل',
    'Theme': 'وضع الرؤية',
    "Dark": 'داكن',
    'Light': 'ساطع',
    'State': 'الولاية'
  },
  'en':{},
  'fr': {}
}
export const translaste=(text)=>{
  const lang = localStorage.getItem('language') || 'ar'
  return textsDict[lang][text] || text
}

const stylingDict = {
  'ar': {
    'left': 'right',
    'right': 'left',
    'Left': 'Right',
    'Right': 'Left'
  },
  'en':{},
  'fr': {}
}

export const translateStyling=(text)=>{
  const lang = localStorage.getItem('language') || 'ar'
  return stylingDict[lang][text] || text
}

export function adjustScrollToTop(element, delta= 0) {
  // Get the element's bounding box relative to the viewport
  const rect = element.getBoundingClientRect();
  const scrollingContainer = document.documentElement
  // Calculate the amount of space needed to ensure the dropdown is fully visible

  scrollingContainer.scrollBy({
    top: rect.top + delta,
    behavior: 'smooth'
  });

}

export function capitalizeFirstLetter(word) {
  if (typeof word !== 'string' || word.length === 0) {
      return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function isNum(char) {
  return char >= '0' && char <= '9';
}

export const componentLoader = async(importFunction)=>{
  const loading = document.getElementById('loading__div')
  const header = document.getElementById('main-header')
  if (loading) loading.style.display='block'
  if (header) header.style.marginTop = '4px'
  await importFunction()
  if (loading) loading.style.display='none'
  if (header) header.style.removeProperty('margin-top')
  return null
}

export function parseFullName(fullName) {
  // Trim any extra spaces from the input
  const nameParts = fullName.trim().split(/\s+/); // Split by any whitespace

  let firstName = '';
  let lastName = '';

  // Handling different cases based on the length of nameParts
  if (nameParts.length === 1) {
    // Only one name provided, consider it as the first name
    firstName = nameParts[0];
  } else if (nameParts.length == 2) {
    // Multiple names provided
    firstName = nameParts[0]; // First name is the first part
    lastName = nameParts[1]; // Last name is the last part
  }
  else {
    // Multiple names provided
    firstName = fullName // First name is the first part
  } 

  return {
    first_name: firstName,
    last_name: lastName
  };
}

export function getColorScheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
  } else {
      return 'light';
  }
}


export const handleScrollStop = (callback, timeout = 150) => {
  let isScrolling;

  return () => {
    // Clear previous timeout, if any
    clearTimeout(isScrolling);

    // Set a new timeout to detect scroll stop
    isScrolling = setTimeout(() => {
      // Scroll has stopped, execute the callback
      callback();
    }, timeout);
  };
};


export function isElementFocused(inputElement) {
  return document.activeElement === inputElement;
}

export function isDifferenceMoreThan100Hours(time1) {
  // Get the current time (now) in milliseconds
  const now = Date.now();

  // Get the absolute difference in milliseconds
  const differenceInMs = Math.abs(now - time1);

  // Convert the difference from milliseconds to hours
  const differenceInHours = differenceInMs / (1000 * 60 * 60);

  // Check if the difference is greater than 100 hours
  return differenceInHours > 100;
}

export const checkHasEnoughTimePassed=(productLastOrder)=>{
  if (inDev) return true
  let enoughTimePassed = false
  if (productLastOrder){
      enoughTimePassed = isDifferenceMoreThan100Hours(productLastOrder.lastOrderTime)
  }
  return enoughTimePassed
}